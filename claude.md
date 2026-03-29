# CLAUDE.md — Lovvite

> This file is the source of truth for AI-assisted development on this project.
> Read this before writing any code.

---

## What We're Building

**Lovvite** (lovvite.com) — a platform where anyone can create a **beautiful, shareable web invitation or greeting** — for weddings, birthdays, anniversaries, graduations, and more. Users customize a template, get a secret link, and share it. Guests open the link — no login required. Creators log in to edit.

**Core loop:** Sign up → Pick template → Customize → Publish → Share link → Guests RSVP

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Frontend | React + Vite + TypeScript | Fast DX, great ecosystem |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Routing | React Router v6 | SPA routing |
| Frontend deploy | Cloudflare Pages | Free, global CDN |
| Backend API | Cloudflare Workers (Hono) | Free tier, edge, fast cold start |
| Database | Supabase (Postgres) | Free tier, 500MB, great SDK |
| Auth | Supabase Auth (magic link) | No password UX, creator-only |
| File storage | Supabase Storage | Free 1GB, photos + assets |
| Cache / rate limit | Cloudflare KV | Optional, for perf later |
| Token generation | `nanoid` | Short, URL-safe unique IDs |
| Monorepo | pnpm workspaces | `apps/web`, `apps/api`, `packages/` |

---

## Project Structure

```
/
├── apps/
│   ├── web/                        # React frontend (Cloudflare Pages)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx         # Landing page
│   │   │   │   ├── Dashboard.tsx    # Creator dashboard (auth required)
│   │   │   │   ├── Editor.tsx       # Template customizer
│   │   │   │   └── Viewer.tsx       # Public invitation viewer (/i/:token)
│   │   │   ├── components/
│   │   │   │   ├── templates/       # One folder per template
│   │   │   │   │   ├── ElegantWedding/
│   │   │   │   │   │   ├── index.tsx
│   │   │   │   │   │   └── schema.ts  # Zod schema for this template's data
│   │   │   │   │   └── BirthdayBash/
│   │   │   │   │       ├── index.tsx
│   │   │   │   │       └── schema.ts
│   │   │   │   ├── editor/          # Editor sidebar, field controls
│   │   │   │   └── ui/              # Shared UI primitives (Button, Input…)
│   │   │   ├── lib/
│   │   │   │   ├── supabase.ts      # Supabase client
│   │   │   │   ├── api.ts           # Typed fetch wrapper for the Workers API
│   │   │   │   └── templates.ts     # Template registry
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useInvitation.ts
│   │   │   └── main.tsx
│   │   ├── public/
│   │   └── vite.config.ts
│   │
│   └── api/                        # Cloudflare Workers backend (Hono)
│       ├── src/
│       │   ├── index.ts             # Hono app entry, route mounting
│       │   ├── routes/
│       │   │   ├── invitations.ts   # CRUD for invitations
│       │   │   ├── rsvps.ts         # RSVP submission + read
│       │   │   └── upload.ts        # Signed URL generation for storage
│       │   ├── middleware/
│       │   │   └── auth.ts          # Validate Supabase JWT from header
│       │   └── lib/
│       │       └── supabase.ts      # Supabase service-role client
│       └── wrangler.toml
│
└── packages/
    └── types/                      # Shared TypeScript types
        └── src/
            ├── invitation.ts        # InvitationData, Template types
            └── rsvp.ts
```

---

## Database Schema (Supabase / Postgres)

Run these migrations in order in the Supabase SQL editor.

```sql
-- 1. Users (mirrors Supabase auth.users, extended profile)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz default now()
);

-- 2. Invitations
create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  token text unique not null,          -- nanoid(10), used in /i/:token URL
  slug text unique,                    -- optional custom slug (premium later)
  template_id text not null,           -- e.g. "elegant-wedding"
  data jsonb not null default '{}',    -- all template customization here
  is_published boolean default false,
  view_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. RSVPs
create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.invitations(id) on delete cascade,
  name text not null,
  email text,
  status text not null check (status in ('attending', 'declined', 'maybe')),
  message text,
  created_at timestamptz default now()
);

-- 4. Row Level Security
alter table public.profiles enable row level security;
alter table public.invitations enable row level security;
alter table public.rsvps enable row level security;

-- Profiles: only owner can read/write their own
create policy "owner" on public.profiles for all using (auth.uid() = id);

-- Invitations: owner has full access; anyone can read published ones
create policy "owner_all" on public.invitations for all using (auth.uid() = user_id);
create policy "public_read" on public.invitations for select using (is_published = true);

-- RSVPs: anyone can insert on published invitations; owner can read all
create policy "public_insert" on public.rsvps for insert
  with check (exists (
    select 1 from public.invitations
    where id = invitation_id and is_published = true
  ));
create policy "owner_read" on public.rsvps for select
  using (exists (
    select 1 from public.invitations
    where id = rsvps.invitation_id and user_id = auth.uid()
  ));

-- 5. Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger invitations_updated_at before update on public.invitations
  for each row execute function public.handle_updated_at();
```

---

## API Routes (Cloudflare Workers + Hono)

Base URL: `https://api.lovvite.com`

All creator routes require `Authorization: Bearer <supabase_jwt>` header.

```
# Public (no auth)
GET    /invitations/:token          → fetch published invitation by token
POST   /invitations/:token/rsvp    → submit an RSVP

# Creator (auth required)
GET    /me/invitations              → list my invitations
POST   /me/invitations              → create new invitation
GET    /me/invitations/:id          → get single invitation (unpublished ok)
PATCH  /me/invitations/:id          → update invitation data / publish
DELETE /me/invitations/:id          → delete invitation
POST   /me/upload-url               → get signed Supabase Storage URL
```

---

## URL Routing (Frontend)

```
/                          → Landing page (public)
/login                     → Magic link login (creator)
/dashboard                 → My invitations list (auth required)
/editor/new                → Pick a template (auth required)
/editor/:id                → Customize an invitation (auth required)
/i/:token                  → Public invitation viewer (no auth)
/i/:token/rsvp             → RSVP confirmation page (no auth)
```

### Token generation (in Workers)
```ts
import { nanoid } from 'nanoid'
const token = nanoid(10)  // e.g. "xK9mPqR2ab"
```

---

## Template System

Each template is a self-contained React component. The system is code-first — templates live in the repo, not the database.

### Template interface (packages/types)
```ts
export interface TemplateProps<T = Record<string, unknown>> {
  data: T           // all customization fields
  isPreview?: boolean  // true in editor sidebar preview
}

export interface TemplateDefinition {
  id: string                  // "elegant-wedding"
  name: string                // "Elegant Wedding"
  category: 'wedding' | 'birthday' | 'anniversary' | 'graduation' | 'other'
  thumbnail: string           // path to static preview image
  component: React.ComponentType<TemplateProps>
  defaultData: Record<string, unknown>   // shown in editor on first load
  schema: ZodSchema           // validates data before save
}
```

### Template registry (lib/templates.ts)
```ts
import { ElegantWedding } from '../components/templates/ElegantWedding'
import { BirthdayBash }   from '../components/templates/BirthdayBash'

export const TEMPLATES: TemplateDefinition[] = [
  ElegantWedding,
  BirthdayBash,
]

export function getTemplate(id: string) {
  return TEMPLATES.find(t => t.id === id)
}
```

### Adding a new template checklist
- [ ] Create `apps/web/src/components/templates/MyTemplate/`
- [ ] Export `index.tsx` (the React component) and `schema.ts` (Zod)
- [ ] Define `defaultData` — what the editor shows on a blank slate
- [ ] Register in `lib/templates.ts`
- [ ] Add a `thumbnail.jpg` to `public/thumbnails/`
- That's it. No DB migration needed.

---

## Auth Flow

1. Creator visits `/login`, enters email
2. Supabase sends magic link email
3. Creator clicks link → redirected to `/dashboard`
4. Frontend stores Supabase session (handled by `@supabase/auth-helpers-react`)
5. All API calls include `Authorization: Bearer <access_token>` header
6. Workers middleware validates JWT against Supabase JWKS

Guests **never** log in. They just open `/i/:token`.

---

## Editor Architecture

The editor has two panes:
- **Left sidebar** — form fields generated from the template's Zod schema
- **Right preview** — live-rendered template component with current `data`

State lives in React with `useState`. Auto-save to the API on every change with a 1-second debounce. Show a "Saved" / "Saving…" indicator.

```
Editor page
├── useInvitation(id)          ← fetches from API, exposes save()
├── <EditorSidebar>
│   └── <FieldRenderer schema={template.schema} data={data} onChange={…} />
└── <PreviewPane>
    └── <template.component data={data} isPreview />
```

---

## Environment Variables

### apps/web (.env)
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_URL=https://api.lovvite.com
```

### apps/api (wrangler.toml secrets)
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=    # never expose this on frontend
```

---

## Coding Conventions

- **TypeScript strict mode** everywhere. No `any`.
- **Zod** for all runtime validation (API input, template data).
- **Error handling**: API routes return `{ error: string }` on failure with correct HTTP status. Frontend shows toast notifications.
- **No premature abstraction**: write the obvious code first. Refactor when you see the same pattern 3 times.
- **Component files**: one component per file, named exports. `index.ts` re-exports only.
- **Tailwind only**: no CSS files, no CSS modules, no styled-components.
- **Fetch wrapper**: always use `lib/api.ts`, never raw `fetch()` in components.

---

## Milestones (build in this order)

### Milestone 1 — Working skeleton
- [ ] Monorepo setup (pnpm workspaces)
- [ ] Supabase project + run migrations
- [ ] Cloudflare Pages + Workers deployment pipelines
- [ ] Magic link auth working end-to-end
- [ ] `/dashboard` shows empty state

### Milestone 2 — First template live
- [ ] Build `ElegantWedding` template component
- [ ] Editor page with live preview
- [ ] Save invitation to DB (auto-save)
- [ ] Publish → generates token → `/i/:token` renders it publicly

### Milestone 3 — RSVP + sharing
- [ ] RSVP form on viewer page
- [ ] Dashboard shows RSVP list per invitation
- [ ] Share button copies link to clipboard
- [ ] View count increment on each visit

### Milestone 4 — More templates + polish
- [ ] `BirthdayBash` template
- [ ] Template picker gallery on `/editor/new`
- [ ] Photo upload (Supabase Storage signed URLs)
- [ ] Mobile-responsive viewer (invitations are opened on phones!)
- [ ] OG image meta tags so link previews look good on WhatsApp/iMessage

### Milestone 5 — Monetization hooks (later)
- [ ] Custom slug (`/i/sarah-and-john`) as paid feature
- [ ] Password-protected invitations
- [ ] Remove "Made with [platform]" branding
- [ ] Stripe integration

---

## Things to Keep in Mind

- **Mobile first on the viewer.** The editor can be desktop-only for now, but `/i/:token` will be opened on phones. Design templates for 375px width first.
- **Supabase free tier pauses** after 7 days of inactivity. Use a cron job or UptimeRobot to ping it during development. Upgrade to $25/mo when real users arrive.
- **Template `data` is a jsonb blob.** Validate it with Zod on every write in the API. Never trust the client.
- **Images should be proxied.** Don't put Supabase storage URLs directly in the page — route them through the Worker so you can add auth, resize, or swap providers later without changing URLs.
- **Keep templates dumb.** They receive `data` as props and render. No API calls inside templates. No side effects. Pure render.
- **i18n later.** Don't over-engineer internationalization now. Use plain strings. Add i18n when you have non-English users.
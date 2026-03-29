import { Hono } from "hono";
import { z } from "zod";
import { createSupabaseAdmin, Env } from "../lib/supabase.js";
import { authMiddleware } from "../middleware/auth.js";

type AuthEnv = { Bindings: Env; Variables: { userId: string } };

// Public: submit RSVP
export const publicRsvps = new Hono<{ Bindings: Env }>();

const rsvpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  status: z.enum(["attending", "declined", "maybe"]),
  message: z.string().optional(),
});

publicRsvps.post("/:token/rsvp", async (c) => {
  const token = c.req.param("token");
  const body = await c.req.json();
  const parsed = rsvpSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const supabase = createSupabaseAdmin(c.env);

  // Find the published invitation
  const { data: invitation } = await supabase
    .from("invitations")
    .select("id")
    .eq("token", token)
    .eq("is_published", true)
    .single();

  if (!invitation) {
    return c.json({ error: "Invitation not found" }, 404);
  }

  const { data, error } = await supabase
    .from("rsvps")
    .insert({
      invitation_id: invitation.id,
      ...parsed.data,
    })
    .select()
    .single();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json(data, 201);
});

// Creator: read RSVPs for an invitation
export const creatorRsvps = new Hono<AuthEnv>();

creatorRsvps.use("/*", authMiddleware);

creatorRsvps.get("/:id/rsvps", async (c) => {
  const userId = c.get("userId");
  const invitationId = c.req.param("id");
  const supabase = createSupabaseAdmin(c.env);

  // Verify ownership
  const { data: invitation } = await supabase
    .from("invitations")
    .select("id")
    .eq("id", invitationId)
    .eq("user_id", userId)
    .single();

  if (!invitation) {
    return c.json({ error: "Invitation not found" }, 404);
  }

  const { data, error } = await supabase
    .from("rsvps")
    .select("*")
    .eq("invitation_id", invitationId)
    .order("created_at", { ascending: false });

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json(data);
});

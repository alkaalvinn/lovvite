import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { TEMPLATES, type TemplateDefinitionFull } from "../lib/templates";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "wedding", label: "Wedding" },
  { id: "birthday", label: "Birthday" },
  { id: "anniversary", label: "Anniversary" },
  { id: "graduation", label: "Graduation" },
  { id: "other", label: "Other" },
] as const;

export function Home() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateDefinitionFull | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (previewTemplate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [previewTemplate]);

  const filteredTemplates =
    activeCategory === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory);

  const ctaLink = user ? "/editor/new" : "/login";

  return (
    <div className="min-h-screen bg-white">
      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
          <Link to="/" className="text-2xl font-bold text-rose-600">
            Lovvite
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#templates" className="hover:text-gray-900 transition-colors">
              Templates
            </a>
            <a href="#how-it-works" className="hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-gray-900 transition-colors">
              Features
            </a>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="sm">Get Started Free</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-rose-50 via-white to-amber-50" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-6">
              Free &middot; No credit card required
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Create stunning
              <br />
              <span className="bg-linear-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                invitations
              </span>{" "}
              in minutes
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Beautiful web invitations for weddings, birthdays, graduations, and
              more. Customize, share a link, collect RSVPs — all for free.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={ctaLink}>
                <Button size="lg" className="text-base px-8 py-3.5">
                  Create Your Invitation
                </Button>
              </Link>
              <a href="#templates">
                <Button variant="secondary" size="lg" className="text-base px-8 py-3.5">
                  Browse Templates
                </Button>
              </a>
            </div>
          </div>

          {/* Mini template previews floating */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {TEMPLATES.slice(0, 3).map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setPreviewTemplate(template)}
                className="rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 bg-white text-left cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 md:h-56 overflow-hidden">
                  <template.component data={template.defaultData} isPreview />
                </div>
                <div className="px-4 py-3 bg-white border-t border-gray-50">
                  <p className="text-sm font-medium text-gray-800">
                    {template.name}
                  </p>
                  <p className="text-xs text-gray-400 capitalize">
                    {template.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
          <div>
            <p className="text-3xl font-bold text-gray-900">6</p>
            <p className="text-sm text-gray-500 mt-1">Beautiful Templates</p>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden md:block" />
          <div>
            <p className="text-3xl font-bold text-gray-900">100%</p>
            <p className="text-sm text-gray-500 mt-1">Free to Use</p>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden md:block" />
          <div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-1">Passwords to Remember</p>
          </div>
          <div className="w-px h-10 bg-gray-200 hidden md:block" />
          <div>
            <p className="text-3xl font-bold text-gray-900">&lt;2 min</p>
            <p className="text-sm text-gray-500 mt-1">To Create &amp; Share</p>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-rose-600 tracking-wide uppercase">
              Simple &amp; Fast
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
              How Lovvite works
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Three simple steps from idea to a beautiful invitation your guests
              will love.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="relative text-center md:text-left">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 text-2xl font-bold mb-5">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Pick a template
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Choose from beautiful, hand-crafted designs for weddings,
                birthdays, graduations, anniversaries, and more.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center md:text-left">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 text-2xl font-bold mb-5">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Customize it your way
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Add your names, date, venue, message, and colors. See your
                changes live as you type — no design skills needed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center md:text-left">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 text-green-600 text-2xl font-bold mb-5">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Share &amp; collect RSVPs
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Hit publish, copy your unique link, and share it anywhere —
                WhatsApp, iMessage, email. Guests RSVP right from the page.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <Link to={ctaLink}>
              <Button size="lg" className="text-base px-8">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TEMPLATE GALLERY ─── */}
      <section
        id="templates"
        className="py-20 md:py-28 bg-linear-to-b from-gray-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-rose-600 tracking-wide uppercase">
              Template Gallery
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
              Designs for every occasion
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Each template is fully customizable. Pick one that fits your
              event, then make it yours.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-rose-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Template grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Live mini preview — clickable */}
                <button
                  type="button"
                  onClick={() => setPreviewTemplate(template)}
                  className="w-full h-64 overflow-hidden relative cursor-pointer"
                >
                  <div className="absolute inset-0 scale-[0.5] origin-top-left w-[200%] h-[200%]">
                    <template.component
                      data={template.defaultData}
                      isPreview
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
                      Preview Full Template
                    </span>
                  </div>
                </button>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-400 capitalize mt-0.5">
                      {template.category}
                    </p>
                  </div>
                  <Link to={ctaLink}>
                    <Button size="sm">Use Template</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              No templates in this category yet. More coming soon!
            </p>
          )}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-rose-600 tracking-wide uppercase">
              Everything You Need
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900">
              Why choose Lovvite
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="&#127912;"
              title="Beautiful Templates"
              description="Curated designs for weddings, birthdays, anniversaries, graduations, and more. Each one carefully crafted and fully customizable."
            />
            <FeatureCard
              icon="&#9889;"
              title="Live Editor"
              description="See your changes in real-time as you type. No refreshing, no waiting. What you see is what your guests get."
            />
            <FeatureCard
              icon="&#128279;"
              title="One Link to Share"
              description="Get a unique shareable link that works everywhere — WhatsApp, iMessage, email, Instagram, or any social media."
            />
            <FeatureCard
              icon="&#9989;"
              title="Built-in RSVPs"
              description="Guests respond directly from the invitation. Track who's attending, who's maybe, and who can't make it — all from your dashboard."
            />
            <FeatureCard
              icon="&#128241;"
              title="Mobile-First"
              description="Your guests will open invitations on their phones. Every template is designed to look stunning on any screen size."
            />
            <FeatureCard
              icon="&#128274;"
              title="No Login for Guests"
              description="Guests just open the link — no account, no app, no friction. It just works. Only creators need to sign in."
            />
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section className="py-20 md:py-28 bg-linear-to-b from-white to-rose-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Perfect for any occasion
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Whether it's a big celebration or a small gathering, Lovvite has
              you covered.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <UseCaseCard emoji="&#128141;" label="Weddings" />
            <UseCaseCard emoji="&#127874;" label="Birthdays" />
            <UseCaseCard emoji="&#128149;" label="Anniversaries" />
            <UseCaseCard emoji="&#127891;" label="Graduations" />
            <UseCaseCard emoji="&#127803;" label="Garden Parties" />
            <UseCaseCard emoji="&#128118;" label="Baby Showers" />
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Ready to create your invitation?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            It&apos;s free, takes under 2 minutes, and your guests will love it.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ctaLink}>
              <Button size="lg" className="text-base px-10 py-3.5">
                Get Started Free
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            No credit card &middot; No downloads &middot; Magic link sign-in
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-rose-600">Lovvite</span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">
              Beautiful invitations, shared instantly
            </span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Lovvite. Made with love.
          </p>
        </div>
      </footer>

      {/* ─── FULLSCREEN TEMPLATE PREVIEW MODAL ─── */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-100 flex flex-col bg-black/60 backdrop-blur-sm"
          onClick={() => setPreviewTemplate(null)}
        >
          {/* Top bar */}
          <div
            className="shrink-0 flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-900">
                {previewTemplate.name}
              </span>
              <span className="text-xs text-gray-400 capitalize px-2 py-0.5 bg-gray-100 rounded-full">
                {previewTemplate.category}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to={ctaLink}
                onClick={() => setPreviewTemplate(null)}
              >
                <Button size="sm">Use This Template</Button>
              </Link>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900 text-xl"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Full template render */}
          <div
            className="flex-1 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <previewTemplate.component data={previewTemplate.defaultData} />
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
      <div
        className="text-3xl mb-4"
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
      <p className="text-gray-500 mt-2 leading-relaxed">{description}</p>
    </div>
  );
}

function UseCaseCard({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-gray-100 hover:border-rose-200 hover:shadow-sm transition-all">
      <span
        className="text-4xl"
        dangerouslySetInnerHTML={{ __html: emoji }}
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
}

import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import type { Invitation } from "@lovvite/types";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { getTemplate } from "../lib/templates";

const API_URL = import.meta.env.VITE_API_URL as string;

export function Viewer() {
  const { token } = useParams<{ token: string }>();
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // RSVP form
  const [showRsvp, setShowRsvp] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState<"attending" | "declined" | "maybe">("attending");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSent, setRsvpSent] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/invitations/${token}`)
      .then((r) => {
        if (!r.ok) throw new Error("Invitation not found");
        return r.json();
      })
      .then((data) => setInvitation(data as Invitation))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleRsvp = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setRsvpLoading(true);

    try {
      const res = await fetch(`${API_URL}/invitations/${token}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: rsvpName,
          email: rsvpEmail || undefined,
          status: rsvpStatus,
          message: rsvpMessage || undefined,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit RSVP");
      setRsvpSent(true);
    } catch {
      setError("Failed to submit RSVP. Please try again.");
    } finally {
      setRsvpLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading invitation...</p>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-900 text-xl font-semibold">
            Invitation not found
          </p>
          <p className="text-gray-500 mt-2">
            This link may be invalid or the invitation has been removed.
          </p>
        </div>
      </div>
    );
  }

  const template = getTemplate(invitation.template_id);

  // Set OG-style meta tags dynamically for link previews
  useEffect(() => {
    if (!invitation || !template) return;
    const data = invitation.data as Record<string, string>;

    // Build a title from template data
    let title = template.name;
    if (invitation.template_id === "elegant-wedding") {
      title = `${data.brideFirstName || ""} & ${data.groomFirstName || ""}'s Wedding`;
    } else if (invitation.template_id === "birthday-bash") {
      title = `${data.name || ""}'s Birthday Party`;
    } else if (invitation.template_id === "anniversary-gold") {
      title = `${data.partnerOneName || ""} & ${data.partnerTwoName || ""}'s Anniversary`;
    } else if (invitation.template_id === "graduation-cap") {
      title = `${data.graduateName || ""}'s Graduation`;
    } else if (invitation.template_id === "garden-party") {
      title = data.eventTitle || "Garden Party";
    } else if (invitation.template_id === "baby-shower") {
      title = `${data.parentNames || ""}'s Baby Shower`;
    }

    document.title = `${title} — Lovvite`;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const description =
      (data.message as string) || `You're invited! Open to view and RSVP.`;

    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:type", "website");
    setMeta("og:url", window.location.href);
    setMeta("og:site_name", "Lovvite");
  }, [invitation, template]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Unknown template</p>
      </div>
    );
  }

  const TemplateComponent = template.component;

  return (
    <div>
      {/* Rendered invitation */}
      <TemplateComponent data={invitation.data} />

      {/* RSVP section */}
      <div className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-md mx-auto text-center">
          {rsvpSent ? (
            <div className="space-y-3">
              <p className="text-xl font-semibold text-gray-900">
                Thank you!
              </p>
              <p className="text-gray-600">Your RSVP has been recorded.</p>
            </div>
          ) : !showRsvp ? (
            <Button onClick={() => setShowRsvp(true)} size="lg">
              RSVP Now
            </Button>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-4 text-left">
              <h2 className="text-xl font-semibold text-gray-900 text-center">
                RSVP
              </h2>

              <Input
                label="Your Name"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                required
              />

              <Input
                label="Email (optional)"
                type="email"
                value={rsvpEmail}
                onChange={(e) => setRsvpEmail(e.target.value)}
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Will you attend?
                </label>
                <div className="flex gap-2">
                  {(
                    [
                      ["attending", "Yes"],
                      ["maybe", "Maybe"],
                      ["declined", "No"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRsvpStatus(value)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        rsvpStatus === value
                          ? "border-rose-500 bg-rose-50 text-rose-700"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                label="Message (optional)"
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                placeholder="Write a message for the couple..."
              />

              <Button type="submit" className="w-full" disabled={rsvpLoading}>
                {rsvpLoading ? "Sending..." : "Send RSVP"}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-400">
        Made with Lovvite
      </footer>
    </div>
  );
}

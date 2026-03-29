import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Invitation, Rsvp } from "@lovvite/types";
import { Button } from "../components/ui/Button";
import { useRequireAuth } from "../hooks/useAuth";
import { api } from "../lib/api";
import { getTemplate } from "../lib/templates";

export function Dashboard() {
  const { user, signOut } = useRequireAuth();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRsvp, setExpandedRsvp] = useState<string | null>(null);
  const [rsvps, setRsvps] = useState<Record<string, Rsvp[]>>({});
  const [rsvpLoading, setRsvpLoading] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Invitation[]>("/me/invitations")
      .then(setInvitations)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    await api.delete(`/me/invitations/${id}`);
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
  };

  const copyLink = (token: string, id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/i/${token}`);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleRsvps = async (invitationId: string) => {
    if (expandedRsvp === invitationId) {
      setExpandedRsvp(null);
      return;
    }

    setExpandedRsvp(invitationId);

    if (!rsvps[invitationId]) {
      setRsvpLoading(invitationId);
      try {
        const data = await api.get<Rsvp[]>(
          `/me/invitations/${invitationId}/rsvps`
        );
        setRsvps((prev) => ({ ...prev, [invitationId]: data }));
      } catch {
        setRsvps((prev) => ({ ...prev, [invitationId]: [] }));
      } finally {
        setRsvpLoading(null);
      }
    }
  };

  const statusColor = {
    attending: "bg-green-100 text-green-700",
    maybe: "bg-amber-100 text-amber-700",
    declined: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-rose-600">
            Lovvite
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Invitations</h1>
          <Link to="/editor/new">
            <Button>New Invitation</Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : invitations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg">No invitations yet.</p>
            <p className="text-gray-400 mt-2">
              Create your first invitation to get started!
            </p>
            <Link to="/editor/new" className="mt-4 inline-block">
              <Button>Create Invitation</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {invitations.map((inv) => {
              const template = getTemplate(inv.template_id);
              const invRsvps = rsvps[inv.id] ?? [];
              const isExpanded = expandedRsvp === inv.id;
              const attending = invRsvps.filter(
                (r) => r.status === "attending"
              ).length;
              const maybe = invRsvps.filter(
                (r) => r.status === "maybe"
              ).length;
              const declined = invRsvps.filter(
                (r) => r.status === "declined"
              ).length;

              return (
                <div
                  key={inv.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  {/* Card header */}
                  <div className="p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {/* Mini template preview */}
                        {template && (
                          <div className="hidden sm:block w-20 h-14 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                            <div className="w-[200%] h-[200%] scale-50 origin-top-left">
                              <template.component
                                data={inv.data}
                                isPreview
                              />
                            </div>
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {template?.name ?? inv.template_id}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            Created{" "}
                            {new Date(inv.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {inv.is_published && (
                          <span className="text-xs text-gray-500">
                            {inv.view_count} view
                            {inv.view_count !== 1 ? "s" : ""}
                          </span>
                        )}
                        <span
                          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            inv.is_published
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {inv.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4">
                      <Link to={`/editor/${inv.id}`}>
                        <Button variant="secondary" size="sm">
                          Edit
                        </Button>
                      </Link>
                      {inv.is_published && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => copyLink(inv.token, inv.id)}
                          >
                            {copied === inv.id ? "Copied!" : "Copy Link"}
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => toggleRsvps(inv.id)}
                          >
                            {isExpanded ? "Hide RSVPs" : "View RSVPs"}
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(inv.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  {/* RSVP panel */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50 p-5">
                      {rsvpLoading === inv.id ? (
                        <p className="text-sm text-gray-500">
                          Loading RSVPs...
                        </p>
                      ) : invRsvps.length === 0 ? (
                        <p className="text-sm text-gray-400">
                          No RSVPs yet. Share your link to start collecting
                          responses!
                        </p>
                      ) : (
                        <>
                          {/* Summary bar */}
                          <div className="flex gap-4 mb-4 text-sm">
                            <span className="text-green-700 font-medium">
                              {attending} attending
                            </span>
                            <span className="text-amber-700 font-medium">
                              {maybe} maybe
                            </span>
                            <span className="text-red-700 font-medium">
                              {declined} declined
                            </span>
                            <span className="text-gray-500">
                              {invRsvps.length} total
                            </span>
                          </div>

                          {/* RSVP list */}
                          <div className="space-y-2">
                            {invRsvps.map((rsvp) => (
                              <div
                                key={rsvp.id}
                                className="flex items-start justify-between bg-white rounded-lg border border-gray-100 p-3"
                              >
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">
                                    {rsvp.name}
                                  </p>
                                  {rsvp.email && (
                                    <p className="text-xs text-gray-400">
                                      {rsvp.email}
                                    </p>
                                  )}
                                  {rsvp.message && (
                                    <p className="text-sm text-gray-500 mt-1 italic">
                                      &ldquo;{rsvp.message}&rdquo;
                                    </p>
                                  )}
                                </div>
                                <span
                                  className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${statusColor[rsvp.status]}`}
                                >
                                  {rsvp.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

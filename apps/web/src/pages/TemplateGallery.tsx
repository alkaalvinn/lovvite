import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useRequireAuth } from "../hooks/useAuth";
import { api } from "../lib/api";
import { TEMPLATES } from "../lib/templates";
import type { Invitation } from "@lovvite/types";

export function TemplateGallery() {
  useRequireAuth();
  const navigate = useNavigate();
  const [creating, setCreating] = useState<string | null>(null);

  const handleSelect = async (templateId: string) => {
    setCreating(templateId);
    try {
      const template = TEMPLATES.find((t) => t.id === templateId);
      const invitation = await api.post<Invitation>("/me/invitations", {
        template_id: templateId,
        data: template?.defaultData ?? {},
      });
      navigate(`/editor/${invitation.id}`);
    } catch {
      setCreating(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="text-xl font-bold text-rose-600">
            Lovvite
          </Link>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pick a Template
        </h1>
        <p className="text-gray-600 mb-8">
          Choose a design to start customizing your invitation.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-lg font-serif text-gray-700">
                    {template.name}
                  </p>
                  <p className="text-sm text-gray-400 mt-1 capitalize">
                    {template.category}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <Button
                  className="w-full"
                  disabled={creating !== null}
                  onClick={() => handleSelect(template.id)}
                >
                  {creating === template.id ? "Creating..." : "Use Template"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

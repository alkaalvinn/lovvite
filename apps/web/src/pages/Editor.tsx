import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { EditorSidebar } from "../components/editor/EditorSidebar";
import { useRequireAuth } from "../hooks/useAuth";
import { useInvitation } from "../hooks/useInvitation";
import { getTemplate } from "../lib/templates";

export function Editor() {
  useRequireAuth();
  const { id } = useParams<{ id: string }>();
  const { invitation, loading, error, saving, save, saveImmediate } =
    useInvitation(id);

  const template = invitation ? getTemplate(invitation.template_id) : null;

  const handleFieldChange = useCallback(
    (key: string, value: unknown) => {
      if (!invitation) return;
      const newData = { ...invitation.data, [key]: value };
      save({ data: newData });
    },
    [invitation, save]
  );

  const handlePublish = async () => {
    await saveImmediate({ is_published: true });
  };

  const handleUnpublish = async () => {
    await saveImmediate({ is_published: false });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !invitation || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error ?? "Invitation not found"}</p>
          <Link to="/dashboard" className="text-rose-600 underline mt-2 block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const TemplateComponent = template.component;

  return (
    <div className="h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            &larr; Dashboard
          </Link>
          <span className="text-sm font-medium text-gray-900">
            {template.name}
          </span>
          <span className="text-xs text-gray-400">
            {saving ? "Saving..." : "Saved"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {invitation.is_published ? (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.origin}/i/${invitation.token}`
                  )
                }
              >
                Copy Link
              </Button>
              <Button variant="ghost" size="sm" onClick={handleUnpublish}>
                Unpublish
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={handlePublish}>
              Publish
            </Button>
          )}
        </div>
      </div>

      {/* Editor layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto shrink-0">
          <EditorSidebar
            data={invitation.data}
            onChange={handleFieldChange}
            templateId={invitation.template_id}
          />
        </div>

        {/* Preview */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <TemplateComponent data={invitation.data} isPreview />
        </div>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import type { Invitation } from "@lovvite/types";
import { api } from "../lib/api";

export function useInvitation(id: string | undefined) {
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get<Invitation>(`/me/invitations/${id}`)
      .then(setInvitation)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const save = useCallback(
    (updates: { data?: Record<string, unknown>; is_published?: boolean }) => {
      if (!id) return;

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        setSaving(true);
        try {
          const updated = await api.patch<Invitation>(
            `/me/invitations/${id}`,
            updates
          );
          setInvitation(updated);
        } catch (e) {
          setError((e as Error).message);
        } finally {
          setSaving(false);
        }
      }, 1000);
    },
    [id]
  );

  const saveImmediate = useCallback(
    async (updates: { data?: Record<string, unknown>; is_published?: boolean }) => {
      if (!id) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      setSaving(true);
      try {
        const updated = await api.patch<Invitation>(
          `/me/invitations/${id}`,
          updates
        );
        setInvitation(updated);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setSaving(false);
      }
    },
    [id]
  );

  return { invitation, loading, error, saving, save, saveImmediate };
}

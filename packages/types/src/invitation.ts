export interface Invitation {
  id: string;
  user_id: string;
  token: string;
  slug: string | null;
  template_id: string;
  data: Record<string, unknown>;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateInvitationInput {
  template_id: string;
  data?: Record<string, unknown>;
}

export interface UpdateInvitationInput {
  data?: Record<string, unknown>;
  is_published?: boolean;
  slug?: string | null;
}

export type TemplateCategory =
  | "wedding"
  | "birthday"
  | "anniversary"
  | "graduation"
  | "other";

export interface TemplateDefinition {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnail: string;
  defaultData: Record<string, unknown>;
}

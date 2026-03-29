import { Hono } from "hono";
import { z } from "zod";
import { nanoid } from "nanoid";
import { createSupabaseAdmin, Env } from "../lib/supabase.js";
import { authMiddleware } from "../middleware/auth.js";

type AuthEnv = { Bindings: Env; Variables: { userId: string } };

// Public routes (no auth)
export const publicInvitations = new Hono<{ Bindings: Env }>();

publicInvitations.get("/:token", async (c) => {
  const token = c.req.param("token");
  const supabase = createSupabaseAdmin(c.env);

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("token", token)
    .eq("is_published", true)
    .single();

  if (error || !data) {
    return c.json({ error: "Invitation not found" }, 404);
  }

  // Increment view count (fire and forget)
  supabase
    .from("invitations")
    .update({ view_count: data.view_count + 1 })
    .eq("id", data.id)
    .then();

  return c.json(data);
});

// Creator routes (auth required)
export const creatorInvitations = new Hono<AuthEnv>();

creatorInvitations.use("/*", authMiddleware);

// List my invitations
creatorInvitations.get("/", async (c) => {
  const userId = c.get("userId");
  const supabase = createSupabaseAdmin(c.env);

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json(data);
});

const createSchema = z.object({
  template_id: z.string().min(1),
  data: z.record(z.unknown()).optional().default({}),
});

// Create new invitation
creatorInvitations.post("/", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const supabase = createSupabaseAdmin(c.env);
  const token = nanoid(10);

  const { data, error } = await supabase
    .from("invitations")
    .insert({
      user_id: userId,
      token,
      template_id: parsed.data.template_id,
      data: parsed.data.data,
    })
    .select()
    .single();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json(data, 201);
});

// Get single invitation
creatorInvitations.get("/:id", async (c) => {
  const userId = c.get("userId");
  const id = c.req.param("id");
  const supabase = createSupabaseAdmin(c.env);

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return c.json({ error: "Invitation not found" }, 404);
  }

  return c.json(data);
});

const updateSchema = z.object({
  data: z.record(z.unknown()).optional(),
  is_published: z.boolean().optional(),
  slug: z.string().nullable().optional(),
});

// Update invitation
creatorInvitations.patch("/:id", async (c) => {
  const userId = c.get("userId");
  const id = c.req.param("id");
  const body = await c.req.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const supabase = createSupabaseAdmin(c.env);

  const { data, error } = await supabase
    .from("invitations")
    .update(parsed.data)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  if (!data) {
    return c.json({ error: "Invitation not found" }, 404);
  }

  return c.json(data);
});

// Delete invitation
creatorInvitations.delete("/:id", async (c) => {
  const userId = c.get("userId");
  const id = c.req.param("id");
  const supabase = createSupabaseAdmin(c.env);

  const { error } = await supabase
    .from("invitations")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({ success: true });
});

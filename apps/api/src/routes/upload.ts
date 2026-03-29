import { Hono } from "hono";
import { z } from "zod";
import { createSupabaseAdmin, Env } from "../lib/supabase.js";
import { authMiddleware } from "../middleware/auth.js";

type AuthEnv = { Bindings: Env; Variables: { userId: string } };

export const uploadRoutes = new Hono<AuthEnv>();

uploadRoutes.use("/*", authMiddleware);

const uploadSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
});

uploadRoutes.post("/upload-url", async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const parsed = uploadSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten().fieldErrors }, 400);
  }

  const supabase = createSupabaseAdmin(c.env);
  const path = `${userId}/${Date.now()}-${parsed.data.filename}`;

  const { data, error } = await supabase.storage
    .from("uploads")
    .createSignedUploadUrl(path);

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({
    signedUrl: data.signedUrl,
    path,
    token: data.token,
  });
});

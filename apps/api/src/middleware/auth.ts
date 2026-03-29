import { Context, Next } from "hono";
import { createSupabaseClient, Env } from "../lib/supabase.js";

type AuthEnv = { Bindings: Env; Variables: { userId: string } };

export async function authMiddleware(c: Context<AuthEnv>, next: Next) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return c.json({ error: "Missing or invalid Authorization header" }, 401);
  }

  const token = authHeader.slice(7);
  const supabase = createSupabaseClient(c.env, token);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }

  c.set("userId", data.user.id);
  await next();
}

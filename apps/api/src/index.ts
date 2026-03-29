import { Hono } from "hono";
import { cors } from "hono/cors";
import { Env } from "./lib/supabase.js";
import { publicInvitations, creatorInvitations } from "./routes/invitations.js";
import { publicRsvps, creatorRsvps } from "./routes/rsvps.js";
import { uploadRoutes } from "./routes/upload.js";

type AppEnv = { Bindings: Env; Variables: { userId: string } };

const app = new Hono<AppEnv>();

// CORS for frontend
app.use(
  "/*",
  cors({
    origin: ["http://localhost:5173", "https://lovvite.com", "https://www.lovvite.com"],
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Health check
app.get("/", (c) => c.json({ status: "ok", service: "lovvite-api" }));

// Public routes
app.route("/invitations", publicInvitations);
app.route("/invitations", publicRsvps);

// Creator routes
app.route("/me/invitations", creatorInvitations);
app.route("/me/invitations", creatorRsvps);
app.route("/me", uploadRoutes);

export default app;

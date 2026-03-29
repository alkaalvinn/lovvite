import { z } from "zod";

export const anniversaryGoldSchema = z.object({
  partnerOneName: z.string().min(1),
  partnerTwoName: z.string().min(1),
  years: z.string().optional().default(""),
  date: z.string().min(1),
  time: z.string().optional().default(""),
  venue: z.string().optional().default(""),
  venueAddress: z.string().optional().default(""),
  message: z.string().optional().default(""),
  loveStory: z.string().optional().default(""),
  milestone1: z.string().optional().default(""),
  milestone2: z.string().optional().default(""),
  milestone3: z.string().optional().default(""),
  accentColor: z.string().optional().default("#a16207"),
});

export type AnniversaryGoldData = z.infer<typeof anniversaryGoldSchema>;

export const defaultData: AnniversaryGoldData = {
  partnerOneName: "James",
  partnerTwoName: "Elizabeth",
  years: "25",
  date: "2026-09-10",
  time: "6:00 PM",
  venue: "The Vineyard Estate",
  venueAddress: "789 Golden Lane, Napa Valley, CA",
  message: "Join us as we celebrate a quarter century of love, laughter, and happily ever after.",
  loveStory: "Twenty-five years ago, two hearts found each other and decided to become one. Through every season of life — the joys, the challenges, and everything in between — their love has only grown stronger.",
  milestone1: "2001 — Said 'I Do' at Sunset Chapel",
  milestone2: "2005 — Welcomed our first child",
  milestone3: "2015 — Renewed our vows in Paris",
  accentColor: "#a16207",
};

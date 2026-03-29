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
  accentColor: "#a16207",
};

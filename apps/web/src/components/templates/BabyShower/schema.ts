import { z } from "zod";

export const babyShowerSchema = z.object({
  parentNames: z.string().min(1),
  babyName: z.string().optional().default(""),
  date: z.string().min(1),
  time: z.string().optional().default(""),
  venue: z.string().optional().default(""),
  venueAddress: z.string().optional().default(""),
  message: z.string().optional().default(""),
  registryLink: z.string().optional().default(""),
  theme: z.string().optional().default(""),
  games: z.string().optional().default(""),
  specialNote: z.string().optional().default(""),
  primaryColor: z.string().optional().default("#7c3aed"),
  secondaryColor: z.string().optional().default("#fbbf24"),
});

export type BabyShowerData = z.infer<typeof babyShowerSchema>;

export const defaultData: BabyShowerData = {
  parentNames: "Jessica & David",
  babyName: "Baby Miller",
  date: "2026-10-15",
  time: "2:00 PM — 5:00 PM",
  venue: "Sunshine Café",
  venueAddress: "321 Maple Avenue, Portland, OR",
  message: "A little one is on the way! Join us for an afternoon of love, laughter, and baby games as we celebrate the upcoming arrival.",
  registryLink: "babylist.com/jessica-david",
  theme: "Twinkle Twinkle Little Star",
  games: "Baby Bingo, Guess the Baby Food, Diaper Raffle, Wishes for Baby",
  specialNote: "No need to wrap gifts — we'll have a gift table set up by the entrance. Thank you for your love and generosity!",
  primaryColor: "#7c3aed",
  secondaryColor: "#fbbf24",
};

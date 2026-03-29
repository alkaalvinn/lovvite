import { z } from "zod";

export const birthdayBashSchema = z.object({
  name: z.string().min(1),
  age: z.string().optional().default(""),
  date: z.string().min(1),
  time: z.string().optional().default(""),
  venue: z.string().optional().default(""),
  venueAddress: z.string().optional().default(""),
  message: z.string().optional().default(""),
  theme: z.string().optional().default(""),
  primaryColor: z.string().optional().default("#e11d48"),
  secondaryColor: z.string().optional().default("#fbbf24"),
});

export type BirthdayBashData = z.infer<typeof birthdayBashSchema>;

export const defaultData: BirthdayBashData = {
  name: "Emma",
  age: "25",
  date: "2026-08-20",
  time: "7:00 PM",
  venue: "Rooftop Lounge",
  venueAddress: "456 Party Street, Brooklyn, NY",
  message: "Come celebrate with us! There'll be music, food, and lots of fun.",
  theme: "Neon Glow Party",
  primaryColor: "#e11d48",
  secondaryColor: "#fbbf24",
};

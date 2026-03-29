import { z } from "zod";

export const elegantWeddingSchema = z.object({
  brideFirstName: z.string().min(1),
  brideLastName: z.string().optional().default(""),
  groomFirstName: z.string().min(1),
  groomLastName: z.string().optional().default(""),
  date: z.string().min(1),
  time: z.string().optional().default(""),
  venue: z.string().optional().default(""),
  venueAddress: z.string().optional().default(""),
  message: z.string().optional().default(""),
  dressCode: z.string().optional().default(""),
  accentColor: z.string().optional().default("#b45309"),
});

export type ElegantWeddingData = z.infer<typeof elegantWeddingSchema>;

export const defaultData: ElegantWeddingData = {
  brideFirstName: "Sarah",
  brideLastName: "Johnson",
  groomFirstName: "Michael",
  groomLastName: "Smith",
  date: "2026-06-15",
  time: "4:00 PM",
  venue: "The Grand Ballroom",
  venueAddress: "123 Celebration Ave, New York, NY",
  message: "Together with their families, request the honor of your presence at the celebration of their marriage.",
  dressCode: "Black Tie Optional",
  accentColor: "#b45309",
};

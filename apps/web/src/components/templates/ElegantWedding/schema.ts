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
  ourStory: z.string().optional().default(""),
  ceremonyTime: z.string().optional().default(""),
  receptionTime: z.string().optional().default(""),
  dinnerTime: z.string().optional().default(""),
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
  venueAddress: "123 Celebration Ave, New York, NY 10001",
  message: "Together with their families, request the honor of your presence at the celebration of their marriage.",
  ourStory: "We met at a coffee shop on a rainy Tuesday, and from that very first conversation, we knew something magical had begun. Three years later, here we are — ready to start our forever together.",
  ceremonyTime: "4:00 PM",
  receptionTime: "5:30 PM",
  dinnerTime: "7:00 PM",
  dressCode: "Black Tie Optional",
  accentColor: "#b45309",
};

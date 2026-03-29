import { z } from "zod";

export const gardenPartySchema = z.object({
  hostName: z.string().min(1),
  eventTitle: z.string().optional().default(""),
  date: z.string().min(1),
  time: z.string().optional().default(""),
  venue: z.string().optional().default(""),
  venueAddress: z.string().optional().default(""),
  message: z.string().optional().default(""),
  dresscode: z.string().optional().default(""),
  menuHighlights: z.string().optional().default(""),
  activities: z.string().optional().default(""),
  specialNote: z.string().optional().default(""),
  primaryColor: z.string().optional().default("#166534"),
  secondaryColor: z.string().optional().default("#f9a8d4"),
});

export type GardenPartyData = z.infer<typeof gardenPartySchema>;

export const defaultData: GardenPartyData = {
  hostName: "The Hendersons",
  eventTitle: "Summer Garden Party",
  date: "2026-07-12",
  time: "3:00 PM — 8:00 PM",
  venue: "Henderson Residence",
  venueAddress: "42 Blossom Hill Rd, Austin, TX",
  message: "Join us for an afternoon of good food, great company, and beautiful blooms in the garden. We can't wait to spend this lovely day with you!",
  dresscode: "Garden Chic",
  menuHighlights: "Wood-fired pizza, Fresh garden salads, Artisan cheese board, Seasonal fruit tarts, Craft lemonade & sangria",
  activities: "Live acoustic music, Flower arranging workshop, Lawn games, Garden tour",
  specialNote: "The event is outdoors — please wear comfortable shoes. In case of rain, we'll move under the covered pavilion.",
  primaryColor: "#166534",
  secondaryColor: "#f9a8d4",
};

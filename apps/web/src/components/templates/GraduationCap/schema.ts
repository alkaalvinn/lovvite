import { z } from "zod";

export const graduationCapSchema = z.object({
  graduateName: z.string().min(1),
  degree: z.string().optional().default(""),
  school: z.string().optional().default(""),
  date: z.string().min(1),
  time: z.string().optional().default(""),
  venue: z.string().optional().default(""),
  venueAddress: z.string().optional().default(""),
  message: z.string().optional().default(""),
  year: z.string().optional().default(""),
  primaryColor: z.string().optional().default("#1e3a5f"),
});

export type GraduationCapData = z.infer<typeof graduationCapSchema>;

export const defaultData: GraduationCapData = {
  graduateName: "Alex Rivera",
  degree: "Bachelor of Computer Science",
  school: "University of California",
  date: "2026-05-22",
  time: "2:00 PM",
  venue: "University Auditorium",
  venueAddress: "100 Campus Drive, Berkeley, CA",
  message: "After years of hard work and dedication, it's time to celebrate this incredible milestone!",
  year: "2026",
  primaryColor: "#1e3a5f",
};

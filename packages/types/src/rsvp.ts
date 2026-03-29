export type RsvpStatus = "attending" | "declined" | "maybe";

export interface Rsvp {
  id: string;
  invitation_id: string;
  name: string;
  email: string | null;
  status: RsvpStatus;
  message: string | null;
  created_at: string;
}

export interface CreateRsvpInput {
  name: string;
  email?: string;
  status: RsvpStatus;
  message?: string;
}

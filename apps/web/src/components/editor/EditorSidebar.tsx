import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

interface EditorSidebarProps {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  templateId: string;
}

type FieldType = "text" | "date" | "textarea" | "color";
type FieldDef = { key: string; label: string; type: FieldType; group?: string };

// Field config per template — keeps templates dumb
const FIELD_CONFIGS: Record<string, FieldDef[]> = {
  "elegant-wedding": [
    { key: "brideFirstName", label: "Bride First Name", type: "text", group: "Couple" },
    { key: "brideLastName", label: "Bride Last Name", type: "text", group: "Couple" },
    { key: "groomFirstName", label: "Groom First Name", type: "text", group: "Couple" },
    { key: "groomLastName", label: "Groom Last Name", type: "text", group: "Couple" },
    { key: "date", label: "Wedding Date", type: "date", group: "Event" },
    { key: "time", label: "Time", type: "text", group: "Event" },
    { key: "venue", label: "Venue Name", type: "text", group: "Event" },
    { key: "venueAddress", label: "Venue Address", type: "text", group: "Event" },
    { key: "message", label: "Invitation Message", type: "textarea", group: "Content" },
    { key: "ourStory", label: "Our Story", type: "textarea", group: "Content" },
    { key: "ceremonyTime", label: "Ceremony Time", type: "text", group: "Schedule" },
    { key: "receptionTime", label: "Reception Time", type: "text", group: "Schedule" },
    { key: "dinnerTime", label: "Dinner & Dancing Time", type: "text", group: "Schedule" },
    { key: "dressCode", label: "Dress Code", type: "text", group: "Details" },
    { key: "accentColor", label: "Accent Color", type: "color", group: "Style" },
  ],
  "birthday-bash": [
    { key: "name", label: "Birthday Person", type: "text", group: "Person" },
    { key: "age", label: "Turning Age", type: "text", group: "Person" },
    { key: "date", label: "Party Date", type: "date", group: "Event" },
    { key: "time", label: "Time", type: "text", group: "Event" },
    { key: "venue", label: "Venue Name", type: "text", group: "Event" },
    { key: "venueAddress", label: "Venue Address", type: "text", group: "Event" },
    { key: "message", label: "Party Message", type: "textarea", group: "Content" },
    { key: "theme", label: "Party Theme", type: "text", group: "Content" },
    { key: "activities", label: "Activities (comma-separated)", type: "textarea", group: "Content" },
    { key: "whatToBring", label: "What to Bring / Note", type: "textarea", group: "Content" },
    { key: "primaryColor", label: "Primary Color", type: "color", group: "Style" },
    { key: "secondaryColor", label: "Secondary Color", type: "color", group: "Style" },
  ],
  "anniversary-gold": [
    { key: "partnerOneName", label: "Partner One Name", type: "text", group: "Couple" },
    { key: "partnerTwoName", label: "Partner Two Name", type: "text", group: "Couple" },
    { key: "years", label: "Years Together", type: "text", group: "Couple" },
    { key: "date", label: "Celebration Date", type: "date", group: "Event" },
    { key: "time", label: "Time", type: "text", group: "Event" },
    { key: "venue", label: "Venue Name", type: "text", group: "Event" },
    { key: "venueAddress", label: "Venue Address", type: "text", group: "Event" },
    { key: "message", label: "Celebration Message", type: "textarea", group: "Content" },
    { key: "loveStory", label: "Love Story", type: "textarea", group: "Content" },
    { key: "milestone1", label: "Milestone 1", type: "text", group: "Milestones" },
    { key: "milestone2", label: "Milestone 2", type: "text", group: "Milestones" },
    { key: "milestone3", label: "Milestone 3", type: "text", group: "Milestones" },
    { key: "accentColor", label: "Accent Color", type: "color", group: "Style" },
  ],
  "graduation-cap": [
    { key: "graduateName", label: "Graduate Name", type: "text", group: "Graduate" },
    { key: "degree", label: "Degree / Program", type: "text", group: "Graduate" },
    { key: "school", label: "School / University", type: "text", group: "Graduate" },
    { key: "year", label: "Class Year", type: "text", group: "Graduate" },
    { key: "date", label: "Celebration Date", type: "date", group: "Event" },
    { key: "time", label: "Time", type: "text", group: "Event" },
    { key: "venue", label: "Venue Name", type: "text", group: "Event" },
    { key: "venueAddress", label: "Venue Address", type: "text", group: "Event" },
    { key: "message", label: "Message", type: "textarea", group: "Content" },
    { key: "achievement1", label: "Achievement 1", type: "text", group: "Achievements" },
    { key: "achievement2", label: "Achievement 2", type: "text", group: "Achievements" },
    { key: "achievement3", label: "Achievement 3", type: "text", group: "Achievements" },
    { key: "futurePlans", label: "Future Plans", type: "textarea", group: "Content" },
    { key: "primaryColor", label: "Primary Color", type: "color", group: "Style" },
  ],
  "garden-party": [
    { key: "hostName", label: "Host Name", type: "text", group: "Host" },
    { key: "eventTitle", label: "Event Title", type: "text", group: "Host" },
    { key: "date", label: "Party Date", type: "date", group: "Event" },
    { key: "time", label: "Time", type: "text", group: "Event" },
    { key: "venue", label: "Venue Name", type: "text", group: "Event" },
    { key: "venueAddress", label: "Venue Address", type: "text", group: "Event" },
    { key: "message", label: "Invitation Message", type: "textarea", group: "Content" },
    { key: "menuHighlights", label: "Menu Items (comma-separated)", type: "textarea", group: "Content" },
    { key: "activities", label: "Activities (comma-separated)", type: "textarea", group: "Content" },
    { key: "dresscode", label: "Dress Code", type: "text", group: "Details" },
    { key: "specialNote", label: "Special Note", type: "textarea", group: "Details" },
    { key: "primaryColor", label: "Primary Color", type: "color", group: "Style" },
    { key: "secondaryColor", label: "Secondary Color", type: "color", group: "Style" },
  ],
  "baby-shower": [
    { key: "parentNames", label: "Parent Names", type: "text", group: "Parents" },
    { key: "babyName", label: "Baby Name", type: "text", group: "Parents" },
    { key: "date", label: "Shower Date", type: "date", group: "Event" },
    { key: "time", label: "Time", type: "text", group: "Event" },
    { key: "venue", label: "Venue Name", type: "text", group: "Event" },
    { key: "venueAddress", label: "Venue Address", type: "text", group: "Event" },
    { key: "message", label: "Message", type: "textarea", group: "Content" },
    { key: "theme", label: "Shower Theme", type: "text", group: "Content" },
    { key: "games", label: "Games (comma-separated)", type: "textarea", group: "Content" },
    { key: "registryLink", label: "Registry Link", type: "text", group: "Details" },
    { key: "specialNote", label: "Special Note", type: "textarea", group: "Details" },
    { key: "primaryColor", label: "Primary Color", type: "color", group: "Style" },
    { key: "secondaryColor", label: "Secondary Color", type: "color", group: "Style" },
  ],
};

export function EditorSidebar({ data, onChange, templateId }: EditorSidebarProps) {
  const fields = FIELD_CONFIGS[templateId] ?? [];

  // Group fields
  const groups: { name: string; fields: FieldDef[] }[] = [];
  for (const field of fields) {
    const groupName = field.group ?? "General";
    const existing = groups.find((g) => g.name === groupName);
    if (existing) {
      existing.fields.push(field);
    } else {
      groups.push({ name: groupName, fields: [field] });
    }
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Customize</h2>

      {groups.map((group) => (
        <div key={group.name}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            {group.name}
          </p>
          <div className="space-y-3">
            {group.fields.map((field) => {
              const value = (data[field.key] as string) ?? "";

              if (field.type === "textarea") {
                return (
                  <Textarea
                    key={field.key}
                    label={field.label}
                    value={value}
                    onChange={(e) => onChange(field.key, e.target.value)}
                  />
                );
              }

              if (field.type === "color") {
                return (
                  <div key={field.key} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(field.key, e.target.value)}
                        className="h-8 w-8 rounded border border-gray-300 cursor-pointer"
                      />
                      <span className="text-sm text-gray-500">{value}</span>
                    </div>
                  </div>
                );
              }

              return (
                <Input
                  key={field.key}
                  label={field.label}
                  type={field.type}
                  value={value}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

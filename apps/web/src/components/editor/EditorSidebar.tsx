import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

interface EditorSidebarProps {
  data: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  templateId: string;
}

// Field config per template — keeps templates dumb
const FIELD_CONFIGS: Record<
  string,
  Array<{ key: string; label: string; type: "text" | "date" | "textarea" | "color" }>
> = {
  "elegant-wedding": [
    { key: "brideFirstName", label: "Bride First Name", type: "text" },
    { key: "brideLastName", label: "Bride Last Name", type: "text" },
    { key: "groomFirstName", label: "Groom First Name", type: "text" },
    { key: "groomLastName", label: "Groom Last Name", type: "text" },
    { key: "date", label: "Wedding Date", type: "date" },
    { key: "time", label: "Time", type: "text" },
    { key: "venue", label: "Venue Name", type: "text" },
    { key: "venueAddress", label: "Venue Address", type: "text" },
    { key: "message", label: "Invitation Message", type: "textarea" },
    { key: "dressCode", label: "Dress Code", type: "text" },
    { key: "accentColor", label: "Accent Color", type: "color" },
  ],
  "birthday-bash": [
    { key: "name", label: "Birthday Person", type: "text" },
    { key: "age", label: "Turning Age", type: "text" },
    { key: "date", label: "Party Date", type: "date" },
    { key: "time", label: "Time", type: "text" },
    { key: "venue", label: "Venue Name", type: "text" },
    { key: "venueAddress", label: "Venue Address", type: "text" },
    { key: "message", label: "Party Message", type: "textarea" },
    { key: "theme", label: "Party Theme", type: "text" },
    { key: "primaryColor", label: "Primary Color", type: "color" },
    { key: "secondaryColor", label: "Secondary Color", type: "color" },
  ],
  "anniversary-gold": [
    { key: "partnerOneName", label: "Partner One Name", type: "text" },
    { key: "partnerTwoName", label: "Partner Two Name", type: "text" },
    { key: "years", label: "Years Together", type: "text" },
    { key: "date", label: "Celebration Date", type: "date" },
    { key: "time", label: "Time", type: "text" },
    { key: "venue", label: "Venue Name", type: "text" },
    { key: "venueAddress", label: "Venue Address", type: "text" },
    { key: "message", label: "Celebration Message", type: "textarea" },
    { key: "accentColor", label: "Accent Color", type: "color" },
  ],
  "graduation-cap": [
    { key: "graduateName", label: "Graduate Name", type: "text" },
    { key: "degree", label: "Degree / Program", type: "text" },
    { key: "school", label: "School / University", type: "text" },
    { key: "year", label: "Class Year", type: "text" },
    { key: "date", label: "Celebration Date", type: "date" },
    { key: "time", label: "Time", type: "text" },
    { key: "venue", label: "Venue Name", type: "text" },
    { key: "venueAddress", label: "Venue Address", type: "text" },
    { key: "message", label: "Message", type: "textarea" },
    { key: "primaryColor", label: "Primary Color", type: "color" },
  ],
  "garden-party": [
    { key: "hostName", label: "Host Name", type: "text" },
    { key: "eventTitle", label: "Event Title", type: "text" },
    { key: "date", label: "Party Date", type: "date" },
    { key: "time", label: "Time", type: "text" },
    { key: "venue", label: "Venue Name", type: "text" },
    { key: "venueAddress", label: "Venue Address", type: "text" },
    { key: "message", label: "Invitation Message", type: "textarea" },
    { key: "dresscode", label: "Dress Code", type: "text" },
    { key: "primaryColor", label: "Primary Color", type: "color" },
    { key: "secondaryColor", label: "Secondary Color", type: "color" },
  ],
  "baby-shower": [
    { key: "parentNames", label: "Parent Names", type: "text" },
    { key: "babyName", label: "Baby Name", type: "text" },
    { key: "date", label: "Shower Date", type: "date" },
    { key: "time", label: "Time", type: "text" },
    { key: "venue", label: "Venue Name", type: "text" },
    { key: "venueAddress", label: "Venue Address", type: "text" },
    { key: "message", label: "Message", type: "textarea" },
    { key: "theme", label: "Shower Theme", type: "text" },
    { key: "registryLink", label: "Registry Link", type: "text" },
    { key: "primaryColor", label: "Primary Color", type: "color" },
    { key: "secondaryColor", label: "Secondary Color", type: "color" },
  ],
};

export function EditorSidebar({ data, onChange, templateId }: EditorSidebarProps) {
  const fields = FIELD_CONFIGS[templateId] ?? [];

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold text-gray-900">Customize</h2>
      {fields.map((field) => {
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
  );
}

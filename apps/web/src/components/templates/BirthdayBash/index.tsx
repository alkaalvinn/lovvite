import type { BirthdayBashData } from "./schema";
import { birthdayBashSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function BirthdayBashComponent({ data: rawData, isPreview }: TemplateProps) {
  const parsed = birthdayBashSchema.safeParse(rawData);
  const data: BirthdayBashData = parsed.success ? parsed.data : defaultData;

  const formattedDate = data.date
    ? new Date(data.date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${isPreview ? "p-4" : "p-6 md:p-12"}`}
      style={{
        background: `linear-gradient(135deg, ${data.primaryColor}15, ${data.secondaryColor}25, ${data.primaryColor}10)`,
      }}
    >
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Confetti decoration */}
        <div className="flex justify-center gap-2 text-3xl">
          <span>&#127880;</span>
          <span>&#127881;</span>
          <span>&#127880;</span>
        </div>

        {/* You're invited */}
        <p
          className="text-sm font-bold tracking-[0.3em] uppercase"
          style={{ color: data.primaryColor }}
        >
          You&apos;re Invited!
        </p>

        {/* Name */}
        <div>
          <h1
            className="text-5xl md:text-6xl font-extrabold"
            style={{ color: data.primaryColor }}
          >
            {data.name}
          </h1>
          {data.age && (
            <p className="mt-3 text-lg text-gray-600">
              is turning{" "}
              <span
                className="text-4xl font-extrabold inline-block mx-1"
                style={{ color: data.secondaryColor }}
              >
                {data.age}
              </span>
            </p>
          )}
        </div>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3">
          <div
            className="h-1 w-12 rounded-full"
            style={{ backgroundColor: data.secondaryColor }}
          />
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: data.primaryColor }}
          />
          <div
            className="h-1 w-12 rounded-full"
            style={{ backgroundColor: data.secondaryColor }}
          />
        </div>

        {/* Message */}
        {data.message && (
          <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
            {data.message}
          </p>
        )}

        {/* Theme */}
        {data.theme && (
          <div
            className="inline-block px-5 py-2 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: data.primaryColor }}
          >
            {data.theme}
          </div>
        )}

        {/* Date & Time */}
        <div
          className="rounded-2xl p-6 space-y-2"
          style={{ backgroundColor: `${data.primaryColor}08`, border: `2px dashed ${data.primaryColor}30` }}
        >
          <p className="text-lg font-bold text-gray-800">{formattedDate}</p>
          {data.time && (
            <p className="text-gray-600 font-medium">{data.time}</p>
          )}
        </div>

        {/* Venue */}
        {data.venue && (
          <div className="space-y-1">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: data.primaryColor }}
            >
              Where
            </p>
            <p className="text-xl font-bold text-gray-800">{data.venue}</p>
            {data.venueAddress && (
              <p className="text-gray-500 text-sm">{data.venueAddress}</p>
            )}
          </div>
        )}

        {/* Bottom decoration */}
        <div className="flex justify-center gap-2 text-2xl">
          <span>&#127874;</span>
          <span>&#127882;</span>
          <span>&#127874;</span>
        </div>
      </div>
    </div>
  );
}

export const BirthdayBash = {
  id: "birthday-bash",
  name: "Birthday Bash",
  category: "birthday" as TemplateCategory,
  thumbnail: "/thumbnails/birthday-bash.jpg",
  component: BirthdayBashComponent,
  defaultData: defaultData as Record<string, unknown>,
  schema: birthdayBashSchema,
};

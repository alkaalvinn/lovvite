import type { ElegantWeddingData } from "./schema";
import { elegantWeddingSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function ElegantWeddingComponent({ data: rawData, isPreview }: TemplateProps) {
  const parsed = elegantWeddingSchema.safeParse(rawData);
  const data: ElegantWeddingData = parsed.success ? parsed.data : defaultData;

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
      className={`min-h-screen flex items-center justify-center bg-amber-50 ${isPreview ? "p-4" : "p-6 md:p-12"}`}
    >
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Decorative top */}
        <div className="flex justify-center">
          <div
            className="w-24 h-0.5"
            style={{ backgroundColor: data.accentColor }}
          />
        </div>

        {/* Invitation text */}
        <p className="text-sm tracking-widest uppercase text-gray-500">
          You are invited to the wedding of
        </p>

        {/* Names */}
        <div className="space-y-2">
          <h1
            className="text-4xl md:text-5xl font-serif"
            style={{ color: data.accentColor }}
          >
            {data.brideFirstName} {data.brideLastName}
          </h1>
          <p
            className="text-2xl font-serif italic"
            style={{ color: data.accentColor }}
          >
            &amp;
          </p>
          <h1
            className="text-4xl md:text-5xl font-serif"
            style={{ color: data.accentColor }}
          >
            {data.groomFirstName} {data.groomLastName}
          </h1>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4">
          <div
            className="w-16 h-px"
            style={{ backgroundColor: data.accentColor }}
          />
          <div
            className="w-2 h-2 rotate-45"
            style={{ backgroundColor: data.accentColor }}
          />
          <div
            className="w-16 h-px"
            style={{ backgroundColor: data.accentColor }}
          />
        </div>

        {/* Message */}
        {data.message && (
          <p className="text-gray-600 italic leading-relaxed max-w-md mx-auto">
            {data.message}
          </p>
        )}

        {/* Date & Time */}
        <div className="space-y-1">
          <p className="text-lg font-semibold text-gray-800">{formattedDate}</p>
          {data.time && <p className="text-gray-600">{data.time}</p>}
        </div>

        {/* Venue */}
        {data.venue && (
          <div className="space-y-1">
            <p className="text-sm tracking-widest uppercase text-gray-500">
              Venue
            </p>
            <p className="text-lg font-semibold text-gray-800">{data.venue}</p>
            {data.venueAddress && (
              <p className="text-gray-600 text-sm">{data.venueAddress}</p>
            )}
          </div>
        )}

        {/* Dress code */}
        {data.dressCode && (
          <div>
            <p className="text-sm tracking-widest uppercase text-gray-500">
              Dress Code
            </p>
            <p className="text-gray-700 mt-1">{data.dressCode}</p>
          </div>
        )}

        {/* Decorative bottom */}
        <div className="flex justify-center">
          <div
            className="w-24 h-0.5"
            style={{ backgroundColor: data.accentColor }}
          />
        </div>
      </div>
    </div>
  );
}

export const ElegantWedding = {
  id: "elegant-wedding",
  name: "Elegant Wedding",
  category: "wedding" as TemplateCategory,
  thumbnail: "/thumbnails/elegant-wedding.jpg",
  component: ElegantWeddingComponent,
  defaultData: defaultData as Record<string, unknown>,
  schema: elegantWeddingSchema,
};

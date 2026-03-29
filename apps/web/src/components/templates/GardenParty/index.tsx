import type { GardenPartyData } from "./schema";
import { gardenPartySchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function GardenPartyComponent({ data: rawData, isPreview }: TemplateProps) {
  const parsed = gardenPartySchema.safeParse(rawData);
  const data: GardenPartyData = parsed.success ? parsed.data : defaultData;

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
        background: `linear-gradient(160deg, #f0fdf4, #fdf2f8 50%, #ecfdf5)`,
      }}
    >
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Floral decoration */}
        <div className="flex justify-center gap-1 text-2xl">
          <span>&#127800;</span>
          <span>&#127807;</span>
          <span>&#127803;</span>
          <span>&#127807;</span>
          <span>&#127800;</span>
        </div>

        {/* Event title */}
        {data.eventTitle && (
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: data.primaryColor }}
          >
            {data.eventTitle}
          </h1>
        )}

        {/* Hosted by */}
        <p className="text-gray-500">
          Hosted by{" "}
          <span className="font-semibold text-gray-700">{data.hostName}</span>
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-12 h-px" style={{ backgroundColor: data.primaryColor, opacity: 0.3 }} />
          <span className="text-sm">&#127793;</span>
          <div className="w-12 h-px" style={{ backgroundColor: data.primaryColor, opacity: 0.3 }} />
        </div>

        {/* Message */}
        {data.message && (
          <p className="text-gray-600 leading-relaxed max-w-md mx-auto text-lg">
            {data.message}
          </p>
        )}

        {/* Date/Time card */}
        <div
          className="rounded-2xl p-6 space-y-3 mx-auto inline-block"
          style={{
            backgroundColor: `${data.primaryColor}08`,
            border: `1px solid ${data.primaryColor}20`,
          }}
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
              Location
            </p>
            <p className="text-lg font-semibold text-gray-800">{data.venue}</p>
            {data.venueAddress && (
              <p className="text-gray-500 text-sm">{data.venueAddress}</p>
            )}
          </div>
        )}

        {/* Dresscode */}
        {data.dresscode && (
          <div
            className="inline-block px-5 py-2 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${data.primaryColor}10`,
              color: data.primaryColor,
              border: `1px solid ${data.primaryColor}30`,
            }}
          >
            Dress Code: {data.dresscode}
          </div>
        )}

        {/* Bottom floral */}
        <div className="flex justify-center gap-1 text-2xl">
          <span>&#127800;</span>
          <span>&#127807;</span>
          <span>&#127803;</span>
          <span>&#127807;</span>
          <span>&#127800;</span>
        </div>
      </div>
    </div>
  );
}

export const GardenParty = {
  id: "garden-party",
  name: "Garden Party",
  category: "other" as TemplateCategory,
  thumbnail: "/thumbnails/garden-party.jpg",
  component: GardenPartyComponent,
  defaultData: defaultData as Record<string, unknown>,
  schema: gardenPartySchema,
};

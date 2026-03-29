import type { AnniversaryGoldData } from "./schema";
import { anniversaryGoldSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function AnniversaryGoldComponent({ data: rawData, isPreview }: TemplateProps) {
  const parsed = anniversaryGoldSchema.safeParse(rawData);
  const data: AnniversaryGoldData = parsed.success ? parsed.data : defaultData;

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
      className={`min-h-screen flex items-center justify-center bg-stone-50 ${isPreview ? "p-4" : "p-6 md:p-12"}`}
    >
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Gold top border */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-16 h-px" style={{ backgroundColor: data.accentColor }} />
            <div className="w-2 h-2 rotate-45 border" style={{ borderColor: data.accentColor }} />
            <div className="w-16 h-px" style={{ backgroundColor: data.accentColor }} />
          </div>
        </div>

        {/* Years badge */}
        {data.years && (
          <div className="inline-flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full border-2 flex flex-col items-center justify-center"
              style={{ borderColor: data.accentColor }}
            >
              <span
                className="text-3xl font-bold"
                style={{ color: data.accentColor }}
              >
                {data.years}
              </span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase font-medium"
                style={{ color: data.accentColor }}
              >
                years
              </span>
            </div>
          </div>
        )}

        {/* Celebrating */}
        <p className="text-xs tracking-[0.3em] uppercase text-stone-500 font-medium">
          Celebrating the Anniversary of
        </p>

        {/* Names */}
        <div className="space-y-2">
          <h1
            className="text-4xl md:text-5xl font-serif"
            style={{ color: data.accentColor }}
          >
            {data.partnerOneName}
          </h1>
          <p className="text-stone-400 text-xl font-serif">&amp;</p>
          <h1
            className="text-4xl md:text-5xl font-serif"
            style={{ color: data.accentColor }}
          >
            {data.partnerTwoName}
          </h1>
        </div>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-32 h-px" style={{ backgroundColor: data.accentColor, opacity: 0.4 }} />
        </div>

        {/* Message */}
        {data.message && (
          <p className="text-stone-600 italic leading-relaxed max-w-sm mx-auto">
            {data.message}
          </p>
        )}

        {/* Date & Time */}
        <div
          className="border rounded-lg p-5 space-y-1 inline-block"
          style={{ borderColor: `${data.accentColor}40` }}
        >
          <p className="text-lg font-semibold text-stone-800">{formattedDate}</p>
          {data.time && <p className="text-stone-500">{data.time}</p>}
        </div>

        {/* Venue */}
        {data.venue && (
          <div className="space-y-1">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400 font-medium">
              Venue
            </p>
            <p className="text-lg font-semibold text-stone-800">{data.venue}</p>
            {data.venueAddress && (
              <p className="text-stone-500 text-sm">{data.venueAddress}</p>
            )}
          </div>
        )}

        {/* Bottom border */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-16 h-px" style={{ backgroundColor: data.accentColor }} />
            <div className="w-2 h-2 rotate-45 border" style={{ borderColor: data.accentColor }} />
            <div className="w-16 h-px" style={{ backgroundColor: data.accentColor }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const AnniversaryGold = {
  id: "anniversary-gold",
  name: "Anniversary Gold",
  category: "anniversary" as TemplateCategory,
  thumbnail: "/thumbnails/anniversary-gold.jpg",
  component: AnniversaryGoldComponent,
  defaultData: defaultData as Record<string, unknown>,
  schema: anniversaryGoldSchema,
};

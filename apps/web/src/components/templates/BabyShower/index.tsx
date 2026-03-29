import type { BabyShowerData } from "./schema";
import { babyShowerSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function BabyShowerComponent({ data: rawData, isPreview }: TemplateProps) {
  const parsed = babyShowerSchema.safeParse(rawData);
  const data: BabyShowerData = parsed.success ? parsed.data : defaultData;

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
        background: `linear-gradient(180deg, ${data.primaryColor}08, ${data.secondaryColor}08, white)`,
      }}
    >
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Baby icons */}
        <div className="flex justify-center gap-3 text-3xl">
          <span>&#11088;</span>
          <span>&#128118;</span>
          <span>&#11088;</span>
        </div>

        {/* Theme */}
        {data.theme && (
          <p className="text-sm tracking-[0.2em] uppercase text-gray-400 font-medium">
            {data.theme}
          </p>
        )}

        {/* Title */}
        <div>
          <p className="text-gray-500 text-lg">Baby Shower for</p>
          <h1
            className="text-4xl md:text-5xl font-bold mt-2"
            style={{ color: data.primaryColor }}
          >
            {data.parentNames}
          </h1>
        </div>

        {/* Baby name */}
        {data.babyName && (
          <p className="text-gray-600 text-lg">
            Welcoming{" "}
            <span
              className="font-bold"
              style={{ color: data.secondaryColor }}
            >
              {data.babyName}
            </span>
          </p>
        )}

        {/* Divider */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-px" style={{ backgroundColor: data.primaryColor, opacity: 0.3 }} />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: data.secondaryColor }}
          />
          <div className="w-10 h-px" style={{ backgroundColor: data.primaryColor, opacity: 0.3 }} />
        </div>

        {/* Message */}
        {data.message && (
          <p className="text-gray-600 leading-relaxed max-w-md mx-auto text-lg">
            {data.message}
          </p>
        )}

        {/* Date & Time */}
        <div
          className="rounded-2xl p-6 space-y-2 inline-block"
          style={{
            backgroundColor: `${data.primaryColor}06`,
            border: `2px solid ${data.primaryColor}15`,
          }}
        >
          <p className="text-lg font-bold text-gray-800">{formattedDate}</p>
          {data.time && <p className="text-gray-600 font-medium">{data.time}</p>}
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
            <p className="text-lg font-semibold text-gray-800">{data.venue}</p>
            {data.venueAddress && (
              <p className="text-gray-500 text-sm">{data.venueAddress}</p>
            )}
          </div>
        )}

        {/* Registry */}
        {data.registryLink && (
          <div
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: `${data.secondaryColor}20`,
              color: data.primaryColor,
            }}
          >
            Gift Registry Available
          </div>
        )}

        {/* Bottom decoration */}
        <div className="flex justify-center gap-3 text-2xl">
          <span>&#127868;</span>
          <span>&#128155;</span>
          <span>&#127868;</span>
        </div>
      </div>
    </div>
  );
}

export const BabyShower = {
  id: "baby-shower",
  name: "Baby Shower",
  category: "other" as TemplateCategory,
  thumbnail: "/thumbnails/baby-shower.jpg",
  component: BabyShowerComponent,
  defaultData: defaultData as Record<string, unknown>,
  schema: babyShowerSchema,
};

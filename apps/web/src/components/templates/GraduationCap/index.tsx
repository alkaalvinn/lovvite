import type { GraduationCapData } from "./schema";
import { graduationCapSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function GraduationCapComponent({ data: rawData, isPreview }: TemplateProps) {
  const parsed = graduationCapSchema.safeParse(rawData);
  const data: GraduationCapData = parsed.success ? parsed.data : defaultData;

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
      style={{ background: `linear-gradient(180deg, ${data.primaryColor}08, white, ${data.primaryColor}05)` }}
    >
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Cap icon */}
        <div className="text-5xl">&#127891;</div>

        {/* Class of year */}
        {data.year && (
          <p
            className="text-sm font-bold tracking-[0.3em] uppercase"
            style={{ color: data.primaryColor }}
          >
            Class of {data.year}
          </p>
        )}

        {/* Name */}
        <h1
          className="text-4xl md:text-5xl font-bold"
          style={{ color: data.primaryColor }}
        >
          {data.graduateName}
        </h1>

        {/* Degree & School */}
        <div className="space-y-1">
          {data.degree && (
            <p className="text-gray-700 font-medium text-lg">{data.degree}</p>
          )}
          {data.school && (
            <p className="text-gray-500">{data.school}</p>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-20 h-px bg-gray-300" />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.primaryColor }}
          />
          <div className="w-20 h-px bg-gray-300" />
        </div>

        {/* Message */}
        {data.message && (
          <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
            {data.message}
          </p>
        )}

        {/* Celebration Party Details */}
        <div>
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
            style={{ color: data.primaryColor }}
          >
            Graduation Celebration
          </p>
          <div
            className="rounded-xl p-6 space-y-2"
            style={{ backgroundColor: `${data.primaryColor}08`, border: `1px solid ${data.primaryColor}20` }}
          >
            <p className="text-lg font-semibold text-gray-800">
              {formattedDate}
            </p>
            {data.time && (
              <p className="text-gray-600">{data.time}</p>
            )}
          </div>
        </div>

        {/* Venue */}
        {data.venue && (
          <div className="space-y-1">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
              Venue
            </p>
            <p className="text-lg font-semibold text-gray-800">{data.venue}</p>
            {data.venueAddress && (
              <p className="text-gray-500 text-sm">{data.venueAddress}</p>
            )}
          </div>
        )}

        {/* Bottom decoration */}
        <p
          className="text-sm font-medium"
          style={{ color: data.primaryColor }}
        >
          &#9733; Congratulations! &#9733;
        </p>
      </div>
    </div>
  );
}

export const GraduationCap = {
  id: "graduation-cap",
  name: "Graduation Cap",
  category: "graduation" as TemplateCategory,
  thumbnail: "/thumbnails/graduation-cap.jpg",
  component: GraduationCapComponent,
  defaultData: defaultData as Record<string, unknown>,
  schema: graduationCapSchema,
};

import type { GraduationCapData } from "./schema";
import { graduationCapSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function GraduationCapComponent({ data: rawData }: TemplateProps) {
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

  const pc = data.primaryColor;
  const achievements = [data.achievement1, data.achievement2, data.achievement3].filter(Boolean);

  return (
    <div className="min-h-screen text-gray-800" style={{ background: `linear-gradient(180deg, ${pc}06, white, ${pc}03)` }}>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(${pc}20 1px, transparent 1px), linear-gradient(90deg, ${pc}20 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }} />

        <div className="relative text-center max-w-lg">
          <div className="text-6xl mb-6">&#127891;</div>

          {data.year && (
            <div className="inline-block px-6 py-2 rounded-full mb-8 text-sm font-bold tracking-[0.2em] uppercase text-white" style={{ backgroundColor: pc }}>
              Class of {data.year}
            </div>
          )}

          <h1 className="text-5xl sm:text-7xl font-bold leading-tight" style={{ color: pc }}>
            {data.graduateName}
          </h1>

          {data.degree && (
            <p className="mt-4 text-lg text-gray-600 font-medium">{data.degree}</p>
          )}
          {data.school && (
            <p className="mt-1 text-gray-500">{data.school}</p>
          )}

          <div className="mt-12 flex flex-col items-center gap-2 opacity-40">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500">Scroll</p>
            <div className="w-px h-8 bg-gray-400" />
          </div>
        </div>
      </section>

      {/* ═══ MESSAGE ═══ */}
      {data.message && (
        <section className="py-24 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-20 h-px bg-gray-300" />
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pc }} />
              <div className="w-20 h-px bg-gray-300" />
            </div>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-600">
              {data.message}
            </p>
          </div>
        </section>
      )}

      {/* ═══ ACHIEVEMENTS ═══ */}
      {achievements.length > 0 && (
        <section className="py-24 px-6" style={{ backgroundColor: `${pc}05` }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
                Highlights
              </p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: pc }}>
                Achievements &amp; Honors
              </h2>
            </div>

            <div className="space-y-4">
              {achievements.map((a, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm"
                  style={{ border: `1px solid ${pc}12` }}
                >
                  <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: pc }}>
                    {i + 1}
                  </div>
                  <p className="text-gray-700 font-medium pt-2">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CELEBRATION DETAILS ═══ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
              You&apos;re Invited
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: pc }}>
              Graduation Celebration
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 text-center bg-white shadow-sm" style={{ border: `1px solid ${pc}15` }}>
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: `${pc}10` }}>
                &#128197;
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>When</p>
              <p className="text-xl font-bold text-gray-800">{formattedDate}</p>
              {data.time && <p className="text-gray-500 mt-1">{data.time}</p>}
            </div>

            <div className="rounded-2xl p-8 text-center bg-white shadow-sm" style={{ border: `1px solid ${pc}15` }}>
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: `${pc}10` }}>
                &#128205;
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>Where</p>
              <p className="text-xl font-bold text-gray-800">{data.venue || "TBA"}</p>
              {data.venueAddress && <p className="text-gray-500 mt-1 text-sm">{data.venueAddress}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FUTURE PLANS ═══ */}
      {data.futurePlans && (
        <section className="py-24 px-6" style={{ backgroundColor: `${pc}05` }}>
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl" style={{ backgroundColor: `${pc}10` }}>
              &#128640;
            </div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
              What&apos;s Next
            </p>
            <h2 className="text-2xl font-bold mb-4" style={{ color: pc }}>
              The Future
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{data.futurePlans}</p>
          </div>
        </section>
      )}

      {/* ═══ CLOSING ═══ */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-6" style={{ color: pc }}>
            The tassel was worth the hassle
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: pc }}>
            Congratulations,
            <br />
            {data.graduateName}!
          </h2>
          <p className="text-gray-500 text-lg">&#9733; {data.school} &middot; {data.year} &#9733;</p>
        </div>
      </section>

      <footer className="py-8 text-center">
        <p className="text-sm text-gray-400">
          {data.graduateName}&apos;s Graduation &middot; {formattedDate}
        </p>
      </footer>
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

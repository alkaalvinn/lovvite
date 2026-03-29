import type { AnniversaryGoldData } from "./schema";
import { anniversaryGoldSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function AnniversaryGoldComponent({ data: rawData }: TemplateProps) {
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

  const ac = data.accentColor;
  const milestones = [data.milestone1, data.milestone2, data.milestone3].filter(Boolean);

  return (
    <div className="min-h-screen bg-stone-50 text-gray-800">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse at center, ${ac}08 0%, transparent 70%)`,
        }} />

        {/* Corner ornaments */}
        <div className="absolute top-10 left-10 w-24 h-24 border-t border-l opacity-15" style={{ borderColor: ac }} />
        <div className="absolute top-10 right-10 w-24 h-24 border-t border-r opacity-15" style={{ borderColor: ac }} />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l opacity-15" style={{ borderColor: ac }} />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r opacity-15" style={{ borderColor: ac }} />

        <div className="relative text-center max-w-xl">
          <p className="text-xs tracking-[0.4em] uppercase font-medium mb-8 text-stone-500">
            Celebrating
          </p>

          {/* Years badge */}
          {data.years && (
            <div className="inline-flex flex-col items-center mb-8">
              <div className="w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center" style={{ borderColor: ac }}>
                <span className="text-4xl font-bold" style={{ color: ac }}>{data.years}</span>
                <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: ac }}>years</span>
              </div>
            </div>
          )}

          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 font-medium mb-6">
            of Love &amp; Togetherness
          </p>

          <h1 className="text-5xl sm:text-6xl font-serif" style={{ color: ac }}>
            {data.partnerOneName}
          </h1>
          <div className="my-3 flex items-center justify-center gap-4">
            <div className="w-14 h-px" style={{ backgroundColor: ac, opacity: 0.3 }} />
            <span className="text-2xl font-serif" style={{ color: ac }}>&amp;</span>
            <div className="w-14 h-px" style={{ backgroundColor: ac, opacity: 0.3 }} />
          </div>
          <h1 className="text-5xl sm:text-6xl font-serif" style={{ color: ac }}>
            {data.partnerTwoName}
          </h1>

          <div className="mt-12 flex flex-col items-center gap-2 opacity-40">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-500">Scroll</p>
            <div className="w-px h-8 bg-stone-400" />
          </div>
        </div>
      </section>

      {/* ═══ MESSAGE ═══ */}
      {data.message && (
        <section className="py-24 px-6" style={{ backgroundColor: `${ac}06` }}>
          <div className="max-w-xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-14 h-px" style={{ backgroundColor: ac, opacity: 0.4 }} />
                <div className="w-2 h-2 rotate-45 border" style={{ borderColor: ac }} />
                <div className="w-14 h-px" style={{ backgroundColor: ac, opacity: 0.4 }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl leading-relaxed text-stone-600 italic font-serif">
              &ldquo;{data.message}&rdquo;
            </p>
          </div>
        </section>
      )}

      {/* ═══ LOVE STORY ═══ */}
      {data.loveStory && (
        <section className="py-24 px-6">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ac }}>
              Our Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-8" style={{ color: ac }}>
              A Love Story
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              {data.loveStory}
            </p>
          </div>
        </section>
      )}

      {/* ═══ MILESTONES TIMELINE ═══ */}
      {milestones.length > 0 && (
        <section className="py-24 px-6" style={{ backgroundColor: `${ac}05` }}>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ac }}>
                Through the Years
              </p>
              <h2 className="text-3xl md:text-4xl font-serif" style={{ color: ac }}>
                Our Milestones
              </h2>
            </div>

            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full border-2 bg-stone-50 shrink-0" style={{ borderColor: ac }} />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 my-0" style={{ backgroundColor: `${ac}25` }} />
                    )}
                  </div>
                  <div className="pb-10">
                    <p className="text-lg font-serif text-stone-700">{m}</p>
                  </div>
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
            <p className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ac }}>
              You&apos;re Invited
            </p>
            <h2 className="text-3xl md:text-4xl font-serif" style={{ color: ac }}>
              Anniversary Celebration
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 text-center bg-white border shadow-sm" style={{ borderColor: `${ac}20` }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${ac}12` }}>
                <span className="text-xl">&#128197;</span>
              </div>
              <p className="text-xs tracking-[0.2em] uppercase font-medium mb-3" style={{ color: ac }}>When</p>
              <p className="text-xl font-serif font-semibold text-stone-800">{formattedDate}</p>
              {data.time && <p className="text-stone-500 mt-1">{data.time}</p>}
            </div>

            <div className="rounded-2xl p-8 text-center bg-white border shadow-sm" style={{ borderColor: `${ac}20` }}>
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${ac}12` }}>
                <span className="text-xl">&#127968;</span>
              </div>
              <p className="text-xs tracking-[0.2em] uppercase font-medium mb-3" style={{ color: ac }}>Where</p>
              <p className="text-xl font-serif font-semibold text-stone-800">{data.venue || "TBA"}</p>
              {data.venueAddress && <p className="text-stone-500 mt-1 text-sm">{data.venueAddress}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CLOSING ═══ */}
      <section className="py-24 px-6" style={{ backgroundColor: `${ac}08` }}>
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase font-medium mb-6" style={{ color: ac }}>
            Here&apos;s to many more years
          </p>
          <h2 className="text-4xl md:text-5xl font-serif" style={{ color: ac }}>
            {data.partnerOneName} &amp; {data.partnerTwoName}
          </h2>
          {data.years && (
            <p className="mt-4 text-stone-500 text-lg">{data.years} years and counting</p>
          )}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3">
              <div className="w-14 h-px" style={{ backgroundColor: ac, opacity: 0.4 }} />
              <div className="w-2 h-2 rotate-45 border" style={{ borderColor: ac }} />
              <div className="w-14 h-px" style={{ backgroundColor: ac, opacity: 0.4 }} />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center">
        <p className="text-sm text-stone-400">
          {data.partnerOneName} &amp; {data.partnerTwoName} &middot; {formattedDate}
        </p>
      </footer>
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

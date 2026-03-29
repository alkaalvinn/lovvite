import type { BabyShowerData } from "./schema";
import { babyShowerSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function BabyShowerComponent({ data: rawData }: TemplateProps) {
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

  const pc = data.primaryColor;
  const sc = data.secondaryColor;
  const gameItems = data.games ? data.games.split(",").map((g) => g.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen text-gray-800" style={{ background: `linear-gradient(180deg, ${pc}06, ${sc}06, white)` }}>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Soft stars background */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(${sc} 1.5px, transparent 1.5px)`,
          backgroundSize: "50px 50px",
        }} />

        {/* Floating decorations */}
        <div className="absolute top-[12%] left-[10%] text-4xl opacity-15">&#11088;</div>
        <div className="absolute top-[18%] right-[12%] text-3xl opacity-10">&#127772;</div>
        <div className="absolute bottom-[20%] left-[8%] text-4xl opacity-10">&#11088;</div>
        <div className="absolute bottom-[15%] right-[10%] text-3xl opacity-15">&#9729;&#65039;</div>

        <div className="relative text-center max-w-lg">
          <div className="flex justify-center gap-3 text-4xl mb-8">
            <span className="opacity-40">&#11088;</span>
            <span>&#128118;</span>
            <span className="opacity-40">&#11088;</span>
          </div>

          {data.theme && (
            <p className="text-sm tracking-[0.2em] uppercase font-medium mb-4 text-gray-400">
              {data.theme}
            </p>
          )}

          <p className="text-xl text-gray-500 mb-4">Baby Shower for</p>

          <h1 className="text-5xl sm:text-7xl font-bold leading-tight" style={{ color: pc }}>
            {data.parentNames}
          </h1>

          {data.babyName && (
            <div className="mt-6 inline-block px-6 py-2.5 rounded-full text-sm font-bold" style={{ backgroundColor: `${sc}25`, color: pc }}>
              Welcoming {data.babyName}
            </div>
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
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-10 h-px" style={{ backgroundColor: pc, opacity: 0.3 }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sc }} />
              <div className="w-10 h-px" style={{ backgroundColor: pc, opacity: 0.3 }} />
            </div>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-600">
              {data.message}
            </p>
          </div>
        </section>
      )}

      {/* ═══ SHOWER DETAILS ═══ */}
      <section className="py-24 px-6" style={{ backgroundColor: `${pc}04` }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
              Save the Date
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: pc }}>
              Shower Details
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 text-center bg-white shadow-sm" style={{ border: `1px solid ${pc}12` }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: `${sc}20` }}>
                &#128197;
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>When</p>
              <p className="text-xl font-bold text-gray-800">{formattedDate}</p>
              {data.time && <p className="text-gray-500 mt-1 font-medium">{data.time}</p>}
            </div>

            <div className="rounded-2xl p-8 text-center bg-white shadow-sm" style={{ border: `1px solid ${pc}12` }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: `${sc}20` }}>
                &#128205;
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>Where</p>
              <p className="text-xl font-bold text-gray-800">{data.venue || "TBA"}</p>
              {data.venueAddress && <p className="text-gray-500 mt-1 text-sm">{data.venueAddress}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GAMES ═══ */}
      {gameItems.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
                Fun &amp; Games
              </p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: pc }}>
                What&apos;s Planned
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {gameItems.map((game, i) => {
                const icons = ["&#127922;", "&#127868;", "&#127873;", "&#128140;", "&#127880;", "&#128118;"];
                return (
                  <div
                    key={game}
                    className="rounded-2xl p-6 text-center bg-white shadow-sm"
                    style={{ border: `1px solid ${pc}10` }}
                  >
                    <span className="text-2xl" dangerouslySetInnerHTML={{ __html: icons[i % icons.length] }} />
                    <p className="mt-3 font-bold text-gray-800">{game}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ REGISTRY ═══ */}
      {data.registryLink && (
        <section className="py-24 px-6" style={{ backgroundColor: `${sc}08` }}>
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl" style={{ backgroundColor: `${sc}30` }}>
              &#127873;
            </div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
              Gift Registry
            </p>
            <h2 className="text-2xl font-bold mb-4" style={{ color: pc }}>
              Gifts for Baby
            </h2>
            <p className="text-gray-600 mb-4">
              If you&apos;d like to send a gift, we&apos;ve created a registry:
            </p>
            <div className="inline-block px-6 py-3 rounded-xl bg-white shadow-sm font-medium" style={{ color: pc, border: `1px solid ${pc}20` }}>
              {data.registryLink}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SPECIAL NOTE ═══ */}
      {data.specialNote && (
        <section className="py-24 px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="rounded-2xl p-8" style={{ backgroundColor: `${pc}04`, border: `1px dashed ${pc}20` }}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: pc }}>
                A Little Note
              </p>
              <p className="text-gray-600 leading-relaxed">{data.specialNote}</p>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CLOSING ═══ */}
      <section className="py-24 px-6" style={{ backgroundColor: `${pc}06` }}>
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center gap-3 text-3xl mb-6">
            <span className="opacity-30">&#11088;</span>
            <span>&#128155;</span>
            <span className="opacity-30">&#11088;</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: pc }}>
            Can&apos;t Wait to Celebrate!
          </h2>
          <p className="text-gray-500 text-lg">See you on {formattedDate}</p>
        </div>
      </section>

      <footer className="py-8 text-center">
        <p className="text-sm text-gray-400">
          {data.parentNames}&apos;s Baby Shower &middot; {formattedDate}
        </p>
      </footer>
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

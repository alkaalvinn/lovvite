import type { GardenPartyData } from "./schema";
import { gardenPartySchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function GardenPartyComponent({ data: rawData }: TemplateProps) {
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

  const pc = data.primaryColor;
  const sc = data.secondaryColor;
  const menuItems = data.menuHighlights ? data.menuHighlights.split(",").map((m) => m.trim()).filter(Boolean) : [];
  const activityItems = data.activities ? data.activities.split(",").map((a) => a.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen text-gray-800" style={{ background: "linear-gradient(160deg, #f0fdf4, #fdf2f8 50%, #ecfdf5)" }}>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Scattered flowers */}
        <div className="absolute top-[8%] left-[8%] text-4xl opacity-15 rotate-12">&#127800;</div>
        <div className="absolute top-[12%] right-[10%] text-5xl opacity-10 -rotate-12">&#127803;</div>
        <div className="absolute bottom-[18%] left-[12%] text-3xl opacity-15 rotate-45">&#127807;</div>
        <div className="absolute bottom-[10%] right-[8%] text-4xl opacity-10 -rotate-6">&#127800;</div>
        <div className="absolute top-[45%] left-[5%] text-2xl opacity-10">&#127793;</div>
        <div className="absolute top-[40%] right-[6%] text-3xl opacity-10">&#127807;</div>

        <div className="relative text-center max-w-lg">
          {/* Floral wreath */}
          <div className="flex justify-center gap-1 text-3xl mb-8 opacity-60">
            <span>&#127800;</span>
            <span>&#127807;</span>
            <span>&#127803;</span>
            <span>&#127807;</span>
            <span>&#127800;</span>
          </div>

          <p className="text-xs tracking-[0.3em] uppercase font-medium mb-4 text-gray-500">
            You&apos;re Invited
          </p>

          {data.eventTitle && (
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight" style={{ color: pc }}>
              {data.eventTitle}
            </h1>
          )}

          <p className="mt-6 text-gray-500 text-lg">
            Hosted by <span className="font-semibold text-gray-700">{data.hostName}</span>
          </p>

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
              <div className="w-12 h-px" style={{ backgroundColor: pc, opacity: 0.3 }} />
              <span className="text-sm">&#127793;</span>
              <div className="w-12 h-px" style={{ backgroundColor: pc, opacity: 0.3 }} />
            </div>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-600">
              {data.message}
            </p>
          </div>
        </section>
      )}

      {/* ═══ EVENT DETAILS ═══ */}
      <section className="py-24 px-6" style={{ backgroundColor: `${pc}05` }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
              The Details
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ color: pc }}>
              When &amp; Where
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl p-8 text-center bg-white shadow-sm" style={{ border: `1px solid ${pc}15` }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: `${sc}30` }}>
                &#128197;
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>When</p>
              <p className="text-xl font-bold text-gray-800">{formattedDate}</p>
              {data.time && <p className="text-gray-500 mt-1 font-medium">{data.time}</p>}
            </div>

            <div className="rounded-2xl p-8 text-center bg-white shadow-sm" style={{ border: `1px solid ${pc}15` }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: `${sc}30` }}>
                &#127968;
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>Where</p>
              <p className="text-xl font-bold text-gray-800">{data.venue || "TBA"}</p>
              {data.venueAddress && <p className="text-gray-500 mt-1 text-sm">{data.venueAddress}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MENU ═══ */}
      {menuItems.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
                Food &amp; Drink
              </p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: pc }}>
                On the Menu
              </h2>
            </div>

            <div className="space-y-3">
              {menuItems.map((item) => (
                <div key={item} className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm" style={{ border: `1px solid ${pc}10` }}>
                  <span className="text-lg">&#127839;</span>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ ACTIVITIES ═══ */}
      {activityItems.length > 0 && (
        <section className="py-24 px-6" style={{ backgroundColor: `${sc}08` }}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
                Fun Awaits
              </p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ color: pc }}>
                Activities
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {activityItems.map((activity, i) => {
                const icons = ["&#127925;", "&#127804;", "&#9917;", "&#127793;", "&#127912;", "&#127928;"];
                return (
                  <div
                    key={activity}
                    className="rounded-2xl p-6 text-center bg-white shadow-sm"
                    style={{ border: `1px solid ${pc}10` }}
                  >
                    <span className="text-2xl" dangerouslySetInnerHTML={{ __html: icons[i % icons.length] }} />
                    <p className="mt-3 font-bold text-gray-800">{activity}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ DRESS CODE & NOTE ═══ */}
      {(data.dresscode || data.specialNote) && (
        <section className="py-24 px-6">
          <div className="max-w-md mx-auto space-y-12">
            {data.dresscode && (
              <div className="text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: `${pc}10` }}>
                  &#128087;
                </div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>Dress Code</p>
                <p className="text-xl font-bold text-gray-800">{data.dresscode}</p>
              </div>
            )}

            {data.specialNote && (
              <div className="rounded-2xl p-6 text-center" style={{ backgroundColor: `${pc}06`, border: `1px dashed ${pc}25` }}>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>Good to Know</p>
                <p className="text-gray-600 leading-relaxed">{data.specialNote}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══ CLOSING ═══ */}
      <section className="py-24 px-6" style={{ backgroundColor: `${pc}06` }}>
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center gap-1 text-2xl mb-6 opacity-50">
            <span>&#127800;</span><span>&#127807;</span><span>&#127803;</span><span>&#127807;</span><span>&#127800;</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: pc }}>
            We Hope to See You There!
          </h2>
          <p className="text-gray-500 text-lg">{formattedDate}</p>
        </div>
      </section>

      <footer className="py-8 text-center">
        <p className="text-sm text-gray-400">
          {data.eventTitle} &middot; Hosted by {data.hostName}
        </p>
      </footer>
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

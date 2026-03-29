import type { ElegantWeddingData } from "./schema";
import { elegantWeddingSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function ElegantWeddingComponent({ data: rawData }: TemplateProps) {
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

  const shortDate = data.date
    ? new Date(data.date + "T00:00:00").toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const ac = data.accentColor;

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(${ac} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />

        {/* Corner ornaments */}
        <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 opacity-20" style={{ borderColor: ac }} />
        <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 opacity-20" style={{ borderColor: ac }} />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 opacity-20" style={{ borderColor: ac }} />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 opacity-20" style={{ borderColor: ac }} />

        <div className="relative text-center max-w-xl">
          <p className="text-xs tracking-[0.4em] uppercase mb-8 font-medium" style={{ color: ac }}>
            We&apos;re getting married
          </p>

          <h1 className="text-5xl sm:text-7xl font-serif leading-tight" style={{ color: ac }}>
            {data.brideFirstName}
          </h1>
          <div className="my-4 flex items-center justify-center gap-4">
            <div className="w-16 h-px" style={{ backgroundColor: ac, opacity: 0.4 }} />
            <span className="text-3xl font-serif italic" style={{ color: ac }}>&amp;</span>
            <div className="w-16 h-px" style={{ backgroundColor: ac, opacity: 0.4 }} />
          </div>
          <h1 className="text-5xl sm:text-7xl font-serif leading-tight" style={{ color: ac }}>
            {data.groomFirstName}
          </h1>

          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: ac, opacity: 0.5 }} />
            <p className="text-lg tracking-wide text-gray-600">{formattedDate}</p>
            <div className="w-2 h-2 rotate-45" style={{ backgroundColor: ac, opacity: 0.5 }} />
          </div>

          {data.venue && (
            <p className="mt-2 text-gray-500">{data.venue}</p>
          )}

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 opacity-40">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500">Scroll</p>
            <div className="w-px h-8 bg-gray-400" />
          </div>
        </div>
      </section>

      {/* ═══ INVITATION MESSAGE ═══ */}
      {data.message && (
        <section className="py-24 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-px" style={{ backgroundColor: ac }} />
                <div className="w-2.5 h-2.5 rotate-45" style={{ backgroundColor: ac }} />
                <div className="w-12 h-px" style={{ backgroundColor: ac }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-600 italic font-serif">
              &ldquo;{data.message}&rdquo;
            </p>
            <p className="mt-6 text-sm tracking-[0.2em] uppercase" style={{ color: ac }}>
              {data.brideFirstName} {data.brideLastName} &amp; {data.groomFirstName} {data.groomLastName}
            </p>
          </div>
        </section>
      )}

      {/* ═══ OUR STORY ═══ */}
      {data.ourStory && (
        <section className="py-24 px-6" style={{ backgroundColor: `${ac}08` }}>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ac }}>
              Our Story
            </p>
            <h2 className="text-3xl md:text-4xl font-serif mb-8" style={{ color: ac }}>
              How It All Began
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {data.ourStory}
            </p>
          </div>
        </section>
      )}

      {/* ═══ EVENT DETAILS CARDS ═══ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ac }}>
              The Details
            </p>
            <h2 className="text-3xl md:text-4xl font-serif" style={{ color: ac }}>
              When &amp; Where
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date & Time */}
            <div className="bg-white rounded-2xl p-8 text-center border border-amber-100 shadow-sm">
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${ac}15` }}>
                <span className="text-xl">&#128197;</span>
              </div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-medium mb-3" style={{ color: ac }}>Date &amp; Time</h3>
              <p className="text-xl font-serif font-semibold text-gray-800">{shortDate}</p>
              {data.time && <p className="text-gray-500 mt-1">{data.time}</p>}
            </div>

            {/* Venue */}
            <div className="bg-white rounded-2xl p-8 text-center border border-amber-100 shadow-sm">
              <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: `${ac}15` }}>
                <span className="text-xl">&#127968;</span>
              </div>
              <h3 className="text-xs tracking-[0.2em] uppercase font-medium mb-3" style={{ color: ac }}>Venue</h3>
              <p className="text-xl font-serif font-semibold text-gray-800">{data.venue || "TBA"}</p>
              {data.venueAddress && <p className="text-gray-500 mt-1 text-sm">{data.venueAddress}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══ */}
      {(data.ceremonyTime || data.receptionTime || data.dinnerTime) && (
        <section className="py-24 px-6" style={{ backgroundColor: `${ac}06` }}>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ac }}>
                Schedule
              </p>
              <h2 className="text-3xl md:text-4xl font-serif" style={{ color: ac }}>
                Order of the Day
              </h2>
            </div>

            <div className="space-y-0">
              {[
                { time: data.ceremonyTime, label: "Ceremony", icon: "&#128141;" },
                { time: data.receptionTime, label: "Cocktail Reception", icon: "&#127864;" },
                { time: data.dinnerTime, label: "Dinner & Dancing", icon: "&#127926;" },
              ]
                .filter((e) => e.time)
                .map((event, i, arr) => (
                  <div key={event.label} className="flex gap-6">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white shrink-0" style={{ borderColor: ac }}>
                        <span className="text-sm" dangerouslySetInnerHTML={{ __html: event.icon }} />
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px flex-1 my-1" style={{ backgroundColor: `${ac}30` }} />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-10">
                      <p className="text-sm font-medium" style={{ color: ac }}>{event.time}</p>
                      <p className="text-lg font-serif text-gray-800 mt-0.5">{event.label}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ DRESS CODE ═══ */}
      {data.dressCode && (
        <section className="py-24 px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${ac}12` }}>
              <span className="text-2xl">&#128087;</span>
            </div>
            <p className="text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ color: ac }}>
              Dress Code
            </p>
            <p className="text-2xl font-serif text-gray-800">{data.dressCode}</p>
          </div>
        </section>
      )}

      {/* ═══ SAVE THE DATE FOOTER ═══ */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ backgroundColor: `${ac}10` }}>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(${ac} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }} />
        <div className="relative max-w-lg mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase font-medium mb-4" style={{ color: ac }}>
            We can&apos;t wait to celebrate with you
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: ac }}>
            Save the Date
          </h2>
          <p className="text-xl text-gray-600">{formattedDate}</p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px" style={{ backgroundColor: ac }} />
              <div className="w-2 h-2 rotate-45" style={{ backgroundColor: ac }} />
              <div className="w-12 h-px" style={{ backgroundColor: ac }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-8 text-center">
        <p className="text-sm text-gray-400">
          {data.brideFirstName} &amp; {data.groomFirstName} &middot; {shortDate}
        </p>
      </footer>
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

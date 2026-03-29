import type { BirthdayBashData } from "./schema";
import { birthdayBashSchema, defaultData } from "./schema";
import type { TemplateCategory } from "@lovvite/types";

interface TemplateProps {
  data: Record<string, unknown>;
  isPreview?: boolean;
}

function BirthdayBashComponent({ data: rawData }: TemplateProps) {
  const parsed = birthdayBashSchema.safeParse(rawData);
  const data: BirthdayBashData = parsed.success ? parsed.data : defaultData;

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
  const activities = data.activities ? data.activities.split(",").map((a) => a.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen text-gray-800" style={{ background: `linear-gradient(180deg, ${pc}08, white, ${sc}08)` }}>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background dots */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(${pc} 2px, transparent 2px)`,
          backgroundSize: "40px 40px",
        }} />

        {/* Floating confetti decorations */}
        <div className="absolute top-[10%] left-[10%] text-4xl opacity-20 rotate-12">&#127880;</div>
        <div className="absolute top-[15%] right-[12%] text-5xl opacity-15 -rotate-12">&#127881;</div>
        <div className="absolute bottom-[20%] left-[15%] text-3xl opacity-20 rotate-45">&#10024;</div>
        <div className="absolute bottom-[15%] right-[10%] text-4xl opacity-15 -rotate-6">&#127882;</div>

        <div className="relative text-center max-w-lg">
          <p className="text-sm font-bold tracking-[0.3em] uppercase mb-6" style={{ color: pc }}>
            You&apos;re Invited to
          </p>

          <h1 className="text-6xl sm:text-8xl font-extrabold leading-none" style={{ color: pc }}>
            {data.name}&apos;s
          </h1>

          {data.age && (
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="h-px w-12" style={{ backgroundColor: sc }} />
              <span className="text-6xl sm:text-7xl font-extrabold" style={{ color: sc }}>
                {data.age}
                <span className="text-2xl align-top">th</span>
              </span>
              <div className="h-px w-12" style={{ backgroundColor: sc }} />
            </div>
          )}

          <p className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight" style={{ color: pc }}>
            Birthday Party!
          </p>

          {data.theme && (
            <div className="mt-8 inline-block px-6 py-2.5 rounded-full text-sm font-bold text-white" style={{ backgroundColor: pc }}>
              &#10024; {data.theme} &#10024;
            </div>
          )}

          <div className="mt-12 flex flex-col items-center gap-2 opacity-40">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500">Scroll for details</p>
            <div className="w-px h-8 bg-gray-400" />
          </div>
        </div>
      </section>

      {/* ═══ MESSAGE ═══ */}
      {data.message && (
        <section className="py-24 px-6">
          <div className="max-w-xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3">
                <div className="h-1 w-10 rounded-full" style={{ backgroundColor: sc }} />
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: pc }} />
                <div className="h-1 w-10 rounded-full" style={{ backgroundColor: sc }} />
              </div>
            </div>
            <p className="text-xl md:text-2xl leading-relaxed text-gray-600">
              {data.message}
            </p>
          </div>
        </section>
      )}

      {/* ═══ PARTY DETAILS ═══ */}
      <section className="py-24 px-6" style={{ backgroundColor: `${pc}05` }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
              Mark Your Calendar
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: pc }}>
              Party Details
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* When */}
            <div className="rounded-2xl p-8 text-center bg-white shadow-sm" style={{ border: `2px solid ${pc}15` }}>
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: `${sc}20` }}>
                &#128197;
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>When</p>
              <p className="text-xl font-bold text-gray-800">{formattedDate}</p>
              {data.time && <p className="text-gray-500 mt-1 font-medium">{data.time}</p>}
            </div>

            {/* Where */}
            <div className="rounded-2xl p-8 text-center bg-white shadow-sm" style={{ border: `2px solid ${pc}15` }}>
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: `${sc}20` }}>
                &#128205;
              </div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: pc }}>Where</p>
              <p className="text-xl font-bold text-gray-800">{data.venue || "TBA"}</p>
              {data.venueAddress && <p className="text-gray-500 mt-1 text-sm">{data.venueAddress}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ACTIVITIES ═══ */}
      {activities.length > 0 && (
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: pc }}>
                Get Ready For
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: pc }}>
                What&apos;s Happening
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {activities.map((activity, i) => {
                const icons = ["&#127911;", "&#128248;", "&#127908;", "&#127878;", "&#127918;", "&#127928;"];
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

      {/* ═══ WHAT TO BRING ═══ */}
      {data.whatToBring && (
        <section className="py-24 px-6" style={{ backgroundColor: `${sc}08` }}>
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl" style={{ backgroundColor: `${sc}25` }}>
              &#127873;
            </div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: pc }}>
              Good To Know
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">{data.whatToBring}</p>
          </div>
        </section>
      )}

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-5xl mb-6">&#127874;</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: pc }}>
            Let&apos;s Celebrate!
          </h2>
          <p className="text-gray-500 text-lg">
            {formattedDate} {data.time && `at ${data.time}`}
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-3">
              <div className="h-1 w-10 rounded-full" style={{ backgroundColor: sc }} />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: pc }} />
              <div className="h-1 w-10 rounded-full" style={{ backgroundColor: sc }} />
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center">
        <p className="text-sm text-gray-400">{data.name}&apos;s {data.age ? `${data.age}th ` : ""}Birthday &middot; {formattedDate}</p>
      </footer>
    </div>
  );
}

export const BirthdayBash = {
  id: "birthday-bash",
  name: "Birthday Bash",
  category: "birthday" as TemplateCategory,
  thumbnail: "/thumbnails/birthday-bash.jpg",
  component: BirthdayBashComponent,
  defaultData: defaultData as Record<string, unknown>,
  schema: birthdayBashSchema,
};

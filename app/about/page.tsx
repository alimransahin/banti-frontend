import config from "@/config";
import about from "@/data/about.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সম্পর্কে",
};

const icons: Record<string, string> = {
  book: "📚",
  teacher: "👨‍🏫",
  check: "✓",
  idea: "💡",
  shield: "🛡️",
  heart: "❤",
  users: "👥",
};

export default function About() {
  return (<main>

    {/* =====================================================
            HERO
        ===================================================== */}
    <section className="relative overflow-hidden bg-primary mb-2 rounded">

      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-white" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white" />
      </div>

      <div className="container-max relative px-4 py-14 sm:py-16 md:py-20">

        <div className="max-w-3xl">

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-secondary" />

            <span className="text-sm font-semibold tracking-wide text-white/80">
              {about.hero.badge}
            </span>
          </div>

          <h1 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {about.hero.title}
          </h1>

          <p className="max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            {config.schoolNameBN} — জ্ঞান, নৈতিকতা ও
            মানবিক মূল্যবোধে শিক্ষার্থীদের গড়ে তোলার প্রত্যয়ে।
          </p>

        </div>

      </div>
    </section>


    {/* =====================================================
            INTRO + INSTITUTION
        ===================================================== */}
    <section className="section-spacing mb-2">
      <div className="container-max px-4">

        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

          {/* INTRO */}
          <div>

            <div className="mb-5 flex items-center gap-3">
              <span className="h-1 w-8 rounded-full bg-secondary" />

              <span className="text-sm font-semibold text-secondary">
                {about.intro.label}
              </span>
            </div>

            <h2 className="mb-7 max-w-3xl text-2xl font-bold leading-tight text-primary sm:text-3xl md:text-4xl">
              {about.intro.title}
            </h2>

            <div className="max-w-3xl space-y-5">

              {about.intro.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15px] leading-8 text-paragraph md:text-base"
                >
                  {paragraph}
                </p>
              ))}

            </div>

          </div>


          {/* INSTITUTION INFO */}
          <div className="h-fit overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">

            <div className="bg-primary px-6 py-5">
              <h3 className="text-lg font-bold text-white">
                {about.institution.title}
              </h3>
            </div>

            <div className="divide-y divide-border px-6">

              {about.institution.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-5 py-4"
                >
                  <span className="text-sm text-paragraph">
                    {item.label}
                  </span>

                  <span className="text-right text-sm font-semibold text-primary">
                    {item.value}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>


    {/* =====================================================
            MISSION / VISION
        ===================================================== */}
    <section className="section-spacing bg-background mb-2">
      <div className="container-max p-4">

        <div className="mb-10">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-1 w-8 rounded-full bg-secondary" />

            <span className="text-sm font-semibold text-secondary">
              আমাদের শিক্ষা দর্শন
            </span>
          </div>

          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            লক্ষ্য ও প্রত্যয়
          </h2>

        </div>


        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">

          {/* MISSION */}
          <div className="bg-surface p-7 md:p-9">

            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light text-xl">
                🎯
              </div>

              <h3 className="text-xl font-bold text-primary">
                {about.mission.title}
              </h3>

            </div>

            <p className="text-[15px] leading-8 text-paragraph">
              {about.mission.description}
            </p>

          </div>


          {/* VISION */}
          <div className="bg-surface p-7 md:p-9">

            <div className="mb-6 flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light text-xl">
                🌱
              </div>

              <h3 className="text-xl font-bold text-primary">
                {about.vision.title}
              </h3>

            </div>

            <p className="text-[15px] leading-8 text-paragraph">
              {about.vision.description}
            </p>

          </div>

        </div>

      </div>
    </section>


    {/* =====================================================
            EDUCATION
        ===================================================== */}
    <section className="section-spacing mb-2">
      <div className="container-max p-4">

        <div className="mb-10 max-w-3xl">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-1 w-8 rounded-full bg-secondary" />

            <span className="text-sm font-semibold text-secondary">
              {about.education.label}
            </span>
          </div>

          <h2 className="mb-4 text-2xl font-bold text-primary sm:text-3xl">
            {about.education.title}
          </h2>

          <p className="text-[15px] leading-8 text-paragraph md:text-base">
            {about.education.description}
          </p>

        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {about.education.features.map((item, index) => (
            <div
              key={index}
              className="border-l-4 border-secondary bg-surface p-6 shadow-sm transition hover:shadow-md"
            >

              <div className="mb-5 text-2xl">
                {icons[item.icon]}
              </div>

              <h3 className="mb-2 text-lg font-bold text-primary">
                {item.title}
              </h3>

              <p className="text-sm leading-7 text-paragraph">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>


    {/* =====================================================
            VALUES
        ===================================================== */}
    <section className="section-spacing bg-background">
      <div className="container-max p-4">

        <div className="mb-10">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-1 w-8 rounded-full bg-secondary" />

            <span className="text-sm font-semibold text-secondary">
              আমাদের আদর্শ
            </span>
          </div>

          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            আমাদের মূল্যবোধ
          </h2>

        </div>


        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">

          {about.values.map((value, index) => (
            <div
              key={index}
              className="flex gap-4"
            >

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-light text-lg">
                {icons[value.icon]}
              </div>

              <div>

                <h3 className="mb-1 font-bold text-primary">
                  {value.title}
                </h3>

                <p className="text-sm leading-6 text-paragraph">
                  {value.description}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>




  </main>
  );

}

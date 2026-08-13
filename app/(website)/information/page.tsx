"use client";

import { useEffect, useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { getAdministrations, IAdministration } from "@/lib/administration-api";

export default function Administration() {
  const [administrations, setAdministrations] = useState<IAdministration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdministrations = async () => {
      try {
        const data = await getAdministrations();

        setAdministrations(data);
      } catch (error) {
        console.error("Failed to fetch administrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdministrations();
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="প্রশাসনিক ও একাডেমিক তথ্য"
        title="প্রশাসনিক ও একাডেমিক তথ্য"
        description="বিদ্যালয়ের গুরুত্বপূর্ণ প্রশাসনিক তথ্য, একাডেমিক তথ্য ও প্রয়োজনীয় নথিপত্র এখানে পাওয়া যাবে।"
      />

      {/* =====================================================
                ADMINISTRATION
            ===================================================== */}
      <section className="section-spacing">
        <div className="container-max">

          {/* Loading */}
          {loading ? (
            <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <div className="mb-4 text-4xl">
                📋
              </div>

              <h2 className="text-xl font-bold text-primary">
                প্রশাসনিক তথ্য লোড হচ্ছে...
              </h2>

              <p className="mt-2 text-sm text-paragraph">
                অনুগ্রহ করে অপেক্ষা করুন।
              </p>
            </div>
          ) : administrations.length === 0 ? (

            /* Empty State */
            <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <div className="mb-4 text-4xl">
                📋
              </div>

              <h2 className="mb-2 text-xl font-bold text-primary">
                কোনো প্রশাসনিক তথ্য পাওয়া যায়নি
              </h2>

              <p className="text-sm text-paragraph">
                প্রশাসনিক তথ্য ও নথিপত্র শীঘ্রই প্রকাশ করা হবে।
              </p>
            </div>

          ) : (

            /* Administration List */
            <div className="grid grid-cols-1 gap-4 ">

              {administrations.map((administration) => (
                <article
                  key={administration._id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition duration-300 hover:shadow-md"
                >

                  {/* ================= INFO ================= */}
                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                      <FileText size={22} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-primary">
                        {administration.title}
                      </h3>
                    </div>

                  </div>

                  {/* ================= PDF BUTTON ================= */}
                  {administration.file?.url && (
                    <a
                      href={administration.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-bold text-white no-underline transition hover:bg-primary"
                    >
                      <span>দেখুন</span>
                      <ExternalLink size={15} />
                    </a>
                  )}

                </article>
              ))}

            </div>
          )}

        </div>
      </section>
    </main>
  );
}
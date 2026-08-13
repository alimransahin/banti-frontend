"use client";

import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { ICommittee, getCommittees } from "@/lib/committee-api";

export default function Committee() {
  const [committees, setCommittees] = useState<ICommittee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommittees = async () => {
      try {
        const data = await getCommittees();

        setCommittees(data);
      } catch (error) {
        console.error("Failed to fetch committees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommittees();
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="পরিচালনা কমিটি"
        title="আমাদের পরিচালনা কমিটি"
        description="বিদ্যালয়ের সার্বিক পরিচালনা ও উন্নয়নে দায়িত্বশীল পরিচালনা কমিটির সদস্যদের সঙ্গে পরিচিত হোন।"
      />

      {/* =====================================================
                COMMITTEE
            ===================================================== */}
      <section className="section-spacing">
        <div className="container-max">

          {/* Loading */}
          {loading ? (
            <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <div className="mb-4 text-4xl">
                👥
              </div>

              <h2 className="text-xl font-bold text-primary">
                কমিটি তথ্য লোড হচ্ছে...
              </h2>

              <p className="mt-2 text-sm text-paragraph">
                অনুগ্রহ করে অপেক্ষা করুন।
              </p>
            </div>
          ) : committees.length === 0 ? (

            /* Empty State */
            <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <div className="mb-4 text-4xl">
                👥
              </div>

              <h2 className="mb-2 text-xl font-bold text-primary">
                কোনো কমিটি সদস্য পাওয়া যায়নি
              </h2>

              <p className="text-sm text-paragraph">
                পরিচালনা কমিটির সদস্যদের তথ্য শীঘ্রই প্রকাশ করা হবে।
              </p>
            </div>

          ) : (

            /* Committee Grid */
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

              {committees.map((committee) => (
                <article
                  key={committee._id}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:shadow-lg"
                >

                  {/* ================= PHOTO ================= */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-background">

                    {committee.photo ? (
                      <img
                        src={committee.photo}
                        alt={committee.name}
                        className="h-full w-full object-cover transition duration-500"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-4xl font-bold text-white">
                          {committee.name.charAt(0)}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* ================= INFO ================= */}
                  <div className="p-6">

                    {/* Name */}
                    <div className="mb-5">
                      <p className="mb-1 text-xs font-semibold text-secondary">
                        {committee.designation}
                      </p>

                      <h3 className="text-xl font-bold text-primary">
                        {committee.name}
                      </h3>
                    </div>

                    {/* Contact */}
                    {(committee.phone || committee.email) && (
                      <div className="mt-4 space-y-2 border-t border-border pt-4">

                        {committee.phone && (
                          <div className="flex items-center gap-2 text-sm text-paragraph">
                            <Phone size={15} className="shrink-0 text-secondary" />

                            <span>
                              {committee.phone}
                            </span>
                          </div>
                        )}

                        {committee.email && (
                          <div className="flex items-start gap-2 text-sm text-paragraph">
                            <Mail size={15} className="mt-0.5 shrink-0 text-secondary" />

                            <span className="break-all">
                              {committee.email}
                            </span>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                </article>
              ))}

            </div>
          )}
        </div>
      </section>
    </main>
  );
}
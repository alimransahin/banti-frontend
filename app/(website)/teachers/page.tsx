"use client";

import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import api from "@/lib/api";
import { Teacher } from "@/lib/data-store";

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await api.get("/teachers");

        setTeachers(response.data.data);
      } catch (error) {
        console.error(
          "Failed to fetch teachers:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <main>
      <PageHero
        eyebrow="শিক্ষকমণ্ডলী"
        title="আমাদের শিক্ষকবৃন্দ"
        description="আমাদের অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষক মণ্ডলীর সঙ্গে পরিচিত হোন।"
        count={teachers.length}
        countLabel="মোট শিক্ষক/কর্মচারী"
        countIcon="👨‍🏫"
      />

      {/* =====================================================
                TEACHERS
            ===================================================== */}
      <section className="section-spacing">
        <div className="container-max">

          {/* Loading */}
          {loading ? (
            <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <div className="mb-4 text-4xl">
                👨‍🏫
              </div>

              <h2 className="text-xl font-bold text-primary">
                শিক্ষক তথ্য লোড হচ্ছে...
              </h2>

              <p className="mt-2 text-sm text-paragraph">
                অনুগ্রহ করে অপেক্ষা করুন।
              </p>
            </div>
          ) : teachers.length === 0 ? (

            /* Empty State */
            <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <div className="mb-4 text-4xl">
                👨‍🏫
              </div>

              <h2 className="mb-2 text-xl font-bold text-primary">
                কোনো শিক্ষক তথ্য পাওয়া যায়নি
              </h2>

              <p className="text-sm text-paragraph">
                শিক্ষক তালিকা শীঘ্রই প্রকাশ করা হবে।
              </p>
            </div>

          ) : (

            /* Teacher Grid */
            <div className="grid grid-cols-1 gap-5  sm:grid-cols-3">

              {teachers.map((teacher) => (
                <article
                  key={teacher._id}
                  className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:shadow-lg"
                >

                  {/* ================= PHOTO ================= */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-background">

                    {teacher.photo ? (
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className="h-full w-full object-cover transition duration-500 "
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 text-4xl font-bold text-white">
                          {teacher.name.charAt(0)}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* ================= INFO ================= */}
                  <div className="p-6">

                    {/* Name */}
                    <div className="mb-5">
                      <p className="mb-1 text-xs font-semibold text-secondary">
                        {teacher.designation}
                      </p>

                      <h3 className="text-xl font-bold text-primary">
                        {teacher.name}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-paragraph">
                        {teacher.subject}
                      </p>
                    </div>

                    {/* Qualification */}
                    <div className="border-t border-border pt-4">
                      <div className="flex items-start justify-between gap-4">

                        <span className="text-sm text-paragraph">
                          শিক্ষাগত যোগ্যতা
                        </span>

                        <span className="text-right text-sm font-semibold text-primary">
                          {teacher.qualification}
                        </span>

                      </div>
                    </div>

                    {/* Contact */}
                    {(teacher.phone || teacher.email) && (
                      <div className="mt-4 space-y-2 border-t border-border pt-4">

                        {teacher.phone && (
                          <div className="flex items-center gap-2 text-sm text-paragraph">
                            <Phone
                              size={15}
                              className="shrink-0 text-secondary"
                            />

                            <span>
                              {teacher.phone}
                            </span>
                          </div>
                        )}

                        {teacher.email && (
                          <div className="flex items-start gap-2 text-sm text-paragraph">
                            <Mail
                              size={15}
                              className="mt-0.5 shrink-0 text-secondary"
                            />

                            <span className="break-all">
                              {teacher.email}
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
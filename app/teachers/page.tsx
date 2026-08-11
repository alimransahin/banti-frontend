"use client";

import { Mail, Phone } from "lucide-react";
import teachersData from "@/data/teachers.json";

type Teacher = {
  name: string;
  designation: string;
  subject: string;
  qualification: string;
  photo: string;
  phone: string;
  email: string;
};

export default function Teachers() {
  const teachers: Teacher[] = teachersData.teachers;


  return (
    <main>


      <section className="relative mb-2 overflow-hidden bg-primary rounded">

        {/* Decorative Shapes */}

        <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/5" />

        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5" />

        <div className="container-max relative px-4 py-14 sm:py-16 md:py-20">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            {/* Heading */}
            <div className="max-w-3xl">

              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-secondary" />

                <span className="text-sm font-semibold tracking-wide text-white/80">
                  শিক্ষকমণ্ডলী
                </span>
              </div>

              <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                আমাদের শিক্ষকবৃন্দ
              </h1>

              <p className="max-w-2xl text-base leading-8 text-white/80 md:text-lg">
                আমাদের অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষক মণ্ডলীর সঙ্গে পরিচিত হোন।
              </p>

            </div>


            {/* Teacher Count */}
            <div className="shrink-0">

              <div className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-lg">
                  👨‍🏫
                </div>

                <div>
                  <p className="text-xs text-white/65">
                    মোট শিক্ষক/কর্মচারী
                  </p>

                  <p className="text-lg font-bold text-white">
                    {teachers.length} জন
                  </p>
                </div>

              </div>

            </div>

          </div>


        </div>

      </section>



      {/* =====================================================
            TEACHERS
        ===================================================== */}
      <section className="section-spacing">

        <div className="container-max">

          {teachers.length === 0 ? (

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

            <>



              {/* Teacher Grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {teachers.map((teacher, index) => (

                  <article
                    key={`${teacher.name} -${index} `}
                    className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >

                    {/* ================= PHOTO ================= */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-background">

                      {teacher.photo ? (

                        <img
                          src={teacher.photo}
                          alt={teacher.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
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

            </>

          )}

        </div>

      </section>

    </main>
  );

}

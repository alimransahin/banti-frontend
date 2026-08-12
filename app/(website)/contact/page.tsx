"use client";

import PageHero from "@/components/ui/PageHero";
import config from "@/config";
import { Mail, Phone, MapPin, Clock } from "lucide-react";


export default function Contact() {

  return (
    <main>

      {/* =====================================================
            HERO
        ===================================================== */}
      <PageHero
        eyebrow="যোগাযোগ"
        title="যোগাযোগ করুন"
        description="বিদ্যালয় সম্পর্কিত যেকোনো তথ্য, পরামর্শ বা প্রয়োজনে আমাদের সঙ্গে যোগাযোগ করুন।"
      />


      {/* =====================================================
            CONTACT INFORMATION
        ===================================================== */}
      <section className="section-spacing mb-4">

        <div className="container-max">

          <div className="grid gap-5 md:grid-cols-3">

            {/* Phone */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">

              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light">
                <Phone
                  size={21}
                  className="text-secondary"
                />
              </div>

              <h2 className="mb-3 text-lg font-bold text-primary">
                ফোন
              </h2>

              <div className="space-y-1.5">

                <p className="text-sm text-paragraph"                >
                  {config.mobileNo}
                </p>

              </div>

            </div>


            {/* Email */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">

              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light">
                <Mail
                  size={21}
                  className="text-secondary"
                />
              </div>

              <h2 className="mb-3 text-lg font-bold text-primary">
                ই-মেইল
              </h2>

              <div className="space-y-1.5">
                <p className="break-all text-sm text-paragraph"                  >
                  {config.email}
                </p>


              </div>

            </div>


            {/* Address */}
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">

              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light">
                <MapPin
                  size={21}
                  className="text-secondary"
                />
              </div>

              <h2 className="mb-3 text-lg font-bold text-primary">
                ঠিকানা
              </h2>

              <div className="space-y-1.5">

                <p className="text-sm leading-6 text-paragraph"                  >
                  {config.address}
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
MAP + HOURS
===================================================== */}

      <section className="section-spacing bg-background p-4 rounded">

        <div className="container-max">

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

            {/* ================= GOOGLE MAP ================= */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">

              <div className="border-b border-border p-6 md:p-7">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light">
                    <MapPin
                      size={21}
                      className="text-secondary"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-secondary">
                      আমাদের অবস্থান
                    </p>

                    <h2 className="text-xl font-bold text-primary">
                      বিদ্যালয়ের ঠিকানা
                    </h2>
                  </div>

                </div>

              </div>


              {/* Map */}
              <div className="relative h-87.5 w-full sm:h-100">
                <iframe
                  title="Banti Ideal High School Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4367.828254008054!2d90.59356717533788!3d23.813100078627716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755cb296db1f997%3A0xf20a70c2aadf6eb9!2sSazowar!5e1!3m2!1sen!2sbd!4v1786408063901!5m2!1sen!2sbd"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

            </div>


            {/* ================= SCHOOL HOURS ================= */}
            <div className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-sm md:p-7">

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light">
                  <Clock
                    size={21}
                    className="text-secondary"
                  />
                </div>

                <div>

                  <p className="text-xs font-semibold text-secondary">
                    সময়সূচি
                  </p>

                  <h2 className="text-xl font-bold text-primary">
                    বিদ্যালয়ের সময়
                  </h2>

                </div>

              </div>


              <div className="divide-y divide-border">

                <div className="py-4 first:pt-0 last:pb-0">

                  <p className="mb-1 text-sm font-semibold text-primary">
                    Sunday - Thursday
                  </p>

                  <p className="text-sm text-paragraph">
                    10:00 AM - 04:00 PM
                  </p>

                </div>

              </div>

            </div>

          </div>


        </div>

      </section>


    </main>
  );
}

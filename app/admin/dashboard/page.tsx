"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession, } from "@/lib/data-store";
import { Users, FileText, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!getAdminSession()) {
      router.push("/admin");
      return;
    }

    setIsAuthorized(true);

  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="text-sm text-muted">লোড হচ্ছে...</div>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      <PageHero
        eyebrow="অ্যাডমিন প্যানেল"
        title=" ড্যাশবোর্ড"
        description="বিদ্যালয়ের প্রশাসনিক কার্যক্রম পরিচালনা করুন।"
      />



      {/* Management */}
      <section>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* Teachers */}
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:shadow-md sm:p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-light text-secondary">
              <Users size={22} />
            </div>

            <h3 className="text-lg font-bold text-primary">
              শিক্ষক ব্যবস্থাপনা
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted">
              শিক্ষক ও কর্মচারীদের তথ্য যোগ, সম্পাদনা এবং অপসারণ করুন।
            </p>

            <Link href="/admin/dashboard/teachers" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
              শিক্ষক ব্যবস্থাপনা
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Notices */}
          <div className="rounded-xl border border-border bg-surface p-5 shadow-sm transition hover:shadow-md sm:p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-secondary-light text-secondary">
              <FileText size={22} />
            </div>

            <h3 className="text-lg font-bold text-primary">
              নোটিশ ব্যবস্থাপনা
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted">
              বিদ্যালয়ের নোটিশ তৈরি, সম্পাদনা এবং পরিচালনা করুন।
            </p>

            <Link href="/admin/dashboard/notices" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
              নোটিশ ব্যবস্থাপনা
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
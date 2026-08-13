"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminSession } from "@/lib/data-store";
import {
  Users,
  FileText,
  UsersRound,
  Building2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!getAdminSession()) {
      router.replace("/admin");
      return;
    }

    setIsAuthorized(true);
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="text-sm text-muted">
          লোড হচ্ছে...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <PageHero
        eyebrow="অ্যাডমিন প্যানেল"
        title="ড্যাশবোর্ড"
        description="বিদ্যালয়ের প্রশাসনিক কার্যক্রম পরিচালনা করুন।"
      />

      {/* Management */}
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Teachers */}
          <Link
            href="/admin/dashboard/teachers"
            className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
              <Users size={22} />
            </div>

            <h3 className="text-lg font-bold text-primary">
              শিক্ষক ও কর্মচারী
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted">
              শিক্ষক ও কর্মচারীদের তথ্য যোগ, সম্পাদনা এবং
              অপসারণ করুন।
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
              পরিচালনা করুন
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* Committee */}
          <Link
            href="/admin/dashboard/committee"
            className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
              <UsersRound size={22} />
            </div>

            <h3 className="text-lg font-bold text-primary">
              ম্যানেজিং কমিটি
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted">
              বিদ্যালয়ের ম্যানেজিং কমিটির সদস্যদের তথ্য
              পরিচালনা করুন।
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
              পরিচালনা করুন
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* Notices */}
          <Link
            href="/admin/dashboard/notices"
            className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
              <FileText size={22} />
            </div>

            <h3 className="text-lg font-bold text-primary">
              নোটিশ
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted">
              বিদ্যালয়ের নোটিশ তৈরি, সম্পাদনা এবং
              পরিচালনা করুন।
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
              পরিচালনা করুন
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* Administration */}
          <Link
            href="/admin/dashboard/administration"
            className="group rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-6"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
              <Building2 size={22} />
            </div>

            <h3 className="text-lg font-bold text-primary">
              প্রশাসনিক তথ্য
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted">
              বিদ্যালয়ের প্রশাসনিক ও গুরুত্বপূর্ণ তথ্য
              পরিচালনা করুন।
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
              পরিচালনা করুন
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
}
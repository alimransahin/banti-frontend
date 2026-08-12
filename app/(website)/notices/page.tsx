"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Info, Eye } from "lucide-react";
import PageHero from "@/components/ui/PageHero";

import { getNotices } from "@/lib/notice-api";
import type { Notice } from "@/lib/notice-api";
import NoticeViewModal from "@/components/ui/NoticeViewModal";

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getNotices();

      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      );

      setNotices(sorted);
    } catch (error) {
      console.error("Load notices error:", error);
      setError("নোটিশের তথ্য লোড করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">

      {/* Header */}
      <PageHero
        eyebrow="নোটিশ বোর্ড"
        title="সকল নোটিশ"
        description="বিদ্যালয়ের সর্বশেষ বিজ্ঞপ্তি ও গুরুত্বপূর্ণ তথ্য এখানে পাওয়া যাবে।"
      />

      {/* Notice List */}
      <section className="rounded bg-background p-4">
        <div className="mx-auto max-w-5xl">

          {/* Loading */}
          {loading && (
            <div className="rounded-xl border border-border bg-surface px-5 py-12 text-center shadow-sm">
              <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-border border-t-secondary" />

              <p className="text-sm text-muted">
                নোটিশ লোড হচ্ছে...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-8 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && notices.length === 0 && (
            <div className="rounded-xl border border-border bg-surface px-5 py-12 text-center shadow-sm">
              <Info size={42} className="mx-auto mb-3 text-secondary" />

              <h3 className="text-lg font-bold text-primary">
                কোনো নোটিশ পাওয়া যায়নি
              </h3>

              <p className="mt-1 text-sm text-muted">
                বর্তমানে কোনো নোটিশ প্রকাশিত হয়নি।
              </p>
            </div>
          )}

          {/* Notices */}
          {!loading && !error && notices.length > 0 && (
            <div className="space-y-3">
              {notices.map((notice) => (
                <article
                  key={notice._id}
                  className="rounded-xl border border-border bg-surface p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                    {/* Notice Information */}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-bold leading-snug text-primary sm:text-lg">
                        {notice.title}
                      </h2>

                      <div className="mt-2 flex items-center gap-2 text-sm text-muted">
                        <CalendarDays size={15} />

                        <span>
                          প্রকাশের তারিখ:{" "}
                          {new Date(notice.createdAt).toLocaleDateString(
                            "bn-BD",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* View */}
                    <button
                      type="button"
                      onClick={() => setSelectedNotice(notice)}
                      className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      <Eye size={17} />
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Notice Details Modal */}
      <NoticeViewModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
      />

    </main>
  );
}
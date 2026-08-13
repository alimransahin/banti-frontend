"use client";

import schoolContent from "@/data/schoolContent.json";
import config from "@/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getNotices, Notice } from "@/lib/notice-api";
import NoticeViewModal from "../ui/NoticeViewModal";

const schoolImages = ["/assets/banner/1.jpg", "/assets/banner/2.jpg", "/assets/banner/3.jpg"];

export default function NoticeHeroAbout() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

    useEffect(() => {
        const loadNotices = async () => {
            try {
                setLoading(true);
                setError("");
                const data = await getNotices();
                const sorted = [...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setNotices(sorted);
            } catch (error) {
                console.error("Load notices error:", error);
                setError("নোটিশের তথ্য লোড করা যায়নি।");
            } finally {
                setLoading(false);
            }
        };

        loadNotices();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % schoolImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const latestNotices = notices.slice(0, 5);

    return (
        <div>
            {/* ================= NOTICE MARQUEE ================= */}
            <div className="mb-5 flex overflow-hidden rounded-xl border border-border bg-accent-light shadow-sm">
                <div className="z-10 shrink-0 bg-accent px-4 py-2.5 text-xs font-bold text-primary-dark">📢 নোটিশ</div>

                <div className="min-w-0 flex-1 overflow-hidden py-2.5">
                    {loading && <div className="px-5 text-xs font-semibold text-muted">নোটিশ লোড হচ্ছে...</div>}

                    {!loading && error && <div className="px-5 text-xs font-semibold text-red-600">{error}</div>}

                    {!loading && !error && latestNotices.length > 0 && (
                        <div className="flex w-max animate-marquee">
                            {[...latestNotices, ...latestNotices].map((notice, index) => (
                                <button key={`${notice._id}-${index}`} type="button" onClick={() => setSelectedNotice(notice)} className="mx-5 shrink-0 cursor-pointer whitespace-nowrap text-xs font-semibold text-primary transition hover:text-secondary">
                                    {notice.title}
                                    <span className="mx-5 text-accent">★★★</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {!loading && !error && latestNotices.length === 0 && <div className="px-5 text-xs font-semibold text-muted">বর্তমানে কোনো নোটিশ প্রকাশিত হয়নি।</div>}
                </div>
            </div>

            {/* ================= HERO / CAROUSEL ================= */}
            <section className="mb-5 overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-sm">
                <div className="aspect-video overflow-hidden rounded-lg">
                    <img src={schoolImages[currentImageIndex]} alt={`${config.schoolNameBN} - ${currentImageIndex + 1}`} className="h-full w-full object-cover transition-opacity duration-700" />
                </div>

                <div className="mt-4 flex justify-center gap-2">
                    {schoolImages.map((_, index) => (
                        <button key={index} type="button" onClick={() => setCurrentImageIndex(index)} aria-label={`Image ${index + 1}`} className={["h-2.5 w-2.5 rounded-full transition-all duration-300", index === currentImageIndex ? "scale-125 bg-primary" : "bg-border hover:bg-secondary"].join(" ")} />
                    ))}
                </div>
            </section>

            {/* ================= SCHOOL OVERVIEW ================= */}
            <section className="mb-5 rounded-xl border border-border bg-surface p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full bg-accent" />

                    <h2 className="text-lg font-bold text-primary">{config.schoolNameBN} সম্পর্কে</h2>
                </div>

                <div className="whitespace-pre-line text-sm leading-7 text-text">{schoolContent[0].content.slice(0, 450)}...</div>

                <Link href="/about" className="mt-4 inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-secondary">
                    বিস্তারিত <span>→</span>
                </Link>
            </section>

            {/* ================= NOTICE MODAL ================= */}
            <NoticeViewModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
        </div>
    );
}
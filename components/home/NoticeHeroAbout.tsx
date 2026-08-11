"use client";

import schoolContent from "@/data/schoolContent.json";

import config from "@/config";
import Link from "next/link";
import { useState } from "react";

export default function NoticeHeroAbout() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const notices = [
        {
            id: "1",
            title: "নিয়োগ বিজ্ঞপ্তি প্রকাশিত হয়েছে",
            href: "/notices/1",
        },
        {
            id: "2",
            title: "এসএসসি পরীক্ষার সময়সূচী প্রকাশিত",
            href: "/notices/2",
        },
        {
            id: "3",
            title: "ছুটির দিনের তালিকা প্রকাশিত",
            href: "/notices/3",
        },
        {
            id: "4",
            title: "নতুন শিক্ষার্থী ভর্তি সংক্রান্ত বিজ্ঞপ্তি",
            href: "/notices/4",
        },
        {
            id: "5",
            title: "বার্ষিক ক্রীড়া প্রতিযোগিতা সংক্রান্ত নোটিশ",
            href: "/notices/5",
        },
        {
            id: "6",
            title: "অভিভাবক সমাবেশ সংক্রান্ত বিজ্ঞপ্তি",
            href: "/notices/6",
        },
        {
            id: "7",
            title: "বিদ্যালয়ের নতুন সময়সূচী প্রকাশিত",
            href: "/notices/7",
        },
    ];

    const latestNotices = notices.slice(-5);

    const schoolImages = [
        "/assets/banner/1.png",
        "/assets/banner/2.png",
        "/assets/banner/3.jpg",
    ];

    return (
        <div>            {/* ================= NOTICE MARQUEE ================= */}
            <div className="mb-5 flex overflow-hidden rounded-xl border border-border bg-accent-light shadow-sm">

                {/* Label */}
                <div className="z-10 shrink-0 bg-accent px-4 py-2.5 text-xs font-bold text-primary-dark">
                    📢 নোটিশ
                </div>

                {/* Marquee */}
                <div className="min-w-0 flex-1 overflow-hidden py-2.5">

                    <div className="flex w-max animate-marquee">

                        {/* First Group */}
                        <div className="flex shrink-0 items-center">

                            {latestNotices.map((notice) => (
                                <Link key={`first-${notice.id}`} href={notice.href} className="mx-5 shrink-0 whitespace-nowrap text-xs font-semibold text-primary transition hover:text-secondary">
                                    {notice.title}

                                    <span className="mx-5 text-accent">
                                        ★★★
                                    </span>
                                </Link>
                            ))}

                        </div>

                        {/* Duplicate Group */}
                        <div className="flex shrink-0 items-center">

                            {latestNotices.map((notice) => (
                                <Link key={`second-${notice.id}`} href={notice.href} className="mx-5 shrink-0 whitespace-nowrap text-xs font-semibold text-primary transition hover:text-secondary">
                                    {notice.title}

                                    <span className="mx-5 text-accent">
                                        ★★★
                                    </span>
                                </Link>
                            ))}

                        </div>

                    </div>

                </div>
            </div>


            {/* ================= HERO / CAROUSEL ================= */}
            <section className="mb-5 overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-sm">

                <div className="aspect-video overflow-hidden rounded-lg">

                    <img
                        src={schoolImages[currentImageIndex]}
                        alt="School Building"
                        className="h-full w-full object-cover transition-all duration-500"
                    />

                </div>

                {/* Controls */}
                <div className="mt-4 flex justify-center gap-2">

                    {schoolImages.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentImageIndex(index)}
                            aria-label={`Image ${index + 1}`}
                            className={[
                                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                                index === currentImageIndex ? "scale-125 bg-primary" : "bg-border hover:bg-secondary",
                            ].join(" ")}
                        />
                    ))}

                </div>

            </section>


            {/* ================= SCHOOL OVERVIEW ================= */}
            <section className="mb-5 rounded-xl border border-border bg-surface p-5 shadow-sm">

                <div className="mb-4 flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full bg-accent" />

                    <h2 className="text-lg font-bold text-primary">
                        {config.schoolNameBN} সম্পর্কে
                    </h2>
                </div>

                <div className="whitespace-pre-line text-sm leading-7 text-text">
                    {schoolContent[0].content.slice(0, 450)}...
                </div>

                <Link href="/about" className="mt-4 inline-flex items-center gap-1 font-semibold text-primary transition-colors hover:text-secondary">
                    বিস্তারিত <span>→</span>
                </Link>

            </section>
        </div>
    )
}
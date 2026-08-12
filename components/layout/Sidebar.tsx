"use client";

import { useEffect, useState } from "react";
import { getNotices, Notice } from "@/lib/notice-api";
import Link from "next/link";
import NoticeViewModal from "../ui/NoticeViewModal";

interface SidebarProps {
    setCurrentPage?: (page: string) => void;
}

export const importantLinks = [
    {
        name: "ঢাকা শিক্ষা বোর্ড",
        url: "https://dhakaeducationboard.gov.bd/",
    },
    {
        name: "মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর (DSHE)",
        url: "https://dshe.gov.bd/",
    },
    {
        name: "EMIS (Education Management Information System)",
        url: "https://emis.gov.bd/",
    },
    {
        name: "শিক্ষা মন্ত্রণালয়",
        url: "https://moedu.gov.bd/",
    },
    {
        name: "জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)",
        url: "https://nctb.gov.bd/",
    },
    {
        name: "BANBEIS",
        url: "https://banbeis.gov.bd/",
    },
    {
        name: "বাংলাদেশ শিক্ষা বোর্ড",
        url: "https://educationboard.gov.bd/",
    },
    {
        name: "এসএসসি/এইচএসসি পরীক্ষার ফলাফল",
        url: "https://www.educationboardresults.gov.bd/",
    },

    {
        name: "বাংলাদেশ জাতীয় তথ্য বাতায়ন",
        url: "https://bangladesh.gov.bd/",
    },
    {
        name: "প্রধানমন্ত্রীর শিক্ষা সহায়তা ট্রাস্ট",
        url: "https://pmeat.gov.bd/",
    },
];

export const governmentLinks = [
    {
        name: "বাংলাদেশ জাতীয় তথ্য বাতায়ন",
        url: "https://bangladesh.gov.bd",
    },
    {
        name: "বাংলাদেশ সরকারের ওয়েব পোর্টাল",
        url: "https://www.gov.bd",
    },
    {
        name: "বাংলাদেশ নির্বাচন কমিশন",
        url: "https://ecs.gov.bd",
    },
    {
        name: "বাংলাদেশ পুলিশ",
        url: "https://www.police.gov.bd",
    },
    {
        name: "ফায়ার সার্ভিস ও সিভিল ডিফেন্স",
        url: "https://fireservice.gov.bd",
    },
    {
        name: "বাংলাদেশ আবহাওয়া অধিদপ্তর",
        url: "https://www.bmd.gov.bd",
    },
];

export const emergencyContacts = [
    {
        name: "৩৩৩ — সরকারি তথ্য ও সেবা",
        number: "333",
    },
    {
        name: "৯৯৯ — জরুরি সেবা",
        number: "999",
    },
    {
        name: "১০৯ — নারী ও শিশু নির্যাতন প্রতিরোধ",
        number: "109",
    },
    {
        name: "১০৬ — দুর্নীতি দমন কমিশন (দুদক)",
        number: "106",
    },
    {
        name: "১০৯০ — দুর্যোগের আগাম বার্তা",
        number: "1090",
    },
];


export default function Sidebar({ setCurrentPage }: SidebarProps) {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
    useEffect(() => { loadNotices(); }, []);

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

            setNotices(sorted.slice(0, 5));
        } catch (error) {
            console.error("Load notices error:", error);
            setError("নোটিশ লোড করা যায়নি।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <aside className="w-full space-y-5">

                {/* ================= ACHIEVEMENT ================= */}
                <div className="rounded-lg border border-border bg-surface p-3 text-center shadow-sm">

                    <h4 className="mb-3 text-[13px] font-bold text-primary">
                        দাক্ষিণ্যের স্বীকৃতি
                    </h4>

                    <img
                        src="https://images.unsplash.com/photo-1599305445671-639c74d37de4?w=150&h=80&fit=crop"
                        alt="Awards"
                        className="h-auto w-full rounded object-cover"
                    />

                </div>


                {/* ================= NOTICE BOARD ================= */}
                <div className="rounded-lg bg-secondary p-3 text-white shadow-sm">

                    <h4 className="mb-3 text-[13px] font-bold">
                        নোটিশ বোর্ড
                    </h4>

                    <div className="max-h-[150px] min-h-[120px] overflow-y-auto rounded bg-surface p-3 text-[12px] text-text">

                        {/* Loading */}
                        {loading && (
                            <div className="flex min-h-[90px] items-center justify-center text-[11px] font-semibold text-muted">
                                নোটিশ লোড হচ্ছে...
                            </div>
                        )}

                        {/* Error */}
                        {!loading && error && (
                            <div className="flex min-h-[90px] items-center justify-center text-center text-[11px] font-semibold text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Notices */}
                        {!loading &&
                            !error &&
                            notices.length > 0 && (
                                <ul className="m-0 list-disc space-y-2 pl-5">

                                    {notices.map((notice) => (
                                        <li
                                            key={notice._id}
                                            className="text-[11px]"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setSelectedNotice(notice)
                                                }
                                                className="cursor-pointer text-left leading-5 text-text transition hover:text-secondary"
                                            >
                                                {notice.title}
                                            </button>
                                        </li>
                                    ))}

                                </ul>
                            )}

                        {/* Empty */}
                        {!loading &&
                            !error &&
                            notices.length === 0 && (
                                <div className="flex min-h-[90px] items-center justify-center text-center text-[11px] font-semibold text-muted">
                                    বর্তমানে কোনো নোটিশ প্রকাশিত হয়নি।
                                </div>
                            )}

                    </div>

                    <Link
                        href="/notices"
                        className="mt-2 block w-full cursor-pointer rounded bg-accent px-2 py-2 text-center text-[11px] font-bold text-text transition hover:bg-accent-light"
                    >
                        সকল নোটিশ দেখুন »
                    </Link>

                </div>

                {/* ================= IMPORTANT     LINKS ================= */}
                <SidebarBox
                    title="গুরুত্বপূর্ণ লিংক"
                    items={importantLinks}
                    link="href"
                />

                <SidebarBox
                    title="সরকারি গুরুত্বপূর্ণ লিংক"
                    items={governmentLinks}
                    link="href"
                />

                <SidebarBox
                    title="জরুরি যোগাযোগ"
                    items={emergencyContacts}
                    link="tel"
                />

            </aside>


            {/* ================= NOTICE MODAL ================= */}
            <NoticeViewModal
                notice={selectedNotice}
                onClose={() => setSelectedNotice(null)}
            />
        </>
    );
}


/* =========================================
   REUSABLE SIDEBAR BOX
========================================= */

interface SidebarBoxItem {
    name: string;
    url?: string;
    number?: string;
}

interface SidebarBoxProps {
    title: string;
    items: SidebarBoxItem[];
    link?: "href" | "tel";
}

function SidebarBox({
    title,
    items,
    link = "href",
}: SidebarBoxProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">

            <div className="flex items-center gap-2 bg-primary px-4 py-2.5">
                <span className="h-5 w-1 rounded-full bg-accent" />

                <h4 className="text-[13px] font-bold text-white">
                    {title}
                </h4>
            </div>

            <ul className="m-0 list-none p-0">
                {items.map((item) => {
                    const href =
                        link === "tel"
                            ? `tel:${item.number}`
                            : item.url;

                    return (
                        <li
                            key={item.name}
                            className="border-b border-border last:border-b-0"
                        >
                            <a
                                href={href}
                                target={link === "href" ? "_blank" : undefined}
                                rel={
                                    link === "href"
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className="group flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-[11px] font-semibold text-text transition-all duration-200 hover:bg-primary-light hover:text-primary"
                            >
                                <span className="text-accent transition-transform duration-200 group-hover:translate-x-1">
                                    →
                                </span>

                                <span className="leading-5">
                                    {item.name}
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
}
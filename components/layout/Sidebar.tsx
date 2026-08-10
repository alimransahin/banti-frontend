"use client";

interface SidebarProps {
    setCurrentPage?: (page: string) => void;
}

const importantForms = [
    "ছাত্র ভর্তি ফরম",
    "ট্রান্সফার সার্টিফিকেট ফরম",
    "চরিত্র সার্টিফিকেট ফরম",
    "ছুটির দরখাস্ত ফরম",
];

const importantLinks = [
    "শিক্ষা বোর্ড",
    "এসএসসি পরীক্ষার ফলাফল",
    "অনলাইন ভর্তি সিস্টেম",
    "শিক্ষার্থী ডিজিটাল আইডি",
];

const governmentServices = [
    "আন্তর্জাতিক পরিচয় পত্র",
    "শিক্ষার্থী বৃত্তি কর্মসূচি",
    "শিক্ষা উপকরণ সহায়তা",
    "শিক্ষা ঋণ কর্মসূচি",
];

const notices = [
    "নিয়োগ বিজ্ঞপ্তি সম্পর্কিত তথ্য",
    "পরীক্ষার সময়সূচী প্রকাশিত",
    "ছুটির দিনের তালিকা",
    "ভর্তি নোটিশ আপডেট",
];

export default function Sidebar({ setCurrentPage }: SidebarProps) {
    const handleNoticeClick = () => {
        setCurrentPage?.("notices");
    };

    return (
        <aside className="w-full space-y-5">

            {/* Achievement */}
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


            {/* Notice Board */}
            <div className="rounded-lg bg-secondary p-3 text-white shadow-sm">

                <h4 className="mb-3 text-[13px] font-bold">
                    নোটিস বোর্ড
                </h4>

                <div className="max-h-[150px] min-h-[120px] overflow-y-auto rounded bg-surface p-3 text-[12px] text-text">

                    <ul className="m-0 list-disc space-y-2 pl-5">

                        {notices.map((notice) => (
                            <li
                                key={notice}
                                className="text-[11px]"
                            >
                                {notice}
                            </li>
                        ))}

                    </ul>

                </div>

                <button
                    type="button"
                    onClick={handleNoticeClick}
                    className="
                        mt-2
                        w-full
                        rounded
                        bg-accent
                        px-2
                        py-2
                        text-[11px]
                        font-bold
                        text-text
                        transition
                        hover:bg-accent-light
                    "
                >
                    সকল নোটিশ দেখুন »
                </button>

            </div>


            {/* Important Forms */}
            <SidebarBox
                title="উল্লেখপূর্ণ ফরম"
                items={importantForms}
            />


            {/* Important Links */}
            <SidebarBox
                title="গুরুত্বপূর্ণ লিংক"
                items={importantLinks}
            />


            {/* Government Services */}
            <SidebarBox
                title="সরকারি সেবা"
                items={governmentServices}
            />

        </aside>
    );
}


/* =========================================
   Reusable Sidebar Box
========================================= */

interface SidebarBoxProps {
    title: string;
    items: string[];
}

function SidebarBox({
    title,
    items,
}: SidebarBoxProps) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">

            {/* ================= HEADER ================= */}
            <div className="flex items-center gap-2 bg-primary px-4 py-2.5">

                {/* Accent */}
                <span className="h-5 w-1 rounded-full bg-accent" />

                <h4 className="text-[13px] font-bold text-white">
                    {title}
                </h4>

            </div>

            {/* ================= ITEMS ================= */}
            <ul className="m-0 list-none p-0">

                {items.map((item) => (
                    <li
                        key={item}
                        className="border-b border-border last:border-b-0"
                    >
                        <button
                            type="button"
                            className="
                                group
                                flex
                                w-full
                                items-center
                                gap-2
                                px-4
                                py-2.5
                                text-left
                                text-[11px]
                                font-semibold
                                text-text
                                transition-all
                                duration-200
                                hover:bg-primary-light
                                hover:text-primary
                            "
                        >

                            {/* Arrow */}
                            <span
                                className="
                                    text-accent
                                    transition-transform
                                    duration-200
                                    group-hover:translate-x-1
                                "
                            >
                                →
                            </span>

                            {/* Text */}
                            <span className="leading-5">
                                {item}
                            </span>

                        </button>
                    </li>
                ))}

            </ul>
        </div>
    );
}
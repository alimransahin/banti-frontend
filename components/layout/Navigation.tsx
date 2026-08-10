"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { href: "/", label: "হোম", icon: "🏠" },
    { href: "/about", label: "প্রতিষ্ঠান সম্পর্কিত", icon: "ℹ️" },
    { href: "/administration", label: "প্রশাসনিক তথ্য", icon: "📋" },
    { href: "/teachers", label: "শিক্ষক ও কর্মচারী", icon: "👨‍🏫" },
    { href: "/notices", label: "নোটিশ", icon: "📢" },
    { href: "/academic", label: "একাডেমিক", icon: "📚" },
    { href: "/gallery", label: "গ্যালারি ও কর্নার", icon: "🖼️" },
    { href: "/recruitment", label: "নিয়োগ বিজ্ঞপ্তি", icon: "💼" },
    { href: "/contact", label: "যোগাযোগ", icon: "✉️" },
];

export default function Navigation() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <nav className="bg-[#228B22] border-b-3 border-[#FFC107]">

            {/* ================= DESKTOP ================= */}
            <div className="hidden md:block">
                <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-4 flex-wrap py-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`px-2 py-1 text-[13px] font-bold whitespace-nowrap no-underline ${isActive(item.href)
                                ? "text-[#FFC107]"
                                : "text-white"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <Link
                        href="/admin"
                        className={`px-2 py-1 text-[13px] font-bold whitespace-nowrap no-underline ${pathname.startsWith("/admin")
                            ? "text-[#FFC107]"
                            : "text-white"
                            }`}
                    >
                        লগইন
                    </Link>
                </div>
            </div>

            {/* ================= MOBILE ================= */}
            <div className="block md:hidden">

                {/* Menu Button */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    className="w-full px-4 py-3 text-left text-white font-bold text-[15px] bg-[#228B22] border-0"
                >
                    {mobileMenuOpen ? "✕ বন্ধ করুন" : "☰ মেনু"}
                </button>

                {/* Menu */}
                {mobileMenuOpen && (
                    <div className="bg-[#1a6b1a]">

                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`
                  block w-full px-5 py-3.5
                  text-[14px] font-bold no-underline
                  border-l-4
                  ${isActive(item.href)
                                        ? "text-[#FFC107] border-[#FFC107]"
                                        : "text-white border-transparent"
                                    }
                `}
                            >
                                {item.icon} {item.label}
                            </Link>
                        ))}

                        {/* Login */}
                        <Link
                            href="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`
                block w-full px-5 py-3.5
                text-[14px] font-bold no-underline
                border-l-4
                bg-[rgba(255,193,7,0.1)]
                ${pathname.startsWith("/admin")
                                    ? "text-[#FFC107] border-[#FFC107]"
                                    : "text-white border-transparent"
                                }
              `}
                        >
                            🔐 লগইন
                        </Link>

                    </div>
                )}
            </div>

        </nav>
    );
}
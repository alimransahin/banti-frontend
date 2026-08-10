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
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className="w-full bg-secondary border-b-[3px] border-accent shadow-sm">

            {/* ================= DESKTOP / TABLET ================= */}
            <div className="hidden md:block">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 py-2">

                        {navItems.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={[
                                        "relative px-2.5 py-2 lg:px-3",
                                        "whitespace-nowrap text-[13px] font-bold lg:text-[14px]",
                                        "no-underline transition-colors duration-200",

                                        active
                                            ? "text-accent"
                                            : "text-white hover:text-accent",
                                    ].join(" ")}
                                >
                                    {item.label}

                                    {active && (
                                        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent" />
                                    )}
                                </Link>
                            );
                        })}

                        {/* Login */}
                        <Link
                            href="/admin"
                            className={[
                                "ml-1 rounded px-3 py-2",
                                "whitespace-nowrap text-[13px] font-bold lg:text-[14px]",
                                "no-underline transition-all duration-200",

                                pathname.startsWith("/admin")
                                    ? "bg-accent text-primary-dark"
                                    : "text-white hover:bg-secondary-dark",
                            ].join(" ")}
                        >
                            🔐 লগইন
                        </Link>

                    </div>
                </div>
            </div>

            {/* ================= MOBILE ================= */}
            <div className="md:hidden">

                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between px-4 py-2.5">

                    <span className="text-[15px] font-bold text-white">
                        মেনু
                    </span>

                    <button
                        type="button"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={() =>
                            setMobileMenuOpen(!mobileMenuOpen)
                        }
                        className="
                            flex h-9 w-10 items-center justify-center
                            rounded border border-white/20
                            bg-secondary-dark
                            text-xl text-white
                            transition
                            hover:bg-primary-dark
                            active:scale-95
                        "
                    >
                        {mobileMenuOpen ? "✕" : "☰"}
                    </button>

                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="border-t border-white/10 bg-secondary-dark">

                        {navItems.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className={[
                                        "flex w-full items-center gap-3",
                                        "border-l-4 px-5 py-3",
                                        "text-[14px] font-bold no-underline",
                                        "transition-all duration-200",

                                        active
                                            ? "border-accent bg-primary-dark text-accent"
                                            : "border-transparent text-white hover:bg-primary-dark hover:text-accent",
                                    ].join(" ")}
                                >
                                    <span className="w-6 text-center">
                                        {item.icon}
                                    </span>

                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        {/* Login */}
                        <Link
                            href="/admin"
                            onClick={closeMobileMenu}
                            className={[
                                "flex w-full items-center gap-3",
                                "border-l-4 border-t px-5 py-3",
                                "text-[14px] font-bold no-underline",
                                "transition-all duration-200",

                                pathname.startsWith("/admin")
                                    ? "border-accent bg-primary-dark text-accent"
                                    : "border-transparent bg-secondary-dark text-white hover:text-accent",
                            ].join(" ")}
                        >
                            <span className="w-6 text-center">
                                🔐
                            </span>

                            <span>লগইন</span>
                        </Link>

                    </div>
                )}

            </div>

        </nav>
    );
}
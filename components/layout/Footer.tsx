import Link from "next/link";
import config from "@/config";

const footerLinks = [
    { href: "/notices", label: "নোটিশ" },
    { href: "/contact", label: "যোগাযোগ" },
    { href: "/academic", label: "শিক্ষা সংক্রান্ত" },
    { href: "#", label: "EMIS" },
    { href: "#", label: "শিক্ষা ও তথ্যপ্রযুক্তি" },
    { href: "#", label: "JSC/SSC RESULT" },
];

export default function Footer() {
    return (
        <footer className="mt-8 bg-primary-dark text-white">

            {/* ================= MAIN FOOTER ================= */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:px-6">

                {/* ================= ABOUT SCHOOL ================= */}
                <div>

                    {/* Logo */}
                    <div className="mb-4 flex items-center gap-3">

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20">
                            <img
                                src="/assets/logo.png"
                                alt={`${config.schoolNameBN} Logo`}
                                className="h-full w-full object-contain"
                            />
                        </div>

                        <div className="min-w-0">
                            <h3 className="text-base font-bold text-white">
                                {config.schoolNameBN}
                            </h3>

                            <p className="mt-0.5 text-[10px] text-white/60">
                                {config.schoolNameEN}
                            </p>
                        </div>

                    </div>

                    <p className="mb-5 max-w-sm text-xs leading-7 text-white/75">
                        আমাদের প্রাতিষ্ঠানিক লক্ষ্য শিক্ষার্থীদের সর্বোচ্চ মানের
                        শিক্ষা প্রদান করা এবং তাদের জ্ঞান, দক্ষতা ও নৈতিক
                        মূল্যবোধের বিকাশে সহায়তা করা।
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-2">

                        <a
                            href="#"
                            aria-label="Facebook"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white transition hover:border-accent hover:bg-accent hover:text-primary-dark"
                        >
                            f
                        </a>

                        <a
                            href="#"
                            aria-label="X"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white transition hover:border-accent hover:bg-accent hover:text-primary-dark"
                        >
                            𝕏
                        </a>

                        <a
                            href="#"
                            aria-label="YouTube"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white transition hover:border-accent hover:bg-accent hover:text-primary-dark"
                        >
                            ▶
                        </a>

                    </div>

                </div>


                {/* ================= IMPORTANT LINKS ================= */}
                <div>

                    <div className="mb-5 flex items-center gap-3">
                        <div className="h-7 w-1 rounded-full bg-accent" />

                        <h3 className="text-sm font-bold text-white">
                            গুরুত্বপূর্ণ লিংক
                        </h3>
                    </div>

                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">

                        {footerLinks.map((link) => (
                            <li key={link.label}>

                                <Link
                                    href={link.href}
                                    className="group flex items-center gap-2 text-xs text-white/70 transition hover:text-accent"
                                >
                                    <span className="text-accent transition-transform group-hover:translate-x-1">
                                        →
                                    </span>

                                    <span>
                                        {link.label}
                                    </span>
                                </Link>

                            </li>
                        ))}

                    </ul>

                </div>


                {/* ================= CONTACT ================= */}
                <div>

                    <div className="mb-5 flex items-center gap-3">
                        <div className="h-7 w-1 rounded-full bg-accent" />

                        <h3 className="text-sm font-bold text-white">
                            যোগাযোগ
                        </h3>
                    </div>

                    <div className="space-y-3">

                        {/* Address */}
                        <div className="flex gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm">
                                📍
                            </span>

                            <p className="m-0 text-xs leading-6 text-white/70">
                                {config.address}
                            </p>
                        </div>

                        {/* Mobile */}
                        <div className="flex gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm">
                                📞
                            </span>

                            <p className="m-0 text-xs leading-6 text-white/70">
                                {config.mobileNo}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="flex gap-3">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-sm">
                                ✉
                            </span>

                            <p className="m-0 break-all text-xs leading-6 text-white/70">
                                {config.email}
                            </p>
                        </div>

                    </div>

                </div>

            </div>


            {/* ================= COPYRIGHT ================= */}
            <div className="border-t border-white/10">

                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-center text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between lg:px-6">

                    <p className="m-0">
                        © 2026 {config.schoolNameEN}. সর্বস্বত্ব সংরক্ষিত।
                    </p>

                    <p className="m-0">
                        Developed By:{" "}
                        <span className="font-semibold text-white/70">
                            Md. Al Imran
                        </span>
                    </p>

                </div>

            </div>

        </footer>
    );
}


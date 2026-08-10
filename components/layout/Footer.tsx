import Link from "next/link";
import config from "@/config";

const footerLinks = [
    { href: "/notices", label: "» নোটিশ" },
    { href: "/contact", label: "» যোগাযোগ" },
    { href: "/academic", label: "» শিক্ষা সংক্রান্ত" },
    { href: "#", label: "» EMIS" },
    { href: "#", label: "» শিক্ষা ও তথ্যপ্রযুক্তি" },
    { href: "#", label: "» JSC/SSC RESULT" },
];

export default function Footer() {
    return (
        <footer
            style={{
                backgroundColor: "#228B22",
                color: "white",
                padding: "30px 15px",
                marginTop: "40px",
                fontSize: "12px",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "30px",
                    marginBottom: "30px",
                }}
            >
                {/* About School */}
                <div>
                    {/* Logo */}
                    <div
                        style={{
                            width: "60px",
                            height: "70px",
                            background:
                                "linear-gradient(135deg, #FFC107 0%, #FFB300 100%)",
                            clipPath:
                                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            color: "#005A9C",
                            fontSize: "14px",
                            marginBottom: "15px",
                        }}
                    >
                        DEMO
                    </div>

                    <p
                        style={{
                            fontSize: "12px",
                            lineHeight: "1.6",
                            marginBottom: "15px",
                            color: "rgba(255,255,255,0.9)",
                        }}
                    >
                        আমাদের প্রাতিষ্ঠানিক লক্ষ্য শিক্ষার্থীদের সর্বোচ্চ মানের শিক্ষা
                        প্রদান করা।
                    </p>

                    {/* Social Links */}
                    <div style={{ display: "flex", gap: "15px" }}>
                        <a href="#" style={socialStyle}>
                            f
                        </a>
                        <a href="#" style={socialStyle}>
                            𝕏
                        </a>
                        <a href="#" style={socialStyle}>
                            ▶
                        </a>
                        <a href="#" style={socialStyle}>
                            ⚙
                        </a>
                    </div>
                </div>

                {/* Important Links */}
                <div>
                    <h3 style={headingStyle}>গুরুত্বপূর্ণ লিংক</h3>

                    <ul
                        style={{
                            margin: 0,
                            padding: 0,
                            listStyle: "none",
                        }}
                    >
                        {footerLinks.map((link) => (
                            <li key={link.label} style={{ marginBottom: "6px" }}>
                                <Link href={link.href} style={linkStyle}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 style={headingStyle}>যোগাযোগ</h3>

                    <p style={contactStyle}>📍 {config.address}</p>

                    <p style={contactStyle}>📞 {config.mobileNo}</p>

                    <p style={contactStyle}>✉️ {config.email}</p>

                    <p style={contactStyle}>🌐 {config.website}</p>
                </div>
            </div>

            {/* Copyright */}
            <div
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.2)",
                    paddingTop: "15px",
                    textAlign: "center",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.8)",
                }}
            >
                <p style={{ margin: "0 0 5px 0" }}>
                    Copyright @ 2026, {config.schoolNameEN}. All Rights Reserved.
                </p>

                <p style={{ margin: 0 }}>
                    Developed By: Md. Al Imran
                </p>
            </div>
        </footer>
    );
}

const headingStyle = {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "12px",
    fontFamily: '"Noto Sans Bengali", serif',
};

const linkStyle = {
    color: "rgba(255,255,255,0.9)",
    textDecoration: "none",
    fontSize: "11px",
};

const contactStyle = {
    margin: "0 0 8px 0",
    color: "rgba(255,255,255,0.9)",
    fontSize: "11px",
};

const socialStyle = {
    color: "white",
    fontSize: "16px",
    textDecoration: "none",
};
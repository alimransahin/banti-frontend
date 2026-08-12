import "@/app/globals.css";
import { Metadata } from "next";
import { Noto_Sans_Bengali, Noto_Serif_Bengali } from "next/font/google";

export const metadata: Metadata = {
    title: {
        default: "বান্টি আদর্শ উচ্চ বিদ্যালয়",
        template: "%s | বান্টি আদর্শ উচ্চ বিদ্যালয়",
    },
    description: "বান্টি আদর্শ উচ্চ বিদ্যালয়ের অফিসিয়াল ওয়েবসাইট",
};
// const banglaFont = Noto_Sans_Bengali({
//     subsets: ["bengali"],
//     variable: "--font-bangla",
//     display: "swap",
// });
const banglaFont = Noto_Serif_Bengali({
    subsets: ["bengali"],
    display: "swap",
});
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="bn">
            <body className={banglaFont.className}>
                {children}
            </body>
        </html>
    );
}
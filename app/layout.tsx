import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: {
    default: "বান্টি আদর্শ উচ্চ বিদ্যালয়",
    template: "%s | বান্টি আদর্শ উচ্চ বিদ্যালয়",
  },
  description: "বান্টি আদর্শ উচ্চ বিদ্যালয়ের অফিসিয়াল ওয়েবসাইট",
};
const banglaFont = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bangla",
  display: "swap",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
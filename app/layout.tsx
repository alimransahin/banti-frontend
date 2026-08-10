import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "চকগোপাল উচ্চ বিদ্যালয়",
  description: "চকগোপাল উচ্চ বিদ্যালয়ের অফিসিয়াল ওয়েবসাইট",
};

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
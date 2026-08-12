import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-primary">
            <AdminSidebar />
            <div className="lg:pl-64">
                <main className="min-h-screen p-4 sm:p-5 lg:p-6">
                    <div className="mx-auto w-full max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
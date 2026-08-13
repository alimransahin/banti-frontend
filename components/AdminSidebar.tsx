"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Users, FileText, LogOut, Home, Menu, X } from "lucide-react";
import { setAdminSession } from "@/lib/data-store";
import { useState } from "react";
import config from "@/config";

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setAdminSession(false);
    router.push("/admin");
  };

  const menuItems = [
    { label: "ড্যাশবোর্ড", href: "/admin/dashboard", icon: Home },
    { label: "শিক্ষক ও কর্মচারী", href: "/admin/dashboard/teachers", icon: Users },
    { label: "ম্যানেজিং কমিটি", href: "/admin/dashboard/committee", icon: Users },
    { label: "নোটিশ", href: "/admin/dashboard/notices", icon: FileText },
    { label: "প্রশাসনিক তথ্য", href: "/admin/dashboard/administration", icon: FileText },
  ];

  return (
    <>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="fixed left-4 top-4 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-primary text-white shadow-md transition hover:opacity-90 lg:hidden" aria-label="মেনু">
        {isOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-primary text-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="border-b border-white/10 px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-white shadow-sm">
              <span className="text-xl">🏫</span>
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-base font-bold text-white">
                অ্যাডমিন প্যানেল
              </h2>

              <p className="mt-1 truncate text-xs text-white/60">
                {config.schoolNameBN}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/45">
            প্রশাসনিক মেনু
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

              return (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${isActive ? "bg-secondary text-white shadow-sm" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>
                  <Icon size={19} className="shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <button type="button" onClick={handleLogout} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 hover:text-white">
            <LogOut size={18} />
            <span>লগআউট</span>
          </button>
        </div>

      </aside>
    </>
  );
}
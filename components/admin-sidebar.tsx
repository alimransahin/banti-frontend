'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Users, FileText, LogOut, Home, Menu, X } from 'lucide-react'
import { setAdminSession } from '@/lib/data-store'
import { useState } from 'react'

export function AdminSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    setAdminSession(false)
    router.push('/admin')
  }

  const menuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { label: 'Teachers', href: '/admin/teachers', icon: Users },
    { label: 'Notices', href: '/admin/notices', icon: FileText },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        title="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform lg:transform-none transition-transform duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } shadow-lg`}
      >
        <div className="p-4 sm:p-6 border-b border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold">Admin Panel</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Chakgopal High School</p>
        </div>

        <nav className="mt-6 sm:mt-8 space-y-1 px-3 sm:px-4">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="text-sm sm:text-base">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base font-semibold"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

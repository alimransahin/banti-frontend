'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminSession, getTeachers, getActiveNotices } from '@/lib/data-store'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Users, FileText, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [stats, setStats] = useState({ teachers: 0, notices: 0 })

  useEffect(() => {
    if (!getAdminSession()) {
      router.push('/admin')
      return
    }
    setIsAuthorized(true)

    // Load stats
    const teachers = getTeachers()
    const notices = getActiveNotices()
    setStats({
      teachers: teachers.length,
      notices: notices.length,
    })
  }, [router])

  if (!isAuthorized) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-3 sm:p-4 lg:p-8 mt-12 lg:mt-0">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600">Welcome to the admin control panel</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-1">Total Teachers</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stats.teachers}</p>
                </div>
                <Users size={32} className="sm:w-10 sm:h-10 w-8 h-8 text-blue-600 opacity-20 flex-shrink-0" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-1">Active Notices</p>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stats.notices}</p>
                </div>
                <FileText size={32} className="sm:w-10 sm:h-10 w-8 h-8 text-green-600 opacity-20 flex-shrink-0" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-1">System Status</p>
                  <p className="text-2xl sm:text-2xl font-bold text-green-600">Active</p>
                </div>
                <BarChart3 size={32} className="sm:w-10 sm:h-10 w-8 h-8 text-gray-600 opacity-20 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Teachers Management</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Add, edit, or remove teacher information from the database.</p>
              <Link
                href="/admin/teachers"
                className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition"
              >
                Manage Teachers
              </Link>
            </div>

            <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Notices Management</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Create and manage school notices with priority levels and categories.</p>
              <Link
                href="/admin/notices"
                className="inline-block bg-green-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg hover:bg-green-700 transition"
              >
                Manage Notices
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

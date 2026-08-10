'use client'

import { getActiveNotices } from '@/lib/data-store'
import { useEffect, useState } from 'react'
import { AlertCircle, AlertTriangle, Info } from 'lucide-react'
import type { Notice } from '@/lib/data-store'

export default function Notices() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const allNotices = getActiveNotices()
    setNotices(allNotices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    setLoading(false)
  }, [])

  const categories = ['all', ...new Set(notices.map((n) => n.category))]
  const filteredNotices = selectedCategory === 'all' ? notices : notices.filter((n) => n.category === selectedCategory)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle size={16} />
      case 'medium':
        return <AlertTriangle size={16} />
      case 'low':
        return <Info size={16} />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">School Notices</h1>
          <p className="text-blue-100 text-lg mt-2">Stay updated with the latest announcements</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Filter by Category:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notices List */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading notices...</p>
            </div>
          ) : filteredNotices.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Info size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 text-lg">No notices available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNotices.map((notice) => (
                <div key={notice.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{notice.title}</h3>
                      <div className="flex flex-wrap gap-3 items-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(notice.priority)}`}>
                          {getPriorityIcon(notice.priority)}
                          {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} Priority
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {notice.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">{notice.content}</p>

                  {/* Footer */}
                  <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-200 text-sm text-gray-500">
                    <span>
                      Posted: {new Date(notice.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <span>
                      Expires: {new Date(notice.expiresAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAdminSession, getNotices, addNotice, updateNotice, deleteNotice } from '@/lib/data-store'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Edit2, Trash2, Plus, X, AlertCircle } from 'lucide-react'
import type { Notice } from '@/lib/data-store'

const CATEGORIES = ['Academic', 'Events', 'Holiday', 'Exam', 'General', 'Sports']
const PRIORITIES = ['low', 'medium', 'high'] as const

export default function NoticesAdmin() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [notices, setNotices] = useState<Notice[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived'>('all')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    priority: 'low' as const,
    expiresAt: '',
  })

  useEffect(() => {
    if (!getAdminSession()) {
      router.push('/admin')
      return
    }
    setIsAuthorized(true)
    loadNotices()
  }, [router])

  const loadNotices = () => {
    setNotices(getNotices().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.expiresAt) {
      alert('Please set an expiration date')
      return
    }

    if (editingId) {
      updateNotice(editingId, {
        ...formData,
        status: 'active',
      })
    } else {
      addNotice({
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'active',
      })
    }
    resetForm()
    loadNotices()
  }

  const handleEdit = (notice: Notice) => {
    setFormData({
      title: notice.title,
      content: notice.content,
      category: notice.category,
      priority: notice.priority,
      expiresAt: notice.expiresAt.split('T')[0],
    })
    setEditingId(notice.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      deleteNotice(id)
      loadNotices()
    }
  }

  const handleArchive = (id: string) => {
    updateNotice(id, { status: 'archived' })
    loadNotices()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: 'General',
      priority: 'low',
      expiresAt: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const filteredNotices = notices.filter((notice) => {
    if (filterStatus === 'all') return true
    return notice.status === filterStatus
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">Notices Management</h1>
              <p className="text-sm sm:text-base text-gray-600">Create, edit, or remove school notices</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition whitespace-nowrap flex-shrink-0"
            >
              <Plus size={18} className="hidden sm:inline" />
              <span>Add Notice</span>
            </button>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
              <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingId ? 'Edit Notice' : 'Add New Notice'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Notice title"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {PRIORITIES.map((pri) => (
                          <option key={pri} value={pri}>
                            {pri.charAt(0).toUpperCase() + pri.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiration Date</label>
                    <input
                      type="date"
                      name="expiresAt"
                      value={formData.expiresAt}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      required
                      rows={8}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      placeholder="Write the notice content here..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      {editingId ? 'Update Notice' : 'Add Notice'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="mb-6 flex gap-2 flex-wrap">
            {(['all', 'active', 'archived'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg font-semibold transition ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Notices List */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {filteredNotices.length === 0 ? (
              <div className="p-6 sm:p-8 text-center">
                <AlertCircle size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm sm:text-base text-gray-600 mb-4">No notices found.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition"
                >
                  Create First Notice
                </button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                {filteredNotices.map((notice) => (
                  <div key={notice.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition bg-gray-50">
                    <div className="flex justify-between items-start gap-2 sm:gap-4 mb-2 sm:mb-3 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900 break-words">{notice.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Created: {new Date(notice.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1 sm:gap-2 flex-wrap justify-end">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(notice.priority)}`}>
                          {notice.priority.toUpperCase()}
                        </span>
                        <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          {notice.category}
                        </span>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                          notice.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {notice.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3 whitespace-pre-wrap">{notice.content}</p>

                    <div className="flex justify-between items-start sm:items-center gap-2 flex-col sm:flex-row">
                      <span className="text-xs text-gray-500 order-2 sm:order-1">
                        Expires: {new Date(notice.expiresAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2 flex-wrap order-1 sm:order-2">
                        <button
                          onClick={() => handleEdit(notice)}
                          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 text-xs sm:text-sm px-2 py-1 rounded hover:bg-blue-100"
                        >
                          <Edit2 size={14} className="flex-shrink-0" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        {notice.status === 'active' && (
                          <button
                            onClick={() => handleArchive(notice.id)}
                            className="text-orange-600 hover:text-orange-800 font-semibold text-xs sm:text-sm px-2 py-1 rounded hover:bg-orange-100"
                          >
                            <span className="hidden sm:inline">Archive</span>
                            <span className="sm:hidden">Arc</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notice.id)}
                          className="text-red-600 hover:text-red-800 font-semibold flex items-center gap-1 text-xs sm:text-sm px-2 py-1 rounded hover:bg-red-100"
                        >
                          <Trash2 size={14} className="flex-shrink-0" />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

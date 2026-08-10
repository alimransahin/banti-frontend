'use client'


import { getTeachers } from '@/lib/data-store'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, MapPin, BookOpen } from 'lucide-react'
import type { Teacher } from '@/lib/data-store'

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTeachers(getTeachers())
    setLoading(false)
  }, [])

  return (
    <main className="min-h-screen flex flex-col bg-white">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Our Teachers</h1>
          <p className="text-blue-100 text-lg mt-2">Meet our dedicated and experienced faculty</p>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading teachers...</p>
            </div>
          ) : teachers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No teachers added yet.</p>
              <p className="text-gray-500">Please check back later for the complete faculty list.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
                  {/* Teacher Photo */}
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {teacher.photo ? (
                      <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center">
                        <span className="text-4xl font-bold text-blue-600">{teacher.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Teacher Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{teacher.name}</h3>
                    <p className="text-blue-600 font-semibold mb-3">{teacher.subject}</p>

                    {/* Qualification */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Qualification:</span> {teacher.qualification}
                      </p>
                    </div>

                    {/* Experience */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Experience:</span> {teacher.experience}
                      </p>
                    </div>

                    {/* Specialization */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Specialization:</span> {teacher.specialization}
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{teacher.bio}</p>

                    {/* Contact Info */}
                    <div className="space-y-2 border-t border-gray-200 pt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={16} />
                        <span className="break-all">{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={16} />
                        <span>{teacher.phone}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                        <span>{teacher.address}</span>
                      </div>
                    </div>
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

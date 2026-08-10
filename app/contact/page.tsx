'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-balance">Contact Us</h1>
          <p className="text-blue-100 text-lg mt-2">We&apos;d love to hear from you</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Card */}
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="text-blue-600" size={28} />
              <h3 className="text-xl font-bold text-gray-900">Phone</h3>
            </div>
            <p className="text-gray-700">+88 01700-123456</p>
            <p className="text-gray-700">+88 01800-654321</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-blue-600" size={28} />
              <h3 className="text-xl font-bold text-gray-900">Email</h3>
            </div>
            <p className="text-gray-700">info@chakgopalhighschool.edu.bd</p>
            <p className="text-gray-700">admin@chakgopalhighschool.edu.bd</p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-blue-600" size={28} />
              <h3 className="text-xl font-bold text-gray-900">Address</h3>
            </div>
            <p className="text-gray-700">Chakgopal</p>
            <p className="text-gray-700">Dinajpur, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form and Hours */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
              {submitted && (
                <div className="mt-4 p-4 bg-green-50 border border-green-300 text-green-800 rounded-lg">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </div>
          </div>

          {/* School Hours */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 h-fit">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="text-blue-600" size={28} />
              <h3 className="text-xl font-bold text-gray-900">School Hours</h3>
            </div>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="font-semibold">Monday - Friday</p>
                <p>9:00 AM - 4:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Saturday</p>
                <p>9:00 AM - 1:00 PM</p>
              </div>
              <div>
                <p className="font-semibold">Sunday</p>
                <p>Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

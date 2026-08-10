// Data types
export interface Teacher {
  id: string
  name: string
  subject: string
  qualification: string
  experience: string
  email: string
  phone: string
  address: string
  specialization: string
  bio: string
  photo: string
}

export interface Notice {
  id: string
  title: string
  content: string
  category: string
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  expiresAt: string
  status: 'active' | 'archived'
}

export interface AdminUser {
  id: string
  username: string
  password: string
}

// Storage keys
const TEACHERS_KEY = 'school_teachers'
const NOTICES_KEY = 'school_notices'
const ADMIN_USERS_KEY = 'school_admin_users'

// Initialize default admin user
export function initializeAdminUser() {
  const existing = localStorage.getItem(ADMIN_USERS_KEY)
  if (!existing) {
    const defaultUser: AdminUser = {
      id: '1',
      username: 'admin',
      password: 'admin123',
    }
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify([defaultUser]))
  }
}

// Teacher operations
export function getTeachers(): Teacher[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(TEACHERS_KEY)
  return data ? JSON.parse(data) : []
}

export function addTeacher(teacher: Omit<Teacher, 'id'>): Teacher {
  const newTeacher: Teacher = {
    ...teacher,
    id: Date.now().toString(),
  }
  const teachers = getTeachers()
  teachers.push(newTeacher)
  localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers))
  return newTeacher
}

export function updateTeacher(id: string, updates: Partial<Teacher>): Teacher | null {
  const teachers = getTeachers()
  const index = teachers.findIndex((t) => t.id === id)
  if (index === -1) return null
  teachers[index] = { ...teachers[index], ...updates }
  localStorage.setItem(TEACHERS_KEY, JSON.stringify(teachers))
  return teachers[index]
}

export function deleteTeacher(id: string): boolean {
  const teachers = getTeachers()
  const filtered = teachers.filter((t) => t.id !== id)
  if (filtered.length === teachers.length) return false
  localStorage.setItem(TEACHERS_KEY, JSON.stringify(filtered))
  return true
}

// Notice operations
export function getNotices(): Notice[] {
  if (typeof window === 'undefined') return []
  const data = localStorage.getItem(NOTICES_KEY)
  return data ? JSON.parse(data) : []
}

export function getActiveNotices(): Notice[] {
  const notices = getNotices()
  const today = new Date()
  return notices.filter(
    (n) =>
      n.status === 'active' &&
      new Date(n.expiresAt) > today
  )
}

export function addNotice(notice: Omit<Notice, 'id'>): Notice {
  const newNotice: Notice = {
    ...notice,
    id: Date.now().toString(),
  }
  const notices = getNotices()
  notices.push(newNotice)
  localStorage.setItem(NOTICES_KEY, JSON.stringify(notices))
  return newNotice
}

export function updateNotice(id: string, updates: Partial<Notice>): Notice | null {
  const notices = getNotices()
  const index = notices.findIndex((n) => n.id === id)
  if (index === -1) return null
  notices[index] = { ...notices[index], ...updates }
  localStorage.setItem(NOTICES_KEY, JSON.stringify(notices))
  return notices[index]
}

export function deleteNotice(id: string): boolean {
  const notices = getNotices()
  const filtered = notices.filter((n) => n.id !== id)
  if (filtered.length === notices.length) return false
  localStorage.setItem(NOTICES_KEY, JSON.stringify(filtered))
  return true
}

// Admin authentication
export function verifyAdmin(username: string, password: string): boolean {
  if (typeof window === 'undefined') return false
  const users = localStorage.getItem(ADMIN_USERS_KEY)
  const adminUsers: AdminUser[] = users ? JSON.parse(users) : []
  return adminUsers.some((u) => u.username === username && u.password === password)
}

export function getAdminSession(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('admin_session') === 'true'
}

export function setAdminSession(isLoggedIn: boolean) {
  if (isLoggedIn) {
    localStorage.setItem('admin_session', 'true')
  } else {
    localStorage.removeItem('admin_session')
  }
}

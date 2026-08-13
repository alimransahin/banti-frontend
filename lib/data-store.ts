// Data types
export type Teacher = {
  _id: string;
  name: string;
  designation:
  | "প্রধান শিক্ষক"
  | "সহকারি প্রধান শিক্ষক"
  | "সহকারি শিক্ষক"
  | "অফিস সহকারি কাম কম্পিউটার অপারেটর"
  | "কম্পিউটার ল্যাব অপারেটর"
  | "অফিস সহায়ক"
  | "নিরাপত্তা রক্ষি"
  | "পরিচ্ছন্নতা কর্মি"
  | "নৈশ প্রহরী"
  | "আয়া" |
  null;
  subject: string;
  qualification: string;
  photo: string;
  phone: string;
  email: string;
};



export interface AdminUser {
  id: string
  username: string
  password: string
}

// Storage keys
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



// Admin authentication
export function verifyAdmin(username: string, password: string): boolean {
  if (typeof window === 'undefined') return false
  const users = localStorage.getItem(ADMIN_USERS_KEY)
  const adminUsers: AdminUser[] = users ? JSON.parse(users) : []
  return adminUsers.some((u) => u.username === username && u.password === password)
}

export function getAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('admin_session') === 'true';
}

export function setAdminSession(isLoggedIn: boolean) {
  if (typeof window === 'undefined') return;

  if (isLoggedIn) {
    sessionStorage.setItem('admin_session', 'true');
  } else {
    sessionStorage.removeItem('admin_session');
  }
}

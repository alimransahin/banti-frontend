# Chakgopal High School Website - Complete Clone

## Overview
This is a faithful recreation of the official Chakgopal High School website (https://chakgopalhighschool.edu.bd/) with full functional features for managing teachers, notices, and content.

## Design Specifications

### Color Scheme
- **Background**: Light Blue (#B3E5FC)
- **Header Background**: Light Blue (#E3F2FD)
- **Navigation Bar**: Green (#228B22)
- **Logo**: Yellow/Gold Hexagon (#FFC107)
- **Text**: Dark Blue (#005A9C), Dark Red (#D32F2F)
- **Notice Board**: Green with White content area

### Layout
- **Header Section**: Logo, School Name, EIIN, Contact Info
- **Navigation**: Horizontal green menu bar with Bengali menu items
- **Main Content**: Two-column layout (2fr 1fr ratio)
- **Left Column**: 
  - Notice Ticker (Yellow background)
  - School Building Image
  - School Overview Section
  - Chairman's Message
  - Principal's Message
- **Right Sidebar**:
  - Achievement Logos
  - Notice Board (Green)
  - Quick Links

### Key Features

#### Public Pages
1. **Home Page** (`/`)
   - Complete faithful clone of reference design
   - Notice ticker with scrolling notifications
   - School building carousel
   - Chairman and Principal messages
   - Two-column responsive layout

2. **About Page** (`/about`)
   - School history and information
   - Mission, Vision, and Core Values
   - Key Achievements

3. **Teachers Page** (`/teachers`)
   - Display all teachers with photos
   - Comprehensive teacher information
   - Search and filter functionality

4. **Notices Page** (`/notices`)
   - List of all school notices
   - Filter by category and priority
   - Notice expiration tracking

5. **Contact Page** (`/contact`)
   - Contact form
   - School location and hours
   - Contact information

#### Admin Panel
- **Authentication**: Login with demo credentials (admin/admin123)
- **Dashboard**: Overview statistics
- **Teachers Management**:
  - Add, Edit, Delete teachers
  - Upload teacher photos
  - Store comprehensive teacher data
- **Notices Management**:
  - Create, Edit, Delete notices
  - Categories, Priority Levels
  - Expiration date tracking
  - Archive/Delete functionality

## Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript/JSX
- **Styling**: Tailwind CSS + Inline Styles
- **Storage**: localStorage (upgradeable to Neon database)
- **Icons**: Lucide React

## Data Persistence
- Teachers and Notices stored in localStorage
- Easily upgradeable to database integration (Neon/Supabase)
- JSON-based data structure for flexibility

## Design Fidelity
The website faithfully recreates:
✓ Hexagon logo with DEMO text
✓ Light blue background throughout
✓ Green navigation bar with Bengali menu items
✓ Two-column layout with sidebar
✓ Yellow notice ticker
✓ Green notice board with white content area
✓ Chairman and Principal message sections
✓ Overall typography and spacing
✓ Color scheme and visual hierarchy

## Admin Panel Features
✓ Secure login authentication
✓ Dashboard with statistics
✓ Full CRUD operations for teachers
✓ Full CRUD operations for notices
✓ Data persistence with localStorage
✓ Responsive design for all devices

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Full Unicode Bengali language support

## Usage
1. Visit `/` for the public home page
2. Visit `/admin` to access admin login (demo: admin/admin123)
3. From admin dashboard, manage teachers and notices
4. All data persists across browser sessions

---
**Created**: 2024
**Last Updated**: 2024
**Version**: 1.0

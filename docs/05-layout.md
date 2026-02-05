# 05 - App Layout

> **Agent:** Layout Agent 📐
> **Goal:** Create App Layout with Header, Navigation, User Menu

---

## Context

**Product:** FilmForge
**Navigation Links:** Dashboard, Servers, Channels, Messages, Users

---

## Instructions

### 1. App Layout

Create **App Layout** (`app/(app)/layout.tsx`) as Server Component:

**Functionality:**
- Auth Check: Get current user from Supabase Server Client
- Redirect to /login if no user
- Layout Structure: Header + Main Container
- Pass User Props to Header Component

**Layout Structure:**
- Min Height: Full screen (min-h-screen)
- Background: Theme Background Color
- Main Container: Container Class + Padding (py-6)

**Important:**
- Must be Server Component (async function)
- Auth Check before render
- Pass User Prop to Header

### 2. Header Component

Create **Header Component** (`components/layout/Header.tsx`) as Client Component:

**Props:**
- `user`: Supabase User Object (Email, ID, etc.)

**Navigation Links:**
- Dashboard: /dashboard
- Servers: /servers
- Channels: /channels
- Messages: /messages
- Users: /users

**Desktop Layout:**
- Logo/Product Name (left, Link to /dashboard)
- Navigation Links (center, horizontal)
- User Menu (right): Email + Logout Button

**Mobile Layout:**
- Logo/Product Name (left)
- Hamburger Menu Button (right)
- Mobile Menu (Dropdown):
  - All Nav Links
  - Divider
  - User Email
  - Logout Button

**Features:**
- Sticky Header (sticky top-0 z-50)
- Backdrop Blur for Modern Look
- Active Link Highlighting (pathname === href)
- Mobile Menu Toggle State (useState)
- Logout via Server Action

**Important:**
- "use client" Directive
- usePathname() for Active Link Detection
- Close Mobile Menu after Link Click
- Icons from lucide-react (Menu, X, LogOut)

### 3. Logout Server Action

Create or verify **Logout Action** (`lib/actions/auth.ts`):

**Functionality:**
- "use server" Directive
- Create Supabase Server Client
- Call supabase.auth.signOut()
- Redirect to /login

**Error Handling:**
- Silent Failure ok (Redirect always)

---

## Validation Checklist

Verify that:
- [ ] App Layout protects route (Auth Check)
- [ ] Redirect to /login works
- [ ] Header renders correctly
- [ ] Desktop Navigation visible
- [ ] Mobile Hamburger Menu works
- [ ] Active Link is highlighted
- [ ] User Email is displayed
- [ ] Logout works
- [ ] Layout responsive (Mobile + Desktop)
- [ ] Sticky Header works

**Test Scenarios:**
1. Login as User → Dashboard opens → Header visible
2. Click through all Nav Links → Active State changes
3. Resize browser to Mobile → Hamburger Menu appears
4. Open Mobile Menu → All Links visible
5. Logout → Redirect to /login
6. Scroll Page → Header stays sticky

---

## Troubleshooting

**Header not sticky:**
- Check sticky top-0 z-50 Classes
- Check if Parent Container has overflow hidden

**Active Link not working:**
- usePathname() Hook correctly imported?
- pathname Comparison is case-sensitive

**Mobile Menu not working:**
- useState for mobileMenuOpen correct?
- Button onClick toggles State?
- md:hidden / hidden md:flex Classes correct?

**Logout not working:**
- Server Action in lib/actions/auth.ts exists?
- form action={signOut} correct?
- Supabase Server Client is created?

---

**Continue to:** `06-entities.md`

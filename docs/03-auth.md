# 03 - Authentication

> **Agent:** Auth Agent 🔐
> **Goal:** Complete auth system with Login, Signup, Session Management

---

## Context

**Product:** FilmForge
**Protected Routes:** /dashboard, /account, /servers, /channels, /messages, /users
**Onboarding:** 3 steps

---

## ⚠️ CRITICAL: Prevent Build Errors

### Auth Layout MUST Have Dynamic Export

```tsx
// app/(auth)/layout.tsx
export const dynamic = "force-dynamic";  // <-- REQUIRED!

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

Without this, Next.js will try to statically generate auth pages at build time,
which fails because Supabase client requires runtime environment variables.

### Middleware MUST Handle Missing Env Vars

```tsx
// middleware.ts - CRITICAL CHECK
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If Supabase not configured, skip middleware
if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("placeholder")) {
  return NextResponse.next();
}
```

---

## Instructions

### 1. Middleware Setup

Create a **Next.js Middleware** (root-level `middleware.ts`) that:

**Functionality:**
- **FIRST:** Check if Supabase is configured (env vars exist)
- If not configured → pass through (don't crash)
- Checks Supabase Session on every request
- Manages cookies correctly (getAll, setAll)
- Redirects unauthenticated users from protected routes
- Auth routes (/login, /signup) only for non-logged-in users

**Protected Routes:**
- `/dashboard`
- `/account`
- `/servers`
- `/channels`
- `/messages`
- `/users`

**Redirect Logic:**
- No user + Protected Route → Redirect to /login
- User logged in + /login or /signup → Redirect to /dashboard

**Important:**
- Middleware must be in root (not in app/)
- Cookie operations properly implemented (NextRequest/NextResponse)
- Session refresh on every request
- **MUST handle missing env vars gracefully!**

### 2. Auth Callback Route

Create `app/auth/callback/route.ts` for OAuth redirects:

**Purpose:**
- Handle OAuth Provider Redirects (GitHub, Google, etc.)
- Exchange Code for Session
- Redirect back to original URL or /dashboard

**Flow:**
1. Extract code and next from URL params
2. Exchange code with supabase.auth.exchangeCodeForSession()
3. Redirect to next URL or fallback to /dashboard
4. Error handling with redirect to /login?error=...

### 3. Login Page

Create `app/(auth)/login/page.tsx`:

**UI Requirements:**
- Email + Password Form
- OAuth Buttons (GitHub )
- Magic Link Option (passwordless)
- Link to Signup Page
- Error State Display
- Loading States

**Functionality:**
- Email/Password: supabase.auth.signInWithPassword()
- OAuth: supabase.auth.signInWithOAuth({ provider, redirectTo: callback })
- Magic Link: supabase.auth.signInWithOtp()
- After Success: Redirect to /dashboard
- Client Component (needs useState, form handling)

### 4. Signup Page

Create `app/(auth)/signup/page.tsx`:

**UI Requirements:**
- Email + Password Form (with Password confirmation)
- OAuth Buttons
- Link to Login Page
- Terms & Conditions Checkbox
- Error State Display

**Functionality:**
- Email/Password: supabase.auth.signUp()
- Email Confirmation handling
- Redirect to /onboarding after success
- Validation: Email format, Password strength (min 8 chars)

### 5. Onboarding Flow

Create Multi-Step Onboarding after Signup:

**Steps:**
1. Create account: Create a new user account and provide basic information
2. Verify email: Verify your email address to complete the onboarding process
3. Complete profile: Complete your profile with additional information to get started with the platform

**Implementation:**
- URL: `app/(app)/onboarding/page.tsx`
- State Management: useState for current step + form data
- Progress Indicator: show 3 steps
- Back/Next Navigation
- Skip Option (if not mandatory)
- Save to Profile/Entity Tables after completion
- Redirect to /dashboard when done

**Important:**
- Middleware must allow /onboarding (authenticated but not yet onboarded)
- Profile Flag: onboarding_completed boolean
- Automatically redirect incomplete users to /onboarding

### 6. Session Management Hooks

Create Custom Hooks for Auth State:

**`hooks/useAuth.ts`:**
- Current User State
- Loading State
- signOut Function
- Profile Data (joined with profiles table)

**`hooks/useRequireAuth.ts`:**
- Enforces Authentication at Page-Level
- Redirects to /login if not authenticated
- Shows Loading during check

**Implementation:**
- Use Supabase auth.onAuthStateChange()
- State sync between Client Components
- Cleanup on unmount

### 7. Logout Functionality

Implement Logout in multiple places:

**Locations:**
- Header Navigation (Dropdown Menu)
- Account Settings Page

**Functionality:**
- supabase.auth.signOut()
- Clear local state
- Redirect to /login
- Show confirmation (optional)

---

## Validation Checklist

Verify that:
- [ ] Middleware protects protected routes
- [ ] Login with Email/Password works
- [ ] Signup creates User + Profile
- [ ] OAuth Flow (GitHub) works
- [ ] Magic Link Email is sent
- [ ] Session persists over page reloads
- [ ] Logout clears session
- [ ] Onboarding flow works
- [ ] Incomplete onboarding redirects
- [ ] Auth Callback handles all providers
- [ ] Error messages are displayed

**Test Scenarios:**
1. Signup → Email Confirmation → Login → Dashboard
2. Login → Logout → Login again
3. Protected Route without Auth → Redirect to /login
4. OAuth Login → Callback → Dashboard
5. Signup → Onboarding → Dashboard

---

## Troubleshooting

**Session Issues:**
- Check Cookie Settings in middleware
- Verify Supabase URL/Keys in .env
- Check redirect_to URLs in OAuth config

**Email Not Sending:**
- Supabase Email Templates activated?
- Check Spam Folder
- Development: Use Link from Supabase Auth Logs

**Middleware Redirect Loop:**
- Exclude /auth/callback from protection
- Check if user check is correct
- Verify redirect URLs don't create loops

---

**Continue to:** `04-ui-components.md`

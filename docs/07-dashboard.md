# 07 - Dashboard

> **Agent:** Dashboard Agent 📊
> **Goal:** Create Dashboard with Stats, Recent Items, and Quick Actions

---

## Context

**Product:** FilmForge
**Entities:** Server, Channel, Message, User

---

## Instructions

### 1. Dashboard Page

Create **Dashboard Page** (`app/(app)/dashboard/page.tsx`) as Server Component:

**Functionality:**
- Auth Check: Get current user from Supabase Server Client
- Redirect to /login if no user
- Load Stats for each Entity (Count Queries)
- Pass Stats to DashboardStats Component
- Pass User ID to RecentItems Component

**Stats to load:**
- Servers: Count Query on `servers` table with user_id filter
- Channels: Count Query on `channels` table with user_id filter
- Messages: Count Query on `messages` table with user_id filter
- Users: Count Query on `users` table with user_id filter

**Layout Structure:**
- Container with Spacing (space-y-8)
- Heading Section:
  - H1: "Dashboard" (text-3xl font-bold)
  - Subtext: "Welcome back, {user.email}" (text-muted-foreground)
- DashboardStats Component (Stats Grid)
- 2-Column Grid (gap-6 md:grid-cols-2):
  - RecentItems Component
  - QuickActions Component

**Important:**
- Must be Server Component (async function)
- Count Queries use: `.select("*", { count: "exact", head: true })`
- Pass Stats Array to Component

### 2. DashboardStats Component

Create **DashboardStats Component** (`components/dashboard/DashboardStats.tsx`):

**Props Interface:**
- `stats`: Array of { label: string, value: number, href: string }

**Layout:**
- Responsive Grid: 1 col (mobile), 2 col (sm), 4 col (md)
- Gap: gap-4

**Stat Cards:**
- Clickable (Link to href)
- Card Component with hover:border-primary Transition
- CardHeader: Label as small heading (text-sm text-muted-foreground)
- CardContent: Value as large number (text-3xl font-bold)

**Important:**
- Use Card Components from UI Library
- Links wrap the entire Card

### 3. RecentItems Component

Create **RecentItems Component** (`components/dashboard/RecentItems.tsx`) as Server Component:

**Props:**
- `userId`: string (User ID for queries)

**Functionality:**
- Create Supabase Server Client
- Query: Latest servers (limit 5)
- Filter: user_id = userId
- Order: created_at DESC

**Layout:**
- Card Container
- CardHeader: "Recent Items" (text-lg)
- CardContent:
  - If items exist: List with Links
  - If empty: Muted Text "No items yet"

**List Items:**
- Links to Detail Pages (/servers/{id})
- Text: Formatted created_at date
- Hover: text-primary

**Important:**
- Async Server Component
- Proper Error Handling
- Format date with toLocaleDateString()

### 4. QuickActions Component

Create **QuickActions Component** (`components/dashboard/QuickActions.tsx`):

**Actions to define:**
- "New Server" → /servers/new
- "New Channel" → /channels/new
- "New Message" → /messages/new
- "New User" → /users/new

**Layout:**
- Card Container
- CardHeader: "Quick Actions" (text-lg)
- CardContent: Buttons stacked vertically (space-y-2)

**Buttons:**
- Variant: outline
- Full Width (w-full)
- Left-aligned Text (justify-start)
- Plus Icon (lucide-react) before Label
- As Link (asChild prop + Link Component)

**Important:**
- Define Actions Array as constant
- Button asChild for Link Composition

---

## Validation Checklist

Verify that:
- [ ] Dashboard Page created as Server Component
- [ ] Auth Check works (Redirect if not logged in)
- [ ] Stats are correctly loaded
- [ ] DashboardStats shows Grid with all Entity Counts
- [ ] RecentItems shows latest entries
- [ ] QuickActions work (Links to /new Pages)
- [ ] Responsive Layout (Mobile + Desktop)
- [ ] Stats Cards are clickable
- [ ] No TypeScript Errors

**Test Scenarios:**
1. Login as User → Dashboard opens
2. Stats show correct numbers (0 for new users)
3. Create Entity → Stats Count increases
4. Recent Items shows new entry
5. Click Quick Action → /new Page opens
6. Click Stat Card → Entity List opens
7. Test Mobile view

---

## Troubleshooting

**Stats always show 0:**
- Check user_id filter in Count Query
- Check if RLS Policies allow access
- Check Supabase Client (Server vs Browser)

**RecentItems not loading:**
- Server Component (async function)?
- Supabase Client correctly created?
- await before Supabase Queries?

**Quick Actions not working:**
- Button asChild + Link Composition correct?
- href URLs correct?
- Routes exist?

**Layout broken:**
- Grid Classes correct (gap, cols)?
- Container Classes present?
- Spacing Classes (space-y-8)?

---

**Continue to:** `08-forms.md`

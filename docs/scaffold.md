# File Structure Scaffold - FilmForge

## Complete Project Structure

```
filmforge/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   ├── globals.css               # Global styles
│   │
│   ├── (auth)/                   # Auth group (no layout)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   │
│   ├── (app)/                    # Authenticated app group
│   │   ├── layout.tsx            # App layout with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   ├── server/
│   │   ├── page.tsx              # List view
│   │   ├── [id]/
│   │   │   └── page.tsx          # Detail view
│   │   └── new/
│   │       └── page.tsx          # Create form
│   ├── channel/
│   │   ├── page.tsx              # List view
│   │   ├── [id]/
│   │   │   └── page.tsx          # Detail view
│   │   └── new/
│   │       └── page.tsx          # Create form
│   ├── message/
│   │   ├── page.tsx              # List view
│   │   ├── [id]/
│   │   │   └── page.tsx          # Detail view
│   │   └── new/
│   │       └── page.tsx          # Create form
│   ├── user/
│   │   ├── page.tsx              # List view
│   │   ├── [id]/
│   │   │   └── page.tsx          # Detail view
│   │   └── new/
│   │       └── page.tsx          # Create form
│   │   └── settings/
│   │       └── page.tsx
│   │
│   └── api/                      # API Routes
│       ├── auth/
│       │   ├── signin/route.ts
│       │   ├── signup/route.ts
│       │   └── signout/route.ts
│   ├── servers/
│   │   ├── route.ts              # GET list, POST create
│   │   └── [id]/
│   │       └── route.ts          # GET, PUT, DELETE
│   ├── channels/
│   │   ├── route.ts              # GET list, POST create
│   │   └── [id]/
│   │       └── route.ts          # GET, PUT, DELETE
│   ├── messages/
│   │   ├── route.ts              # GET list, POST create
│   │   └── [id]/
│   │       └── route.ts          # GET, PUT, DELETE
│   ├── users/
│   │   ├── route.ts              # GET list, POST create
│   │   └── [id]/
│   │       └── route.ts          # GET, PUT, DELETE
│       └── webhooks/
│           └── stripe/route.ts
│
├── components/                   # React Components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── ...
│   │
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── footer.tsx
│   │   └── nav.tsx
│   │
│   ├── forms/                    # Form components
│   │   ├── login-form.tsx
│   │   ├── signup-form.tsx
│   │   └── server-form.tsx
│   │   └── channel-form.tsx
│   │   └── message-form.tsx
│   │   └── user-form.tsx
│   │
│   └── features/                 # Feature components
│       ├── server/
│       │   ├── server-card.tsx
│       │   ├── server-list.tsx
│       │   └── server-detail.tsx
│       ├── channel/
│       │   ├── channel-card.tsx
│       │   ├── channel-list.tsx
│       │   └── channel-detail.tsx
│       ├── message/
│       │   ├── message-card.tsx
│       │   ├── message-list.tsx
│       │   └── message-detail.tsx
│       ├── user/
│       │   ├── user-card.tsx
│       │   ├── user-list.tsx
│       │   └── user-detail.tsx
│
├── lib/                          # Utilities & Services
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── types.ts              # DB types
│   │
│   ├── utils/
│   │   ├── cn.ts                 # classnames helper
│   │   ├── format.ts             # Formatters
│   │   └── validation.ts         # Zod schemas
│   │
│   └── hooks/
│       ├── use-user.ts
│       ├── use-toast.ts
│       └── use-media-query.ts
│
├── types/                        # TypeScript types
│   ├── index.ts                  # Main types
│   └── api.ts                    # API types
│
├── styles/                       # Additional styles
│   └── components.css
│
├── public/                       # Static assets
│   ├── favicon.ico
│   ├── og-image.png
│   └── images/
│
├── supabase/                     # Supabase config
│   └── migrations/
│       └── 001_initial_schema.sql
│
├── .env.example                  # Env template
├── .env.local                    # Local env (gitignored)
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Key Files to Create First

### 1. Core Configuration
- [ ] `package.json` - Dependencies
- [ ] `next.config.mjs` - Next.js config
- [ ] `tailwind.config.ts` - Tailwind config
- [ ] `.env.example` - Environment template

### 2. Supabase Setup
- [ ] `lib/supabase/client.ts` - Browser client
- [ ] `lib/supabase/server.ts` - Server client
- [ ] `supabase/migrations/001_initial_schema.sql`

### 3. Layout & Auth
- [ ] `app/layout.tsx` - Root layout
- [ ] `app/(auth)/login/page.tsx` - Login
- [ ] `app/(app)/layout.tsx` - App layout

### 4. Core Features
- [ ] `app/(app)/server/page.tsx` - Server list
- [ ] `app/(app)/channel/page.tsx` - Channel list
- [ ] `app/(app)/message/page.tsx` - Message list
- [ ] `app/(app)/user/page.tsx` - User list

---

## Component Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Page | lowercase with dashes | `app/user-settings/page.tsx` |
| Component | PascalCase | `components/UserCard.tsx` |
| Hook | camelCase with `use` prefix | `hooks/useUser.ts` |
| Utility | camelCase | `lib/utils/formatDate.ts` |
| Type | PascalCase | `types/User.ts` |
| API Route | lowercase with dashes | `api/user-profile/route.ts` |

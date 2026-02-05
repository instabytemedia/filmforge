# 01 - Project Setup

> **Agent:** Setup Agent 🏗️
> **Goal:** Initialize project and create base structure

---

## Context

**Product:** FilmForge
**Problem:** Entrepreneurs lack a platform to connect, discuss, and learn from movies
**Solution:** A community platform with blockchain verification, inspired by Discord's servers and channels, and Headspace's daily practice

---

## Instructions

### 1. Next.js Project Setup

Initialize a Next.js 16 project with the following requirements:
- TypeScript enabled
- Tailwind CSS 4 configured
- App Router (not Pages Router)
- ESLint configured
- Import Alias: `@/*` for `./src/*`

### 2. shadcn/ui Setup (REQUIRED)

**CRITICAL:** This project uses shadcn/ui for ALL UI components. Do NOT create custom components from scratch.

Run shadcn/ui init:
```bash
npx shadcn@latest init
```

Configuration choices:
- Style: Default
- Base color: Neutral (or as specified in design)
- CSS variables: Yes
- Tailwind CSS: Yes
- Components directory: components/ui
- Utils location: lib/utils

**Install required shadcn/ui components:**
```bash
npx shadcn@latest add button card input label skeleton dialog dropdown-menu avatar badge tabs separator sheet toast sonner
```

**RULE:** Only use shadcn/ui components. Never create custom Button, Input, Card, etc. from scratch.

### 3. Icon Library (REQUIRED)

Install **Phosphor Icons** for consistent iconography:
```bash
npm install @phosphor-icons/react
```

**Usage:**
```tsx
import { House, User, Gear } from "@phosphor-icons/react";
<House size={24} weight="bold" />
```

**RULE:** Use Phosphor Icons for ALL icons. Do not mix with Lucide or other icon libraries.

### 4. Dependencies

Install the **necessary** dependencies for:
- Supabase SSR (Browser & Server Clients)
- Form Validation (Zod)
- Data Fetching (SWR)
- Styling Utilities (clsx, tailwind-merge) - already included via shadcn
- Form Handling (react-hook-form + Zod resolver)
- Additionally: react-dropzone

**Important:** Use only the latest stable versions.

### 4b. PostCSS Dependencies (REQUIRED)

**CRITICAL:** Install autoprefixer for Tailwind to work:
```bash
npm install -D autoprefixer
```

Your `postcss.config.mjs` should look like:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### 5. Folder Structure

Create a clean folder structure following Next.js best practices:

**Route Groups:**
- `(app)/` - Authenticated routes (Dashboard, Account, etc.)
- `(auth)/` - Auth routes (Login, Signup)
- `(public)/` - Public routes (Landing Page)
- `api/` - API Routes

**Code Organization:**
- `components/ui/` - Reusable UI Components
- `components/layout/` - Layout Components (Header, Footer, etc.)
- `lib/supabase/` - Supabase Client Configurations
- `lib/schemas/` - Zod Validation Schemas
- `lib/utils.ts` - Utility Functions
- `hooks/` - Custom React Hooks
- `types/` - TypeScript Type Definitions

### 6. Supabase Integration

Create **two separate** Supabase Clients:

**Browser Client** (`lib/supabase/client.ts`):
- Use `createBrowserClient` from @supabase/ssr
- Environment Variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- Export a `createClient()` function

**Server Client** (`lib/supabase/server.ts`):
- Use `createServerClient` from @supabase/ssr
- Implement Cookie Handling with Next.js `cookies()`
- Important: Cookie Operations in try/catch (Server Components cannot set)
- Export an async `createClient()` function

**CRITICAL: Explicit Types for Cookie Handler:**
```tsx
// lib/supabase/server.ts
import { type CookieOptions } from "@supabase/ssr";

// In setAll handler - MUST have explicit type:
setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
  // ...
}
```

Do NOT use implicit `any` types - TypeScript will fail.

### 7. Utility Functions

Create `lib/utils.ts` with a `cn()` function that:
- Combines clsx and tailwind-merge
- Is optimized for Tailwind Class Merging
- Is type-safe (ClassValue from clsx)

### 8. Environment Setup

Configure the following Environment Variables:
- `NEXT_PUBLIC_APP_URL` - App Base URL
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase Anon/Public Key


Create `.env.example` with placeholders and `.env.local` for local values.

### 9. Logo Component (REQUIRED)

Create a **text-based logo with icon** (`components/logo.tsx`):

```tsx
import { /* choose fitting icon */ } from "@phosphor-icons/react";

export function Logo({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizes = {
    sm: { icon: 20, text: "text-lg" },
    default: { icon: 24, text: "text-xl" },
    lg: { icon: 32, text: "text-2xl" },
  };
  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <IconComponent size={s.icon} weight="bold" className="text-primary" />
      <span className={`font-bold tracking-tight ${s.text}`}>FilmForge</span>
    </div>
  );
}
```

**Choose an icon that represents the product's purpose** (e.g., Rocket for startups, ShoppingCart for e-commerce, etc.)

### 10. Graceful Fallback (CRITICAL)

**The app MUST start without environment variables set.**

Create fallback handling in Supabase clients:
- If SUPABASE_URL/KEY not set → show "Setup Required" message instead of crashing
- Landing page must render fully without any API calls
- Only features requiring auth should check for env vars

Example pattern:
```tsx
// lib/supabase/client.ts
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client or null - handle in components
    return null;
  }
  return createBrowserClient(supabaseUrl, supabaseKey);
}
```

**RULE:** `npm run dev` must show the landing page even with empty .env.local

---

## Validation Checklist

Verify that:
- [ ] Next.js Project with App Router runs
- [ ] shadcn/ui initialized and components installed
- [ ] Phosphor Icons installed
- [ ] All dependencies installed without errors
- [ ] Folder structure correctly created
- [ ] Logo component created with icon + text
- [ ] Both Supabase Clients work (with graceful fallback)
- [ ] Environment Variables set (or app starts without them)
- [ ] `npm run dev` starts without errors - **EVEN WITHOUT ENV VARS**
- [ ] TypeScript compilation successful

---

## Troubleshooting

**Common Issues:**
- Check Node.js version (>= 18 required)
- For dependency conflicts: `rm -rf node_modules package-lock.json && npm install`
- Supabase Client Errors: Check Environment Variables
- TypeScript Errors: Check tsconfig.json configuration

---

**Continue to:** `02-database.md`

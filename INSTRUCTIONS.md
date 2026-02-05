# START.md - FilmForge

> Connecting minds through cinema

**Problem being solved:** Entrepreneurs lack a platform to connect, discuss, and learn from movies

**Generated on:** 2026-02-05

---

## 🤖 Instructions for Claude Code

This file is a complete execution guide. Work through it from top to bottom:

1. **Read each section completely** before starting implementation
2. **Check off each checkbox** (`- [x]`) when the task is done
3. **Skip nothing** - every task is important
4. **On errors:** Fix them immediately before continuing
5. **At the end:** Run all tests and ensure `npm run build` succeeds

---

## Important Notes

### ⚠️ CRITICAL - Follow these rules exactly:

1. **Follow the order** - Work through phases in sequence, skip nothing
2. **Create folders first** - Before creating a file, ensure the folder exists
3. **Test after each phase** - Run `npm run dev` and check for errors
4. **Stop on errors** - Fix errors immediately before continuing
5. **Check imports** - Ensure all imported modules exist

### Technology Stack
- **Framework:** Next.js 14+ (App Router)
- **Database:** Supabase (Postgres + Auth + RLS)
- **Styling:** Tailwind CSS + shadcn/ui Patterns
- **Language:** TypeScript (strict mode)
- **Validation:** Zod

### Conventions
- Files: `kebab-case.ts` for utils, `PascalCase.tsx` for components
- DB tables: `snake_case` plural (e.g., `user_profiles`)
- API Routes: `/api/[entity]s` for collections
- Components: Server Components by default, 'use client' only when needed

### Create folder structure (FIRST)

Before starting Phase 1, create all necessary folders:

```bash
mkdir -p app/(auth)/login app/(auth)/signup
mkdir -p app/(app)/dashboard app/(app)/account
mkdir -p app/api/auth
mkdir -p components/ui components/layout
mkdir -p lib/supabase lib/schemas lib/api
mkdir -p hooks types
```

---

## App Overview

### FilmForge

**Tagline:** Connecting minds through cinema

**The Problem:**
Entrepreneurs lack a platform to connect, discuss, and learn from movies

**The Solution:**
FilmForge is a community-driven app that leverages blockchain verification to connect entrepreneurs and filmmakers through daily movie screenings and discussions. It combines the mindfulness of Headspace's daily practice with the community features of Discord, fostering a collaborative environment for creative problem-solving. By focusing on indie films and emerging artists, FilmForge promotes diversity and innovation in the film industry.

**Target Audience:**
Independent filmmakers and entrepreneurs

**Persona:**
{"age":"25-45","interests":"movies, entrepreneurship, personal growth","pain_points":"lack of community, limited resources for learning","goals":"connect with like-minded individuals, learn from movies, grow as entrepreneurs"}

**Must Have (MVP):**
- auth
- daily_movie_practice
- servers_and_channels
- blockchain_verification
- discussion_forums
- user_profile
- community_badges
- movie_recommendations

**Should Have:**
- movie_library
- user_profiles
- event_calendar
- resource_library

**Nice to Have:**
- (none specified)

> ⭐ = User-defined feature

**Unique Selling Points:**
- Blockchain verification for secure and transparent discussions
- Daily movie practice inspired by Headspace
- Discord-like servers and channels for community building

**Monetization:** Subscription-based model with token rewards for contributors

---

### Important for Implementation

This app should solve the problem "Entrepreneurs lack a platform to connect, discuss, and learn from movies". All features and UI decisions should be aligned to optimally solve this problem for the target audience "Independent filmmakers and entrepreneurs".

**Development Priority:**
1. First implement all "Must Have" features for MVP
2. Then add "Should Have" features
3. Finally add "Nice to Have" features if time permits

---

## Architecture Overview

### Data Model

**Entities and their relationships:**

#### Server
A community server for discussing movies
Fields: id, created_at, updated_at, user_id, name, description
Relationships: one_to_many Channel, many_to_many User

#### Channel
A discussion channel within a server
Fields: id, created_at, updated_at, user_id, name, description
Relationships: one_to_many Message, many_to_one Server

#### Message
A discussion message within a channel
Fields: id, created_at, updated_at, user_id, content
Relationships: many_to_one Channel, many_to_one User

#### User
A platform user
Fields: id, created_at, updated_at, user_id, username, email
Relationships: many_to_many Server, one_to_many Message

**Relationships:**
- Server → Channel: one_to_many (A server can have multiple channels)
- Server → User: many_to_many (A server can have multiple users, and a user can be part of multiple servers)
- Channel → Message: one_to_many (A channel can have multiple messages)
- Channel → Server: many_to_one (A channel belongs to one server)
- Message → Channel: many_to_one (A message belongs to one channel)
- Message → User: many_to_one (A message is sent by one user)
- User → Server: many_to_many (A user can be part of multiple servers)
- User → Message: one_to_many (A user can send multiple messages)

### User Flows


**Onboarding Flow** (User)
A guided onboarding process for new users
1. Create account
2. Verify email
3. Complete profile
✓ Success: User has completed the onboarding process and is logged in


**Server Creation Flow** (User)
A flow for creating a new server
1. Click create server button
2. Enter server details
3. Create server
✓ Success: Server is created and user is redirected to the server page

### Screens/Pages

- **Landing Page** (`/`): The main landing page for the platform
- **Dashboard Page** (`/dashboard`) 🔒: The user dashboard page
- **Server Page** (`/servers/:serverId`) 🔒: The server page with channels and discussions

### Folder Structure
```
├── app/
│   ├── (auth)/              # Auth Pages (login, signup)
│   ├── (app)/               # Protected App Pages
│   │   ├── dashboard/
│   │   ├── landing page/  # The main landing page for the platform
│   │   ├── dashboard/  # The user dashboard page
│   │   ├── servers/:serverId/  # The server page with channels and discussions
│   │   └── account/
│   ├── api/                 # API Routes
│   │   ├── auth/
│   │   ├── servers/
│   │   ├── channels/
│   │   ├── messages/
│   │   ├── users/
│   │   └── upload/
│   ├── layout.tsx           # Root Layout
│   ├── page.tsx             # Landing Page
│   └── globals.css
├── components/
│   ├── ui/                  # Base UI Components (Button, Input, Card, etc.)
│   ├── layout/              # Layout Components (Header, Footer, Nav)
│   ├── forms/               # Form Components
│   └── [entity]/            # Entity-specific Components
├── hooks/
│   ├── useAuth.ts
│   ├── useToast.ts
│   └── use[Entity].ts
├── lib/
│   ├── supabase/
│   │   ├── client.ts        # Browser Client
│   │   └── server.ts        # Server Client
│   ├── api/
│   │   ├── errors.ts        # API Error Handling
│   │   └── response.ts      # Response Helpers
│   ├── schemas/             # Zod Schemas
│   ├── utils/               # Utility Functions
│   └── constants.ts         # App Constants
├── types/
│   ├── index.ts             # Shared Types
│   └── [entity].ts          # Entity Types
├── middleware.ts            # Auth Middleware
└── i18n/ (optional)         # Internationalization
```

### Konventionen

| Bereich | Konvention |
|---------|------------|
| Fileen | `kebab-case.ts` for Utils, `PascalCase.tsx` for Components |
| DB Tablen | `snake_case` plural (z.B. `user_profiles`) |
| API Routes | `/api/[entity]s` for Collections |
| Types | `PascalCase` Interface Names |
| Zod Schemas | `PascalCaseSchema` (z.B. `CreateTaskSchema`) |
| Hooks | `use[Name]` (z.B. `useTasks`) |
| Constants | `SCREAMING_SNAKE_CASE` |

### Data Flow
```
User Action
    ↓
Client Component (Form/Button)
    ↓
API Route (/api/[entity]s)
    ↓
Zod Validation
    ↓
Supabase Query (mit RLS)
    ↓
Response → SWR Cache Update → UI Update
```

---

## Phase 1: Project Setup

### 1.1 Next.js Projekt initialisieren
- [ ] Create das Projekt:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```

### 1.2 Dependencies installieren
- [ ] Core Dependencies:
```bash
npm install @supabase/ssr @supabase/supabase-js zod swr clsx tailwind-merge lucide-react
```

- [ ] UI Dependencies:
```bash
npm install @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast @radix-ui/react-select @radix-ui/react-checkbox @radix-ui/react-tabs class-variance-authority
```

- [ ] Form Dependencies:
```bash
npm install react-hook-form @hookform/resolvers
```

- [ ] Date/Time (falls needed):
```bash
npm install date-fns
```

- [ ] Dev Dependencies:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom
```


### 1.3 Basis-Fileen create

- [ ] Create `lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] Create `.env.local` (NICHT committen!):
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

- [ ] Create `.env.example`:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### 1.4 Supabase Clients create (IMPORTANT - vor allen anderen Fileen!)

- [ ] Create `lib/supabase/client.ts`:
```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] Create `lib/supabase/server.ts`:
```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from Server Component - ignore
          }
        },
      },
    }
  );
}
```

### ✅ CHECKPOINT Phase 1

Bevor du weitermachst, check:
```bash
npm run dev
```
- [ ] Server startet ohne Error auf http://localhost:3000
- [ ] Keine TypeScript Errors in der Konsole

**Bei Errorn:** Check ob alle Dependencies installiert sind (`npm install`)

---

## Phase 2: Supabase Database Setup

> **Note:** Die Supabase Clients wurden bereits in Phase 1 erstellt.

### 2.1 Database Schema

**IMPORTANT:** Dieses SQL muss manuell im Supabase Dashboard ausguided werden:
1. Open dein Supabase Projekt
2. Gehe zu SQL Editor
3. Kopiere das SQL below und run es aus

- [ ] Run folgendes SQL im Supabase Dashboard aus:

```sql
-- ============================================
-- PROFILES (for User-Metadaten)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- SERVERS
CREATE TABLE servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX servers_user_id_idx ON servers(user_id);
CREATE INDEX servers_created_at_idx ON servers(created_at DESC);

-- RLS
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own servers"
  ON servers
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- CHANNELS
CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX channels_user_id_idx ON channels(user_id);
CREATE INDEX channels_created_at_idx ON channels(created_at DESC);

-- RLS
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own channels"
  ON channels
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- MESSAGES
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX messages_user_id_idx ON messages(user_id);
CREATE INDEX messages_created_at_idx ON messages(created_at DESC);

-- RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own messages"
  ON messages
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  user_id UUID NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX users_user_id_idx ON users(user_id);
CREATE INDEX users_created_at_idx ON users(created_at DESC);

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own users"
  ON users
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_servers
  BEFORE UPDATE ON servers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_channels
  BEFORE UPDATE ON channels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_messages
  BEFORE UPDATE ON messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```



### ✅ CHECKPOINT Phase 2

- [ ] SQL im Supabase Dashboard ausguided (SQL Editor)
- [ ] Alle Tablen in Database > Tables sichtbar
- [ ] RLS ist aktiv (Schloss-Symbol bei jeder Table)

**Bei Errorn:** Check SQL Syntax, run Statements individually aus

---

## Phase 3: Authentication

### 3.1 Middleware create

- [ ] Create `middleware.ts` im Root:
```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protected routes
  const protectedPaths = ["/dashboard", "/account", "/settings"];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirect logged in users from auth pages
  const authPaths = ["/login", "/signup"];
  const isAuthPage = authPaths.includes(request.nextUrl.pathname);

  if (isAuthPage && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
```

### 3.2 Auth Layout

- [ ] Create `app/(auth)/layout.tsx`:
```typescript
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {children}
      </div>
    </div>
  );
}
```

### 3.3 Login Page (COMPLETE)

- [ ] Create `app/(auth)/login/page.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Anmelden</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Sign in to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="name@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Passwort
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Anmelden...' : 'Anmelden'}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Noch kein Konto?{' '}
        <Link href="/signup" className="text-primary hover:underline">
          Registrieren
        </Link>
      </p>
    </div>
  );
}
```

### 3.4 Signup Page (COMPLETE)

- [ ] Create `app/(auth)/signup/page.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Passwort muss mindestens 6 characters haben');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registrierung fehlgeschlagen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Konto create</h1>
        <p className="text-muted-foreground mt-2">
          Create ein neues Konto um loszulegen.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-Mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="name@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Passwort
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 border rounded-md bg-background"
            placeholder="Mindestens 6 characters"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Registrieren...' : 'Registrieren'}
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Bereits ein Konto?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Anmelden
        </Link>
      </p>
    </div>
  );
}
```

### 3.5 Auth Callback Route (REQUIRED)

- [ ] Create `app/auth/callback/route.ts`:
```typescript
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return to login with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
```

**Wichtig:** Diese Route ist für OAuth, Magic Links und Email-Bestätigung erforderlich.

### ✅ CHECKPOINT Phase 3

- [ ] `npm run dev` runs
- [ ] /login zeigt Login-Formular
- [ ] /signup zeigt Signup-Formular
- [ ] /auth/callback Route existiert
- [ ] Test: Registriere einen neuen User → Redirect zu /dashboard

**Bei Errorn:** Check Supabase URL/Key in .env.local, check ob Supabase Auth aktiviert ist

### 3.3 Onboarding Flow

Nach der Registrierung should der User durch folgende Stepe guided werden:

1. **Create account**
   Create a new user account and provide basic information
2. **Verify email**
   Verify your email address to complete the onboarding process
3. **Complete profile**
   Complete your profile with additional information to get started with the platform

- [ ] Create `app/(app)/onboarding/page.tsx`:
  - Multi-Step Wizard
  - Progress Indicator
  - Skip-Option (optional)
  - Redirect zu Dashboard nach Abschluss

- [ ] Create `components/onboarding/OnboardingWizard.tsx`:
  - State for current Step
  - Navigation (Next/Back)
  - Validation pro Step

- [ ] Speichere Onboarding-Status in Profil:
```sql
ALTER TABLE profiles ADD COLUMN onboarding_completed BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN onboarding_step INTEGER DEFAULT 0;
```

---

## Phase 4: Core Entities

### Dashboard Page (COMPLETE)

- [ ] Create `app/(app)/dashboard/page.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null; // Layout handles redirect
  }

  // Load Counts for alle Entities
  const { count: serverCount } = await supabase
    .from('servers')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const { count: channelCount } = await supabase
    .from('channels')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const { count: messageCount } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const { count: userCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const stats = [
    { name: 'Servers', count: serverCount || 0, href: '/servers' },
    { name: 'Channels', count: channelCount || 0, href: '/channels' },
    { name: 'Messages', count: messageCount || 0, href: '/messages' },
    { name: 'Users', count: userCount || 0, href: '/users' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.href}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### ✅ CHECKPOINT Phase 4

- [ ] Alle Entity Types erstellt
- [ ] Alle Zod Schemas erstellt
- [ ] API Routes funktionieren (teste mit curl oder Browser DevTools)
- [ ] Dashboard zeigt Entity Counts

**Test:**
```bash
# Nach npm run dev, teste API:
curl http://localhost:3000/api/servers
# Sollte { "data": [], "meta": { ... } } backgeben
```

### Server

**Description:** A community server for discussing movies

**Fields:**
- `id`: uuid - Primary key
- `created_at`: datetime - Creation timestamp
- `updated_at`: datetime - Last update timestamp
- `user_id`: uuid - Owner user ID
- `name`: string - Server name
- `description`: text (optional) - Server description

- [ ] Create `types/server.ts`:
```typescript
export interface Server {
  id: string;
  user_id: string;
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
```

- [ ] Create `lib/schemas/server.ts`:
```typescript
import { z } from "zod";

export const CreateServerSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  user_id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
});

export const UpdateServerSchema = CreateServerSchema.partial();

export type CreateServer = z.infer<typeof CreateServerSchema>;
export type UpdateServer = z.infer<typeof UpdateServerSchema>;
```

- [ ] Create `app/api/servers/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateServerSchema } from '@/lib/schemas/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const cursor = searchParams.get('cursor');

  let query = supabase
    .from('servers')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit + 1);

  if (cursor) {
    query = query.lt('created_at', cursor);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hasMore = data.length > limit;
  const items = hasMore ? data.slice(0, -1) : data;
  const nextCursor = hasMore ? items[items.length - 1]?.created_at : null;

  return NextResponse.json({
    data: items,
    meta: { next_cursor: nextCursor, has_more: hasMore }
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = CreateServerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('servers')
    .insert({ ...parsed.data, user_id: user.id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
```

- [ ] Create `app/api/servers/[id]/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { UpdateServerSchema } from '@/lib/schemas/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('servers')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = UpdateServerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('servers')
    .update(parsed.data)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('servers')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] Create `hooks/useServers.ts`:
```typescript
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { Server } from '@/types/server';
import type { CreateServer } from '@/lib/schemas/server';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to fetch');
  }
  return res.json();
};

export function useServers() {
  const { data, error, isLoading, mutate } = useSWR<{ data: Server[] }>(
    '/api/servers',
    fetcher
  );

  return {
    servers: data?.data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useServer(id: string | null) {
  const { data, error, isLoading } = useSWR<{ data: Server }>(
    id ? `/api/servers/${id}` : null,
    fetcher
  );

  return {
    server: data?.data,
    isLoading,
    error,
  };
}

export function useCreateServer() {
  const { trigger, isMutating } = useSWRMutation(
    '/api/servers',
    async (url: string, { arg }: { arg: CreateServer }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });
      if (!res.ok) throw new Error('Failed to create');
      return res.json();
    }
  );

  return { create: trigger, isCreating: isMutating };
}

export function useUpdateServer(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/servers/${id}`,
    async (url: string, { arg }: { arg: Partial<CreateServer> }) => {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    }
  );

  return { update: trigger, isUpdating: isMutating };
}

export function useDeleteServer(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/servers/${id}`,
    async (url: string) => {
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    }
  );

  return { remove: trigger, isDeleting: isMutating };
}
```

- [ ] Create `app/(app)/servers/page.tsx`:
  - Server Component mit Liste
  - Empty State wenn keine data
  - Link zu "Neu create"

- [ ] Create `app/(app)/servers/[id]/page.tsx`:
  - Detail View
  - Edit/Delete Buttons

- [ ] Create `components/server/ServerCard.tsx`:
  - Wiederverwendbare Card-Komponente

---

### Channel

**Description:** A discussion channel within a server

**Fields:**
- `id`: uuid - Primary key
- `created_at`: datetime - Creation timestamp
- `updated_at`: datetime - Last update timestamp
- `user_id`: uuid - Owner user ID
- `name`: string - Channel name
- `description`: text (optional) - Channel description

- [ ] Create `types/channel.ts`:
```typescript
export interface Channel {
  id: string;
  user_id: string;
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
```

- [ ] Create `lib/schemas/channel.ts`:
```typescript
import { z } from "zod";

export const CreateChannelSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  user_id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
});

export const UpdateChannelSchema = CreateChannelSchema.partial();

export type CreateChannel = z.infer<typeof CreateChannelSchema>;
export type UpdateChannel = z.infer<typeof UpdateChannelSchema>;
```

- [ ] Create `app/api/channels/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateChannelSchema } from '@/lib/schemas/channel';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const cursor = searchParams.get('cursor');

  let query = supabase
    .from('channels')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit + 1);

  if (cursor) {
    query = query.lt('created_at', cursor);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hasMore = data.length > limit;
  const items = hasMore ? data.slice(0, -1) : data;
  const nextCursor = hasMore ? items[items.length - 1]?.created_at : null;

  return NextResponse.json({
    data: items,
    meta: { next_cursor: nextCursor, has_more: hasMore }
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = CreateChannelSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('channels')
    .insert({ ...parsed.data, user_id: user.id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
```

- [ ] Create `app/api/channels/[id]/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { UpdateChannelSchema } from '@/lib/schemas/channel';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('channels')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = UpdateChannelSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('channels')
    .update(parsed.data)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('channels')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] Create `hooks/useChannels.ts`:
```typescript
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { Channel } from '@/types/channel';
import type { CreateChannel } from '@/lib/schemas/channel';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to fetch');
  }
  return res.json();
};

export function useChannels() {
  const { data, error, isLoading, mutate } = useSWR<{ data: Channel[] }>(
    '/api/channels',
    fetcher
  );

  return {
    channels: data?.data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useChannel(id: string | null) {
  const { data, error, isLoading } = useSWR<{ data: Channel }>(
    id ? `/api/channels/${id}` : null,
    fetcher
  );

  return {
    channel: data?.data,
    isLoading,
    error,
  };
}

export function useCreateChannel() {
  const { trigger, isMutating } = useSWRMutation(
    '/api/channels',
    async (url: string, { arg }: { arg: CreateChannel }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });
      if (!res.ok) throw new Error('Failed to create');
      return res.json();
    }
  );

  return { create: trigger, isCreating: isMutating };
}

export function useUpdateChannel(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/channels/${id}`,
    async (url: string, { arg }: { arg: Partial<CreateChannel> }) => {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    }
  );

  return { update: trigger, isUpdating: isMutating };
}

export function useDeleteChannel(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/channels/${id}`,
    async (url: string) => {
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    }
  );

  return { remove: trigger, isDeleting: isMutating };
}
```

- [ ] Create `app/(app)/channels/page.tsx`:
  - Server Component mit Liste
  - Empty State wenn keine data
  - Link zu "Neu create"

- [ ] Create `app/(app)/channels/[id]/page.tsx`:
  - Detail View
  - Edit/Delete Buttons

- [ ] Create `components/channel/ChannelCard.tsx`:
  - Wiederverwendbare Card-Komponente

---

### Message

**Description:** A discussion message within a channel

**Fields:**
- `id`: uuid - Primary key
- `created_at`: datetime - Creation timestamp
- `updated_at`: datetime - Last update timestamp
- `user_id`: uuid - Owner user ID
- `content`: text - Message content

- [ ] Create `types/message.ts`:
```typescript
export interface Message {
  id: string;
  user_id: string;
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}
```

- [ ] Create `lib/schemas/message.ts`:
```typescript
import { z } from "zod";

export const CreateMessageSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  user_id: z.string().uuid(),
  content: z.string(),
});

export const UpdateMessageSchema = CreateMessageSchema.partial();

export type CreateMessage = z.infer<typeof CreateMessageSchema>;
export type UpdateMessage = z.infer<typeof UpdateMessageSchema>;
```

- [ ] Create `app/api/messages/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateMessageSchema } from '@/lib/schemas/message';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const cursor = searchParams.get('cursor');

  let query = supabase
    .from('messages')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit + 1);

  if (cursor) {
    query = query.lt('created_at', cursor);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hasMore = data.length > limit;
  const items = hasMore ? data.slice(0, -1) : data;
  const nextCursor = hasMore ? items[items.length - 1]?.created_at : null;

  return NextResponse.json({
    data: items,
    meta: { next_cursor: nextCursor, has_more: hasMore }
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = CreateMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('messages')
    .insert({ ...parsed.data, user_id: user.id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
```

- [ ] Create `app/api/messages/[id]/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { UpdateMessageSchema } from '@/lib/schemas/message';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = UpdateMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('messages')
    .update(parsed.data)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] Create `hooks/useMessages.ts`:
```typescript
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { Message } from '@/types/message';
import type { CreateMessage } from '@/lib/schemas/message';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to fetch');
  }
  return res.json();
};

export function useMessages() {
  const { data, error, isLoading, mutate } = useSWR<{ data: Message[] }>(
    '/api/messages',
    fetcher
  );

  return {
    messages: data?.data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useMessage(id: string | null) {
  const { data, error, isLoading } = useSWR<{ data: Message }>(
    id ? `/api/messages/${id}` : null,
    fetcher
  );

  return {
    message: data?.data,
    isLoading,
    error,
  };
}

export function useCreateMessage() {
  const { trigger, isMutating } = useSWRMutation(
    '/api/messages',
    async (url: string, { arg }: { arg: CreateMessage }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });
      if (!res.ok) throw new Error('Failed to create');
      return res.json();
    }
  );

  return { create: trigger, isCreating: isMutating };
}

export function useUpdateMessage(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/messages/${id}`,
    async (url: string, { arg }: { arg: Partial<CreateMessage> }) => {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    }
  );

  return { update: trigger, isUpdating: isMutating };
}

export function useDeleteMessage(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/messages/${id}`,
    async (url: string) => {
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    }
  );

  return { remove: trigger, isDeleting: isMutating };
}
```

- [ ] Create `app/(app)/messages/page.tsx`:
  - Server Component mit Liste
  - Empty State wenn keine data
  - Link zu "Neu create"

- [ ] Create `app/(app)/messages/[id]/page.tsx`:
  - Detail View
  - Edit/Delete Buttons

- [ ] Create `components/message/MessageCard.tsx`:
  - Wiederverwendbare Card-Komponente

---

### User

**Description:** A platform user

**Fields:**
- `id`: uuid - Primary key
- `created_at`: datetime - Creation timestamp
- `updated_at`: datetime - Last update timestamp
- `user_id`: uuid - Owner user ID
- `username`: string - User username
- `email`: string - User email

- [ ] Create `types/user.ts`:
```typescript
export interface User {
  id: string;
  user_id: string;
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}
```

- [ ] Create `lib/schemas/user.ts`:
```typescript
import { z } from "zod";

export const CreateUserSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  user_id: z.string().uuid(),
  username: z.string(),
  email: z.string(),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
```

- [ ] Create `app/api/users/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CreateUserSchema } from '@/lib/schemas/user';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const cursor = searchParams.get('cursor');

  let query = supabase
    .from('users')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit + 1);

  if (cursor) {
    query = query.lt('created_at', cursor);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const hasMore = data.length > limit;
  const items = hasMore ? data.slice(0, -1) : data;
  const nextCursor = hasMore ? items[items.length - 1]?.created_at : null;

  return NextResponse.json({
    data: items,
    meta: { next_cursor: nextCursor, has_more: hasMore }
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = CreateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('users')
    .insert({ ...parsed.data, user_id: user.id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
```

- [ ] Create `app/api/users/[id]/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { UpdateUserSchema } from '@/lib/schemas/user';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = UpdateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('users')
    .update(parsed.data)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] Create `hooks/useUsers.ts`:
```typescript
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import type { User } from '@/types/user';
import type { CreateUser } from '@/lib/schemas/user';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to fetch');
  }
  return res.json();
};

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR<{ data: User[] }>(
    '/api/users',
    fetcher
  );

  return {
    users: data?.data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useUser(id: string | null) {
  const { data, error, isLoading } = useSWR<{ data: User }>(
    id ? `/api/users/${id}` : null,
    fetcher
  );

  return {
    user: data?.data,
    isLoading,
    error,
  };
}

export function useCreateUser() {
  const { trigger, isMutating } = useSWRMutation(
    '/api/users',
    async (url: string, { arg }: { arg: CreateUser }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });
      if (!res.ok) throw new Error('Failed to create');
      return res.json();
    }
  );

  return { create: trigger, isCreating: isMutating };
}

export function useUpdateUser(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/users/${id}`,
    async (url: string, { arg }: { arg: Partial<CreateUser> }) => {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      });
      if (!res.ok) throw new Error('Failed to update');
      return res.json();
    }
  );

  return { update: trigger, isUpdating: isMutating };
}

export function useDeleteUser(id: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/users/${id}`,
    async (url: string) => {
      const res = await fetch(url, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      return res.json();
    }
  );

  return { remove: trigger, isDeleting: isMutating };
}
```

- [ ] Create `app/(app)/users/page.tsx`:
  - Server Component mit Liste
  - Empty State wenn keine data
  - Link zu "Neu create"

- [ ] Create `app/(app)/users/[id]/page.tsx`:
  - Detail View
  - Edit/Delete Buttons

- [ ] Create `components/user/UserCard.tsx`:
  - Wiederverwendbare Card-Komponente

### User Flows

**Onboarding Flow:**
A guided onboarding process for new users

Stepe:
1. Create account
2. Verify email
3. Complete profile

**Server Creation Flow:**
A flow for creating a new server

Stepe:
1. Click create server button
2. Enter server details
3. Create server

### Geplante API Endpoints

Diese Endpoints sind for die App intended:

- `POST /api/auth/register`: Create a new user account
- `POST /api/auth/login`: Login to an existing user account
- `GET /api/servers`: Get a list of all servers 🔒
- `POST /api/servers/create`: Create a new server 🔒

**Note:** Die Standard CRUD Endpoints pro Entity werden automatisch erstellt. Die obigen Endpoints sind additional, spezifische API Routen.

---

## Phase 5: API Layer

### 5.1 API Error Handling

- [ ] Create `lib/api/errors.ts`:
```typescript
export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number = 400,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const Errors = {
  UNAUTHORIZED: new ApiError('UNAUTHORIZED', 'Not authenticated', 401),
  FORBIDDEN: new ApiError('FORBIDDEN', 'Not authorized', 403),
  NOT_FOUND: new ApiError('NOT_FOUND', 'Resource not found', 404),
  VALIDATION: (details: unknown) => new ApiError('VALIDATION_ERROR', 'Validation failed', 400, details),
  INTERNAL: new ApiError('INTERNAL_ERROR', 'Internal server error', 500),
};
```

- [ ] Create `lib/api/response.ts`:
```typescript
import { NextResponse } from 'next/server';
import { ApiError } from './errors';

export function success<T>(data: T, status = 200) {
  return NextResponse.json({ data }, { status });
}

export function paginated<T>(data: T[], meta: { next_cursor: string | null; has_more: boolean }) {
  return NextResponse.json({ data, meta });
}

export function error(err: ApiError | Error) {
  if (err instanceof ApiError) {
    return NextResponse.json(
      { error: { code: err.code, message: err.message, details: err.details } },
      { status: err.status }
    );
  }
  console.error('Unexpected error:', err);
  return NextResponse.json(
    { error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } },
    { status: 500 }
  );
}
```

### 5.2 API Route Pattern

Jede Entity API Route should diesem Pattern folgen:

```typescript
// app/api/[entity]s/route.ts
import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { success, paginated, error } from '@/lib/api/response';
import { Errors } from '@/lib/api/errors';
import { Create[Entity]Schema, PaginationSchema } from '@/lib/schemas/[entity]';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw Errors.UNAUTHORIZED;

    const { searchParams } = new URL(request.url);
    const query = PaginationSchema.safeParse({
      limit: searchParams.get('limit'),
      cursor: searchParams.get('cursor'),
    });
    if (!query.success) throw Errors.VALIDATION(query.error.flatten());

    // Query with pagination...
    return paginated(items, { next_cursor, has_more });
  } catch (err) {
    return error(err as Error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw Errors.UNAUTHORIZED;

    const body = await request.json();
    const parsed = Create[Entity]Schema.safeParse(body);
    if (!parsed.success) throw Errors.VALIDATION(parsed.error.flatten());

    // Create...
    return success(data, 201);
  } catch (err) {
    return error(err as Error);
  }
}
```

### 5.3 Pagination Schema

- [ ] Create `lib/schemas/pagination.ts`:
```typescript
import { z } from 'zod';

export const PaginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
});

export type Pagination = z.infer<typeof PaginationSchema>;
```

### 5.4 Custom API Endpoints

Additionally zu den CRUD Endpoints sind folgende spezifische Endpoints geplant:

- [ ] Create `app/api/auth/register/route.ts`:
  - Methode: `POST`
  - Description: Create a new user account
  - Auth: Nein

- [ ] Create `app/api/auth/login/route.ts`:
  - Methode: `POST`
  - Description: Login to an existing user account
  - Auth: Nein

- [ ] Create `app/api/servers/route.ts`:
  - Methode: `GET`
  - Description: Get a list of all servers
  - Auth: Ja

- [ ] Create `app/api/servers/create/route.ts`:
  - Methode: `POST`
  - Description: Create a new server
  - Auth: Ja

---

## Phase 6: UI Components

### 6.1 Button Component (COMPLETE)

- [ ] Create `components/ui/button.tsx`:
```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### 6.2 Input Component (COMPLETE)

- [ ] Create `components/ui/input.tsx`:
```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```

### 6.3 Card Component (COMPLETE)

- [ ] Create `components/ui/card.tsx`:
```typescript
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

### 6.4 Skeleton & Spinner (COMPLETE)

- [ ] Create `components/ui/skeleton.tsx`:
```typescript
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />
  );
}

export { Skeleton };
```

- [ ] Create `components/ui/spinner.tsx`:
```typescript
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("h-4 w-4 animate-spin", className)} />;
}
```

### 6.5 Empty State Component

- [ ] Create `components/ui/empty-state.tsx`:
```typescript
import { LucideIcon } from "lucide-react";
import { Button } from "./button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

### 6.6 Weitere UI Components

Create diese additionaln Components nach Bedarf:

| Component | Description |
|-----------|--------------|
| `textarea.tsx` | Textarea mit auto-resize |
| `select.tsx` | Select mit Radix |
| `checkbox.tsx` | Checkbox mit Radix |
| `badge.tsx` | Badge mit variants |
| `dialog.tsx` | Modal dialog (Radix) |
| `dropdown-menu.tsx` | Dropdown menu (Radix) |
| `avatar.tsx` | User avatar mit fallback |

### 6.7 App Layout (COMPLETE)

- [ ] Create `app/(app)/layout.tsx`:
```typescript
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Header } from '@/components/layout/Header';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
```

- [ ] Create `components/layout/Header.tsx`:
```typescript
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    // TODO: Entity-Links hier add
  ];

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="font-bold text-xl">
            {/* APP_NAME */}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="py-2 text-left text-muted-foreground hover:text-foreground"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
```

### 6.3 Toast/Notification System

- [ ] Create `components/ui/toaster.tsx` und `hooks/useToast.ts`:
```typescript
// hooks/useToast.ts
import { create } from 'zustand'; // oder useState + Context

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error';
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { ...toast, id: Date.now().toString() }]
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  })),
}));

// Usage:
// const { addToast } = useToast();
// addToast({ title: 'Saved!', variant: 'success' });
```

### 6.8 Global Styles (COMPLETE)

- [ ] Update `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .container {
    @apply max-w-7xl mx-auto;
  }
}
```

- [ ] Update `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
```

### ✅ CHECKPOINT Phase 6

- [ ] `npm run dev` runs ohne Error
- [ ] UI Components rendern korrekt
- [ ] Tailwind Styles werden angewendet
- [ ] Dark Mode funktioniert (falls aktiviert)

**Bei Errorn:** Check tailwind.config.ts und globals.css Syntax

### 6.5 App Screens

Diese Screens sind for die App geplant:

- [ ] **Landing Page** (`/`)
  - The main landing page for the platform
  - Components: Hero Section, Features Section, Call to Action Button

- [ ] **Dashboard Page** (`/dashboard`) 🔒
  - The user dashboard page
  - Components: Server List, Channel List, Create Server Button

- [ ] **Server Page** (`/servers/:serverId`) 🔒
  - The server page with channels and discussions
  - Components: Channel List, Discussion List, Create Channel Button

---

## Phase 7: Forms & Validation

### 7.1 Form Pattern mit react-hook-form + Zod

- [ ] Create Form-Komponente Pattern:
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Create[Entity]Schema, type Create[Entity] } from '@/lib/schemas/[entity]';

export function [Entity]Form({ onSubmit, defaultValues }: Props) {
  const form = useForm<Create[Entity]>({
    resolver: zodResolver(Create[Entity]Schema),
    defaultValues,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      form.setError('root', { message: 'Ein Error ist aufgetreten' });
    }
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {form.formState.errors.root && (
        <div className="text-destructive text-sm">
          {form.formState.errors.root.message}
        </div>
      )}

      <div>
        <label htmlFor="field">Field</label>
        <input
          {...form.register('field')}
          className={cn('input', form.formState.errors.field && 'border-destructive')}
        />
        {form.formState.errors.field && (
          <p className="text-destructive text-sm">{form.formState.errors.field.message}</p>
        )}
      </div>

      <button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Speichern...' : 'Speichern'}
      </button>
    </form>
  );
}
```

### 7.2 Entity Forms create

- [ ] Create `components/server/ServerForm.tsx`
- [ ] Create `components/channel/ChannelForm.tsx`
- [ ] Create `components/message/MessageForm.tsx`
- [ ] Create `components/user/UserForm.tsx`

### 7.3 Form UI Components

- [ ] Create `components/ui/form.tsx`:
  - FormField, FormItem, FormLabel, FormControl, FormMessage
  - Integration mit react-hook-form
  - Error State Styling

---

## Phase 8: State Management & Hooks

### 8.1 Auth Hook

- [ ] Create `hooks/useAuth.ts`:
```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, loading, signOut };
}
```

### 8.2 Entity Hooks mit SWR


- [ ] Create `hooks/useServers.ts`:
```typescript
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to fetch');
  }
  return res.json();
};

export function useServers() {
  const { data, error, isLoading, mutate } = useSWR('/api/servers', fetcher);

  return {
    servers: data?.data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useServer(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/servers/${id}` : null,
    fetcher
  );

  return {
    server: data?.data,
    isLoading,
    error,
  };
}

export function useCreateServer() {
  const { trigger, isMutating } = useSWRMutation(
    '/api/servers',
    (url, { arg }: { arg: CreateServer }) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      }).then(r => r.json())
  );

  return { create: trigger, isCreating: isMutating };
}
```

- [ ] Create `hooks/useChannels.ts`:
```typescript
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to fetch');
  }
  return res.json();
};

export function useChannels() {
  const { data, error, isLoading, mutate } = useSWR('/api/channels', fetcher);

  return {
    channels: data?.data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useChannel(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/channels/${id}` : null,
    fetcher
  );

  return {
    channel: data?.data,
    isLoading,
    error,
  };
}

export function useCreateChannel() {
  const { trigger, isMutating } = useSWRMutation(
    '/api/channels',
    (url, { arg }: { arg: CreateChannel }) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      }).then(r => r.json())
  );

  return { create: trigger, isCreating: isMutating };
}
```

- [ ] Create `hooks/useMessages.ts`:
```typescript
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to fetch');
  }
  return res.json();
};

export function useMessages() {
  const { data, error, isLoading, mutate } = useSWR('/api/messages', fetcher);

  return {
    messages: data?.data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useMessage(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/messages/${id}` : null,
    fetcher
  );

  return {
    message: data?.data,
    isLoading,
    error,
  };
}

export function useCreateMessage() {
  const { trigger, isMutating } = useSWRMutation(
    '/api/messages',
    (url, { arg }: { arg: CreateMessage }) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      }).then(r => r.json())
  );

  return { create: trigger, isCreating: isMutating };
}
```

- [ ] Create `hooks/useUsers.ts`:
```typescript
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(error.message || 'Failed to fetch');
  }
  return res.json();
};

export function useUsers() {
  const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);

  return {
    users: data?.data ?? [],
    isLoading,
    error,
    refresh: mutate,
  };
}

export function useUser(id: string) {
  const { data, error, isLoading } = useSWR(
    id ? `/api/users/${id}` : null,
    fetcher
  );

  return {
    user: data?.data,
    isLoading,
    error,
  };
}

export function useCreateUser() {
  const { trigger, isMutating } = useSWRMutation(
    '/api/users',
    (url, { arg }: { arg: CreateUser }) =>
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
      }).then(r => r.json())
  );

  return { create: trigger, isCreating: isMutating };
}
```

### 8.3 Utility Hooks

- [ ] Create `hooks/useDebounce.ts`
- [ ] Create `hooks/useLocalStorage.ts`
- [ ] Create `hooks/useMediaQuery.ts`



---

## Phase 10: Landing Page

### Problem & Solution

**Das Problem (for Messaging use):**
Entrepreneurs lack a platform to connect, discuss, and learn from movies

**Unsere Solution:**
FilmForge is a community-driven app that leverages blockchain verification to connect entrepreneurs and filmmakers through daily movie screenings and discussions. It combines the mindfulness of Headspace's daily practice with the community features of Discord, fostering a collaborative environment for creative problem-solving. By focusing on indie films and emerging artists, FilmForge promotes diversity and innovation in the film industry.

**Was uns unterscheidet:**
1. Blockchain verification for secure and transparent discussions
2. Daily movie practice inspired by Headspace
3. Discord-like servers and channels for community building

### Content Vorgaben

**Hero Section:**
- Headline: "Connect with like-minded entrepreneurs and grow your business"
- Subheadline: "Join our community of entrepreneurs and movie enthusiasts"
- Primary CTA: "Sign up for free"
- Secondary CTA: "Learn more"


**Value Propositions / Features:**
1. auth
2. daily_movie_practice
3. servers_and_channels
4. blockchain_verification
5. discussion_forums
6. user_profile
7. movie_library
8. user_profiles
9. event_calendar
10. resource_library
11. community_badges
12. movie_recommendations

### Tasks

- [ ] Create `app/page.tsx` (Landing Page)
- [ ] Create `components/landing/Hero.tsx`
- [ ] Create `components/landing/Features.tsx`
- [ ] Create `components/landing/HowItWorks.tsx`
- [ ] Create `components/landing/Testimonials.tsx`
- [ ] Create `components/landing/FAQ.tsx`
- [ ] Create `components/landing/CTA.tsx`
- [ ] Create `components/landing/Footer.tsx`

### Landing Page Prompt

```
Create a complete Landing Page for FilmForge:

Problem: Entrepreneurs lack a platform to connect, discuss, and learn from movies
Headline: Connect with like-minded entrepreneurs and grow your business
Subheadline: Join our community of entrepreneurs and movie enthusiasts
Primary CTA: Sign up for free
Features/Value Props: auth, daily_movie_practice, servers_and_channels, blockchain_verification, discussion_forums, user_profile, movie_library, user_profiles, event_calendar, resource_library, community_badges, movie_recommendations
Differentiators: Blockchain verification for secure and transparent discussions, Daily movie practice inspired by Headspace, Discord-like servers and channels for community building

Sections:
1. Hero with CTA Buttons
2. Features Grid (3-4 Features with Icons)
3. How it Works (3 Steps)
4. Testimonials (Placeholder)
5. FAQ Accordion
6. Final CTA
7. Footer

Design: Modern, clean, mobile-first, dark mode support
Tech: Next.js, Tailwind, Lucide Icons
```

---

## Phase 11: Testing

### 11.1 Vitest Setup

- [ ] Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
});
```

- [ ] Create `vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom';
```

- [ ] Update `package.json` scripts:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### 11.2 Test Files create

- [ ] Create Tests for Utils:
  - `lib/utils.test.ts`

- [ ] Create Tests for Schemas:
  - `lib/schemas/server.test.ts`
  - `lib/schemas/channel.test.ts`
  - `lib/schemas/message.test.ts`
  - `lib/schemas/user.test.ts`

- [ ] Create Component Tests:
  - `components/ui/button.test.tsx`

### 11.3 Test Example

```typescript
// lib/schemas/[entity].test.ts
import { describe, it, expect } from 'vitest';
import { Create[Entity]Schema } from './[entity]';

describe('[Entity] Schema', () => {
  it('validates correct data', () => {
    const result = Create[Entity]Schema.safeParse({
      // valid data
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid data', () => {
    const result = Create[Entity]Schema.safeParse({
      // invalid data
    });
    expect(result.success).toBe(false);
  });
});
```

### 11.4 Manual Testing Checklist

**Auth:**
- [ ] Signup funktioniert
- [ ] Login funktioniert
- [ ] Logout funktioniert
- [ ] Protected routes redirect

**Entities:**
- [ ] Server CRUD funktioniert
- [ ] Channel CRUD funktioniert
- [ ] Message CRUD funktioniert
- [ ] User CRUD funktioniert

**UI:**
- [ ] Mobile responsive
- [ ] Loading states
- [ ] Error states
- [ ] Empty states

### 11.5 Flow Tests

Diese User Flows shouldn End-to-End getestet werden:

**Onboarding Flow:**
- [ ] Step 1: Create account
- [ ] Step 2: Verify email
- [ ] Step 3: Complete profile
- [ ] Success: User has completed the onboarding process and is logged in

**Server Creation Flow:**
- [ ] Step 1: Click create server button
- [ ] Step 2: Enter server details
- [ ] Step 3: Create server
- [ ] Success: Server is created and user is redirected to the server page

---

## Phase 12: Security

### 12.1 Security Checklist

**Authentication:**
- [ ] Alle protected routes checkn Auth
- [ ] Session handling korrekt
- [ ] Logout deletes Session komplett

**Authorization (RLS):**
- [ ] Alle Tablen haben RLS aktiviert
- [ ] servers: Policy korrekt
- [ ] channels: Policy korrekt
- [ ] messages: Policy korrekt
- [ ] users: Policy korrekt

**Input Validation:**
- [ ] Alle API Inputs mit Zod validated
- [ ] File Uploads validated (falls vorhanden)

**Data Exposure:**
- [ ] Keine sensiblen data in Client Bundle
- [ ] .env.local in .gitignore
- [ ] Keine API Keys im Code

### 12.2 Security Prompt

```
Run einen Security Audit for Server durch:

1. Check alle API Routes auf Auth
2. Check RLS Policies
3. Check Input Validation
4. Check Environment Variables
5. Create Report mit Findings und Fixes
```



---

## Phase 13: SEO & Metadata

### 13.1 Root Metadata

- [ ] Update `app/layout.tsx`:
```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'FilmForge',
    template: '%s | FilmForge',
  },
  description: 'Connecting minds through cinema',
  keywords: ['FilmForge', 'Blockchain verification for secure and transparent discussions', 'Daily movie practice inspired by Headspace', 'Discord-like servers and channels for community building'],
  authors: [{ name: 'FilmForge Team' }],
  openGraph: {
    title: 'FilmForge',
    description: 'Connecting minds through cinema',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'FilmForge',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FilmForge',
    description: 'Connecting minds through cinema',
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 13.2 Page-specific Metadata

- [ ] Jede Page should own Metadata haben:
```typescript
// app/(app)/dashboard/page.tsx
export const metadata: Metadata = {
  title: 'Dashboard',
};
```

### 13.3 Sitemap

- [ ] Create `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/signup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
```

### 13.4 Robots.txt

- [ ] Create `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/dashboard/'] },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
```

---

## Phase 14: Deployment

### 14.1 Pre-Deployment Checklist

- [ ] `npm run build` erfolgreich
- [ ] `npm run test` erfolgreich
- [ ] `.env.example` completely
- [ ] Keine Secrets im Code
- [ ] SEO Metadata gesetzt

### 14.2 Vercel Deployment

- [ ] GitHub Repo create und pushen
- [ ] Vercel Projekt create
- [ ] Environment Variables setzen:
  - `NEXT_PUBLIC_APP_URL`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Deploy triggern

### 14.3 Post-Deployment

- [ ] Production URL testen
- [ ] Supabase Auth Redirect URLs updaten
- [ ] Custom Domain konfigurieren (optional)
- [ ] Analytics einrichten (optional)

### 14.4 Monitoring (Optional)

- [ ] Error Tracking (Sentry)
- [ ] Analytics (Vercel Analytics, Plausible)
- [ ] Uptime Monitoring

---

## 🎉 FINAL CHECKPOINT

Bevor du fertig bist, check diese finale Checkliste:

### Build & Lint
```bash
npm run build && npm run lint
```
- [ ] Build erfolgreich ohne Errors
- [ ] Keine Lint Errors

### functionality
- [ ] Landing Page lädt
- [ ] Signup funktioniert
- [ ] Login funktioniert
- [ ] Dashboard zeigt nach Login
- [ ] Entity CRUD funktioniert (Create, Read, Update, Delete)
- [ ] Logout funktioniert

### Code Quality
- [ ] Keine console.log im Production Code
- [ ] Keine hardcoded Secrets
- [ ] TypeScript Errors behoben
- [ ] Keine unused imports

### Bei Errorn
1. Lies die Errormeldung genau
2. Check die entsprechende File
3. Behebe den Error
4. Run `npm run build` erneut aus
5. Wiederhole bis Build erfolgreich

**Die App ist fertig wenn alle Checkboxen abgehakt sind und `npm run build` erfolgreich durchruns.**

---

## Prompt Library

> **Instruction:** Diese Prompts can direkt an Claude Code gegeben werden um spezifische Tasks auszurunn.

---

### 🏗️ SETUP PROMPTS

### App-Kontext for alle Prompts

**Produkt:** FilmForge
**Problem:** Entrepreneurs lack a platform to connect, discuss, and learn from movies
**Target audience:** Independent filmmakers and entrepreneurs
**Persona:** {"age":"25-45","interests":"movies, entrepreneurship, personal growth","pain_points":"lack of community, limited resources for learning","goals":"connect with like-minded individuals, learn from movies, grow as entrepreneurs"}
**Entities:** Server, Channel, Message, User

---

#### Supabase Client Setup
```
Create die Supabase Client-Konfiguration for FilmForge:

1. lib/supabase/client.ts - Browser Client mit createBrowserClient
2. lib/supabase/server.ts - Server Client mit async createClient()
   - Verwende das neue Cookie-API (getAll/setAll)
   - Inkludiere getUser() und requireUser() Helpers

Achte auf:
- Next.js 14+ App Router Compatibility
- TypeScript strict mode
- Korrekte Cookie-Handling for SSR
```

#### Middleware Setup
```
Create die Auth Middleware for FilmForge:

Protected Routes:
- /dashboard
- /account
- /servers
- /channels
- /messages
- /users

Auth Routes (redirect wenn eingeloggt):
- /login
- /signup

Verwende das neue Supabase SSR Cookie-API.
```

---

### 🔐 AUTH PROMPTS

#### Login Page
```
Create die Login Page for FilmForge:

File: app/(auth)/login/page.tsx

Features:
- Email + Password Formular
- Error State Handling
- Loading State during Submit
- Link zu Signup
- Redirect zu /dashboard nach erfolgreichem Login
- Responsive Design
- Dark Mode kompatibel

Technisch:
- 'use client' Komponente
- Supabase signInWithPassword
- useRouter for Navigation
- Form mit onSubmit Handler
```

#### Signup Page
```
Create die Signup Page for FilmForge:

File: app/(auth)/signup/page.tsx

Features:
- Email + Password Formular
- Password minimum length 6 characters
- Password confirmation (optional)
- Error State Handling
- Link zu Login
- Redirect nach Signup

Gleiche Patterns wie Login Page.
```

#### Logout Function
```
Implement Logout for FilmForge:

1. Logout Button Component
2. Supabase signOut aufrufen
3. Redirect zu / oder /login
4. Optional: Toast Notification "Erfolgreich ausgeloggt"
```

---

### 📦 ENTITY PROMPTS

#### Server CRUD komplett
```
Create completelyes CRUD for Server in FilmForge:

Entity: Server
Fields: id (uuid), created_at (datetime), updated_at (datetime), user_id (uuid), name (string), description (text)

Create:
1. types/server.ts - TypeScript Interface
2. lib/schemas/server.ts - Zod Schemas (Create, Update)
3. app/api/servers/route.ts - GET (list mit Pagination), POST (create)
4. app/api/servers/[id]/route.ts - GET, PATCH, DELETE
5. app/(app)/servers/page.tsx - Liste (Server Component)
6. app/(app)/servers/[id]/page.tsx - Detail (Server Component)
7. app/(app)/servers/new/page.tsx - Create Form
8. components/server/ServerCard.tsx - Card Component
9. components/server/ServerForm.tsx - Create/Edit Form
10. hooks/useServers.ts - SWR Hook

Alle API Routes must:
- Auth checkn
- Zod Validation use
- Nur own data des Users backgeben (RLS)
- Korrekte HTTP Status Codes
```

#### Channel CRUD komplett
```
Create completelyes CRUD for Channel in FilmForge:

Entity: Channel
Fields: id (uuid), created_at (datetime), updated_at (datetime), user_id (uuid), name (string), description (text)

Create:
1. types/channel.ts - TypeScript Interface
2. lib/schemas/channel.ts - Zod Schemas (Create, Update)
3. app/api/channels/route.ts - GET (list mit Pagination), POST (create)
4. app/api/channels/[id]/route.ts - GET, PATCH, DELETE
5. app/(app)/channels/page.tsx - Liste (Server Component)
6. app/(app)/channels/[id]/page.tsx - Detail (Server Component)
7. app/(app)/channels/new/page.tsx - Create Form
8. components/channel/ChannelCard.tsx - Card Component
9. components/channel/ChannelForm.tsx - Create/Edit Form
10. hooks/useChannels.ts - SWR Hook

Alle API Routes must:
- Auth checkn
- Zod Validation use
- Nur own data des Users backgeben (RLS)
- Korrekte HTTP Status Codes
```

#### Message CRUD komplett
```
Create completelyes CRUD for Message in FilmForge:

Entity: Message
Fields: id (uuid), created_at (datetime), updated_at (datetime), user_id (uuid), content (text)

Create:
1. types/message.ts - TypeScript Interface
2. lib/schemas/message.ts - Zod Schemas (Create, Update)
3. app/api/messages/route.ts - GET (list mit Pagination), POST (create)
4. app/api/messages/[id]/route.ts - GET, PATCH, DELETE
5. app/(app)/messages/page.tsx - Liste (Server Component)
6. app/(app)/messages/[id]/page.tsx - Detail (Server Component)
7. app/(app)/messages/new/page.tsx - Create Form
8. components/message/MessageCard.tsx - Card Component
9. components/message/MessageForm.tsx - Create/Edit Form
10. hooks/useMessages.ts - SWR Hook

Alle API Routes must:
- Auth checkn
- Zod Validation use
- Nur own data des Users backgeben (RLS)
- Korrekte HTTP Status Codes
```

#### User CRUD komplett
```
Create completelyes CRUD for User in FilmForge:

Entity: User
Fields: id (uuid), created_at (datetime), updated_at (datetime), user_id (uuid), username (string), email (string)

Create:
1. types/user.ts - TypeScript Interface
2. lib/schemas/user.ts - Zod Schemas (Create, Update)
3. app/api/users/route.ts - GET (list mit Pagination), POST (create)
4. app/api/users/[id]/route.ts - GET, PATCH, DELETE
5. app/(app)/users/page.tsx - Liste (Server Component)
6. app/(app)/users/[id]/page.tsx - Detail (Server Component)
7. app/(app)/users/new/page.tsx - Create Form
8. components/user/UserCard.tsx - Card Component
9. components/user/UserForm.tsx - Create/Edit Form
10. hooks/useUsers.ts - SWR Hook

Alle API Routes must:
- Auth checkn
- Zod Validation use
- Nur own data des Users backgeben (RLS)
- Korrekte HTTP Status Codes
```

---

### 🎨 UI/DESIGN PROMPTS

#### Landing Page komplett
```
Create eine moderne Landing Page for FilmForge:

Product Info:
- Name: FilmForge
- Tagline: Connecting minds through cinema
- Description: FilmForge is a community-driven app that leverages blockchain verification to connect entrepreneurs and filmmakers through daily movie screenings and discussions. It combines the mindfulness of Headspace's daily practice with the community features of Discord, fostering a collaborative environment for creative problem-solving. By focusing on indie films and emerging artists, FilmForge promotes diversity and innovation in the film industry.
- Target audience: Independent filmmakers and entrepreneurs

Sektionen:
1. Hero
   - Headline + Subheadline
   - Primary CTA "Jetzt starten" -> /signup
   - Secondary CTA "Mehr erfahren" -> #features
   - Optional: Hero Image/Illustration Platzhalter

2. Features (3-4 Features)
   - Icon + Headline + Description
   - Grid Layout
   - Basierend auf den Entities: Server, Channel, Message, User

3. How it Works (3 Stepe)
   - Nummerierte Stepe
   - Icon + Titel + Description

4. Social Proof
   - Testimonial Platzhalter
   - "Trusted by X users" Platzhalter

5. FAQ (4-5 Fragen)
   - Accordion oder einfache Liste
   - Typische Fragen for diese App-Art

6. Final CTA
   - Wiederholung des Haupt-CTAs
   - Email Signup oder direkt zu /signup

7. Footer
   - Links: Imprint, dataschutz, Contact
   - Social Links Platzhalter
   - Copyright

Design:
- Mobile-first responsive
- Dark Mode kompatibel
- Viel Whitespace
- Subtle Animations (CSS only)
- Lucide Icons
```

#### Dashboard Layout
```
Create das Dashboard Layout for FilmForge:

File: app/(app)/layout.tsx

Features:
1. Header
   - Logo "FilmForge" (links)
   - Navigation Links (Servers, Channels, Messages, Users, Account)
   - User Menu (Dropdown mit Logout)

2. Mobile
   - Hamburger Menu
   - Slide-out Navigation

3. Main Content Area
   - Container mit max-width
   - Padding for Content

Komponenten:
- components/layout/Header.tsx
- components/layout/MobileNav.tsx
- components/layout/UserMenu.tsx
```

#### UI Components (shadcn-style)
```
Create die Basis UI Components for FilmForge:

1. components/ui/button.tsx
   - Variants: default, destructive, outline, secondary, ghost, link
   - Sizes: default, sm, lg, icon
   - Mit class-variance-authority

2. components/ui/input.tsx
   - Standard Input
   - Error State

3. components/ui/card.tsx
   - Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

4. components/ui/badge.tsx
   - Variants: default, secondary, destructive, outline

5. components/ui/skeleton.tsx
   - For Loading States

Alle Components:
- TypeScript mit forwardRef
- className prop mit cn() merge
- Accessible (ARIA labels)
```

#### Global Styles
```
Create die globalen Styles for FilmForge:

File: app/globals.css

Features:
1. CSS Variables for Light Mode:
   - --background, --foreground
   - --card, --card-foreground
   - --primary, --primary-foreground
   - --secondary, --secondary-foreground
   - --muted, --muted-foreground
   - --accent, --accent-foreground
   - --destructive, --destructive-foreground
   - --border, --input, --ring
   - --radius

2. CSS Variables for Dark Mode (.dark):
   - Invertierte/angepasste Werte

3. Base Layer:
   - * { border-color: border }
   - body { background, color }

4. Utility Classes (optional):
   - .container
   - .prose (for Markdown content)
```

---

### 🔒 SECURITY PROMPTS

#### Security Audit
```
Run einen completelyen Security Audit for FilmForge durch:

Check:

1. Authentication
   - [ ] Alle protected routes checkn Auth
   - [ ] Session handling korrekt
   - [ ] Logout deletes Session komplett

2. Authorization
   - [ ] RLS auf allen Tablen aktiv
   - [ ] Policies korrekt (user can only CRUD own data)
   - [ ] Keine Privilege Escalation possible

3. Input Validation
   - [ ] Alle API Inputs mit Zod validated
   - [ ] File Uploads validated (Typ, size)
   - [ ] SQL Injection nicht possible (Supabase use)

4. Data Exposure
   - [ ] Keine sensiblen data in Client Bundle
   - [ ] API gibt nur necessarye Fields back
   - [ ] Error Messages leaken keine Infos

5. Environment
   - [ ] .env.local in .gitignore
   - [ ] Keine Secrets im Code
   - [ ] NEXT_PUBLIC_ nur for public Werte

Create Report mit:
- Issue Description
- Severity (Critical/High/Medium/Low)
- Location (File:Zeile)
- Fix Empfehlung
```

#### Rate Limiting
```
Implement Rate Limiting for FilmForge:

Limits:
- Auth Routes: 5 requests/minute
- API CRUD: 60 requests/minute
- File Upload: 10 requests/minute

Implementierung:
1. lib/rate-limit.ts mit in-memory Map
2. Middleware oder per-route check
3. Return 429 Too Many Requests bei exceeding limit
4. Header: X-RateLimit-Remaining
```

---

### 🧪 TESTING PROMPTS

#### E2E Test Flow
```
Test FilmForge completely manuell:

1. Setup
   - npm run dev starten
   - Browser openn http://localhost:3000

2. Auth Flow
   - [ ] Landing Page laden
   - [ ] Zu /signup navigieren
   - [ ] Account create
   - [ ] Erfolgreich zu /dashboard redirect
   - [ ] Logout
   - [ ] Login mit erstelltem Account
   - [ ] Protected Route ohne Login -> Redirect

3. Entity CRUD
   Server:
   - [ ] Liste leer state
   - [ ] Create new Server
   - [ ] Server erscheint in Liste
   - [ ] Detail View openn
   - [ ] Server editieren
   - [ ] Changes save
   - [ ] Server delete
   - [ ] Server verschwindet aus Liste
   Channel:
   - [ ] Liste leer state
   - [ ] Create new Channel
   - [ ] Channel erscheint in Liste
   - [ ] Detail View openn
   - [ ] Channel editieren
   - [ ] Changes save
   - [ ] Channel delete
   - [ ] Channel verschwindet aus Liste
   Message:
   - [ ] Liste leer state
   - [ ] Create new Message
   - [ ] Message erscheint in Liste
   - [ ] Detail View openn
   - [ ] Message editieren
   - [ ] Changes save
   - [ ] Message delete
   - [ ] Message verschwindet aus Liste
   User:
   - [ ] Liste leer state
   - [ ] Create new User
   - [ ] User erscheint in Liste
   - [ ] Detail View openn
   - [ ] User editieren
   - [ ] Changes save
   - [ ] User delete
   - [ ] User verschwindet aus Liste

4. Error States
   - [ ] Invalid Form Submission
   - [ ] Network Error Handling
   - [ ] 404 Page

5. Responsive
   - [ ] Mobile Viewport testen
   - [ ] Navigation funktioniert
   - [ ] Forms sind nutzbar

Dokumentiere alle Bugs und fixe sie.
```

#### Build Verification
```
Verifiziere dass FilmForge production-ready ist:

1. npm run build
   - [ ] Keine Errors
   - [ ] Keine Warnings (oder dokumentiert)

2. npm run lint
   - [ ] Keine Errors

3. TypeScript
   - [ ] npx tsc --noEmit erfolgreich

4. Bundle Check
   - [ ] Keine large Chunks (>500kb)
   - [ ] Kein unnecessaryer Code

Falls Error: Fixe sie und wiederhole.
```

---

### 📝 CONTENT PROMPTS

#### Marketing Copy
```
Create Marketing Copy for FilmForge:

Kontext:
- Produkt: FilmForge
- Tagline: Connecting minds through cinema
- Target audience: Independent filmmakers and entrepreneurs
- Description: FilmForge is a community-driven app that leverages blockchain verification to connect entrepreneurs and filmmakers through daily movie screenings and discussions. It combines the mindfulness of Headspace's daily practice with the community features of Discord, fostering a collaborative environment for creative problem-solving. By focusing on indie films and emerging artists, FilmForge promotes diversity and innovation in the film industry.

Create:

1. Headlines (5 Varianten)
   - Benefit-focused
   - Max 10 words

2. Value Propositions (3)
   - Problem -> Solution Format
   - 1-2 sentences

3. Feature Descriptionen
   - For jede Entity/Feature
   - 50-100 words
   - Benefit, nicht Feature

4. FAQ (5 Fragen)
   - Typische Bedenken
   - Klare, hilfreiche Antworten

5. Email Onboarding Sequence (3 Emails)
   - Welcome Email
   - Getting Started Tips
   - Feature Highlight
```

#### Legal Pages
```
Create Basis Legal Pages for FilmForge:

1. app/impressum/page.tsx
   - Platzhalter for Anbieter-Infos
   - Standard Struktur

2. app/privacy/page.tsx
   - Cookie Info
   - Supabase/Vercel mention
   - Contact for dataschutz

3. app/agb/page.tsx (optional)
   - Nutzungsbedingungen
   - Haftungsausschluss

Note: Platzhalter for rechtlich relevante Infos.
```

---

### 🚀 DEPLOYMENT PROMPTS

#### Vercel Deployment
```
Deploye FilmForge zu Vercel:

1. Pre-Checks
   - [ ] npm run build erfolgreich
   - [ ] .env.example completely
   - [ ] Keine Secrets im Code

2. GitHub
   - [ ] git init (falls nicht vorhanden)
   - [ ] .gitignore checkn
   - [ ] Initial Commit
   - [ ] Push zu GitHub

3. Vercel
   - [ ] Importiere GitHub Repo
   - [ ] Framework: Next.js (auto-detected)
   - [ ] Environment Variables setzen:
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
     - NEXT_PUBLIC_APP_URL (Production URL)
   - [ ] Deploy

4. Post-Deploy
   - [ ] Production URL testen
   - [ ] Supabase Redirect URLs aktualisieren
   - [ ] Custom Domain (optional)
```

#### Supabase Production
```
Richte Supabase Production for FilmForge ein:

1. Neues Projekt create (falls nicht vorhanden)

2. Schema Migration
   - SQL Editor openn
   - supabase/schema.sql ausrunn
   - Erfolg verifizieren

3. Auth Settings
   - Site URL auf Production setzen
   - Redirect URLs konfigurieren
   - Email Templates anpassen (optional)

4. RLS Verification
   - Alle Policies checkn
   - Test mit verschiedenen Users

5. API Keys
   - anon key for Frontend
   - service_role NIEMALS ins Frontend
```

### Copy/Marketing Text

```
Create Marketing Copy for FilmForge:

Produkt: FilmForge
Tagline: Connecting minds through cinema
Target audience: Independent filmmakers and entrepreneurs
Description: FilmForge is a community-driven app that leverages blockchain verification to connect entrepreneurs and filmmakers through daily movie screenings and discussions. It combines the mindfulness of Headspace's daily practice with the community features of Discord, fostering a collaborative environment for creative problem-solving. By focusing on indie films and emerging artists, FilmForge promotes diversity and innovation in the film industry.

Create:
1. 5 alternative Headlines
2. 3 Value Propositions
3. Feature Descriptionen (50-100 words je Feature)
4. FAQ (5 Fragen und Antworten)
5. Email Welcome Sequence (3 Emails Outline)
```

### Performance Optimierung

```
Optimiere die Performance von FilmForge.

Analysiere:
1. Bundle Size
2. Server Component vs Client Component Usage
3. Data Fetching Patterns
4. Image Optimization
5. Caching Strategien

Implement die Top 3 Optimierungen.
```

---

### 🔄 FLOW PROMPTS

#### Onboarding Flow Flow implementieren
```
Implement den "Onboarding Flow" Flow for FilmForge:

A guided onboarding process for new users

Stepe:
1. Create account
2. Verify email
3. Complete profile

Erfolgs-Kriterium: User has completed the onboarding process and is logged in

Create die necessaryen:
1. Pages/Routes for jeden Step
2. State Management for Flow-Progress
3. Validierung zwischen Stepen
4. Error Handling
5. Success/Completion Handling
```

#### Server Creation Flow Flow implementieren
```
Implement den "Server Creation Flow" Flow for FilmForge:

A flow for creating a new server

Stepe:
1. Click create server button
2. Enter server details
3. Create server

Erfolgs-Kriterium: Server is created and user is redirected to the server page

Create die necessaryen:
1. Pages/Routes for jeden Step
2. State Management for Flow-Progress
3. Validierung zwischen Stepen
4. Error Handling
5. Success/Completion Handling
```

---

## Zusammenfassung

### FilmForge

**Entities:** Server, Channel, Message, User

**Features:**
- auth
- daily_movie_practice
- servers_and_channels
- blockchain_verification
- discussion_forums
- user_profile
- movie_library
- user_profiles
- event_calendar
- resource_library
- community_badges
- movie_recommendations

**Screens:** Landing Page, Dashboard Page, Server Page

**User Flows:** Onboarding Flow, Server Creation Flow

**Generierte Struktur:**
```
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (app)/
│   │   ├── dashboard/
│   │   ├── servers/
│   │   ├── channels/
│   │   ├── messages/
│   │   ├── users/
│   │   └── account/
│   └── api/
│       ├── servers/
│       ├── channels/
│       ├── messages/
│       ├── users/
│       └── auth/
├── components/
│   ├── ui/
│   └── [entity]/
├── hooks/
├── lib/
│   ├── supabase/
│   └── schemas/
├── types/
└── middleware.ts
```

---

**Viel Erfolg bei der Umsetzung! 🚀**

Bei Fragen oder Problemen: Beschreibe das Issue und Claude Code wird helfen.

---

## About This Blueprint

This project blueprint was generated with [Claudery](https://claudery.io) - the AI-powered blueprint generator for modern web applications.

**What is Claudery?**
Claudery transforms your app ideas into comprehensive, production-ready blueprints. Each blueprint includes:
- Complete database schemas
- API route specifications
- UI component structures
- Authentication flows
- Deployment configurations

**Build faster. Ship smarter.**

---

*Generated with ❤️ by [Claudery](https://claudery.io)*
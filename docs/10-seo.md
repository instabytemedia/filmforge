# 10 - SEO & Metadata

> **Agent:** SEO Agent 🔍
> **Goal:** Optimize SEO with Metadata, Sitemap, Robots.txt

---

## Context

**Product:** FilmForge
**Tagline:** Connect Movies, Elevate Minds
**Description:** A community platform with blockchain verification, inspired by Discord's servers and channels, and Headspace's daily practice

---

## Instructions

### 1. Root Layout Metadata

Update **Root Layout** (`app/layout.tsx`) with Metadata Export:

**Metadata Configuration:**

- **title:** Object with default and template
  - default: "FilmForge"
  - template: "%s | FilmForge" (for page-specific titles)

- **description:** "Connect Movies, Elevate Minds"

- **keywords:** Array with relevant keywords
  - "filmforge"
  - Additional relevant keywords for the product

- **authors:** [{ name: "FilmForge" }]

- **creator:** "FilmForge"

- **openGraph:** Object for Social Sharing
  - type: "website"
  - locale: "en_US"
  - url: process.env.NEXT_PUBLIC_APP_URL
  - title: "FilmForge"
  - description: "Connect Movies, Elevate Minds"
  - siteName: "FilmForge"

- **twitter:** Object for Twitter Cards
  - card: "summary_large_image"
  - title: "FilmForge"
  - description: "Connect Movies, Elevate Minds"

- **robots:** Object for Crawlers
  - index: true
  - follow: true

**Body Configuration:**
- HTML lang="en"
- Font: Inter (Google Fonts)

**Important:**
- Metadata must be defined as export const metadata
- Use Next.js Metadata API (type: Metadata from "next")

### 2. Page-specific Metadata

Add Metadata Exports to important pages:

**Dashboard** (`app/(app)/dashboard/page.tsx`):
- title: "Dashboard"

**Login** (`app/(auth)/login/page.tsx`):
- title: "Sign In"

**Signup** (`app/(auth)/signup/page.tsx`):
- title: "Sign Up"

**Pattern:**
- Export `metadata` Object with title property
- Template from Root Layout is automatically applied
- Result: "Sign In | FilmForge"

### 3. Sitemap

Create **Sitemap** (`app/sitemap.ts`):

**Functionality:**
- Export default function that returns MetadataRoute.Sitemap
- Base URL from Environment Variable

**Pages to include:**
- "/" (Homepage)
  - lastModified: new Date()
  - changeFrequency: "weekly"
  - priority: 1
- "/login"
  - changeFrequency: "monthly"
  - priority: 0.5
- "/signup"
  - changeFrequency: "monthly"
  - priority: 0.5

**Important:**
- Use MetadataRoute.Sitemap Type from "next"
- Dynamic baseUrl for different environments
- Sitemap accessible at /sitemap.xml

### 4. Robots.txt

Create **Robots.txt** (`app/robots.ts`):

**Functionality:**
- Export default function that returns MetadataRoute.Robots
- Define Crawler Rules

**Rules:**
- userAgent: "*" (all crawlers)
- allow: "/" (allow homepage)
- disallow: Array of protected routes
  - "/api/"
  - "/dashboard/"
  - "/account/"
  - All authenticated areas

**Sitemap Reference:**
- sitemap: `${baseUrl}/sitemap.xml`

**Important:**
- Use MetadataRoute.Robots Type from "next"
- Robots.txt accessible at /robots.txt

### 5. Legal Pages (Placeholder)

Create **Imprint** (`app/(public)/imprint/page.tsx`):

**Metadata:**
- title: "Imprint"

**Content (Placeholder):**
- H1: "Imprint"
- "Information according to regulations:" Section
- Placeholders for:
  - Name/Company
  - Address
  - Contact (Email)
- Container: max-w-2xl py-12
- Prose styling for text

---

Create **Privacy** (`app/(public)/privacy/page.tsx`):

**Metadata:**
- title: "Privacy Policy"

**Content (Placeholder):**
- H1: "Privacy Policy"
- Sections (as placeholders):
  1. "Privacy at a Glance"
  2. "Hosting" (Vercel)
  3. "Database" (Supabase)
- Container: max-w-2xl py-12
- Prose styling for text

**Important:**
- These are placeholders - must be replaced with real legal text before production
- TODO Comments for later completion

---

## Validation Checklist

Verify that:
- [ ] Root Metadata configured in app/layout.tsx
- [ ] Page Metadata for Dashboard, Login, Signup
- [ ] /sitemap.xml accessible and shows pages
- [ ] /robots.txt accessible with correct rules
- [ ] Imprint Page exists
- [ ] Privacy Page exists
- [ ] Page Titles displayed correctly (with Template)
- [ ] OpenGraph Tags present

**Test Scenarios:**
1. Open /sitemap.xml in browser
2. Open /robots.txt in browser
3. Check Page Title in browser tab (should use template)
4. Open /imprint
5. Open /privacy
6. Optional: Test with https://www.opengraph.xyz/

**Browser Tab Titles expected:**
- "/" → "FilmForge"
- "/login" → "Sign In | FilmForge"
- "/signup" → "Sign Up | FilmForge"
- "/dashboard" → "Dashboard | FilmForge"

---

## Troubleshooting

**Sitemap 404:**
- File in app/sitemap.ts (not .tsx)?
- Default Export?
- Return Type correct (Array)?

**Robots.txt 404:**
- File in app/robots.ts?
- Default Export?
- Return Type correct (Object)?

**Metadata not showing:**
- export const metadata present?
- Type Metadata imported from "next"?
- No conflict with generateMetadata?

**OpenGraph not working:**
- NEXT_PUBLIC_APP_URL set?
- URL with https://?
- Test with Social Media Debugger Tools

**Legal Pages 404:**
- In (public) Route Group?
- page.tsx file present?

---

**Continue to:** `11-testing.md`

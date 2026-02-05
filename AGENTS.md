# FilmForge - Build Orchestration

> **Fully Automated App Build with Claude Code**
> Read this file and execute all phases in order.

---

## Instructions for Claude Code

You are about to build **FilmForge**. This document orchestrates the entire build process.

### How it works:

1. **Read this file completely**
2. **Work through phase by phase** (from Phase 1 to the end)
3. **Per phase:** Open the specified MD file under `docs/`
4. **Execute ALL tasks in the MD file**
5. **Mark tasks as done** (checkboxes in the MD file)
6. **Checkpoint:** Verify everything works at the end of each phase
7. **Only when phase is complete:** Move to the next phase
8. **On errors:** Stop, fix, then continue

---

## Project Overview

| Metric | Value |
|--------|-------|
| **Total Phases** | 10 |
| **Total Agents** | 13 |
| **Estimated Tasks** | ~104 |
| **Parallel Phases** | 3 |

---

## Execution Plan

### Phase 0: Market Research (CRITICAL - Do this first!)
⏳ *Sequential*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 🔍 | **Research Agent** | `docs/00-research.md` | ~5 |

**Action:** Read `docs/00-research.md` and execute all tasks.

### Phase 1: Initialize Project
⏳ *Sequential*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 🏗️ | **Setup Agent** | `docs/01-setup.md` | ~8 |

**Action:** Read `docs/01-setup.md` and execute all tasks.

### Phase 2: Database + UI Components
⚡ *Can run in parallel*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 🗄️ | **Database Agent** | `docs/02-database.md` | ~6 |
| 🎨 | **UI Components Agent** | `docs/04-ui-components.md` | ~12 |

**Action:** Read `docs/02-database.md` and execute all tasks.

### Phase 3: Authentication
⏳ *Sequential*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 🔐 | **Auth Agent** | `docs/03-auth.md` | ~10 |

**Action:** Read `docs/03-auth.md` and execute all tasks.

### Phase 4: App Layout
⏳ *Sequential*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 📐 | **Layout Agent** | `docs/05-layout.md` | ~6 |

**Action:** Read `docs/05-layout.md` and execute all tasks.

### Phase 5: Entity CRUD
⏳ *Sequential*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 📦 | **Entities Agent** | `docs/06-entities.md` | ~20 |

**Action:** Read `docs/06-entities.md` and execute all tasks.

### Phase 6: Dashboard, Forms, Landing Page
⚡ *Can run in parallel*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 📊 | **Dashboard Agent** | `docs/07-dashboard.md` | ~5 |
| 📝 | **Forms Agent** | `docs/08-forms.md` | ~8 |
| 🏠 | **Landing Page Agent** | `docs/09-landing.md` | ~8 |

**Action:** Read `docs/07-dashboard.md` and execute all tasks.

### Phase 7: SEO
⏳ *Sequential*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 🔍 | **SEO Agent** | `docs/10-seo.md` | ~4 |

**Action:** Read `docs/10-seo.md` and execute all tasks.

### Phase 8: Optional Features
⚡ *Can run in parallel*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 📁 | **File Upload Agent** | `docs/optional/uploads.md` | ~6 |

**Action:** Read `docs/optional/uploads.md` and execute all tasks.

### Phase 10: Testing & Build
⏳ *Sequential*

| Icon | Agent | File | Tasks |
|------|-------|------|-------|
| 🧪 | **Testing Agent** | `docs/11-testing.md` | ~6 |

**Action:** Read `docs/11-testing.md` and execute all tasks.


---

## Detailed Agent Descriptions

### 🔍 Research Agent

**File:** `docs/00-research.md`
**Dependencies:** None (can start immediately)

Conducts market research: competitor analysis, pricing benchmarks, user pain points

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 🏗️ Setup Agent

**File:** `docs/01-setup.md`
**Dependencies:** research

Initializes the project, installs dependencies, creates base structure

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 🗄️ Database Agent

**File:** `docs/02-database.md`
**Dependencies:** setup

Creates Supabase Schema, Tables, RLS Policies, Triggers

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 🔐 Auth Agent

**File:** `docs/03-auth.md`
**Dependencies:** database

Implements Authentication: Middleware, Login, Signup, Session

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 🎨 UI Components Agent

**File:** `docs/04-ui-components.md`
**Dependencies:** setup

Creates all base UI components (Button, Input, Card, etc.)

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 📐 Layout Agent

**File:** `docs/05-layout.md`
**Dependencies:** ui-components, auth

Creates App Layout, Header, Navigation, Footer

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 📦 Entities Agent

**File:** `docs/06-entities.md`
**Dependencies:** layout, database

Creates CRUD for all Entities: Types, Schemas, API Routes, Pages, Hooks

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 📊 Dashboard Agent

**File:** `docs/07-dashboard.md`
**Dependencies:** entities

Creates the Dashboard with Stats, Recent Items, Quick Actions

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 📝 Forms Agent

**File:** `docs/08-forms.md`
**Dependencies:** entities, ui-components

Creates all forms with validation (react-hook-form + Zod)

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 🏠 Landing Page Agent

**File:** `docs/09-landing.md`
**Dependencies:** ui-components

Creates the Landing Page: Hero, Features, FAQ, CTA

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 🔍 SEO Agent

**File:** `docs/10-seo.md`
**Dependencies:** landing

Implements SEO: Metadata, Sitemap, Robots.txt, OpenGraph

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 🧪 Testing Agent

**File:** `docs/11-testing.md`
**Dependencies:** entities, forms, dashboard

Creates tests, runs build, checks for errors

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors

---

### 📁 File Upload Agent

**File:** `docs/optional/uploads.md`
**Dependencies:** auth, database

Implements Supabase Storage: Upload Component, Policies

**After completion, verify:**
- All checkboxes in the MD file are checked
- No TypeScript errors
- App runs without console errors


---

## Important Rules

### DO:
- ✅ Process tasks in the specified order
- ✅ Create code exactly as described in the MD files
- ✅ When unclear: Ask instead of guessing
- ✅ Regularly check `npm run dev`
- ✅ Fix TypeScript errors immediately

### DON'T:
- ❌ Skip phases
- ❌ Skip tasks
- ❌ Add your own "improvements"
- ❌ Change dependencies without reason
- ❌ Continue on errors

---

## Checkpoint Questions (after each phase)

Answer these questions before moving to the next phase:

1. **Are all tasks in the phase checked off?**
2. **Does `npm run dev` run without errors?**
3. **Are there TypeScript errors?** (if yes: fix them)
4. **Does the feature work as expected?**

Only when all answers are positive → Move to the next phase.

---

## Start Build

**IMPORTANT:** Start with Phase 0 (Research) BEFORE writing any code!

**Now:** Open `docs/00-research.md` and begin with Phase 0!

This research phase uses WebSearch to gather:
- Real competitor data and pricing
- Market size and trends
- User pain points from reviews

The research results inform:
- Your pricing strategy
- Landing page copy (differentiation from competitors)
- Feature prioritization

```
# After research, start the app:
npm run dev
```

Am Ende sollte die komplette App laufen mit:
- ✅ Research (competitor analysis, pricing benchmark)
- ✅ Auth (Login, Signup, Logout)
- ✅ Dashboard
- ✅ Entity CRUD
- ✅ Landing Page (informed by research!)
- ✅ SEO

**Los geht's mit der Research Phase!**

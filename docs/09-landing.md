# 09 - Landing Page

> **Agent:** Landing Page Agent 🏠
> **Goal:** Create a PREMIUM, STATE-OF-THE-ART Marketing Landing Page

---

## Context

**Product:** FilmForge
**Tagline:** Connecting minds through cinema
**Target Audience:** Independent filmmakers and entrepreneurs

### Content for Landing Page

**Hero Section:**
- Headline: Connect with like-minded entrepreneurs and grow your business
- Subheadline: Join our community of entrepreneurs and movie enthusiasts
- Primary CTA: Sign up for free → /signup
- Secondary CTA: Learn more → #features

**Problem & Solution:**
- Problem: Entrepreneurs lack a platform to connect, discuss, and learn from movies
- Solution: FilmForge is a community-driven app that leverages blockchain verification to connect entrepreneurs and filmmakers through daily movie screenings and discussions. It combines the mindfulness of Headspace's daily practice with the community features of Discord, fostering a collaborative environment for creative problem-solving. By focusing on indie films and emerging artists, FilmForge promotes diversity and innovation in the film industry.

**Features:**
1. Daily movie screenings
2. Blockchain-verified discussions
3. Community challenges

**Unique Selling Points:**
- Blockchain verification for secure and transparent discussions
- Daily movie practice inspired by Headspace
- Discord-like servers and channels for community building

---

## CRITICAL REQUIREMENTS

### Design Quality Standard
This landing page must be **PREMIUM QUALITY** - think Linear, Vercel, Stripe level design:
- Generous whitespace (py-24 md:py-32 minimum for sections)
- Subtle gradients and mesh backgrounds
- Smooth animations (fade-in, slide-up on scroll)
- Glass morphism effects where appropriate
- Professional typography hierarchy
- Micro-interactions on hover

### Technical Requirements
- **ONLY use shadcn/ui components** (Button, Card, Badge, etc.)
- **ONLY use Phosphor Icons** - import from @phosphor-icons/react
- **Use the Logo component** created in setup (components/logo.tsx)
- **Must work without env vars** - no API calls on landing page
- Mobile-first responsive design

---

## Instructions

### 1. Public Layout

Create **Public Layout** (`app/(public)/layout.tsx`):

```tsx
// IMPORTANT: Force dynamic to avoid static generation issues
export const dynamic = "force-dynamic";

export default function PublicLayout({ children }) {
  return <>{children}</>;
}
```

### 2. Landing Page Structure

Create **Landing Page** (`app/(public)/page.tsx`):

**IMPORTANT:** This is a Server Component. No "use client" needed for the main page.

---

### Section 1: Navigation Header

**Design:**
- Sticky header with backdrop blur (sticky top-0 z-50 backdrop-blur-xl bg-background/80)
- Border bottom (border-b border-border/40)
- Container with max-w-7xl mx-auto
- Height: h-16

**Layout:**
- Left: Logo component (from components/logo.tsx)
- Center (hidden mobile, flex md): Navigation links
- Right: Login link + Get Started button

**Navigation Links (desktop only):**
- Features (#features)
- Pricing (#pricing)
- FAQ (#faq)
- All links: text-sm text-muted-foreground hover:text-foreground transition

**Buttons:**
- Login: variant="ghost" size="sm"
- Get Started: variant="default" size="sm"

---

### Section 2: Hero Section (PREMIUM DESIGN)

**Container:** min-h-[90vh] flex items-center justify-center

**Background Effects:**
- Gradient mesh background or radial gradient
- Optional: animated gradient blob (CSS animation)
- Example: `bg-gradient-to-br from-background via-background to-primary/5`

**Content Layout (max-w-4xl mx-auto text-center):**

1. **Badge/Announcement** (optional):
   - Small badge above headline
   - Example: "✨ Now with AI-powered features"
   - Use Badge component from shadcn

2. **Headline (H1):**
   - text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight
   - Line height: leading-[1.1]
   - Can include gradient text: bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent

3. **Subheadline:**
   - text-xl md:text-2xl text-muted-foreground
   - max-w-2xl mx-auto
   - mt-6

4. **CTA Buttons (mt-10):**
   - Primary: size="lg" with ArrowRight icon
   - Secondary: size="lg" variant="outline"
   - Gap: gap-4
   - Add subtle hover animations

5. **Social Proof (mt-16):**
   - "Trusted by X+ users" or company logos
   - text-sm text-muted-foreground
   - Flex with avatar stack or logo row

**Code Pattern:**
```tsx
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

<section className="min-h-[90vh] flex items-center justify-center px-6">
  <div className="max-w-4xl mx-auto text-center">
    <Badge variant="secondary" className="mb-6">
      <Sparkle className="mr-1 h-3 w-3" /> New: Feature announcement
    </Badge>
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
      Connect with like-minded entrepreneurs and grow your business
    </h1>
    <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
      Join our community of entrepreneurs and movie enthusiasts
    </p>
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <Button size="lg" asChild>
        <Link href="/signup">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button size="lg" variant="outline" asChild>
        <Link href="#features">Learn More</Link>
      </Button>
    </div>
  </div>
</section>
```

---

### Section 3: Logo Cloud / Social Proof

**Design:**
- py-16 border-y border-border/40
- bg-muted/30

**Content:**
- "Trusted by teams at" or "Featured in"
- Row of placeholder logos (use gray rectangles or text)
- Grayscale logos with hover:grayscale-0 transition

---

### Section 4: Features Grid (id="features")

**Design:**
- py-24 md:py-32
- Container max-w-7xl

**Layout:**
1. **Section Header:**
   - Badge: "Features"
   - H2: "Everything you need"
   - Subtext: Description of features
   - text-center max-w-2xl mx-auto

2. **Features Grid (mt-16):**
   - grid md:grid-cols-2 lg:grid-cols-3 gap-8
   - Each feature in a Card component

3. **Feature Card Design:**
   - Icon in colored circle (bg-primary/10 text-primary)
   - H3 title (font-semibold)
   - P description (text-muted-foreground)
   - Subtle hover effect (hover:shadow-lg transition)

**Use Phosphor Icons:**
```tsx
import { Lightning, Shield, Rocket, ChartLine, Users, Gear } from "@phosphor-icons/react";
```

---

### Section 5: How It Works

**Design:**
- py-24 md:py-32 bg-muted/30
- Container max-w-5xl

**Layout:**
- Section header (centered)
- 3 steps in horizontal timeline (desktop) / vertical (mobile)
- Connect steps with line/arrow

**Step Design:**
- Large number (text-6xl font-bold text-primary/20)
- H3 title
- Description
- Optional: Icon or illustration

---

### Section 6: Testimonials (optional but recommended)

**Design:**
- py-24 md:py-32
- Bento grid or carousel

**Testimonial Card:**
- Quote text
- Avatar + Name + Role
- Star rating (optional)
- Use Card component

---

### Section 7: Pricing (id="pricing")

**Design:**
- py-24 md:py-32 bg-muted/30

**Layout:**
- Section header
- 2-3 pricing cards (grid md:grid-cols-3)
- Highlight recommended plan (ring-2 ring-primary)

**Pricing Card:**
- Plan name
- Price (text-4xl font-bold)
- Feature list with Check icons
- CTA Button

---

### Section 8: FAQ Section (id="faq")

**Design:**
- py-24 md:py-32
- max-w-3xl mx-auto

**Use Accordion pattern:**
- Collapsible FAQ items
- Use shadcn Accordion component or custom

**Questions:**
- How do I get started?
- Is there a free trial?
- How secure is my data?
- Can I cancel anytime?
- What support do you offer?

---

### Section 9: Final CTA

**Design:**
- py-24 md:py-32
- Full-width gradient background
- bg-gradient-to-r from-primary to-primary/80

**Content (text-center text-primary-foreground):**
- H2: "Ready to get started?"
- Subtext: "Join thousands of users already using FilmForge"
- Button: variant="secondary" size="lg"

---

### Section 10: Footer

**Design:**
- py-12 border-t
- Container max-w-7xl

**Layout (4 columns on desktop):**
1. **Column 1:** Logo + Description + Social links
2. **Column 2:** Product links
3. **Column 3:** Company links
4. **Column 4:** Legal links

**Bottom bar:**
- Copyright with dynamic year
- Legal links (Privacy, Terms)

**Social Icons (Phosphor):**
```tsx
import { TwitterLogo, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
```

---

## Component Requirements

**MUST use these shadcn components:**
- Button (all CTA buttons)
- Card (feature cards, pricing cards)
- Badge (announcements, labels)
- Accordion (FAQ section)
- Avatar (testimonials)
- Separator (dividers)

**MUST use Phosphor Icons for:**
- Feature icons
- Social media icons
- UI icons (arrows, checks, etc.)

**Import pattern:**
```tsx
import { ArrowRight, Check, Lightning, Shield } from "@phosphor-icons/react";
```

---

## Animation & Polish

Add subtle animations for premium feel:

```css
/* globals.css */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
```

Use intersection observer for scroll animations (optional)

---

## Validation Checklist

Verify that:
- [ ] `npm run dev` starts WITHOUT any env vars set
- [ ] Landing page renders fully without API calls
- [ ] Public Layout has `export const dynamic = "force-dynamic"`
- [ ] Logo component used in header
- [ ] ALL icons are from @phosphor-icons/react (NOT lucide)
- [ ] ALL UI components are from shadcn/ui
- [ ] Premium design quality (spacing, typography, animations)
- [ ] Header with Login/Signup Links
- [ ] Hero Section with premium styling
- [ ] Features Section with Card components
- [ ] How It Works Section
- [ ] FAQ Section with Accordion
- [ ] Pricing Section (if applicable)
- [ ] Final CTA Section with gradient
- [ ] Footer with 4 columns
- [ ] Responsive Design (Mobile/Tablet/Desktop)
- [ ] Smooth scroll for anchor links
- [ ] No TypeScript errors
- [ ] No console errors

**Test Scenarios:**
1. Delete .env.local → npm run dev → Landing page loads ✓
2. Open / on mobile (375px) → Looks premium ✓
3. Open / on desktop (1440px) → Looks amazing ✓
4. Click "Learn More" → Smooth scroll to #features ✓
5. All buttons use shadcn Button component ✓
6. All icons are Phosphor ✓

---

## Troubleshooting

**App crashes without env vars:**
- Check Supabase client has null check
- Landing page should NOT import Supabase
- No API calls on landing page

**Icons not showing:**
- Did you install @phosphor-icons/react?
- Import: `import { IconName } from "@phosphor-icons/react"`
- NOT from lucide-react

**Components not styled:**
- Did you run `npx shadcn@latest init`?
- Did you install components: `npx shadcn@latest add button card ...`?

**Static generation error:**
- Add `export const dynamic = "force-dynamic"` to layout

**Anchor Link not working:**
- ID set on Section? (id="features")
- Add to globals.css: `html { scroll-behavior: smooth }`

---

**Continue to:** `10-seo.md`

# 04 - UI Components

> **Agent:** UI Components Agent 🎨
> **Goal:** Create base UI components in shadcn/ui style

---

## Context

**Product:** FilmForge
**Design Style:** Cinema Vault
**Mode:** dark
**Border Radius:** 0.3
**Primary Color:** #6366f1
**Design Description:** The design should evoke a sense of exclusivity and sophistication, similar to a high-end movie theater. The layout should be elegant and refined, with rich colors and classic typography. The use of premium materials and subtle animations should create a luxurious atmosphere, perfect for entrepreneurs to connect and discuss movies. The blockchain verification element should be discreetly integrated, using subtle and elegant visual cues to convey security and trust.

---

## Instructions

### 1. Button Component

Create **Button Component** (`components/ui/button.tsx`) with the following requirements:

**Functionality:**
- Use Radix UI Slot for Composition Pattern
- Use class-variance-authority (cva) for Variants
- forwardRef for Ref Handling
- asChild prop for Polymorphic Component Pattern

**Variants:**
- `default`: Primary Button with Background and Hover
- `destructive`: Red for Delete/Danger Actions
- `outline`: Border-only with Background on Hover
- `secondary`: Secondary Background Color
- `ghost`: Transparent with Hover
- `link`: Text-only with Underline on Hover

**Sizes:**
- `default`: h-9 px-4 py-2
- `sm`: h-8 px-3 (smaller buttons)
- `lg`: h-10 px-8 (larger buttons)
- `icon`: h-9 w-9 (square for icons)

**Export:**
- Button Component and buttonVariants Function

### 2. Input Component

Create **Input Component** (`components/ui/input.tsx`):

**Functionality:**
- forwardRef for Form Integration
- Support all native Input Props
- Error State Prop for Validation Feedback

**Styling:**
- Consistent Height (h-9)
- Border with Input Color
- Shadow for Depth
- Focus Ring on Focus State
- Error State: Red Border + Red Focus Ring
- File Input: Styled File Button
- Disabled State: Cursor not-allowed + Opacity

**Important:**
- className Prop for Custom Overrides
- Responsive Font Size (text-sm)

### 3. Card Component

Create **Card Component** (`components/ui/card.tsx`) with multiple Sub-Components:

**Card (Container):**
- Rounded Corners (rounded-xl)
- Border + Shadow
- Background Color (bg-card)

**CardHeader:**
- Padding (p-6)
- Flex Column with Spacing

**CardTitle:**
- H3 Element
- Font Semibold
- Tight Leading

**CardDescription:**
- P Element
- Text Small (text-sm)
- Muted Foreground Color

**CardContent:**
- Padding (p-6 pt-0, no top padding)
- Main Content Area

**CardFooter:**
- Flex Container for Actions
- Padding (p-6 pt-0)

**Export:**
- All 6 Sub-Components individually

### 4. Skeleton Component

Create **Skeleton Component** (`components/ui/skeleton.tsx`) for Loading States:

**Functionality:**
- Pulse Animation (animate-pulse)
- Muted Background
- Rounded Corners
- Flexible Dimensions via className

**Use Case:**
- Placeholder for Content during Loading
- Can be used for Text, Images, Cards

### 5. Empty State Component

Create **Empty State Component** (`components/ui/empty-state.tsx`) for empty lists:

**Props Interface:**
- `icon` (optional): Lucide Icon Component
- `title`: Main text (required)
- `description` (optional): Additional text
- `action` (optional): Object with label + onClick

**Layout:**
- Centered (Flex Column)
- Padding (py-12)
- Icon in rounded circle with Muted Background
- Title (font-semibold text-lg)
- Description (text-muted-foreground max-w-sm)
- Optional: Button for Primary Action

**Important:**
- All props except title are optional
- Only render button if action is provided

### 6. Spinner Component

Create **Spinner Component** (`components/ui/spinner.tsx`) for Loading Indicator:

**Props:**
- `size`: "sm" | "default" | "lg"
- `className` (optional)

**Implementation:**
- Use Loader2 Icon from lucide-react
- Spin Animation (animate-spin)
- Size Classes: sm (h-4 w-4), default (h-6 w-6), lg (h-8 w-8)
- Muted Foreground Color

### 7. Label Component

Create **Label Component** (`components/ui/label.tsx`) for Form Labels:

**Functionality:**
- Based on @radix-ui/react-label (install if needed)
- forwardRef for Ref Forwarding
- Proper Label Accessibility

**Styling:**
- Text Small (text-sm)
- Font Medium
- Peer Disabled States (cursor-not-allowed + opacity-70)

**Important:**
- Install `@radix-ui/react-label` dependency

### 8. Index Export File

Create **Index Export** (`components/ui/index.ts`):

**Exports:**
- Button + buttonVariants
- Input
- Card + all Sub-Components (6 total)
- Skeleton
- EmptyState
- Spinner
- Label

**Purpose:**
- Simplified Imports: `import { Button, Card } from "@/components/ui"`

---

## Validation Checklist

Verify that:
- [ ] All 7 Components created
- [ ] Index Export for Clean Imports
- [ ] Button has all Variants (6 total)
- [ ] Input has Error State
- [ ] Card has all Sub-Components (6 total)
- [ ] Skeleton animates
- [ ] Empty State flexibly configurable
- [ ] Spinner has 3 Sizes
- [ ] Label Dependency installed
- [ ] No TypeScript Errors
- [ ] All Components use cn() for Class Merging
- [ ] forwardRef correctly implemented

**Test:**
Test Components in a Test Page:
- Button: Render all Variants + Sizes
- Input: Normal State + Error State
- Card: With all Sub-Components
- Skeleton: Various Sizes
- Empty State: With and without Action
- Spinner: All 3 Sizes
- Label: Connect with Input

---

## Troubleshooting

**Radix UI Import Errors:**
- Check if @radix-ui/react-label is installed
- Check if @radix-ui/react-slot is installed (should come from Setup)

**Class Merging not working:**
- Check if cn() Function from lib/utils.ts is correctly imported
- tailwind-merge must be installed

**forwardRef Type Errors:**
- Check React Import
- Use React.forwardRef with correct Generic Types

**Variant Types not recognized:**
- Check class-variance-authority Import
- VariantProps<typeof variants> for Type Inference

---

**Continue to:** `05-layout.md`

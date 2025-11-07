# Brandscaling Design System - Implementation Guide

## Overview
This document outlines the complete implementation of the Brandscaling Design Guidelines into the web application. The design system expresses the Architect→Alchemist logic-to-resonance gradient and ensures consistent delivery across all surfaces.

---

## 1. Core Design Principles

### Clarity Before Creativity
Every pixel serves comprehension. The design prioritizes clear communication over decorative elements.

### Structure Meets Flow
Logic anchors visuals; motion humanizes logic. The systematic structure is enhanced with thoughtful animations.

### Consistency Breeds Cognition
Predictable rhythms across pages and states ensure users can focus on content, not navigation.

---

## 2. Layout & Grid System

### Responsive Grid Specifications

| Device | Columns | Gutter | Max Width |
|--------|---------|--------|-----------|
| Desktop | 12 | 24px | 1440px |
| Tablet | 8 | 16px | 1024px |
| Mobile | 4 | 12px | 390px |

### Spacing Standards
- **Section Padding:** 96px (desktop) / 64px (tablet) / 48px (mobile)
- **Container Padding:** 32px (desktop) / 20px (mobile)
- **Baseline Grid:** 8px (all spacing should align to 8px increments)

### CSS Implementation
```css
/* Container with responsive padding */
.container-bs-desktop

/* Section with responsive padding */
.section-padding-bs
```

---

## 3. Color System (bs/color tokens)

### Brand Colors

| Role / Name | HEX | Usage | CSS Variable |
|-------------|-----|-------|--------------|
| Primary — Architect Indigo | #42047D | Background anchors; left gradient start | `--bs-color-indigo` |
| Accent — Scale Orange | #F6782F | Primary CTAs; right gradient finish | `--bs-color-orange` |
| Highlight — Founder Red | #EC4049 | CTA hover; urgent highlights | `--bs-color-red` |
| Secondary — Deep Plum | #841477 | Text highlights; cards | `--bs-color-plum` |
| Accent Detail — Precision Pink | #C72170 | Icons; dividers | `--bs-color-pink` |
| Neutral Dark — Black | #000000 | Primary text; outlines | `--bs-color-black` |
| Neutral Light — Bright White | #FFFFFF | Background; contrast spacing | `--bs-color-white` |

### CTA Hover Color
- **Orange Hover:** #F56A1F (`--bs-color-orange-hover`)

### Gradient System
- **Architect → Scale (90deg):** `linear-gradient(90deg, #42047D 0%, #F6782F 100%)`
  - Variable: `--bs-gradient-arch-scale-90`
  - Class: `.bg-gradient-arch-scale-90`

- **Architect → Scale (135deg):** `linear-gradient(135deg, #42047D 0%, #F6782F 100%)`
  - Variable: `--bs-gradient-arch-scale-135`
  - Class: `.bg-gradient-arch-scale`

### Tailwind Color Classes
```html
<!-- Using brand colors -->
<div class="bg-[var(--bs-color-indigo)]">Architect Indigo background</div>
<div class="text-[var(--bs-color-orange)]">Scale Orange text</div>
<div class="border-[var(--bs-color-pink)]">Precision Pink border</div>

<!-- Using gradients -->
<div class="bg-gradient-arch-scale">Gradient background</div>
<h1 class="text-gradient-arch-scale">Gradient text</h1>
```

---

## 4. Typography System

### Font Families
- **H1 / H2:** Agrandir Grand (Bold 700 / Semi-Bold 600)
- **H3 / Body:** Suisse Intl (Medium 500 / Regular 400)
- **Caption / Label:** Inter (Medium 500)

### Type Scale

| Element | Font | Weight | Desktop Size | Mobile Size | Line Height | Purpose |
|---------|------|--------|--------------|-------------|-------------|---------|
| H1 / Stage Title | Agrandir Grand Bold | 700 | 64px | 40px | 110% | Visionary clarity |
| H2 / Section Header | Agrandir Grand Semi-Bold | 600 | 44px | 30px | 115% | Hierarchy anchor |
| H3 / Tier Title | Suisse Intl Medium | 500 | 28px | 22px | 125% | Structural balance |
| Body Text | Suisse Intl Regular | 400 | 16px | 15px | 150% | Cognitive calm |
| Caption / Label | Inter Medium | 500 | 13px | 12px | 130% | UI clarity |

### CSS Utility Classes
```html
<h1 class="typo-h1-bs">Stage Title</h1>
<h2 class="typo-h2-bs">Section Header</h2>
<h3 class="typo-h3-bs">Tier Title</h3>
<p class="typo-body-bs">Body text content</p>
<span class="typo-caption-bs">Caption or label</span>
```

### CSS Variables
```css
/* Typography token examples */
--bs-typo-h1-size-desktop: 64px;
--bs-typo-h1-size-mobile: 40px;
--bs-typo-h1-weight: 700;
--bs-typo-h1-line-height: 110%;
```

---

## 5. Component Specifications

### ProgramFlowCard
- **Radius:** 16px
- **Background:** White
- **Shadow:** Medium
- **Padding:** 24px
- **Elements:**
  - Gradient stage chip
  - H3 title
  - Focus (Body Bold)
  - Outcome (Body)
  - Price (H2, orange)
  - Divider: 1px Precision Pink @20%
  - AI Credits bar
  - CTA: 44px gradient (Indigo→Orange) with hover shift to #F56A1F

```html
<div class="program-flow-card">
  <!-- Card content -->
</div>
```

### Flow Connectors
- **Stroke:** 2px gradient
- **Arrow:** ArrowRightCircle 16px orange
- **Background:** Transparent Deep Plum grid @0.2 for depth

```html
<div class="flow-connector"></div>
<div class="flow-connector flow-connector-animate"></div>
```

### AI Credits Bar
- **Height:** 6px
- **Border Radius:** Rounded (pill)
- **Track:** Light gray
- **Fill:** Gradient
- **Tiers:** 10% / 25% / 50% / 75% / 100%

```html
<div class="ai-credits-bar">
  <div class="ai-credits-bar-fill" style="width: 50%"></div>
</div>
```

### AI Credits Legend
- **Pills:** Horizontal (Preview, Light, Moderate, Expanded, Unlimited)
- **Height:** 28px
- **Border Radius:** Pill shape
- **Stroke:** Plum @30%
- **Text:** Caption

```html
<div class="flex gap-2">
  <span class="ai-credits-legend-pill">Preview</span>
  <span class="ai-credits-legend-pill">Light</span>
  <span class="ai-credits-legend-pill">Moderate</span>
  <span class="ai-credits-legend-pill">Expanded</span>
  <span class="ai-credits-legend-pill">Unlimited</span>
</div>
```

### CTA Button (Gradient)
- **Height:** 44px
- **Background:** Gradient (Indigo→Orange)
- **Hover:** Shift to #F56A1F
- **Active:** Pulse + glow animation (Orange→Pink, 0.4s ease-out)

```html
<button class="cta-gradient-bs px-6">
  Get Started
</button>
```

### ProgramFlowRail
- **Layout:** Horizontal auto-layout
- **Gap:** 32px (desktop) / 16px (mobile)
- **Display:** 5-up desktop, 2-up tablet, 1-up mobile with snap

---

## 6. Spacing Hierarchy

| Element | Spacing |
|---------|---------|
| Section Heading → | 48px |
| Subheading → | 32px |
| Card Group → | 64px |
| CTA Row Bottom → | 80px |

CSS variables available:
```css
--bs-spacing-section-heading: 48px;
--bs-spacing-subheading: 32px;
--bs-spacing-card-group: 64px;
--bs-spacing-cta-row-bottom: 80px;
```

---

## 7. Motion & Interactions

### Card Hover
- **Effect:** Elevate + shadow expand
- **Duration:** 0.25s ease-out
- **Transform:** translateY(-4px)

### Connector Load
- **Effect:** Gradient wipe L→R
- **Duration:** 1.5s ease-in-out

### AI Credit Fill
- **Effect:** On-scroll animation
- **Duration:** 1.2s linear

### CTA Click
- **Effect:** Pulse + glow
- **Colors:** Orange→Pink
- **Duration:** 0.4s ease-out

### Reduced Motion
All animations are automatically disabled for users with `prefers-reduced-motion` enabled.

---

## 8. Accessibility & Contrast

### Contrast Requirements
- **Body text:** ≥ 4.5:1 contrast ratio
- **Headings/UI:** ≥ 3:1 contrast ratio

### Best Practices
- Avoid Deep Plum (#841477) for small body text
- Reserve Deep Plum for headers and card backgrounds
- Provide motion-safe variants (reduced motion) where applicable

---

## 9. Tokens & Naming Convention

All design tokens use the `bs/` prefix to maintain consistency between Figma and code.

### Color Tokens
```css
bs/color/indigo = #42047D
bs/color/orange = #F6782F
bs/color/red = #EC4049
bs/color/plum = #841477
bs/color/pink = #C72170
bs/color/black = #000000
bs/color/white = #FFFFFF
```

### Gradient Tokens
```css
bs/gradient/arch-scale-90 = linear-gradient(90deg, #42047D 0%, #F6782F 100%)
```

### Typography Tokens
```css
bs/typo/h1    (700 weight, Agrandir Grand Bold)
bs/typo/h2    (600 weight, Agrandir Grand Semi-Bold)
bs/typo/h3    (500 weight, Suisse Intl Medium)
bs/typo/body  (400 weight, Suisse Intl Regular)
bs/typo/caption (500 weight, Inter Medium)
```

### Radius Tokens
```css
bs/radius/sm = 8px
bs/radius/md = 16px
bs/radius/lg = 24px
bs/radius/xl = 32px
```

### Shadow Tokens
```css
bs/shadow/sm = subtle shadow
bs/shadow/md = medium shadow
bs/shadow/lg = large shadow
```

---

## 10. Application Patterns

### Hero (Landing Page)
- **Background:** Gradient
- **H1:** Headline
- **Body:** Subtext
- **Primary CTA:** Orange gradient button
- **Secondary:** Indigo outline button

### Programme Flow
- **H2:** Section heading
- **Card Rail:** Horizontal scroll with progress bar
- **Credits Legend:** Below cards

### Automation Strip
Four icon tiles representing:
1. Report Delivered
2. Growth Plan Invite
3. Upgrade Offer
4. Mentor Call

### Email Modules
- **Header:** 6px gradient
- **Title:** H2
- **Body:** 16px Suisse
- **CTA:** 44px gradient button
- **Footer:** Black background with white text

---

## 11. Pricing Tiers & Copy Framework

### Tier Structure
Based on Section 13 of Design Guidelines:

| Tier | Tagline | Price | AI Credits | Stage |
|------|---------|-------|------------|-------|
| Discovery | Get your E-DNA report | £9.99 | 10 (Preview) | Foundation |
| Awareness | Stabilise your loop | £99 | 25 (Light) | Growth Plan |
| Entry | Build your launch system | £999 + VAT | 50 (Moderate) | Launch System |
| Expert | Make your offer magnetic | £9,999 + VAT | 75 (Expanded) | Magnetic Offer |
| Elite | Apply for Private Mastermind | £19,999 + VAT | 100 (Unlimited) | Private Mastermind |

### Implementation
- **Data File:** `/lib/pricing-tiers.ts`
- **Functions:** `getPricingTier()`, `getNextTier()`, `getAccessMatrix()`
- **Usage:** Import pricing tiers for upgrade flows, pricing pages, and access control

---

## 12. In-App Upgrade Modal

### Specifications (Section 14)
- **Backdrop:** Blur + 70% dark overlay
- **Panel:** 720×auto width, radius 24px, white background, lg shadow
- **Gradient Stripe:** 6px at top (Indigo→Orange)
- **Content:**
  - Comparison table (Current vs Next tier)
  - AI credits visualization
  - Feature outcomes list
  - Pricing display
- **CTAs:**
  - Primary: Gradient button (Orange→Pink)
  - Secondary: Outline Indigo button
  - Dismiss link
- **Events:** modal_view, cta_click, dismiss

### Component
```tsx
import { UpgradeModal } from './components/UpgradeModal';

<UpgradeModal
  currentTier={currentTier}
  nextTier={nextTier}
  onUpgrade={handleUpgrade}
  onDismiss={handleDismiss}
  isOpen={isOpen}
/>
```

---

## 13. KPI Dashboard

### Visual Rules (Section 15)
- **Cards:** LSI sparkline, Velocity histogram, Leverage donut, Resonance line
- **Grid:** 4-up desktop, 2-up tablet, 1-up mobile
- **Filters:** Timeframe, tier, cohort
- **Metrics:**
  - Learning Speed Index (Sparkline)
  - Completion Velocity (Histogram)
  - AI Leverage Score (Donut)
  - Content Resonance (Line chart)

### Component
```tsx
import { KPIDashboard } from './components/KPIDashboard';

<KPIDashboard persona="architect" />
```

---

## 14. Published Components (Section 16)

### Core Components
1. **ProgramFlowCard** - Course/program card with gradient chip
2. **StageChip** - Gradient badge for stages
3. **AICreditsBar** - Progress bar with gradient fill
4. **UpgradeModal** - In-app upgrade prompt
5. **KPICard** - Dashboard metric card
6. **ProgramFlowRail** - Horizontal scroll container
7. **AccessMatrixTable** - Feature comparison table
8. **AICreditsLegend** - Credits tier pills

### Style Exports
- **Colors:** Indigo, Orange, Red, Plum, Pink, Black, White
- **Typography:** H1/Agrandir/64, H2/Agrandir/44, H3/Suisse/28, Body/Suisse/16, Caption/Inter/13
- **Effects:** Shadows (sm, md, lg)
- **Grid:** 12-column desktop, 8-column tablet, 4-column mobile

---

## 15. Implementation Checklist

### ✅ Completed
- [x] Color system with CSS variables
- [x] Typography scale with responsive sizes
- [x] Component utility classes
- [x] Motion and interaction styles
- [x] Accessibility and reduced motion support
- [x] Grid and spacing system
- [x] Gradient utilities
- [x] Token naming convention
- [x] Pricing tiers data structure
- [x] UpgradeModal component
- [x] KPI Dashboard components
- [x] Access matrix logic

### 🔄 Next Steps
1. Apply design system to existing components
2. Update Navigation with Brandscaling colors
3. Redesign Home hero with gradient background
4. Update EDNAQuiz with card styles
5. Apply typography to all text elements
6. Implement ProgramFlowCard for LMS courses
7. Add motion to interactive elements
8. Integrate pricing tiers into upgrade flows

---

## 12. Usage Examples

### Example 1: Hero Section
```tsx
<section className="section-padding-bs bg-gradient-arch-scale">
  <div className="container-bs-desktop">
    <h1 className="typo-h1-bs text-white mb-6">
      Discover Your Entrepreneurial DNA
    </h1>
    <p className="typo-body-bs text-white/90 mb-8 max-w-2xl">
      Take the EDNA assessment and unlock personalized insights
    </p>
    <button className="cta-gradient-bs px-8">
      Start Your Journey
    </button>
  </div>
</section>
```

### Example 2: Course Card
```tsx
<div className="program-flow-card">
  <div className="inline-block px-3 py-1 bg-gradient-arch-scale rounded-full mb-4">
    <span className="typo-caption-bs text-white">Foundation</span>
  </div>
  <h3 className="typo-h3-bs mb-2">Business Fundamentals</h3>
  <p className="typo-body-bs text-gray-600 mb-4">
    Master the core principles of entrepreneurship
  </p>
  <div className="divider-bs-pink mb-4"></div>
  <div className="ai-credits-bar mb-4">
    <div className="ai-credits-bar-fill" style={{ width: '50%' }}></div>
  </div>
  <button className="cta-gradient-bs w-full">
    Start Course
  </button>
</div>
```

### Example 3: Section with Spacing
```tsx
<section className="section-padding-bs">
  <div className="container-bs-desktop">
    <h2 className="typo-h2-bs mb-[var(--bs-spacing-section-heading)]">
      Your Learning Path
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--bs-spacing-card-group)]">
      {/* Cards */}
    </div>
  </div>
</section>
```

---

## 13. File Structure

```
/styles/
  └── globals.css         (Complete Brandscaling design system)

/BRANDSCALING_DESIGN_SYSTEM.md  (This documentation)
```

---

## 14. Resources

### Font Loading
Ensure the following fonts are loaded in your application:
- **Agrandir Grand** (Bold 700, Semi-Bold 600)
- **Suisse Intl** (Regular 400, Medium 500)
- **Inter** (Medium 500)

### Browser Support
The design system uses modern CSS features including:
- CSS Custom Properties (variables)
- CSS Grid
- Flexbox
- CSS Gradients
- CSS Transitions & Animations

Supported browsers: Chrome, Firefox, Safari, Edge (latest 2 versions)

---

**Last Updated:** December 2024  
**Version:** 1.0  
**Status:** Complete Implementation

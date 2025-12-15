# Seaphiya - Design System & Style Guide

## Project Overview
Portfolio website for Seaphiya, a fine line tattoo artist. Aesthetic: High-end, minimal, Awwwards 2025 style.

---

## 1. Cursor & Interaction Principles

### Custom Cursor
- **Global:** `cursor: none` - native cursor is hidden
- **Custom cursor:** 32px circle with `mix-blend-difference`
- **Hover detection:** Automatically scales 2.5x on `<a>`, `<button>`, `.magnetic-trigger`
- **DO NOT** use `cursor: pointer` anywhere - it's hidden anyway

### Interactive Elements Feedback
All clickable elements must have:
1. **Hover state** - color/opacity change (transition ~300-500ms)
2. **Optional scale** - subtle 1.02-1.05 on buttons
3. **No pointer cursor** - custom cursor handles this

---

## 2. Typography Hierarchy

### Font Families
```
font-display: "Clash Display"    → Titles, hero text, numbers
font-editorial: "Playfair Display" → Quotes, names, accent text (italic)
font-sans: "Inter"               → Body text (rarely used)
font-body: "Manrope"             → Body text
font-mono: "System mono"         → Labels, metadata, dates, coordinates
```

### Usage Patterns
| Element | Font | Weight | Size | Case |
|---------|------|--------|------|------|
| Hero title | display | semibold | 14-15vw | UPPERCASE |
| Section quotes | editorial italic | light | 2xl-5xl | lowercase |
| Navbar logo | display | semibold | 2xl | UPPERCASE |
| Labels | mono | normal | 8-10px | UPPERCASE |
| Metadata | mono | normal | 9-10px | normal/UPPER |
| Body text | body/editorial | light | xl-3xl | normal |

---

## 3. Color & Opacity System

### Base Colors
```
ink-black: #000000     → Primary background
off-black: #0a0a0a     → Subtle variation
paper-white: #e5e5e5   → Cursor, accents
pure-white: #ffffff    → Text
chrome: #a1a1aa        → Hover states
```

### Opacity Hierarchy (White on Black)
```
/90 - /80  → Primary content, highlighted text
/60 - /50  → Secondary content, body text
/40 - /30  → Tertiary content, labels
/25 - /20  → Subtle elements, lines, decorative
/10 - /05  → Ghost elements, large decorative numbers
```

### Status Colors
```
green-400  → Active, available, current
amber-400  → Upcoming, pending, warning
white/30   → Past, inactive
```

---

## 4. Spacing & Layout

### Section Padding
- Mobile: `p-6` (24px)
- Tablet: `p-8` to `p-10` (32-40px)
- Desktop: `p-12` (48px)

### Grid System
- 2-column: About, Gallery items
- 3-column: Studios section
- Full-width: Hero, Marquee, Footer

### Borders
- Section dividers: `border-white/10`
- Subtle: `border-white/5`
- Grid lines: `border-white/10`

---

## 5. Animation Principles

### Timing
```
Fast:    200-300ms  → Hover states, small interactions
Medium:  500-800ms  → Element reveals, transitions
Slow:    1000-1400ms → Hero animations, cinematic reveals
```

### Easing
```
Default:     [0.16, 1, 0.3, 1]   → Smooth deceleration
Elastic:     [0.34, 1.56, 0.64, 1] → Overshoot effect
Linear:      'linear'            → Marquees, infinite loops
```

### Scroll Animations
- Use `whileInView` with `viewport={{ once: true }}`
- Stagger children with `delay: index * 0.08-0.15`
- Parallax: different speeds for depth (cornerY, sideY transforms)

### Reveal Patterns
```
Blur reveal:  filter: blur(10px) → blur(0px)
Slide up:     y: 20-40 → 0
Slide side:   x: ±20 → 0
Scale:        scale: 1.1 → 1
Fade:         opacity: 0 → 1
```

---

## 6. Component Patterns

### Section Headers
```jsx
<div className="border-b border-white/10 px-6 py-6 flex justify-between">
  <span className="font-mono text-xs uppercase tracking-widest">[ Title ]</span>
  <span className="font-mono text-xs uppercase tracking-widest">Metadata</span>
</div>
```

### Labels with Indicator
```jsx
<div className="flex items-center gap-3">
  <div className="w-2 h-2 rounded-full bg-green-400" />
  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Label</span>
</div>
```

### CTA Buttons
```jsx
// Primary (filled on hover)
<button className="px-6 py-3 border border-white/20 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 hover:bg-white hover:text-black transition-all duration-500">

// Ghost (text only)
<button className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300">
```

### Cards with Hover
```jsx
<div className="group">
  {/* Background reveal */}
  <div className="absolute inset-0 bg-white/[0.02] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom" />
  {/* Content with group-hover states */}
  <h4 className="text-white/60 group-hover:text-white/90 transition-colors">
</div>
```

---

## 7. Responsive Breakpoints

```
Mobile:  default (< 768px)
Tablet:  md: (768px+)
Desktop: lg: (1024px+)
```

### Common Responsive Patterns
```
text-2xl md:text-4xl lg:text-5xl    → Scaling typography
p-6 md:p-8 lg:p-12                  → Scaling padding
hidden md:flex                       → Hide on mobile
grid-cols-1 md:grid-cols-2          → Stack on mobile
```

---

## 8. Special Effects

### Scramble Text (GPS/Location)
- Coordinates and cities use scramble animation
- Phases: waiting → searching → highlight → settled
- Colors transition from light to bright flash to settled

### Scroll Parallax
- Corner elements move at different speeds
- Creates depth without being distracting
- Use `useTransform` with `smoothProgress`

### Image Treatments
- Default: `grayscale` filter
- Hover: `grayscale-0` with `scale-105`
- Transition: `duration-700` to `duration-1000`

---

## 9. Don'ts

- ❌ Don't use `cursor: pointer` (custom cursor handles this)
- ❌ Don't use emojis in UI
- ❌ Don't use bright colors (except status indicators)
- ❌ Don't use opacity above /90 for large text blocks
- ❌ Don't skip hover states on interactive elements
- ❌ Don't use fast transitions on large elements (feels jarring)
- ❌ Don't center-align body text (left-align)
- ❌ Don't use more than 3 font weights per family

---

## 10. File Structure

```
/components
  CustomCursor.tsx     → Global cursor
  Navbar.tsx           → Fixed navigation
  MagneticButton.tsx   → Hover-follow button effect
  BookingPage.tsx      → Full-page booking form
  PeonyTransition.tsx  → SVG flower scroll animation
  ScrollRevealText.tsx → Word-by-word reveal

/public
  /tattoos             → Gallery images
  /about               → Artist photo
```

---

## 11. Lenis Smooth Scroll Config

```js
{
  duration: 1.8,
  lerp: 0.06,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.2,
}
```
Exposed globally via `window.lenis` for navbar scroll-to functionality.

---

*Last updated: December 2024*

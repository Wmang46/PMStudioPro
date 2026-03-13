# Find UI Components from 21st.dev

## Objective
Browse [21st.dev](https://21st.dev) to find polished, drop-in React/Tailwind components that elevate the PMStudioPro portfolio site. Evaluate fit, capture screenshots, and recommend components with install commands.

## When to Use
- Before any major design polish pass
- When adding new sections (testimonials, case studies, backgrounds)
- When the site feels "functional but flat" and needs visual lift

## Tool
`tools/browse-21st-dev.mjs` — Puppeteer script that screenshots 21st.dev category pages and individual component detail pages.

```bash
node tools/browse-21st-dev.mjs              # Screenshot all curated picks
```

Output: `.tmp/21st-dev/picks/*.png`

## How Components Install
21st.dev components use the shadcn CLI pattern:
```bash
npx shadcn@latest add https://21st.dev/r/<component-url>
```
> **Note:** These are React/Next.js components. Our site is Astro. Components need to be adapted — extract the CSS/HTML patterns and Tailwind classes rather than importing React directly.

## Recommended Components for PMStudioPro

### HIGH PRIORITY — Would noticeably improve the site

| Component | Category | What It Does | Why It Fits | URL |
|-----------|----------|-------------|-------------|-----|
| **Testimonial Card** (serafim) | Testimonials | Avatar + name + handle + quote with gradient hover | Replace placeholder testimonials on About page | [View](https://21st.dev/serafimcloud/testimonial-card) |
| **Testimonial Card** (hextaui) | Testimonials | Star ratings + name + role + company | More professional, shows role/company context | [View](https://21st.dev/preetsuthar17/testimonial-card) |
| **Animated Shader Hero** | Heros | WebGL shader background with animated effects | Dramatic hero upgrade — replaces static gradient background | [View](https://21st.dev/community/components/ravikatiyar162/animated-shader-hero) |
| **Hero Pill** (Codehagen) | Heros | Announcement banner pill with Framer Motion animations | Add an announcement/status pill above hero heading ("Open to PM roles") | [View](https://21st.dev/Codehagen/hero-pill/default) |

### MEDIUM PRIORITY — Nice-to-have polish

| Component | Category | What It Does | Why It Fits | URL |
|-----------|----------|-------------|-------------|-----|
| **Background Paths** | Backgrounds | Animated diagonal line paths | Subtle background texture for sections | [View](https://21st.dev/community/components/s/background) |
| **Shooting Stars Effect** | Backgrounds | Canvas-based shooting star particles | Atmospheric dark-mode background accent | [View](https://21st.dev/community/components/s/background) |
| **Dynamic Stars Background** | Backgrounds | Twinkling star field with configurable density | Subtle ambient background for hero or CTA sections | [View](https://21st.dev/community/components/s/background) |
| **Case Studies** (features) | Features | Image gallery with hover cards | Could showcase project screenshots on About page | [View](https://21st.dev/community/components/s/features) |

### LOW PRIORITY — Consider for future iterations

| Component | Category | What It Does | Why It Fits |
|-----------|----------|-------------|-------------|
| Hover reveal cards | Features | Cards with animated hover-to-reveal effects | Work experience cards with richer interactions |
| Text animations | Text | Typewriter, wave, and gradient text effects | Animated hero heading for visual punch |
| Soft Glow buttons | Buttons | Buttons with soft glow/pulse effects | CTA buttons with more visual weight |

## Adaptation Strategy (React → Astro)

Since PMStudioPro is Astro (not Next.js), don't install components directly. Instead:

1. **Visit the component page** on 21st.dev
2. Click **"View code"** to see the source
3. **Extract the Tailwind classes and HTML structure** — this is the valuable part
4. **Recreate as an Astro component** (`.astro` file) using the same Tailwind patterns
5. For animated components using Framer Motion → use **CSS animations** or lightweight `<script>` tags instead
6. For shader/WebGL components → use inline `<canvas>` with a small script, or CSS-only alternatives

## Current Site Gaps (What Needs Polish)

Based on Puppeteer screenshots of https://pmstudiopro.com:

1. **Hero section** — Currently uses a static gradient glow. Could benefit from a shader/animated background or a hero pill announcement badge
2. **No testimonials** — The About page removed placeholder testimonials. Adding real ones with a polished card component would add social proof
3. **Card hover effects** — Work experience cards are static. Hover animations would add depth
4. **Background texture** — The noise texture is subtle but the sections feel flat. Animated background accents could add visual layers
5. **CTA buttons** — Functional but could have more visual weight (glow, animation)

## Decision Checklist

Before adding any component, verify:
- [ ] Does it work in dark mode? (site is dark-first)
- [ ] Is it lightweight? (no heavy JS bundles for a static site)
- [ ] Can it be adapted to pure HTML/CSS/Astro? (no React runtime needed)
- [ ] Does it match the existing design system? (accent purple, teal, dark surfaces)
- [ ] Does it add genuine value or is it just decoration?

# Portfolio Website Rebuild - Design Specification

**Date:** 2026-03-10
**Project:** William Mangaroo Professional Portfolio Rebuild
**Status:** Approved

## Executive Summary

This document outlines the complete design for rebuilding the professional portfolio website for William Mangaroo, a Product Manager. The previous site was lost when a Windows365 subscription ended. We will rebuild using modern web technologies while migrating existing content from a backup and incorporating new features including a Hot Topics section for PM thought leadership and an expanded About page showcasing projects and skills.

## Project Context

### What We Have
- Backup zip file of previous site (v5, static HTML/CSS/JS)
- Existing content: 3 articles and 2 audio files about PM topics
- Hero image (hero2.jpg)
- Resume (DOCX format)
- LinkedIn profile with 2 recommendations

### What We're Building
A modernized, content-focused portfolio website that:
- Showcases PM thought leadership through "Hot Topics" (articles, audio, future video)
- Displays work history, projects, and skills on an expanded About page
- Provides fast, accessible, SEO-optimized experience
- Easy content management via Markdown files
- Automatic deployment to Vercel

---

## 1. Overall Architecture

### Technology Stack

**Framework & Build:**
- **Astro 5.x** - Content-focused static site generator
- **TypeScript** - Type safety for configuration and components
- **Tailwind CSS** - Utility-first styling framework
- **MDX** - Markdown with component support for rich content

**Deployment:**
- **Platform:** Vercel (primary) or Netlify (alternative)
- **Method:** Automatic deployment via GitHub integration
- **CDN:** Global edge network for fast delivery worldwide

**Version Control:**
- Git repository hosted on GitHub
- Main branch for production
- Feature branches for development

### Site Structure

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Homepage with hero
│   │   ├── hot-topics/
│   │   │   ├── index.astro          # Hot Topics listing page
│   │   │   └── [slug].astro         # Individual content pages
│   │   ├── about.astro              # About with projects & skills
│   │   └── contact.astro            # Contact page
│   ├── content/
│   │   ├── config.ts                # Content collection config
│   │   └── hot-topics/              # MDX files for articles/audio
│   │       ├── priority-conflicts.mdx
│   │       ├── rice-prioritization.mdx
│   │       └── stakeholders-ghost.mdx
│   ├── components/                  # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Layout.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── FeaturedContent.astro
│   │   │   └── ValueProps.astro
│   │   ├── hot-topics/
│   │   │   ├── ContentCard.astro
│   │   │   ├── ContentFilters.astro
│   │   │   └── AudioPlayer.astro
│   │   └── about/
│   │       ├── ProjectCard.astro
│   │       └── SkillsGrid.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro         # Base HTML structure
│   │   └── ContentLayout.astro      # Layout for articles
│   └── assets/
│       ├── images/                  # Hero, avatar, etc.
│       └── audio/                   # MP3 files
├── public/
│   ├── resume/                      # PDF resume
│   ├── audio/                       # Public audio files
│   └── favicon.svg
└── astro.config.mjs                 # Astro configuration
```

### Pages Overview

1. **Homepage (/)** - Hero section with photo, headline, featured Hot Topics, CTAs
2. **Hot Topics (/hot-topics)** - Filterable listing of articles, audio, video content
3. **Individual Content (/hot-topics/[slug])** - Full article/audio pages
4. **About (/about)** - Bio, projects, skills, resume download, testimonials
5. **Contact (/contact)** - Contact form or links

---

## 2. Page Structure & Content

### Homepage (index.astro)

**Hero Section:**
- **Visual:** Large hero image (hero2.jpg) with modern gradient overlay
- **Headline:** "Explore product thinking in action"
- **Subheading:** Brief tagline showcasing PM focus
- **CTAs:**
  - Primary: "Explore Hot Topics"
  - Secondary: "View Projects"
- **Stats Bar:** 3 key highlights
  - "Strength: Discovery → Delivery"
  - "Focus: Clarity + outcomes"
  - "Outputs: Stories, specs, demos"

**Featured Hot Topics Section:**
- Card grid (3-4 items)
- Shows featured articles/audio from content collection
- Each card: type badge, title, summary, tags
- Click to view full content

**Value Proposition Section:**
- 3-column grid explaining approach
- Cards for:
  - "Product Thinking" - Clear tradeoffs, crisp narratives
  - "Execution" - Discovery to delivery workflows
  - "Results" - Tagged outcomes and metrics

**Call-to-Action Section:**
- Large card with glow effect
- "Want the fastest proof of fit?"
- CTAs to Hot Topics and Contact

**Footer:**
- Copyright with dynamic year
- Navigation links
- Social links (LinkedIn)

---

### Hot Topics Listing Page (/hot-topics)

**Page Header:**
- Title: "Hot Topics"
- Subtitle: "PM insights, frameworks, and real-world scenarios"

**Filters & Controls:**
- **Search bar:** Real-time search through titles, summaries, tags
- **Type filter:** All | Articles | Audio | Video
- **Tag filter:** Dynamic dropdown based on available tags
- **Sort options:** Newest | Oldest | Title A-Z | Title Z-A
- **Clear button:** Reset all filters
- **URL state:** Filters reflected in URL for shareability

**Content Grid:**
- Responsive grid layout (1 col mobile → 2 col tablet → 3 col desktop)
- Each content card includes:
  - **Type badge with icon** (color-coded: Article=blue, Audio=purple, Video=red)
  - **Title** (prominent, clickable)
  - **Date** (formatted nicely)
  - **Summary/excerpt** (2-3 sentences)
  - **Tags** (as colored pills)
  - **Type-specific metadata:**
    - Articles: Read time estimate
    - Audio: Duration + play icon
    - Video: Duration + thumbnail
  - **CTA button:** "Read Article" | "Listen" | "Watch"

**Results Meta:**
- Count of filtered results
- Empty state if no matches

---

### Individual Content Page (/hot-topics/[slug])

**Article Layout:**
- **Header:**
  - Breadcrumb navigation
  - Type badge
  - Title (H1)
  - Date and read time
  - Tags
- **Table of Contents** (for longer articles, auto-generated from headings)
- **Article body** (rendered MDX with rich formatting)
- **Audio player** (if audio content, embedded at top)
- **Video embed** (if video content, responsive iframe)
- **Share buttons** (LinkedIn, Twitter, copy link)
- **Related content** (3 similar items based on tags)

**Reading Experience:**
- Max-width for optimal readability (~700px for text)
- Proper heading hierarchy
- Syntax highlighting for code blocks
- Responsive images
- Pull quotes styled distinctively

---

### About Page (/about)

**Personal Introduction:**
- Professional headline
- Brief bio (2-3 paragraphs)
- Your PM philosophy and approach
- Photo or avatar

**Projects Section:**
- **Title:** "Projects I've Worked On"
- **Layout:** Timeline or card-based grid
- Each project shows:
  - Company/organization name
  - Project title
  - Your role
  - Timeline
  - Problem/context
  - Solution/approach
  - Key outcomes with metrics
  - Skills/methodologies applied
  - Technologies used (if relevant)

**Example Project Structure:**
```typescript
{
  title: "Enterprise SaaS Platform Redesign",
  company: "TechCorp",
  role: "Senior Product Manager",
  timeline: "2023-2024",
  description: "Led discovery and delivery for complete UX overhaul...",
  outcomes: [
    "Increased user engagement by 45%",
    "Reduced onboarding time from 2 weeks to 3 days",
    "Generated $2M in new revenue"
  ],
  skills: ["User Research", "Roadmapping", "Stakeholder Alignment"],
  technologies: ["React", "GraphQL", "Figma"]
}
```

**Skills Showcase:**
- **Title:** "Skills & Expertise"
- **Organization:** Grouped by category
- **Categories:**
  - Product Strategy (vision, roadmapping, market research, prioritization)
  - Stakeholder Management (cross-functional leadership, communication)
  - Execution (Agile/Scrum, user stories, sprint planning)
  - Technical (API design, SQL, data analysis, A/B testing)
  - Tools (Jira, Figma, Amplitude, Mixpanel, Miro)
- **Visual:** Pills/tags grouped by category with icons
- **Highlight:** Skills mentioned in projects visually emphasized

**Resume Download:**
- Prominent CTA button: "Download Full Resume (PDF)"
- PDF hosted in `/public/resume/`
- Styled as primary button

**Testimonials:**
- Section title: "What Others Say"
- Pull 2 recommendations from LinkedIn profile:
  - LinkedIn URL: https://www.linkedin.com/in/william-mangaroo
- Each testimonial shows:
  - Quote text
  - Name and title of recommender
  - LinkedIn link icon

---

### Contact Page (/contact)

**Simple Contact Form:**
- Fields: Name, Email, Message
- Submit button
- Form validation
- Success/error messages
- Optional: Form handling via service (Formspree, Netlify Forms, etc.)

**Alternative/Additional:**
- Email link
- LinkedIn profile link
- Optional: Calendly embed for scheduling

---

## 3. Hot Topics Content Management

### Content Structure

**Content Collection Configuration:**
Define content schema in `/src/content/config.ts`:

```typescript
import { defineCollection, z } from 'astro:content';

const hotTopicsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['article', 'audio', 'video']),
    date: z.date(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
    summary: z.string(),
    readTime: z.string().optional(),
    audioFile: z.string().optional(),
    duration: z.string().optional(),
    videoUrl: z.string().optional(),
  }),
});

export const collections = {
  'hot-topics': hotTopicsCollection,
};
```

### Article Format (MDX)

Example: `/src/content/hot-topics/priority-conflicts.mdx`

```markdown
---
title: "Priority Conflicts: Turn Stakeholder Chaos into Clear Decisions"
type: "article"
date: 2024-12-17
featured: true
tags:
  - Prioritization
  - Stakeholder Management
  - RICE
  - Trade-offs
summary: "A practical playbook for handling competing stakeholder priorities with shared frameworks, trade-off facilitation, and transparent follow-through."
readTime: "8 min"
---

# Priority Conflicts: Turn Stakeholder Chaos into Clear Decisions

Full article content in Markdown...

## Section Headings

- Bullet points
- **Bold** and *italic*
- [Links](https://example.com)

### Code blocks with syntax highlighting

```typescript
// Example code
```
```

### Audio Format (MDX)

Example: `/src/content/hot-topics/rice-prioritization.mdx`

```markdown
---
title: "Quantify Product Priorities Using RICE"
type: "audio"
date: 2024-12-17
featured: true
audioFile: "/audio/Quantify_Product_Priorities_Using_RICE.mp3"
duration: "15:23"
tags:
  - Prioritization
  - RICE
  - Decision-Making
summary: "A short audio breakdown on using RICE to quantify impact, confidence, and effort—without turning the process into theater."
---

Optional show notes or transcript can go here in Markdown.

## Topics Covered

- What RICE is and when it works best
- How to avoid fake precision
- 15-minute facilitation flow
- Documentation best practices
```

### Video Format (Future)

Example: `/src/content/hot-topics/stakeholder-workshop.mdx`

```markdown
---
title: "Stakeholder Alignment Workshop"
type: "video"
date: 2025-03-15
featured: true
videoUrl: "https://www.youtube.com/embed/VIDEO_ID"
duration: "22:45"
tags:
  - Stakeholder Management
  - Workshops
summary: "Live workshop demonstrating stakeholder alignment techniques."
---

Optional video description, timestamps, or notes.
```

### Adding New Content Workflow

**To add a new Hot Topic piece:**

1. Create new `.mdx` file in `/src/content/hot-topics/`
2. Add frontmatter with all required metadata
3. Write content in Markdown below frontmatter
4. For audio: place MP3 in `/public/audio/` and reference in frontmatter
5. For video: get embed URL and add to frontmatter
6. Test locally: `npm run dev`
7. Commit and push to GitHub → auto-deploys

**Content Validation:**
Astro's content collections validate frontmatter on build, preventing deployment with missing/invalid metadata.

### Migrating Existing Content

**From Backup:**

1. **Priority Conflicts article:**
   - Convert `assets/articles/priority-conflicts-product-manager.html` to MDX
   - Preserve structure, convert HTML to Markdown
   - Extract metadata for frontmatter

2. **RICE audio:**
   - Copy `Quantify_Product_Priorities_Using_RICE.mp3` to `/public/audio/`
   - Create MDX with frontmatter referencing audio file

3. **Why Stakeholders Ghost:**
   - Convert `Why Stakeholders Ghost.docx` to Markdown
   - Copy `Why Stakeholders Ghost.mp3` to `/public/audio/`
   - Create MDX combining article + audio

---

## 4. Styling & Design System

### Color System

**Principles:**
- High contrast for accessibility (WCAG AA minimum)
- Professional, modern palette suitable for PM portfolio
- Distinct theming for light and dark modes

**Light Mode:**
```css
:root {
  --color-primary: /* Modern blue/teal */
  --color-accent: /* Complementary for CTAs */
  --color-bg: /* Clean white/off-white */
  --color-text: /* Dark gray (not pure black) */
  --color-muted: /* Medium gray for secondary text */
  --color-border: /* Light gray for borders */
  --color-success: /* Green for outcomes/metrics */
}
```

**Dark Mode:**
```css
:root[data-theme="dark"] {
  --color-primary: /* Adjusted for dark bg */
  --color-accent: /* Brighter for contrast */
  --color-bg: /* Rich dark (not pure black, ~#1a1a1a) */
  --color-text: /* Off-white for readability */
  --color-muted: /* Medium-light gray */
  --color-border: /* Subtle border color */
}
```

**Content Type Colors:**
- Articles: Blue tones
- Audio: Purple tones
- Video: Red/orange tones

**Implementation:**
- CSS custom properties for theming
- Tailwind CSS config extends with theme colors
- Theme toggle in header
- User preference saved to `localStorage`
- Respects system preference on first visit

### Typography

**Font Stack:**
- **Primary:** Modern sans-serif (Inter, Outfit, or Satoshi)
- **Fallback:** System UI stack for performance
- **Monospace:** For code blocks (Fira Code or JetBrains Mono)

**Type Scale (Fluid):**
```css
--text-xs: clamp(0.75rem, 2vw, 0.875rem);
--text-sm: clamp(0.875rem, 2vw, 1rem);
--text-base: clamp(1rem, 2.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 3vw, 1.25rem);
--text-xl: clamp(1.25rem, 3.5vw, 1.5rem);
--text-2xl: clamp(1.5rem, 4vw, 2rem);
--text-3xl: clamp(2rem, 5vw, 3rem);
--text-4xl: clamp(2.5rem, 6vw, 4rem);
```

**Hierarchy:**
- H1: Large, bold (hero titles)
- H2: Section headings
- H3: Subsection headings
- Body: Optimized line height (1.6-1.8) and letter spacing
- Small: Metadata, captions

**Readability:**
- Max line length: ~70 characters for body text
- Generous line height
- Proper heading spacing

### Component Design

**Cards:**
- Subtle shadows: `0 1px 3px rgba(0,0,0,0.1)`
- Hover elevation: `0 4px 12px rgba(0,0,0,0.15)`
- Border radius: 8-12px (modern but not excessive)
- Smooth transitions: `transition: all 0.2s ease`
- Optional: Subtle gradient borders for featured items

**Buttons:**
- **Primary:** Solid background, white text, hover darkens
- **Secondary/Ghost:** Outlined or subtle bg, hover fills
- **Sizes:** Small, medium, large
- **States:** Default, hover, focus, active, disabled
- **Accessibility:** Visible focus rings, keyboard accessible

**Badges/Tags:**
- **Shape:** Rounded pills
- **Colors:** Type-specific (article/audio/video) or tag-based
- **Size:** Small (12-14px font)
- **Hover:** Subtle scale or color change

**Content Cards (Hot Topics):**
- Consistent card structure
- Type badge in top-left or top
- Title prominent and clickable
- Summary text muted slightly
- Metadata (date, duration, tags) at bottom
- Hover: Subtle lift effect (`transform: translateY(-4px)`)

**Audio Player:**
- Custom styled to match design system
- Controls: Play/pause, scrubber, time, volume, download
- Responsive (works on mobile)
- Keyboard accessible
- Progress bar with primary color

### Modern Visual Effects

**Animations & Transitions:**
- **Fade-in on scroll:** Content animates in as user scrolls
- **Smooth page transitions:** Between route changes
- **Skeleton loaders:** While content loads
- **Micro-interactions:** Button hovers, card lifts
- **Performance:** Use `will-change` sparingly, prefer transforms/opacity

**Hero Section Effects:**
- Gradient overlay on hero image
- Parallax subtle motion (optional, performance-tested)
- Text fade-in animation on load

**Background Effects:**
- Subtle mesh gradient background
- Or dotted/grid pattern (very subtle)
- Glass morphism on select cards (blur + transparency)

**Layout:**
- Generous white space (doesn't feel cramped)
- Max content width: 1200px
- Asymmetric layouts where appropriate for visual interest
- CSS Grid for complex layouts
- Flexbox for component internals

### Accessibility

**WCAG AA Compliance:**
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text
- Focus indicators: Visible on all interactive elements
- Skip links: Jump to main content for keyboard users
- Heading hierarchy: Proper semantic structure (H1 → H2 → H3)
- Alt text: Descriptive for all images
- ARIA labels: Where semantic HTML isn't enough
- Keyboard navigation: All functionality accessible via keyboard
- Screen reader: Proper announcements and labels

**Forms:**
- Labels associated with inputs
- Error messages clear and actionable
- Focus management

**Media:**
- Audio player fully keyboard accessible
- Video with captions (future)
- Transcripts provided or linked

---

## 5. Key Features & Technical Implementation

### Responsive Design

**Breakpoint Strategy:**
```css
/* Mobile-first approach */
/* Base: 320px - 640px (mobile) */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large */
```

**Responsive Patterns:**

**Navigation:**
- Mobile: Hamburger menu, drawer/modal
- Desktop: Full horizontal nav

**Hero:**
- Mobile: Stacked (image, then text)
- Desktop: Split layout (image left, text right)

**Content Grids:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

**Touch Targets:**
- Minimum 44x44px for mobile taps
- Generous spacing between interactive elements

### Performance Optimizations

**Image Optimization:**
- Use Astro's `<Image>` component for automatic optimization
- Convert to WebP with JPEG fallback
- Responsive images with `srcset` and `sizes`
- Lazy loading for below-fold images
- Hero image: prioritized loading (fetchpriority="high")
- Proper alt text for SEO and accessibility

**Code Optimization:**
- **JavaScript:** Minimal by default (Astro ships HTML)
- Interactive components: Client-side JS only where needed
- **CSS:** Tailwind with PurgeCSS removes unused styles
- Critical CSS inlined in `<head>`
- Non-critical CSS deferred
- **Fonts:** Subset fonts, preload critical fonts

**Audio Files:**
- Compress MP3s (128-192kbps, mono for voice)
- Streaming: Don't load entire file upfront
- Preload metadata only: `<audio preload="metadata">`

**Build Optimization:**
- Static generation: All pages pre-rendered at build time
- Code splitting: Separate bundles for different sections
- Tree shaking: Remove unused code
- Minification: HTML, CSS, JS

**Target Performance Metrics:**
- **Lighthouse Score:** 90+ (all categories)
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.0s
- **Cumulative Layout Shift:** < 0.1
- **Total Page Weight:** < 500KB (initial load)

### SEO Optimization

**Meta Tags (Per Page):**
```html
<title>Optimized Title | William Mangaroo</title>
<meta name="description" content="Compelling description with keywords">
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Description for social sharing">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

**Structured Data (JSON-LD):**
- Person schema for About page
- Article schema for Hot Topics content
- BreadcrumbList for navigation

**Content SEO:**
- Semantic HTML (header, nav, main, article, aside, footer)
- Proper heading hierarchy (single H1 per page)
- Descriptive URLs (e.g., `/hot-topics/priority-conflicts`)
- Internal linking between related content
- Alt text for images (descriptive, not keyword stuffing)

**Technical SEO:**
- `sitemap.xml` auto-generated
- `robots.txt` configured
- Canonical URLs
- 404 page styled consistently
- Fast load times (Core Web Vitals)
- Mobile-friendly (responsive)
- HTTPS via Vercel

**Page-Specific Optimization:**
- **Homepage:** "William Mangaroo | Product Manager Portfolio"
- **Hot Topics:** "PM Insights & Frameworks | William Mangaroo"
- **Individual Articles:** "[Article Title] | William Mangaroo"
- **About:** "About William Mangaroo | Product Manager"

### Analytics & Tracking

**Options:**

**Option 1: Vercel Analytics (Recommended)**
- Privacy-friendly (no cookies)
- Lightweight (< 1KB)
- Core Web Vitals tracking
- Simple integration
- Free tier available

**Option 2: Google Analytics 4**
- More detailed insights
- Event tracking
- Audience demographics
- Requires cookie consent (GDPR)

**Tracking:**
- Page views
- Popular Hot Topics content
- Traffic sources
- User flow
- Search queries (if search implemented)

**Privacy:**
- Comply with GDPR/CCPA if applicable
- Clear privacy policy
- Cookie consent banner if using GA

### Content Features

**Hot Topics Filtering:**
- **Client-side filtering:** No page reload, instant results
- **Search:** Fuzzy search through title, summary, tags (Fuse.js or similar)
- **Type filter:** Checkboxes or dropdown for Article/Audio/Video
- **Tag filter:** Dynamic based on available tags
- **Sort:** Date (newest/oldest), Title (A-Z/Z-A)
- **URL state:** Filters in URL params (shareable, bookmarkable)
  - Example: `/hot-topics?type=audio&tag=prioritization`
- **Results count:** Show "X items" based on filters

**Audio Player Features:**
- Custom styled to match design
- Play/pause toggle
- Scrub bar (seek)
- Current time / total duration
- Volume control
- Playback speed (1x, 1.25x, 1.5x, 2x)
- Download button
- Keyboard shortcuts (space = play/pause, arrow keys = seek)
- Accessible labels and controls

**Reading Experience (Articles):**
- **Table of Contents:** Auto-generated from H2/H3 headings
- Smooth scroll to sections
- **Read time estimate:** Calculate based on word count
- **Syntax highlighting:** For code blocks (Shiki or Prism)
- **Responsive images:** Scale properly on all devices
- **Print styles:** Optimized for printing articles
- **Copy link button:** Share specific sections

---

## 6. Deployment & Content Updates

### Git Repository Setup

**Initialize Repository:**
```bash
git init
git add .
git commit -m "Initial commit: Portfolio rebuild"
```

**GitHub Setup:**
- Create repository on GitHub
- Push code to GitHub
- Branch strategy:
  - `main` - Production-ready code
  - `dev` (optional) - Development branch
  - Feature branches for new features

### Vercel Deployment

**Connect Repository:**
1. Sign up/log in to Vercel
2. Import GitHub repository
3. Vercel auto-detects Astro project
4. Configure build settings:
   - **Framework Preset:** Astro
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

**Automatic Deployments:**
- **Production:** Every push to `main` triggers production deploy
- **Preview:** Every PR triggers preview deploy with unique URL
- **Rollback:** One-click rollback to previous deployment

**Custom Domain:**
- Add custom domain in Vercel dashboard
- Configure DNS (Vercel provides nameservers or A/CNAME records)
- SSL certificate automatically provisioned and renewed

**Environment Variables:**
- Not needed for basic site
- If adding features: Analytics keys, form handling API keys, etc.

### Content Update Workflows

**Workflow 1: Local Development (Recommended)**

For significant content updates or new features:

```bash
# 1. Clone repository (first time only)
git clone https://github.com/username/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Create new content file
# /src/content/hot-topics/new-article.mdx

# 4. Run local dev server
npm run dev
# Opens at http://localhost:4321

# 5. Preview changes in browser
# Make edits, server auto-reloads

# 6. Build to check for errors
npm run build

# 7. Commit and push
git add .
git commit -m "Add new article: [Title]"
git push origin main

# 8. Auto-deploys to Vercel in ~60 seconds
```

**Workflow 2: GitHub Web Interface (Quick Edits)**

For quick fixes or simple content additions:

1. Navigate to repository on GitHub.com
2. Browse to `/src/content/hot-topics/`
3. Click "Add file" → "Create new file"
4. Name file: `article-slug.mdx`
5. Add frontmatter and content in web editor
6. Scroll down, add commit message
7. Commit directly to `main` or create PR
8. Auto-deploys on merge/commit

**Workflow 3: Future CMS Integration (Optional)**

For non-technical editing:

- Integrate Decap CMS (formerly Netlify CMS)
- Web-based interface at `/admin`
- WYSIWYG editor for content
- Still stores files as MDX in git
- No database needed

### Adding Different Content Types

**Adding a New Article:**
1. Create `/src/content/hot-topics/article-slug.mdx`
2. Add frontmatter:
```yaml
---
title: "Article Title"
type: "article"
date: 2026-03-10
featured: false
tags: ["Tag1", "Tag2"]
summary: "Brief summary..."
readTime: "5 min"
---
```
3. Write content in Markdown
4. Push to deploy

**Adding Audio Content:**
1. Place MP3 file in `/public/audio/filename.mp3`
2. Create `/src/content/hot-topics/audio-slug.mdx`
3. Add frontmatter:
```yaml
---
title: "Audio Title"
type: "audio"
audioFile: "/audio/filename.mp3"
duration: "15:23"
date: 2026-03-10
tags: ["Tag1"]
summary: "Brief summary..."
---
```
4. Optional: Add show notes or transcript in body
5. Push to deploy

**Adding Video (Future):**
1. Upload video to YouTube/Vimeo
2. Get embed URL
3. Create `/src/content/hot-topics/video-slug.mdx`
4. Add frontmatter with `videoUrl`
5. Push to deploy

**Updating About Page (Projects/Skills):**
1. Edit `/src/pages/about.astro`
2. Or create `/src/data/projects.json` for data-driven approach
3. Update projects array or skills object
4. Push to deploy

**Updating Resume:**
1. Convert updated DOCX to PDF
2. Replace `/public/resume/william-mangaroo-resume.pdf`
3. Push to deploy

### Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:4321)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run astro        # Run Astro CLI commands
```

### Maintenance

**Dependency Updates:**
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Astro specifically
npm install astro@latest
```

**Security:**
- GitHub Dependabot alerts for vulnerabilities
- Vercel alerts for security issues
- Regular updates (monthly or quarterly)

**Backup:**
- All content version-controlled in Git
- GitHub is the backup
- Vercel keeps deployment history
- Can export static files if needed

**Monitoring:**
- Vercel deployment logs
- Analytics dashboard (if enabled)
- Lighthouse CI (optional, for performance monitoring)
- Uptime monitoring (Vercel status page)

### Rollback & Recovery

**Rollback Deployment:**
- Vercel dashboard → Deployments → Click previous deployment → "Promote to Production"

**Rollback Content:**
```bash
# View git history
git log

# Revert to previous commit
git revert <commit-hash>
git push

# Or reset to specific commit (use carefully)
git reset --hard <commit-hash>
git push --force
```

**Error Handling:**
- Custom 404 page (styled to match site)
- Error boundaries for components
- Graceful degradation if audio fails to load
- Form submission error messages

---

## 7. Migration Plan

### Existing Content to Migrate

**From Backup Zip:**

1. **Priority Conflicts Article**
   - Source: `backup-extracted/pm-portfolio/assets/articles/priority-conflicts-product-manager.html`
   - Convert HTML to MDX
   - Extract text, headings, lists
   - Create `/src/content/hot-topics/priority-conflicts.mdx`

2. **RICE Audio**
   - Source: `Assets/Quantify_Product_Priorities_Using_RICE.mp3`
   - Copy to `/public/audio/quantify-rice.mp3`
   - Create MDX with audio frontmatter
   - Add show notes or description

3. **Why Stakeholders Ghost (Article + Audio)**
   - Article source: `Assets/Why Stakeholders Ghost.docx`
   - Audio source: `Assets/Why Stakeholders Ghost.mp3`
   - Convert DOCX to Markdown
   - Create unified MDX with both article content and audio player
   - Copy audio to `/public/audio/`

**Assets to Migrate:**

1. **Hero Image**
   - Source: `Assets/hero2.jpg`
   - Copy to `/src/assets/images/hero.jpg`
   - Optimize during build

2. **Resume**
   - Source: `Assets/WILLIAM-MANGAROO-RESUME.docx`
   - Convert to PDF
   - Save to `/public/resume/william-mangaroo-resume.pdf`

**LinkedIn Testimonials:**
- Fetch 2 recommendations from: https://www.linkedin.com/in/william-mangaroo
- Add to About page testimonials section

### Design Elements to Preserve

From backup, preserve these concepts:
- Clean, professional aesthetic
- Dark/light mode toggle
- Card-based layouts
- Tag system
- Featured content concept

### Design Elements to Modernize

- Typography: Modern font stack
- Spacing: More generous white space
- Animations: Subtle micro-interactions
- Colors: Refreshed palette
- Components: More polished, contemporary feel

---

## 8. Success Criteria

**Performance:**
- ✅ Lighthouse score 90+ (all categories)
- ✅ First Contentful Paint < 1.5s
- ✅ Page weight < 500KB initial load

**Functionality:**
- ✅ All pages render correctly
- ✅ Hot Topics filtering works (search, type, tags, sort)
- ✅ Audio player functional on all devices
- ✅ Dark/light mode toggle works
- ✅ Responsive on mobile, tablet, desktop
- ✅ All links work (no 404s)

**Content:**
- ✅ All 3 existing articles migrated
- ✅ Both audio files working
- ✅ Resume downloadable as PDF
- ✅ LinkedIn testimonials displayed

**Accessibility:**
- ✅ WCAG AA compliant
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Proper heading hierarchy

**SEO:**
- ✅ All meta tags present
- ✅ Sitemap generated
- ✅ Structured data implemented
- ✅ URLs semantic and clean

**Deployment:**
- ✅ Auto-deploys from GitHub
- ✅ Custom domain connected (if provided)
- ✅ HTTPS working
- ✅ Preview deploys for PRs

---

## 9. Future Enhancements (Post-Launch)

**Phase 2 Features:**
- Video content support (YouTube embeds)
- Newsletter signup integration
- Comments system (via third-party like Giscus)
- Search improvements (Algolia or Pagefind)
- CMS integration (Decap CMS)
- Blog RSS feed
- Case studies (long-form project write-ups)

**Analytics & Optimization:**
- A/B testing different CTAs
- Heatmaps (Hotjar or similar)
- Performance monitoring dashboard
- SEO tracking (Google Search Console)

**Content Expansion:**
- More Hot Topics articles
- Video content series
- Podcast integration
- Interactive demos or tools
- Guest posts or collaborations

---

## Appendix

### Technology Justification

**Why Astro?**
- Built specifically for content-focused sites
- Minimal JavaScript shipped (faster load times)
- Excellent MDX support out of the box
- Simple mental model: components render to HTML
- Can integrate React/Vue/Svelte components if needed later
- Growing ecosystem and strong community
- Great documentation

**Why Tailwind CSS?**
- Utility-first: Rapid development
- Consistent design system via config
- PurgeCSS removes unused styles
- Responsive design easy with breakpoint prefixes
- No CSS naming conflicts
- Large community and plugins

**Why Vercel?**
- Seamless Astro integration
- Free tier generous (perfect for portfolio)
- Automatic HTTPS and CDN
- Preview deployments for every PR
- Fast global edge network
- Simple custom domain setup
- Excellent developer experience

**Why MDX over CMS?**
- Version controlled (git history)
- No database needed (simpler, cheaper)
- Write in familiar Markdown
- Can embed components when needed
- Portable (not locked to a platform)
- Developer-friendly workflow
- Can always add CMS later if needed

### References

- Astro Documentation: https://docs.astro.build
- Tailwind CSS: https://tailwindcss.com
- MDX: https://mdxjs.com
- Vercel Documentation: https://vercel.com/docs
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- LinkedIn Profile: https://www.linkedin.com/in/william-mangaroo

---

**End of Design Specification**

This design has been approved and is ready for implementation planning.

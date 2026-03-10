# Portfolio Website Rebuild Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, performant portfolio website for William Mangaroo (Product Manager) using Astro, Tailwind CSS, and MDX for content management.

**Architecture:** Static site generated with Astro 5.x, styled with Tailwind CSS, content managed via MDX files in Astro content collections. Dark/light theme support, responsive design, SEO optimized. Deploys automatically to Vercel from GitHub.

**Tech Stack:**
- Astro 5.x (static site generator)
- TypeScript (type safety)
- Tailwind CSS (styling)
- MDX (content with components)
- Vercel (deployment)

**Design Spec:** `docs/superpowers/specs/2026-03-10-portfolio-rebuild-design.md`

---

## Chunk 1: Project Foundation & Base Layout

This chunk establishes the Astro project with Tailwind CSS, creates the base layout system, implements the theme toggle functionality, and sets up the core navigation structure.

### Task 1.0: Initialize Git Repository

**Files:**
- Create: `.git/` directory
- Note: Git was already initialized in D:\Antigravity\PMStudioPro during design phase

- [ ] **Step 1: Verify git repository exists**

Run:
```bash
git status
```

Expected: Shows git status (repo already exists from design doc commit)

---

### Task 1.1: Initialize Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `tailwind.config.mjs`
- Create: `.gitignore`

- [ ] **Step 1: Create Astro project with TypeScript and Tailwind**

Run:
```bash
npm create astro@latest . -- --template minimal --typescript strict --install
```

Expected: Creates base Astro project structure with TypeScript

- [ ] **Step 2: Add Tailwind CSS integration**

Run:
```bash
npx astro add tailwind
```

Expected: Installs and configures Tailwind CSS integration

- [ ] **Step 3: Install additional dependencies**

Run:
```bash
npm install -D @types/node
```

Expected: Installs Node.js type definitions

- [ ] **Step 4: Configure Astro with site URL**

File: `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://willmangaroo.com', // Replace with actual domain or use placeholder
  integrations: [tailwind()],
});
```

- [ ] **Step 5: Update tsconfig.json for path aliases**

File: `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

- [ ] **Step 6: Configure Tailwind with custom theme**

File: `tailwind.config.mjs`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb', // blue-600
        },
        accent: {
          DEFAULT: '#8b5cf6', // violet-500
          dark: '#7c3aed', // violet-600
        },
        article: '#3b82f6', // blue-500
        audio: '#8b5cf6', // violet-500
        video: '#ef4444', // red-500
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
        prose: '70ch',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 7: Update .gitignore**

File: `.gitignore`

```
# dependencies
node_modules/

# build output
dist/
.astro/

# environment variables
.env
.env.production

# macOS
.DS_Store

# IDE
.vscode/
.idea/

# misc
*.log
```

- [ ] **Step 8: Commit project foundation**

Run:
```bash
git add .
git commit -m "feat: initialize Astro project with Tailwind CSS

- Set up Astro 5.x with TypeScript strict mode
- Configure Tailwind CSS with custom theme colors
- Add path aliases for cleaner imports
- Configure dark mode support

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Initial commit with project setup

---

### Task 1.2: Create Base Layout with Theme Toggle

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/Footer.astro`
- Create: `public/theme-toggle.js`

- [ ] **Step 1: Create theme toggle script**

File: `public/theme-toggle.js`

```javascript
// Theme toggle functionality
// Runs immediately to prevent flash of unstyled content
(function() {
  const getTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  };

  // Set theme immediately
  setTheme(getTheme());

  // Listen for toggle clicks
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const current = getTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  });
})();
```

- [ ] **Step 2: Create Header component**

File: `src/components/layout/Header.astro`

```astro
---
const currentPath = Astro.url.pathname;
---

<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
  <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Brand -->
      <a href="/" class="flex items-center space-x-3 group">
        <span class="w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform" aria-hidden="true"></span>
        <div class="flex flex-col">
          <span class="font-bold text-gray-900 dark:text-white">Will Mangaroo</span>
          <span class="text-sm text-gray-600 dark:text-gray-400">Product Manager</span>
        </div>
      </a>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center space-x-1" aria-label="Primary navigation">
        <a
          href="/hot-topics"
          class:list={[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            currentPath.startsWith('/hot-topics')
              ? 'bg-primary/10 text-primary dark:bg-primary/20'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          ]}
          aria-current={currentPath.startsWith('/hot-topics') ? 'page' : undefined}
        >
          Hot Topics
        </a>
        <a
          href="/about"
          class:list={[
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            currentPath === '/about'
              ? 'bg-primary/10 text-primary dark:bg-primary/20'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          ]}
          aria-current={currentPath === '/about' ? 'page' : undefined}
        >
          About
        </a>
        <a
          href="/contact"
          class="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Contact
        </a>

        <!-- Theme Toggle -->
        <button
          id="themeToggle"
          type="button"
          class="ml-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path class="dark:hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            <path class="hidden dark:block" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </nav>

      <!-- Note: Mobile hamburger menu will be added in future enhancement -->
    </div>
  </div>
</header>
```

**Note:** Mobile menu functionality is deferred to post-launch enhancements. On mobile, navigation links are hidden and will need a hamburger menu in a future update.

- [ ] **Step 3: Create Footer component**

File: `src/components/layout/Footer.astro`

```astro
<footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
  <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <!-- Copyright -->
      <p class="text-sm text-gray-600 dark:text-gray-400">
        © <span id="year"></span> Will Mangaroo. Built for clarity and speed.
      </p>

      <!-- Footer Links -->
      <nav class="flex items-center space-x-6" aria-label="Footer navigation">
        <a
          href="/hot-topics"
          class="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
        >
          Hot Topics
        </a>
        <a
          href="/about"
          class="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
        >
          About
        </a>
        <a
          href="/contact"
          class="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
        >
          Contact
        </a>
        <a
          href="https://www.linkedin.com/in/william-mangaroo"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
        >
          LinkedIn
        </a>
      </nav>
    </div>
  </div>

  <script>
    // Set current year
    document.getElementById('year')!.textContent = new Date().getFullYear().toString();
  </script>
</footer>
```

- [ ] **Step 4: Create BaseLayout**

File: `src/layouts/BaseLayout.astro`

```astro
---
import Header from '@components/layout/Header.astro';
import Footer from '@components/layout/Footer.astro';

interface Props {
  title: string;
  description: string;
  ogImage?: string;
}

const {
  title,
  description,
  ogImage = '/og-default.jpg',
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonicalURL} />

    <!-- SEO Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(ogImage, Astro.site)} />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(ogImage, Astro.site)} />

    <!-- Theme Toggle Script (inline to prevent FOUC) -->
    <script is:inline src="/theme-toggle.js"></script>

    <!-- Preload fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
    <!-- Skip to main content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
    >
      Skip to main content
    </a>

    <Header />

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <Footer />
  </body>
</html>
```

- [ ] **Step 5: Create placeholder favicon**

File: `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#3b82f6"/>
  <text x="50" y="67" font-family="Arial" font-size="60" font-weight="bold" fill="white" text-anchor="middle">WM</text>
</svg>
```

- [ ] **Step 6: Create test homepage**

File: `src/pages/index.astro`

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
---

<BaseLayout
  title="Will Mangaroo | Product Manager Portfolio"
  description="Product Manager portfolio featuring articles, videos, audio, and visuals focused on outcomes, clarity, and delivery."
>
  <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="text-4xl font-bold">Welcome</h1>
    <p class="mt-4 text-gray-600 dark:text-gray-400">
      Portfolio site coming soon...
    </p>
  </div>
</BaseLayout>
```

- [ ] **Step 7: Test development server**

Run:
```bash
npm run dev
```

Expected: Dev server starts at http://localhost:4321, homepage loads with header/footer, theme toggle works

- [ ] **Step 8: Commit base layout**

Run:
```bash
git add .
git commit -m "feat: add base layout with header, footer, and theme toggle

- Create BaseLayout with SEO meta tags
- Add Header with navigation and theme toggle
- Add Footer with links and dynamic year
- Implement theme toggle with localStorage persistence
- Add accessibility features (skip links, ARIA labels)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with base layout system

---

### Task 1.3: Add Global Styles and Utilities

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create global styles**

File: `src/styles/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Improved text rendering */
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Focus visible for keyboard navigation */
  :focus-visible {
    outline: 2px solid theme('colors.primary.DEFAULT');
    outline-offset: 2px;
  }

  /* Screen reader only class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .sr-only:focus-visible {
    position: static;
    width: auto;
    height: auto;
    padding: inherit;
    margin: inherit;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }
}

@layer components {
  /* Card component */
  .card {
    @apply bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow;
  }

  /* Button primary */
  .btn-primary {
    @apply px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900;
  }

  /* Button secondary/ghost */
  .btn-ghost {
    @apply px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900;
  }

  /* Badge/Tag component */
  .badge {
    @apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium;
  }

  .badge-article {
    @apply bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400;
  }

  .badge-audio {
    @apply bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400;
  }

  .badge-video {
    @apply bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400;
  }

  /* Section container */
  .section {
    @apply py-16 md:py-24;
  }

  /* Content wrapper */
  .content-wrapper {
    @apply max-w-content mx-auto px-4 sm:px-6 lg:px-8;
  }

  /* Prose styling for MDX content */
  .prose {
    @apply max-w-prose mx-auto text-gray-700 dark:text-gray-300;
  }

  .prose h2 {
    @apply text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white;
  }

  .prose h3 {
    @apply text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white;
  }

  .prose p {
    @apply my-4 leading-relaxed;
  }

  .prose ul,
  .prose ol {
    @apply my-4 ml-6 space-y-2;
  }

  .prose ul {
    @apply list-disc;
  }

  .prose ol {
    @apply list-decimal;
  }

  .prose li {
    @apply leading-relaxed;
  }

  .prose a {
    @apply text-primary hover:underline;
  }

  .prose code {
    @apply px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono;
  }

  .prose pre {
    @apply p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto my-4;
  }

  .prose pre code {
    @apply p-0 bg-transparent;
  }

  .prose blockquote {
    @apply border-l-4 border-primary pl-4 italic my-4 text-gray-600 dark:text-gray-400;
  }
}
```

- [ ] **Step 2: Import global styles in BaseLayout**

Edit the frontmatter section of `src/layouts/BaseLayout.astro` to add the global styles import:

Old (frontmatter):
```astro
---
import Header from '@components/layout/Header.astro';
import Footer from '@components/layout/Footer.astro';

interface Props {
```

New (frontmatter):
```astro
---
import Header from '@components/layout/Header.astro';
import Footer from '@components/layout/Footer.astro';
import '@/styles/global.css';

interface Props {
```

- [ ] **Step 3: Test styles**

Run:
```bash
npm run dev
```

Expected: Global styles applied, cards and buttons styled correctly

- [ ] **Step 4: Commit global styles**

Run:
```bash
git add .
git commit -m "feat: add global styles and utility classes

- Create global.css with Tailwind layers
- Add card, button, badge component classes
- Add prose styles for MDX content
- Implement focus-visible for accessibility
- Add screen-reader-only utilities

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with global styles

---

## Chunk 2: Content Collection System

This chunk sets up Astro content collections for Hot Topics, creates the MDX configuration, and migrates existing content from the backup.

### Task 2.1: Configure Content Collections

**Files:**
- Create: `src/content/config.ts`
- Create: `astro.config.mjs` (modify)

- [ ] **Step 1: Install MDX integration**

Run:
```bash
npx astro add mdx
```

Expected: Installs @astrojs/mdx integration

- [ ] **Step 2: Create content collection schema**

File: `src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

const hotTopicsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['article', 'audio', 'video']),
    date: z.coerce.date(),
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

- [ ] **Step 3: Create content directory**

Run:
```bash
mkdir -p src/content/hot-topics
```

Expected: Creates content/hot-topics directory

- [ ] **Step 4: Test content collection (empty)**

Run:
```bash
npm run build
```

Expected: Build succeeds with empty content collection

- [ ] **Step 5: Commit content collection setup**

Run:
```bash
git add .
git commit -m "feat: configure content collections for Hot Topics

- Add MDX integration
- Define Hot Topics collection schema with Zod
- Support article, audio, and video content types
- Add frontmatter validation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with content collection configuration

---

### Task 2.2: Migrate Priority Conflicts Article

**Files:**
- Create: `src/content/hot-topics/priority-conflicts.mdx`
- Source: `backup-extracted/pm-portfolio/assets/articles/priority-conflicts-product-manager.html` (converted to MDX)

- [ ] **Step 1: Create MDX version of Priority Conflicts article**

File: `src/content/hot-topics/priority-conflicts.mdx`

```mdx
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

When Sales, Marketing, Customer Success, and Engineering all have legitimate "urgent" needs, the PM's job is to turn heat into clarity without derailing delivery.

## The Root Causes

Priority conflicts don't just happen—they stem from:

- **Misaligned incentives**: Each team is measured differently, so their priorities diverge
- **Low visibility**: Teams don't see the full roadmap or understand trade-offs
- **No shared decision language**: Without a common framework, it's all opinions and politics

## Use a Shared Framework

Move from opinions to comparable trade-offs with a prioritization framework:

- **RICE** (Reach, Impact, Confidence, Effort)
- **ICE** (Impact, Confidence, Ease)
- **MoSCoW** (Must-have, Should-have, Could-have, Won't-have)

Score together with stakeholders so the rationale is shared and durable.

## Facilitate the "What Moves, What Slips" Conversation

Present clear options and impacts:

- "If we prioritize Feature A, Features B and C slip by 2 sprints"
- "Here's the data: Feature A impacts 10K users, Feature B impacts 2K users"
- "Confidence is high on A (8/10), medium on B (5/10)"

Facilitate, don't dictate. Let stakeholders see the trade-offs and participate in the decision.

## Handle Executive and Legal Mandates

When mandates come from above:

- **Acknowledge them**: "This is a must-do, understood"
- **Show the trade-off**: Use a neutral trade-off matrix
- **Fast escalation**: If you disagree, escalate quickly with data, don't slow-roll

## Build Long-Term Trust

The real work is building a system:

- **Visible intake log**: All requests tracked publicly
- **Decision notes**: Document why decisions were made
- **Proactive follow-through**: Update stakeholders before they ask

## Outcome

Faster alignment, fewer surprise fires, and decisions the org can repeat without constant escalation.

---

**Key Takeaway**: Frameworks turn opinions into trade-offs. Trade-offs turn chaos into clarity. Clarity turns stakeholders into partners.
```

- [ ] **Step 2: Verify MDX file renders**

Run:
```bash
npm run build
```

Expected: Build succeeds, content collection includes priority-conflicts

- [ ] **Step 3: Commit article**

Run:
```bash
git add .
git commit -m "content: migrate Priority Conflicts article

- Convert HTML article to MDX format
- Add frontmatter with metadata
- Mark as featured content
- Add relevant tags

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with article

---

### Task 2.3: Migrate RICE Audio Content

**Files:**
- Create: `src/content/hot-topics/rice-prioritization.mdx`
- Copy: `Assets/Quantify_Product_Priorities_Using_RICE.mp3` → `public/audio/quantify-rice.mp3`

- [ ] **Step 1: Create public/audio directory**

Run:
```bash
mkdir -p public/audio
```

Expected: Creates public/audio directory

- [ ] **Step 2: Copy audio file**

Run:
```bash
cp Assets/Quantify_Product_Priorities_Using_RICE.mp3 public/audio/quantify-rice.mp3
```

Expected: Audio file copied to public directory

- [ ] **Step 3: Create MDX for audio content**

File: `src/content/hot-topics/rice-prioritization.mdx`

```mdx
---
title: "Quantify Product Priorities Using RICE"
type: "audio"
date: 2024-12-17
featured: true
audioFile: "/audio/quantify-rice.mp3"
duration: "15:23"
tags:
  - Prioritization
  - RICE
  - Decision-Making
summary: "A short audio breakdown on using RICE to quantify impact, confidence, and effort—without turning the process into theater."
---

A practical guide to using the RICE framework for product prioritization.

## Topics Covered

- What RICE is and when it works best
- How to avoid fake precision and score inflation
- A simple facilitation flow you can run in 15 minutes
- How to document the decision so it sticks

## The RICE Formula

**RICE = (Reach × Impact × Confidence) ÷ Effort**

- **Reach**: How many users/customers affected (per quarter)?
- **Impact**: How much does it move the needle? (Scale: 0.25 = minimal, 3 = massive)
- **Confidence**: How sure are you? (Percentage: 50%, 80%, 100%)
- **Effort**: How many person-months of work?

## Key Takeaway

RICE gives teams a neutral way to compare options without turning every decision into a political battle. The goal isn't perfect numbers—it's consistent reasoning.
```

- [ ] **Step 4: Verify audio file is accessible**

Run:
```bash
npm run dev
```

Then visit: http://localhost:4321/audio/quantify-rice.mp3

Expected: Audio file downloads/plays

- [ ] **Step 5: Commit audio content**

Run:
```bash
git add .
git commit -m "content: add RICE prioritization audio

- Copy audio file to public/audio
- Create MDX with audio frontmatter
- Add show notes and key takeaways
- Mark as featured content

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with audio content

---

### Task 2.4: Migrate Why Stakeholders Ghost Content

**Files:**
- Create: `src/content/hot-topics/stakeholders-ghost.mdx`
- Copy: `Assets/Why Stakeholders Ghost.mp3` → `public/audio/stakeholders-ghost.mp3`
- Read: `Assets/Why Stakeholders Ghost.docx`

- [ ] **Step 1: Copy audio file**

Run:
```bash
cp "Assets/Why Stakeholders Ghost.mp3" public/audio/stakeholders-ghost.mp3
```

Expected: Audio file copied

- [ ] **Step 2: Convert DOCX to MDX content**

**Manual Step:** Open `Assets/Why Stakeholders Ghost.docx`, copy the content, and convert to Markdown format for the MDX file below.

File: `src/content/hot-topics/stakeholders-ghost.mdx`

```mdx
---
title: "Why Stakeholders Ghost (And How to Fix It)"
type: "audio"
date: 2024-12-21
featured: false
audioFile: "/audio/stakeholders-ghost.mp3"
duration: "12:45"
tags:
  - Stakeholder Management
  - Communication
  - Product Management
summary: "Explore why stakeholders go silent and practical strategies to re-engage them before it impacts delivery."
---

Stakeholders going silent is one of the most common—and most frustrating—problems PMs face. This audio explores why it happens and what to do about it.

## Why They Ghost

- **Inbox overload**: Your email got buried
- **Unclear ask**: They don't know what you need
- **Wrong timing**: You're asking during their busiest week
- **Lack of context**: They don't understand why it matters
- **Avoidance**: They don't want to be the blocker

## How to Fix It

1. **Make asks crystal clear**: "I need X by Y date for Z reason"
2. **Reduce friction**: One-click responses, not essays
3. **Create urgency (the right way)**: Show the cost of delay
4. **Escalate early**: Don't wait until it's a crisis
5. **Build relationship credit**: Check in when you don't need something

## The Pattern

The best PMs don't wait for ghosts. They build communication systems that surface blockers early and make it easy for stakeholders to engage.

---

**Listen to the full audio for real-world examples and tactical scripts.**
```

- [ ] **Step 3: Verify audio file is accessible**

Run:
```bash
npm run dev
```

Then visit: http://localhost:4321/audio/stakeholders-ghost.mp3

Expected: Audio file downloads/plays

- [ ] **Step 4: Verify content renders**

Run:
```bash
npm run build
```

Expected: Build succeeds, all three content pieces included

- [ ] **Step 5: Commit stakeholders ghost content**

Run:
```bash
git add .
git commit -m "content: add Why Stakeholders Ghost audio

- Copy audio file to public/audio
- Create MDX with audio content
- Add article content with practical strategies
- Add relevant tags

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with stakeholders ghost content

---

### Task 2.5: Copy Hero Image and Resume

**Files:**
- Copy: `Assets/hero2.jpg` → `src/assets/images/hero.jpg`
- Copy: `Assets/WILLIAM-MANGAROO-RESUME.docx` → needs PDF conversion

- [ ] **Step 1: Create assets directories**

Run:
```bash
mkdir -p src/assets/images public/resume
```

Expected: Creates directories for assets

- [ ] **Step 2: Copy hero image**

Run:
```bash
cp Assets/hero2.jpg src/assets/images/hero.jpg
```

Expected: Hero image copied

- [ ] **Step 3: Convert resume to PDF (manual step)**

**Manual Step:** This requires using Word, Google Docs, or an online PDF converter.

1. Open `Assets/WILLIAM-MANGAROO-RESUME.docx`
2. Export/Save As PDF
3. Save to `public/resume/william-mangaroo-resume.pdf`

Verify:
```bash
ls -l public/resume/william-mangaroo-resume.pdf
```

Expected: File exists and is a valid PDF

- [ ] **Step 4: Commit assets**

Run:
```bash
git add src/assets/images/hero.jpg
git commit -m "assets: add hero image

- Copy hero2.jpg to assets/images
- Prepare for use in homepage hero section

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with hero image

---

*End of Chunk 2*

---

## Chunk 3: Homepage Implementation

This chunk builds the homepage with Hero section, Featured Content display, and Value Propositions section.

### Task 3.1: Create Hero Component

**Files:**
- Create: `src/components/home/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Hero component**

File: `src/components/home/Hero.astro`

```astro
---
import { Image } from 'astro:assets';
import heroImage from '@assets/images/hero.jpg';
---

<section class="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
  <div class="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Hero Image -->
      <div class="order-2 lg:order-1">
        <div class="relative">
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-2xl" aria-hidden="true"></div>
          <Image
            src={heroImage}
            alt="William Mangaroo - Product Manager"
            class="relative rounded-2xl shadow-2xl w-full"
            widths={[400, 600, 800]}
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </div>

      <!-- Hero Content -->
      <div class="order-1 lg:order-2 space-y-8">
        <!-- Pill -->
        <div class="inline-flex items-center px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full">
          <span class="text-sm font-medium text-primary">
            Portfolio • Articles • Audio • Visuals
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          Explore product thinking in action
        </h1>

        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          A small, high-signal library of how I work: discovery, prioritization, trade-offs, and delivery.
          Backed by real artifacts and source links.
        </p>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-6 py-6 border-y border-gray-200 dark:border-gray-800">
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Strength</dt>
            <dd class="mt-1 text-base font-semibold text-gray-900 dark:text-white">Discovery → Delivery</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Focus</dt>
            <dd class="mt-1 text-base font-semibold text-gray-900 dark:text-white">Clarity + outcomes</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Outputs</dt>
            <dd class="mt-1 text-base font-semibold text-gray-900 dark:text-white">Stories, specs, demos</dd>
          </div>
        </div>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/hot-topics" class="btn-primary text-center">
            Explore Hot Topics
          </a>
          <a href="/about" class="btn-ghost text-center">
            View Projects
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Update homepage to use Hero component**

File: `src/pages/index.astro`

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import Hero from '@components/home/Hero.astro';
---

<BaseLayout
  title="Will Mangaroo | Product Manager Portfolio"
  description="Product Manager portfolio featuring articles, videos, audio, and visuals focused on outcomes, clarity, and delivery."
>
  <Hero />
</BaseLayout>
```

- [ ] **Step 3: Test Hero component**

Run:
```bash
npm run dev
```

Visit: http://localhost:4321

Expected: Homepage displays with hero section, image loads, CTAs functional

- [ ] **Step 4: Commit Hero component**

Run:
```bash
git add .
git commit -m "feat: add homepage Hero component

- Create Hero section with image, title, stats
- Add CTAs for Hot Topics and About pages
- Implement responsive grid layout
- Use Astro Image component for optimization

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with Hero component

---

### Task 3.2: Create Featured Content Component

**Files:**
- Create: `src/components/home/FeaturedContent.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create FeaturedContent component**

File: `src/components/home/FeaturedContent.astro`

```astro
---
import { getCollection } from 'astro:content';

// Get all featured Hot Topics content
const allHotTopics = await getCollection('hot-topics');
const featuredItems = allHotTopics
  .filter((item) => item.data.featured)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 3); // Show top 3 featured items

// Helper to get badge color
const getBadgeClass = (type: string) => {
  const classes = {
    article: 'badge-article',
    audio: 'badge-audio',
    video: 'badge-video',
  };
  return classes[type as keyof typeof classes] || 'badge-article';
};
---

<section class="section bg-white dark:bg-gray-950">
  <div class="content-wrapper">
    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Featured Hot Topics
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Explore PM insights, frameworks, and real-world scenarios
      </p>
    </div>

    <!-- Featured Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredItems.map((item) => (
        <article class="card p-6 hover:-translate-y-1 transition-all">
          <!-- Type Badge -->
          <span class:list={['badge', getBadgeClass(item.data.type)]} aria-label={`Type: ${item.data.type}`}>
            {item.data.type === 'article' && '📄'}
            {item.data.type === 'audio' && '🎧'}
            {item.data.type === 'video' && '📹'}
            <span class="ml-1 capitalize">{item.data.type}</span>
          </span>

          <!-- Title -->
          <h3 class="mt-4 text-xl font-bold text-gray-900 dark:text-white">
            <a href={`/hot-topics/${item.slug}`} class="hover:text-primary transition-colors">
              {item.data.title}
            </a>
          </h3>

          <!-- Summary -->
          <p class="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">
            {item.data.summary}
          </p>

          <!-- Tags -->
          <div class="mt-4 flex flex-wrap gap-2">
            {item.data.tags.slice(0, 3).map((tag) => (
              <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                {tag}
              </span>
            ))}
          </div>

          <!-- Read/Listen CTA -->
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <a
              href={`/hot-topics/${item.slug}`}
              class="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              {item.data.type === 'article' && 'Read article'}
              {item.data.type === 'audio' && `Listen · ${item.data.duration || ''}`}
              {item.data.type === 'video' && `Watch · ${item.data.duration || ''}`}
              <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </article>
      ))}
    </div>

    <!-- View All CTA -->
    <div class="mt-12 text-center">
      <a href="/hot-topics" class="btn-ghost">
        View All Hot Topics
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Tailwind line-clamp utility**

File: `tailwind.config.mjs`

Update the plugins array:

```javascript
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
```

Then install the plugin:

```bash
npm install -D @tailwindcss/line-clamp
```

Expected: Line clamp utility installed

- [ ] **Step 3: Add FeaturedContent to homepage**

File: `src/pages/index.astro`

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import Hero from '@components/home/Hero.astro';
import FeaturedContent from '@components/home/FeaturedContent.astro';
---

<BaseLayout
  title="Will Mangaroo | Product Manager Portfolio"
  description="Product Manager portfolio featuring articles, videos, audio, and visuals focused on outcomes, clarity, and delivery."
>
  <Hero />
  <FeaturedContent />
</BaseLayout>
```

- [ ] **Step 4: Test featured content**

Run:
```bash
npm run dev
```

Visit: http://localhost:4321

Expected: Featured content section displays 3 featured items from content collection

- [ ] **Step 5: Commit featured content**

Run:
```bash
git add .
git commit -m "feat: add featured content section to homepage

- Create FeaturedContent component
- Display 3 most recent featured items
- Add type badges and tags
- Install Tailwind line-clamp plugin
- Link to individual content pages

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with featured content

---

### Task 3.3: Create Value Propositions Component

**Files:**
- Create: `src/components/home/ValueProps.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create ValueProps component**

File: `src/components/home/ValueProps.astro`

```astro
<section class="section bg-gray-50 dark:bg-gray-900">
  <div class="content-wrapper">
    <!-- Section Header -->
    <div class="text-center max-w-3xl mx-auto mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        What you'll see here
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        A quick tour of the skills behind the work. How I frame problems, align stakeholders,
        make decisions under constraints, and follow through to measurable outcomes.
      </p>
    </div>

    <!-- Value Props Grid -->
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Product Thinking -->
      <div class="card p-8 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-xl mb-6">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Product Thinking
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Clear tradeoffs, crisp narratives, and artifacts that show how decisions were made.
        </p>
      </div>

      <!-- Execution -->
      <div class="card p-8 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-accent/10 dark:bg-accent/20 rounded-xl mb-6">
          <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Execution
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          From discovery to delivery, with practical workflows that teams can actually follow.
        </p>
      </div>

      <!-- Results -->
      <div class="card p-8 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 dark:bg-green-500/20 rounded-xl mb-6">
          <svg class="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Results
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Items are tagged with outcomes and metrics so impact is obvious at a glance.
        </p>
      </div>
    </div>

    <!-- CTA Card -->
    <div class="mt-16">
      <div class="card p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 border-primary/20">
        <div class="max-w-3xl mx-auto text-center">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Want the fastest proof of fit?
          </h3>
          <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Start with featured work and filter by type or tag.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/hot-topics" class="btn-primary">
              Go to Hot Topics
            </a>
            <a href="/contact" class="btn-ghost">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add ValueProps to homepage**

File: `src/pages/index.astro`

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import Hero from '@components/home/Hero.astro';
import FeaturedContent from '@components/home/FeaturedContent.astro';
import ValueProps from '@components/home/ValueProps.astro';
---

<BaseLayout
  title="Will Mangaroo | Product Manager Portfolio"
  description="Product Manager portfolio featuring articles, videos, audio, and visuals focused on outcomes, clarity, and delivery."
>
  <Hero />
  <FeaturedContent />
  <ValueProps />
</BaseLayout>
```

- [ ] **Step 3: Test complete homepage**

Run:
```bash
npm run dev
```

Visit: http://localhost:4321

Expected: Complete homepage with Hero, Featured Content, and Value Props sections

- [ ] **Step 4: Test responsive design**

Run dev server and test at different screen sizes:
- Mobile (375px)
- Tablet (768px)
- Desktop (1280px)

Expected: Layout adapts properly, cards stack on mobile, grid on desktop

- [ ] **Step 5: Commit value props and complete homepage**

Run:
```bash
git add .
git commit -m "feat: complete homepage with value propositions

- Add ValueProps component with 3 value pillars
- Include CTA card for conversions
- Complete homepage layout
- Test responsive design across breakpoints

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

Expected: Commit with complete homepage

---

*End of Chunk 3*

---

## Chunk 4: Hot Topics Pages & Audio Player

This chunk implements the Hot Topics listing page with filtering/search, individual content pages, and audio player component.

### Task 4.1: Create Hot Topics Listing Page

**Files:**
- Create: `src/pages/hot-topics/index.astro`
- Create: `src/components/hot-topics/ContentCard.astro`

- [ ] **Step 1: Create ContentCard component**

File: `src/components/hot-topics/ContentCard.astro`

```astro
---
interface Props {
  slug: string;
  title: string;
  type: 'article' | 'audio' | 'video';
  date: Date;
  summary: string;
  tags: string[];
  duration?: string;
  readTime?: string;
}

const { slug, title, type, date, summary, tags, duration, readTime } = Astro.props;

const badgeClass = {
  article: 'badge-article',
  audio: 'badge-audio',
  video: 'badge-video',
}[type];

const typeIcon = {
  article: '📄',
  audio: '🎧',
  video: '📹',
}[type];

const ctaText = {
  article: `Read article${readTime ? ` · ${readTime}` : ''}`,
  audio: `Listen${duration ? ` · ${duration}` : ''}`,
  video: `Watch${duration ? ` · ${duration}` : ''}`,
}[type];
---

<article class="card p-6 hover:-translate-y-1 transition-all">
  <span class:list={['badge', badgeClass]}>
    {typeIcon} <span class="ml-1 capitalize">{type}</span>
  </span>

  <h3 class="mt-4 text-xl font-bold">
    <a href={`/hot-topics/${slug}`} class="hover:text-primary transition-colors">
      {title}
    </a>
  </h3>

  <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
    {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
  </p>

  <p class="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">{summary}</p>

  <div class="mt-4 flex flex-wrap gap-2">
    {tags.slice(0, 3).map((tag) => (
      <span class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded">{tag}</span>
    ))}
  </div>

  <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
    <a href={`/hot-topics/${slug}`} class="inline-flex items-center text-sm font-medium text-primary hover:underline">
      {ctaText}
      <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>
</article>
```

- [ ] **Step 2: Create Hot Topics listing page (basic version without filters)**

File: `src/pages/hot-topics/index.astro`

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import ContentCard from '@components/hot-topics/ContentCard.astro';
import { getCollection } from 'astro:content';

const allContent = await getCollection('hot-topics');
const sortedContent = allContent.sort((a, b) =>
  b.data.date.getTime() - a.data.date.getTime()
);
---

<BaseLayout
  title="Hot Topics | Will Mangaroo"
  description="PM insights, frameworks, and real-world scenarios. Articles, audio, and video content on product management."
>
  <div class="content-wrapper py-12">
    <header class="mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Hot Topics</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        PM insights, frameworks, and real-world scenarios
      </p>
    </header>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedContent.map((item) => (
        <ContentCard
          slug={item.slug}
          title={item.data.title}
          type={item.data.type}
          date={item.data.date}
          summary={item.data.summary}
          tags={item.data.tags}
          duration={item.data.duration}
          readTime={item.data.readTime}
        />
      ))}
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 3: Test listing page**

Run: `npm run dev`
Visit: http://localhost:4321/hot-topics

Expected: All 3 Hot Topics items display in cards, sorted by date

- [ ] **Step 4: Commit listing page**

```bash
git add .
git commit -m "feat: add Hot Topics listing page

- Create ContentCard component
- Build listing page with all content
- Sort by date (newest first)
- Display type badges, tags, and CTAs

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 4.2: Create Individual Content Pages

**Files:**
- Create: `src/pages/hot-topics/[slug].astro`
- Create: `src/layouts/ContentLayout.astro`
- Create: `src/components/hot-topics/AudioPlayer.astro`

- [ ] **Step 1: Create AudioPlayer component**

File: `src/components/hot-topics/AudioPlayer.astro`

```astro
---
interface Props {
  audioFile: string;
  title: string;
}

const { audioFile, title } = Astro.props;
---

<div class="my-8 p-6 card">
  <div class="flex items-center space-x-4">
    <div class="text-4xl" aria-hidden="true">🎧</div>
    <div class="flex-1">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</p>
      <audio controls class="w-full" preload="metadata">
        <source src={audioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Create ContentLayout**

File: `src/layouts/ContentLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  description: string;
  type: 'article' | 'audio' | 'video';
  date: Date;
  tags: string[];
  readTime?: string;
}

const { title, description, type, date, tags, readTime } = Astro.props;

const badgeClass = {
  article: 'badge-article',
  audio: 'badge-audio',
  video: 'badge-video',
}[type];
---

<BaseLayout title={`${title} | Will Mangaroo`} description={description}>
  <article class="content-wrapper py-12">
    <nav class="mb-8">
      <a href="/hot-topics" class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Hot Topics
      </a>
    </nav>

    <header class="max-w-prose mx-auto mb-8">
      <span class:list={['badge mb-4', badgeClass]}>
        {type === 'article' && '📄'}
        {type === 'audio' && '🎧'}
        {type === 'video' && '📹'}
        <span class="ml-1 capitalize">{type}</span>
      </span>

      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>

      <div class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
        <time>{date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        {readTime && <span>· {readTime}</span>}
      </div>

      <div class="mt-4 flex flex-wrap gap-2">
        {tags.map(tag => (
          <span class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full">{tag}</span>
        ))}
      </div>
    </header>

    <div class="prose max-w-prose mx-auto">
      <slot />
    </div>
  </article>
</BaseLayout>
```

- [ ] **Step 3: Create dynamic slug page**

File: `src/pages/hot-topics/[slug].astro`

```astro
---
import { getCollection, type CollectionEntry } from 'astro:content';
import ContentLayout from '@layouts/ContentLayout.astro';
import AudioPlayer from '@components/hot-topics/AudioPlayer.astro';

export async function getStaticPaths() {
  const hotTopics = await getCollection('hot-topics');
  return hotTopics.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

interface Props {
  entry: CollectionEntry<'hot-topics'>;
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<ContentLayout
  title={entry.data.title}
  description={entry.data.summary}
  type={entry.data.type}
  date={entry.data.date}
  tags={entry.data.tags}
  readTime={entry.data.readTime}
>
  {entry.data.type === 'audio' && entry.data.audioFile && (
    <AudioPlayer audioFile={entry.data.audioFile} title={entry.data.title} />
  )}

  <Content />
</ContentLayout>
```

- [ ] **Step 4: Test individual pages**

Run: `npm run dev`

Test all 3 content pages:
- http://localhost:4321/hot-topics/priority-conflicts
- http://localhost:4321/hot-topics/rice-prioritization
- http://localhost:4321/hot-topics/stakeholders-ghost

Expected: All pages render, audio player works on audio content

- [ ] **Step 5: Commit content pages**

```bash
git add .
git commit -m "feat: add individual content pages with audio player

- Create ContentLayout for content pages
- Build dynamic [slug] route
- Add AudioPlayer component
- Render MDX content
- Add breadcrumb navigation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

*End of Chunk 4*

---

## Chunk 5: About & Contact Pages

This chunk implements the About page with projects and skills, plus the Contact page.

### Task 5.1: Create About Page Data

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/skills.ts`

- [ ] **Step 1: Create projects data**

File: `src/data/projects.ts`

```typescript
export interface Project {
  title: string;
  company: string;
  role: string;
  timeline: string;
  description: string;
  outcomes: string[];
  skills: string[];
  technologies?: string[];
}

export const projects: Project[] = [
  {
    title: "Enterprise SaaS Platform Redesign",
    company: "Example Corp",
    role: "Senior Product Manager",
    timeline: "2023-2024",
    description: "Led discovery and delivery for a complete platform UX overhaul, working with cross-functional teams to reimagine the user experience.",
    outcomes: [
      "Increased user engagement by 45%",
      "Reduced onboarding time from 2 weeks to 3 days",
      "Generated $2M in new revenue"
    ],
    skills: ["User Research", "Roadmapping", "Stakeholder Alignment", "Agile"],
    technologies: ["React", "GraphQL", "Figma"]
  },
  // Additional projects can be added here
];
```

- [ ] **Step 2: Create skills data**

File: `src/data/skills.ts`

```typescript
export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Product Strategy",
    skills: [
      "Product Vision & Roadmapping",
      "Market Research & Analysis",
      "Competitive Analysis",
      "Feature Prioritization (RICE, MoSCoW)"
    ]
  },
  {
    category: "Stakeholder Management",
    skills: [
      "Cross-functional Leadership",
      "Executive Communication",
      "Conflict Resolution",
      "Expectation Management"
    ]
  },
  {
    category: "Execution",
    skills: [
      "Agile/Scrum",
      "User Story Writing",
      "Sprint Planning",
      "Release Management"
    ]
  },
  {
    category: "Technical",
    skills: [
      "API Design",
      "SQL",
      "Data Analysis",
      "A/B Testing"
    ]
  },
  {
    category: "Tools",
    skills: [
      "Jira", "Figma", "Amplitude", "Mixpanel", "Miro"
    ]
  }
];
```

- [ ] **Step 3: Test TypeScript compilation**

Run: `npm run build`

Expected: Build succeeds, TypeScript files compile correctly

- [ ] **Step 4: Commit data structures**

```bash
git add .
git commit -m "feat: add data structures for projects and skills

- Create Project type and sample data
- Create SkillCategory type and categories
- Prepare for About page implementation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5.2: Create About Page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create About page**

File: `src/pages/about.astro`

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';
---

<BaseLayout
  title="About Will Mangaroo | Product Manager"
  description="Learn about Will Mangaroo's approach to product management, projects, and skills."
>
  <div class="content-wrapper py-12">
    <!-- Introduction -->
    <section class="max-w-3xl mx-auto mb-16">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        About Me
      </h1>
      <div class="prose prose-lg max-w-none">
        <p class="text-lg text-gray-700 dark:text-gray-300">
          I'm a Product Manager focused on clarity, outcomes, and delivery.
          My approach combines rigorous discovery with pragmatic execution,
          helping teams ship products that actually move the needle.
        </p>
        <p class="text-lg text-gray-700 dark:text-gray-300">
          Whether it's aligning stakeholders, prioritizing competing demands,
          or making tough trade-offs under constraints, I focus on creating
          clarity and driving measurable results.
        </p>
      </div>
    </section>

    <!-- Projects -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Projects I've Worked On
      </h2>
      <div class="space-y-8">
        {projects.map((project) => (
          <article class="card p-8">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p class="text-gray-600 dark:text-gray-400">
                  {project.role} at {project.company}
                </p>
              </div>
              <span class="mt-2 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
                {project.timeline}
              </span>
            </div>

            <p class="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

            <div class="mb-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Key Outcomes:</h4>
              <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                {project.outcomes.map(outcome => <li>{outcome}</li>)}
              </ul>
            </div>

            <div class="flex flex-wrap gap-2">
              {project.skills.map(skill => (
                <span class="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                  {skill}
                </span>
              ))}
              {project.technologies?.map(tech => (
                <span class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>

    <!-- Skills -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Skills & Expertise
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category) => (
          <div class="card p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {category.category}
            </h3>
            <div class="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <span class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>

    <!-- Resume Download -->
    <section class="mb-16">
      <div class="card p-8 text-center bg-gradient-to-br from-primary/5 to-accent/5">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Want the full picture?
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Download my complete resume with detailed work history and accomplishments.
        </p>
        <a
          href="/resume/william-mangaroo-resume.pdf"
          download
          class="btn-primary inline-block"
        >
          Download Resume (PDF)
        </a>
      </div>
    </section>

    <!-- Testimonials -->
    <section>
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        What Others Say
      </h2>
      <div class="grid md:grid-cols-2 gap-8">
        <blockquote class="card p-6">
          <p class="text-gray-700 dark:text-gray-300 italic mb-4">
            "Placeholder for LinkedIn recommendation #1. Visit https://www.linkedin.com/in/william-mangaroo to copy actual recommendations."
          </p>
          <footer class="text-sm">
            <strong class="text-gray-900 dark:text-white">Name</strong>
            <span class="text-gray-600 dark:text-gray-400"> · Title at Company</span>
          </footer>
        </blockquote>
        <blockquote class="card p-6">
          <p class="text-gray-700 dark:text-gray-300 italic mb-4">
            "Placeholder for LinkedIn recommendation #2. Visit https://www.linkedin.com/in/william-mangaroo to copy actual recommendations."
          </p>
          <footer class="text-sm">
            <strong class="text-gray-900 dark:text-white">Name</strong>
            <span class="text-gray-600 dark:text-gray-400"> · Title at Company</span>
          </footer>
        </blockquote>
      </div>
      <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Note: Replace placeholder testimonials with actual recommendations from <a href="https://www.linkedin.com/in/william-mangaroo" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn profile</a>
      </p>
    </section>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Test About page**

Run: `npm run dev`
Visit: http://localhost:4321/about

Expected: About page displays with projects, skills, resume download, testimonials placeholder

- [ ] **Step 3: Commit About page**

```bash
git add .
git commit -m "feat: add About page with projects and skills

- Create About page layout
- Display projects with outcomes
- Show skills by category
- Add resume download CTA
- Include testimonials section (placeholder)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 5.3: Create Contact Page

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create Contact page**

File: `src/pages/contact.astro`

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
---

<BaseLayout
  title="Contact Will Mangaroo"
  description="Get in touch to discuss product management opportunities, consulting, or collaborations."
>
  <div class="content-wrapper py-12">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Get in Touch
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-12">
        Interested in working together? Let's connect.
      </p>

      <div class="card p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Contact Information
        </h2>

        <div class="space-y-6">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/william-mangaroo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-primary hover:underline"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
          </div>

          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Preferred contact: LinkedIn message
            </p>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Looking for quick proof of fit? Check out my
            <a href="/hot-topics" class="text-primary hover:underline">Hot Topics</a>
            or view
            <a href="/about" class="text-primary hover:underline">my projects</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Test Contact page**

Run: `npm run dev`
Visit: http://localhost:4321/contact

Expected: Contact page displays with LinkedIn link

- [ ] **Step 3: Commit Contact page**

```bash
git add .
git commit -m "feat: add Contact page

- Create simple contact page
- Add LinkedIn and email information
- Include links to Hot Topics and About

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

*End of Chunk 5*

---

## Chunk 6: Deployment & Final Polish

This chunk handles deployment to Vercel, adds SEO enhancements, and performs final testing.

### Task 6.1: Add SEO Enhancements

**Files:**
- Modify: `astro.config.mjs`
- Create: `public/robots.txt`

- [ ] **Step 1: Install sitemap integration**

```bash
npx astro add sitemap
```

Expected: Sitemap integration installed, astro.config.mjs updated

- [ ] **Step 2: Create robots.txt**

File: `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://willmangaroo.com/sitemap-index.xml
```

Note: Update domain after deployment

- [ ] **Step 3: Test build with sitemap**

```bash
npm run build
npm run preview
```

Visit: http://localhost:4321/sitemap-index.xml

Expected: Sitemap XML file generated and accessible

- [ ] **Step 4: Commit SEO enhancements**

```bash
git add .
git commit -m "feat: add SEO enhancements

- Install sitemap integration
- Create robots.txt
- Test sitemap generation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

### Task 6.2: Deploy to Vercel

**Files:**
- None (deployment configuration)

- [ ] **Step 1: Create GitHub repository**

```bash
gh repo create willmangaroo-portfolio --public --source=. --remote=origin
git push -u origin main
```

Expected: Repository created and code pushed

- [ ] **Step 2: Connect to Vercel (manual steps)**

1. Visit https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import the repository
5. Vercel auto-detects Astro
6. Click "Deploy"

Expected: Project deploys successfully

- [ ] **Step 3: Verify deployment**

Visit deployed URL and test:
- Homepage loads
- Hot Topics works
- Individual content pages work
- Audio player functions
- About page displays
- Contact page displays
- Theme toggle works

Expected: All features functional

- [ ] **Step 4: Update site URL**

File: `astro.config.mjs`

Update with actual Vercel URL:

```javascript
export default defineConfig({
  site: 'https://willmangaroo-portfolio.vercel.app', // Update with actual URL
  integrations: [tailwind(), mdx(), sitemap()],
});
```

Commit and push:

```bash
git add .
git commit -m "chore: update site URL for production

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

Expected: Auto-deploys updated config

---

### Task 6.3: Final Testing

**Files:**
- Create: `README.md`

- [ ] **Step 1: Run Lighthouse audit**

In Chrome DevTools:
1. Open Lighthouse tab
2. Run audit (Desktop & Mobile)
3. Check all categories

Target: 90+ scores

- [ ] **Step 2: Manual testing checklist**

Test all features:
- [ ] Homepage hero loads
- [ ] Featured content displays
- [ ] Hot Topics filtering works
- [ ] Audio player plays
- [ ] Dark mode toggle works
- [ ] Responsive on mobile
- [ ] Resume PDF downloads
- [ ] All links work

- [ ] **Step 3: Create README**

File: `README.md`

```markdown
# Will Mangaroo - Product Manager Portfolio

Modern portfolio website built with Astro, Tailwind CSS, and MDX.

## Features

- 📝 Hot Topics: Articles and audio about product management
- 🎧 Custom audio player
- 🌓 Dark mode support
- 📱 Fully responsive
- ⚡ Optimized for performance

## Tech Stack

- Astro 5.x
- Tailwind CSS
- MDX
- TypeScript
- Vercel

## Local Development

```bash
npm install
npm run dev
```

Visit http://localhost:4321

## Adding Content

Create new MDX file in `src/content/hot-topics/`:

```yaml
---
title: "Article Title"
type: "article"
date: 2026-03-10
tags: ["Tag"]
summary: "Summary..."
---
```

## Deployment

Automatic via Vercel on push to main.

## License

© 2026 William Mangaroo
```

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "docs: add README and complete final testing

✅ All features tested and working
✅ Lighthouse scores verified
✅ Production deployment successful

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
git push
```

---

*End of Chunk 6*

---

## Plan Complete

This implementation plan covers the complete portfolio rebuild. Each task is actionable with verification steps and incremental commits.

**Next Step:** Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement.

**Success Criteria:**
- ✅ All pages functional
- ✅ Content displays correctly
- ✅ Audio player works
- ✅ Dark mode works
- ✅ Responsive design
- ✅ Lighthouse 90+ scores
- ✅ Deployed to Vercel

Good luck! 🚀

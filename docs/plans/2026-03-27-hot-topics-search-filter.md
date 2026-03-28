# Hot Topics Search & Filter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add instant client-side search and type filter buttons (All | Article | Audio | Video) to the Hot Topics page, with clickable tags that populate the search input.

**Architecture:** All card metadata is embedded as `data-*` attributes at Astro build time. A single vanilla JS `<script>` block in `index.astro` handles search, type filtering, and tag clicks by toggling a `hidden` class on card wrappers. No new dependencies.

**Tech Stack:** Astro, Tailwind CSS, vanilla JS (no framework)

---

### Task 1: Add data-* attributes to card wrappers in index.astro

**Files:**
- Modify: `src/pages/hot-topics/index.astro`

**Step 1: Replace the card wrapper div in the grid**

Current code in `src/pages/hot-topics/index.astro` (lines 33-37):
```astro
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {sortedContent.map((item, i) => (
    <div class={`animate-fade-up stagger-${Math.min(i + 1, 6)}`}>
      <ContentCard
        slug={item.id}
```

Replace with:
```astro
<div id="content-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {sortedContent.map((item, i) => (
    <div
      class={`animate-fade-up stagger-${Math.min(i + 1, 6)}`}
      data-card
      data-type={item.data.type}
      data-title={item.data.title.toLowerCase()}
      data-summary={item.data.summary.toLowerCase()}
      data-tags={item.data.tags.map((t: string) => t.toLowerCase()).join(',')}
    >
      <ContentCard
        slug={item.id}
```

**Step 2: Verify the build compiles**

Run: `npm run build`
Expected: Build completes with no errors.

**Step 3: Commit**

```bash
git add src/pages/hot-topics/index.astro
git commit -m "feat: add data-* attributes to hot-topics card wrappers"
```

---

### Task 2: Add search bar and filter buttons UI

**Files:**
- Modify: `src/pages/hot-topics/index.astro`

**Step 1: Add the search + filter UI block between the page header and the grid**

Insert this block after the closing `</header>` tag and before the grid `<div>`:

```astro
<!-- Search & Filter -->
<div class="mb-10 space-y-4">
  <!-- Search input -->
  <div class="relative">
    <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0" />
    </svg>
    <input
      id="search-input"
      type="text"
      placeholder="Search articles, audio, and more…"
      class="w-full pl-11 pr-4 py-3 bg-[#16161a] border border-white/10 rounded-lg text-ink placeholder:text-ink-faint text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
    />
  </div>

  <!-- Type filter buttons -->
  <div id="filter-buttons" class="flex flex-wrap gap-2">
    {(['all', 'article', 'audio', 'video'] as const).map((type) => (
      <button
        data-filter={type}
        class:list={[
          'badge transition-all duration-200 cursor-pointer border',
          type === 'all'
            ? 'badge-active bg-accent text-white border-accent'
            : 'text-ink-muted bg-transparent border-white/10 hover:border-white/20'
        ]}
      >
        {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    ))}
  </div>
</div>

<!-- Empty state -->
<p id="empty-state" class="hidden text-center text-ink-muted py-16">
  No results found. Try a different search or filter.
</p>
```

**Step 2: Add `.badge-active` and accent CSS custom property to global.css**

Check `src/styles/global.css` — the accent color is `#7f5af0`. Add this to the `@layer components` block:

```css
.badge-active {
  background: #7f5af0;
  color: #fff;
  border-color: #7f5af0;
}
```

**Step 3: Verify the build compiles**

Run: `npm run build`
Expected: Build completes with no errors. The search bar and filter buttons appear above the grid.

**Step 4: Commit**

```bash
git add src/pages/hot-topics/index.astro src/styles/global.css
git commit -m "feat: add search bar and filter button UI to hot-topics"
```

---

### Task 3: Add vanilla JS filtering logic

**Files:**
- Modify: `src/pages/hot-topics/index.astro`

**Step 1: Add the script block at the bottom of index.astro (before the closing layout tag)**

```astro
<script>
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('[data-card]');
  const emptyState = document.getElementById('empty-state');

  let activeType = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const type = card.dataset.type ?? '';
      const title = card.dataset.title ?? '';
      const summary = card.dataset.summary ?? '';
      const tags = card.dataset.tags ?? '';

      const matchesType = activeType === 'all' || type === activeType;
      const matchesSearch =
        searchQuery === '' ||
        title.includes(searchQuery) ||
        summary.includes(searchQuery) ||
        tags.includes(searchQuery);

      if (matchesType && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (emptyState) {
      emptyState.classList.toggle('hidden', visibleCount > 0);
    }
  }

  // Search input
  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value.toLowerCase().trim();
    applyFilters();
  });

  // Type filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeType = btn.dataset.filter ?? 'all';

      filterButtons.forEach((b) => {
        b.classList.remove('badge-active', 'bg-accent', 'text-white', 'border-accent');
        b.classList.add('text-ink-muted', 'bg-transparent', 'border-white/10');
      });

      btn.classList.add('badge-active', 'bg-accent', 'text-white', 'border-accent');
      btn.classList.remove('text-ink-muted', 'bg-transparent', 'border-white/10');

      applyFilters();
    });
  });

  // Tag clicks — delegated from the grid
  document.getElementById('content-grid')?.addEventListener('click', (e) => {
    const tag = (e.target as HTMLElement).closest('.tag');
    if (!tag) return;
    const tagText = tag.textContent?.toLowerCase().trim() ?? '';
    if (searchInput) {
      searchInput.value = tagText;
      searchQuery = tagText;
      applyFilters();
      searchInput.focus();
    }
  });
</script>
```

**Step 2: Verify the build compiles**

Run: `npm run build`
Expected: Build completes with no errors.

**Step 3: Smoke test in dev server**

Run: `npm run dev`

Manually verify:
- Typing in the search bar filters cards in real time
- Clicking "Audio" shows only audio cards; "All" restores all cards
- Clicking a tag on any card populates the search input and filters
- When nothing matches, the empty state message appears

**Step 4: Commit**

```bash
git add src/pages/hot-topics/index.astro
git commit -m "feat: add client-side search and filter logic to hot-topics"
```

---

### Task 4: Deploy to production

**Step 1: Push to GitHub**

```bash
git push origin main
```

**Step 2: Run deploy script on the DigitalOcean droplet**

Via the DigitalOcean web console (cloud.digitalocean.com → Droplets → hiremail-server → Console):

```bash
bash /opt/sites/pmstudiopro/deploy.sh
```

Expected: Build completes, "Deploy finished" message shown, site live at `pmstudiopro.com/hot-topics`.

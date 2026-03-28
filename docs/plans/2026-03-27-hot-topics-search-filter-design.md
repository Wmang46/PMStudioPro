# Hot Topics Search & Filter — Design

**Date:** 2026-03-27
**Status:** Approved

## Problem

The Hot Topics page displays all content in a flat grid with no way to find specific items. As content grows (articles, audio, future video), users need a way to search and filter without leaving the page.

## Approach

Vanilla JS in `hot-topics/index.astro`. No new dependencies. Card data embedded as `data-*` attributes at build time; a single `<script>` block handles all interactivity client-side.

## UI Layout

Above the card grid:

1. **Search bar** — full-width text input, placeholder "Search articles, audio, and more…"
2. **Filter buttons** — `All | Article | Audio | Video`, styled with existing badge classes. Active button highlighted with accent color.
3. **Empty state** — "No results found" message shown when no cards match.

## Behavior

- Search filters by title, summary, and tags (case-insensitive)
- Type filter buttons and search work together (AND logic)
- Clicking a tag on any card populates the search input with that tag and filters live
- No URL state persistence — refresh resets to default
- Filtering is instant (no debounce needed at current content volume)

## Implementation

### Files to modify
- `src/pages/hot-topics/index.astro` — add search/filter UI, data-* attributes on card wrappers, and `<script>` block

### Files unchanged
- `src/components/hot-topics/ContentCard.astro` — no changes needed; wrapper handles data attributes

### Data attributes on each card wrapper
```html
<div
  data-card
  data-type="article"
  data-title="Priority Conflicts..."
  data-summary="A practical playbook..."
  data-tags="prioritization,stakeholder management,rice"
>
  <ContentCard ... />
</div>
```

### Script logic
1. Collect all `[data-card]` elements
2. On search input → filter by title + summary + tags
3. On type button click → filter by type; update active button style
4. On tag click (delegated from grid) → set search input value to tag text, trigger filter
5. Show/hide cards by toggling `hidden` class
6. Show/hide empty state based on visible card count

## Styling

Uses existing design tokens:
- Active filter button: `bg-accent text-white`
- Inactive: `badge` class (existing)
- Search input: matches existing form styling (dark surface, border, accent focus ring)
- Empty state: centered, `text-ink-muted`

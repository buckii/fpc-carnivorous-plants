# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Build to dist/
npm run preview  # Preview production build
```

There are no tests or linters configured.

## Architecture

This is a **React + Vite** single-page educational game for Franklin Park Conservatory. It is a content-driven framework — all game text, images, colors, and navigation live in **`src/data/game.json`**. The React components are generic and game-agnostic.

### How screens work

`App.jsx` holds all state (`currentScreen`, `visitedSubjects`, `allDiscovered`) and a `navigate(screenId)` function passed as a prop to every component. There is no React Router — screen switching is pure `useState`.

Screen routing logic in `App.jsx`:
1. If `currentScreen` matches a subject ID (from `navigation.subjectScreenIds`), render `<SubjectDetailScreen>`.
2. Otherwise, look up the screen in `screenComponentMap` and render the matching component.

### game.json is the single source of truth

- `meta` — title, header/footer text
- `theme.colors` — semantic color names (`primary`, `accent`, `highlight`, etc.). These are **not** automatically applied as CSS variables; `styles.css` has its own hardcoded variables. Update both when changing brand colors.
- `navigation.subjectScreenIds` — controls which screen IDs are treated as subjects (triggering visit tracking)
- `screens` — keyed by screen ID; each has a `type` field that maps to a component in `screenComponentMap`
- `subjects[]` — each subject drives both the scene button (`sceneImage`) and its full detail screen (`sections[]`)
- `mascot` — easter egg character config for the scene screen

### Subject sections

Each `subject.sections[]` entry has a `type` that `SectionCard.jsx` renders:
- `text` — heading + body (HTML string)
- `text-with-image` — heading + body + image
- `facts-list` — heading + items array (HTML strings)

Sections with `"hidden": true` are hidden until "Learn More" is clicked. They animate in with CSS `transition-delay` staggered by `delayIndex * 200ms`.

### CSS

`src/styles.css` is the original stylesheet kept intact. It uses CSS custom properties (`--brown-dark`, `--orange`, etc.) and contains:
- CSS-drawn plant visuals for the bog scene (`.bladderwort-*`, `.pitcher-*`, etc.) — these are currently unused since the bog now uses photo images, but the rules remain
- `plant-hero--{id}` classes with hardcoded background-image URLs and gradients for each subject's hero banner
- `.hidden-fact` / `.revealed` transition pattern used by `SectionCard`

### Images

All images are in `public/images/`. Vite copies `public/` to `dist/` unchanged. Paths in `game.json` and CSS are relative (e.g., `images/slide-01-...jpg`) — no leading slash needed.

### Creating a new game

Replace `game.json` with new content and update `styles.css` brand variables and `plant-hero--*` background rules. See `ARCHITECTURE.md` for the full guide.

# FPC Educational Game — Architecture Guide

This project is a **React + Vite** educational game framework built for Franklin Park Conservatory. All game content lives in a single JSON file, making it easy to create new games by swapping the data and brand styles.

---

## Project Structure

```
/
├── index.html                   Generic shell — no game-specific content
├── vite.config.js
├── package.json
├── netlify.toml                 Deploys dist/ to Netlify
├── public/
│   └── images/                  All game images (copied to dist/ at build time)
└── src/
    ├── main.jsx                 Vite entry — imports styles.css, mounts <App />
    ├── App.jsx                  Root: game state, screen routing
    ├── styles.css               Brand styles — CSS variables, animations, layouts
    └── data/
        └── game.json            ALL game content (see schema below)
    └── components/
        ├── layout/
        │   ├── SiteHeader.jsx   Sticky header with optional back button
        │   └── SiteFooter.jsx   Fixed footer
        ├── screens/
        │   ├── HomeScreen.jsx
        │   ├── TutorialScreen.jsx
        │   ├── GuideHubScreen.jsx
        │   ├── ResourcesScreen.jsx
        │   ├── TipsScreen.jsx
        │   ├── PromptsScreen.jsx
        │   ├── SceneScreen.jsx        Interactive exploration scene
        │   ├── SubjectDetailScreen.jsx Shared detail view for all subjects
        │   └── EndScreen.jsx
        ├── scene/
        │   ├── SceneSubject.jsx   Clickable subject button with photo
        │   ├── SceneMascot.jsx    Hidden easter egg character
        │   └── SceneProgress.jsx  Discovery progress dots
        └── subject/
            ├── SubjectHero.jsx    Hero banner for subject detail screen
            ├── SectionCard.jsx    Renders a content section by type
            └── RevealButton.jsx   "Learn More" button
```

---

## game.json Schema

All game content — text, images, colors, navigation — is defined in `src/data/game.json`. **No game-specific content belongs in HTML or component files.**

### Top-level keys

| Key | Purpose |
|---|---|
| `meta` | Title, header text, footer text |
| `theme.colors` | Brand color palette (semantic names) |
| `images` | Shared assets: logo, home background, mascot, sidekick |
| `navigation` | Which screen IDs are subjects, and which are home/scene/end |
| `screens` | Map of all non-subject screens, each with a `type` field |
| `mascot` | Easter egg character config |
| `subjects[]` | All explorable subjects with their content sections |

### `theme.colors` — Semantic Color Names

```json
"theme": {
  "colors": {
    "primary":     "#572700",
    "accent":      "#D5D10E",
    "highlight":   "#F8971D",
    "secondary":   "#A1D2DD",
    "muted":       "#77833C",
    "brand":       "#006682",
    "textPrimary": "#3A2000",
    "bgLight":     "#FDF8F0"
  }
}
```

These map to CSS custom properties in `styles.css`. When creating a new game, update both `theme.colors` in the JSON and the corresponding `--variable` names in the CSS.

### Screen types

Each screen in `screens` has a `type` field that determines which React component renders it:

| `type` | Component | Description |
|---|---|---|
| `home` | `HomeScreen` | Hero with background image and CTA buttons |
| `tutorial` | `TutorialScreen` | Numbered steps + CTA |
| `guide-hub` | `GuideHubScreen` | Grid of nav cards |
| `resources` | `ResourcesScreen` | Tables of books/videos |
| `tips` | `TipsScreen` | Bullet list + standards grid |
| `prompts` | `PromptsScreen` | Writing prompts + project cards |
| `scene` | `SceneScreen` | Interactive scene with clickable subjects |
| `end` | `EndScreen` | Completion screen with mascot |

### Subject schema

Each entry in `subjects[]` drives both the scene button and the full detail screen:

```json
{
  "id": "bladderwort",          // Used as screen ID and CSS modifier
  "name": "Bladderwort",        // Display name
  "subtitle": "Utricularia",   // Scientific/secondary name (shown in italic)
  "backTarget": "scene",        // Where back button navigates
  "heroColorClass": "plant-hero--bladderwort",  // CSS class for hero gradient
  "sceneImage": {
    "src": "images/...",
    "alt": "..."
  },
  "sections": [...]             // Content sections (see below)
}
```

### Section types

Each section in `subject.sections[]` has a `type` and a `hidden` flag:

| `type` | Fields | Notes |
|---|---|---|
| `text` | `heading`, `body` | Body supports inline HTML |
| `text-with-image` | `heading`, `body`, `image` | Body supports inline HTML |
| `facts-list` | `heading`, `items[]` | Items support inline HTML |

Sections with `"hidden": true` are revealed when the user clicks "Learn More." They animate in with a staggered delay (200ms per item).

---

## State Management

`App.jsx` holds all game state:

```jsx
const [currentScreen, setCurrentScreen] = useState('home')
const [visitedSubjects, setVisitedSubjects] = useState(new Set())
const [allDiscovered, setAllDiscovered] = useState(false)
```

`navigate(screenId)` is passed as a prop to all child components. No URL routing is used — this matches the original show/hide screen behavior.

---

## Creating a New Game

1. **Fork** this repo or use it as a template
2. **Replace** `src/data/game.json` with new content:
   - Update `meta`, `theme.colors`, `images`
   - Update `navigation.subjectScreenIds` to match your subjects
   - Update `screens` (keep the same `type` values or add new ones)
   - Replace `subjects[]` with your new subjects and sections
3. **Update** `styles.css`:
   - Change CSS variable values to match new brand colors
   - Replace `plant-hero--*` background image rules with new subject hero styles
   - Replace bog/scene background image in `.bog-scene`
   - Optionally remove unused CSS plant drawing rules
4. **Add** new images to `public/images/`
5. **Build**: `npm run build` → deploys from `dist/`

### Adding a new screen type

1. Create `src/components/screens/MyNewScreen.jsx`
2. Add an entry to `screenComponentMap` in `App.jsx`
3. Add the screen data under `screens` in `game.json` with the new `type` value

No other changes needed.

---

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Build to dist/
npm run preview   # Preview production build
```

## Deployment

Deploys automatically to Netlify from the `main` branch. The `netlify.toml` publishes from `dist/` and sets security headers.

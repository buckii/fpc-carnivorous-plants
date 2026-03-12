# FPC Educational Game — Carnivorous Plants

An interactive educational web game for Franklin Park Conservatory's school program. Students explore a bog scene, click on carnivorous plants, and discover facts about each one.

Built with React + Vite. All game content lives in a single JSON file, making it straightforward to create new games on the same framework.

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output to dist/
```

## Creating a New Game

All game-specific content — text, images, colors, navigation — is defined in `src/data/game.json`. To build a new FPC educational game:

1. Fork this repo
2. Replace `src/data/game.json` with new content (subjects, screens, theme colors)
3. Update `src/styles.css` brand variables and subject hero background rules
4. Add images to `public/images/`

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full schema reference and step-by-step guide.

## Deployment

Deploys to Netlify automatically from `main`. The `netlify.toml` publishes from `dist/` with security headers configured.

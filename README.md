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

### Carnivorous plants learning journey

The field guide includes Bladderwort, Pitcher Plant, Sundew, Venus Flytrap, and Butterwort. Each lesson contains three photo discoveries and the original reading sections. Revealing the final photo marks that lesson complete; opening a lesson alone does not count. Once all five are explored, the field guide reveals the arrow to the bog challenge.

The challenge asks learners to select the plant matching each of five prompts, then presents four Butterwort identification photos with retry feedback. A frog leads to the final joke and congratulations screen. Play Again clears lesson progress and returns to the main menu. Progress is limited to the current page session and resets on reload. Videos open the original YouTube links in a separate tab.

Original PowerPoint assets used by the activity are in `public/images/original/`. The original slide lesson facts, video links, challenge prompts, identification rounds, classroom resources, and K–8 standards are configured in `src/data/game.json`. `ChallengeScreen.jsx` renders the two challenge stages; `SceneScreen.jsx` renders the field guide. The bright central menu, rounded controls, and unfiltered bog photography follow the Blooms & Butterflies reference.

# Carnivorous Plants project references

These files preserve the supplied source material and decisions for future website updates. They are stored with the source code, outside `public/`, so they are not included as downloadable assets in the published website.

## Original files

- [Copy of FPC Plants.docx](<Copy of FPC Plants.docx>): requested content, interactions, and slide-by-slide changes.
- [Readable original instructions](original-instructions.md): text extracted from that document for easier searching.
- [(1of4) Carnivorous Plants Extensions Activity.pptx](<(1of4) Carnivorous Plants Extensions Activity.pptx>): original introduction, teacher resources, bog, Bladderwort, and Pitcher Plant slides.
- [(2of4) Carnivorous Plants Extensions Activity.pptx](<(2of4) Carnivorous Plants Extensions Activity.pptx>): first Butterwort identification questions.
- [(3of4) Carnivorous Plants Extensions Activity (1).pptx](<(3of4) Carnivorous Plants Extensions Activity  (1).pptx>): Sundew, Venus Flytrap, Butterwort, and video slides.
- [(4of4) Carnivorous Plants Extensions Activity (1).pptx](<(4of4) Carnivorous Plants Extensions Activity  (1).pptx>): remaining identification questions, joke, and completion slides.
- [Brand-Standards.pdf](Brand-Standards.pdf): authoritative palette, typography, logo, and imagery guidance.
- [Current-app whitespace example](image-997cecb2.png): the spacious Bladderwort panel identified for improvement.
- [Butterwort lesson example](image-ce5b83e0.png): large plant image beside compact colored fact boxes.
- [Identification activity example](image-c1395bb8.png): photo background with colored prompt and Yes/No controls.

## User decisions and direction

The layout reference supplied by the user was https://fpcblooms.mycsg.org. The initial direction was to keep articles, add an interactive bog and plant identification activities, and use original PowerPoint assets. The subsequent direction was to match the supplied brand standards, enlarge images to follow the screenshots, make images interactive, and reduce excessive whitespace. The brand PDF and screenshots take precedence over the earlier teal-centered styling.

## Brand notes

Primary colors from the PDF are dark brown `#572700`, orange `#F8971D`, yellow-green `#D5D10E`, and olive `#B8B308`. Supporting colors include brown `#935D3C`, light blue `#A1D2DD`, gray `#B8B1AB`, lime `#CFDD3A`, tan `#DBD095`, orange-red `#DA6126`, teal `#006682`, gold `#F99F1C`, green `#77833C`, khaki `#C0B88D`, sage `#80866E`, and red `#9C2F31`.

Use Droid Serif for headings, with Georgia as the approved computer fallback. The body typeface is Trade Gothic LT Std, with Arial as its approved computer fallback. Preserve the original logo proportions, colors, and clear space; use the full-color logo on white. Favor natural, unfiltered plant photography.

## Current learning flow

Five plant lessons cover Bladderwort, Pitcher Plant, Sundew, Venus Flytrap, and Butterwort. Each lesson contains three clickable photo discoveries plus reading sections. Revealing the last discovery completes a lesson. After all five lessons are complete, an arrow unlocks the bog challenge.

The challenge includes five plant-finding prompts, then four Butterwort identification rounds: Butterwort (Yes), Sundew (No), Ghost Plant (No), and Butterwort (Yes). Wrong answers offer retries. The frog leads to the joke and congratulations screen. Play Again resets progress and returns home. Progress is currently limited to the page session and resets on reload.

Lesson and article photos open an image viewer with zoom and scrolling. Escape or Close dismisses it. Lesson photo clicks also reveal subsequent facts. The layout uses enlarged photos, compact colored fact panels, full-width article rows, and responsive controls.

Original video links:

- Sundew: https://www.youtube.com/watch?v=ArBZzrV3xww
- Venus Flytrap: https://www.youtube.com/watch?v=O7eQKSf0LmY

The teacher resources include the detailed K–8 standards, books, video list, and craft projects from the slides.

## Implementation locations and verification

`src/data/game.json` contains lesson facts, source image references, video links, challenge prompts, identification rounds, and teacher resources. `src/components/screens/SubjectDetailScreen.jsx` renders the lessons; `ChallengeScreen.jsx` renders the games; `SceneScreen.jsx` renders the field guide. `src/components/subject/ImageViewer.jsx` implements the image viewer, and `SectionCard.jsx` provides interactive article images. Branding and responsive layouts are in `src/styles.css`; the heading font is loaded in `index.html`. Extracted source artwork used by the app is in `public/images/original/`.

Previous Chromium checks passed for all lessons, game unlocking, quiz rounds and retries, replay reset, video URLs, standards, image availability, enlarged images, zoom, Escape/Close handling, and responsive layouts. These results describe the completed revisions; rerun relevant checks when changing behavior. Production builds are validated by the deployment system.

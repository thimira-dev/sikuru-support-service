# Sikuru Support Service — Phase 1 / Hero v2

Next.js App Router implementation of the Sikuru Support Service homepage visual direction.

## Hero v2 architecture

The hero is no longer a pre-composed background image. It is built as independent responsive layers:

- real HTML content for the title, paragraph and CTA buttons
- the supplied transparent Sikuru logo
- the supplied standalone Perth skyline image
- an SVG organic clip path acting as the skyline frame
- layered pale-blue SVG swooshes behind the photo
- a hand-built scalable SVG leaf decoration
- an independent SVG bottom wave

You can replace `public/assets/perth-skyline.png` later without changing the shape or layout.

## Title font

The current demo uses **Allura** as a close webfont approximation to the approved signature lettering. The CSS already falls back to `Brittany Signature` or `Northwell` if you later add a licensed copy.

For a production-perfect match, add your licensed `.woff2` file under `public/fonts/` and define it using `@font-face`.

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Main Hero v2 files

```text
components/Hero.js
components/HeroVisual.js
app/globals.css
public/assets/sikuru-logo.png
public/assets/perth-skyline.png
```

## Recommended review workflow

Open the approved reference and the browser at the same viewport width. Compare:

1. left copy width and title baseline
2. skyline mask top curve
3. skyline crop / object position
4. lower organic edge
5. leaf size and position
6. bottom wave

Only tune these after seeing the actual browser render; do not bake them into a static image.

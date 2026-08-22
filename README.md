# Sai Krishna Yemineni — Bento Grid Portfolio

A complete single-page portfolio built with:

- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- shadcn/ui-style primitives (`Button`, `Badge`)
- Local image/icon assets (no external logo CDN required)

## Features

- Responsive 12-column Bento Grid
- 3D parallax tilt cards with `useMotionValue` / `useTransform`
- Cursor-following spotlight / glow
- Spring micro-interactions (`stiffness: 300`, `damping: 20`)
- Animated copy-to-clipboard email button
- Interactive terminal + live accent picker
- Animated skill filters with layout transitions
- Live Massachusetts local time (America/New_York)
- Accessible keyboard focus styles
- Mobile-first reflow to a single column
- Purpose-built head/shoulders portrait crop

## Project structure

```text
app/
  globals.css
  layout.tsx
  page.tsx

components/
  CardSpotlight.tsx
  CopyButton.tsx
  LocalTimeCard.tsx
  PlaygroundCard.tsx
  Portfolio.tsx
  SocialCard.tsx
  TiltCard.tsx
  useLocalTime.ts
  ui/
    badge.tsx
    button.tsx

public/
  sai-krishna-portrait.jpg
  agentic-project.svg
  Sai_Krishna_Yemineni_Resume.pdf
  icons/
    *.svg
```

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production build

```bash
npm run build
npm start
```

## Deploy

The project is ready for Vercel or another Next.js-compatible host.

## URLs to add later

You have not supplied these yet, so the UI intentionally does not invent them:

- GitHub profile URL
- X / Twitter profile URL
- Featured project live demo URL
- Featured project GitHub repository URL

Update them in:

- `components/SocialCard.tsx`
- `components/Portfolio.tsx`

# Insurgo — `app new/` (v2)

A clean React + Vite app that applies **`design-v2/DESIGN.md`** end-to-end.

## What's different from `app/`

| | `app/` (v1) | `app new/` (v2) |
|---|---|---|
| Accent | Red + Cyan (dual) | **Insurgo Red only** |
| Fonts | League Spartan + Michroma | **Inter Variable + JetBrains Mono** with `"cv01", "ss03"` |
| Background | Aurora + scan lines + hex + particle network | Single subtle radial tint + architectural grid mask |
| Motion | Heavy (Three.js, glows, particles) | **Framer Motion only** — fade / subtle slide on enter |
| Depth | Drop shadows + glows | **Luminance stepping** (0.02 → 0.04 → 0.05) |
| Weight | React + three.js + drei + postprocessing + zustand + tailwind | **React + framer-motion** |
| Type scale | ad-hoc `clamp()` | Modular scale per DESIGN.md |

## Run it

```bash
cd "Live/app new"
npm install
npm run dev
# → http://localhost:5174   (UI only — chat endpoint returns a fallback)
```

To run the chat against the real OpenRouter API locally, use Netlify dev:

```bash
cp .env.example .env.local   # then paste your OPENROUTER_API_KEY
npx netlify-cli dev          # or: npm run dev:netlify
# → http://localhost:8888    (Vite + /api/chat function wired together)
```

## WhatsApp (Baileys) integration

The site now supports a Baileys-based WhatsApp bridge, but this runs as a
separate persistent service (not inside Netlify Functions).

### Public contact flow (current)

The **Contact on WhatsApp** button now opens the visitor's own WhatsApp via
`wa.me` and prefills an editable summary derived from the current on-page chat.

- Number target: `+16862046914`
- Prefill is generated from recent conversation turns
- A stable local session id is stored in browser localStorage and appended to
  the prefill for continuity
- No backend `/send` call is used for this public contact action

1. Start the bridge:

```bash
cd "Live/whatsapp-bridge"
npm install
cp .env.example .env
npm run dev
```

2. Point Netlify functions to the bridge (in `app new` site env):
   - `WA_BRIDGE_URL=http://localhost:8787` (local)
   - production: set this to your deployed bridge URL.

3. Run app + functions:

```bash
cd "Live/app new"
npx netlify-cli dev
```

4. Open admin controls:
   - visit `http://localhost:8888/?waAdmin=1`
   - use buttons for status/connect/QR and send test message.

### Render (static site) setup

If your frontend is hosted as a Render **Static Site**, there are no serverless
functions available for `/api/whatsapp-*`. Use a separate Render **Web Service**
for `whatsapp-bridge` and call it directly from the browser:

1. Deploy `Live/whatsapp-bridge/` as a Render Web Service.
2. Add a persistent disk and set `WA_AUTH_DIR=/var/data/wa-auth`.
3. Set `FRONTEND_ORIGIN=https://<your-static-site>.onrender.com`.
4. In the static site env vars, set:
   - `VITE_WA_BRIDGE_URL=https://<your-bridge>.onrender.com`
5. Rebuild static site.

The admin panel (`?waAdmin=1`) will use `VITE_WA_BRIDGE_URL` when present.

Build / preview:
```bash
npm run build
npm run preview
```

## Deploy (Netlify)

1. Create a new Netlify site and set **Base directory** to `app new`.
2. Build command / publish dir / functions dir are read from `app new/netlify.toml`.
3. In **Site configuration → Environment variables**, add:
   - `OPENROUTER_API_KEY` — your OpenRouter key (required)
   - `OPENROUTER_MODEL` — optional, defaults to `anthropic/claude-3.5-sonnet`
   - `WA_BRIDGE_URL` — URL of your running Baileys bridge service
4. Deploy. The chat endpoint is `/api/chat` (proxied to `netlify/functions/chat.js`).

**Never commit the key.** `.env.local` is gitignored; `.env.example` shows the shape.

## Structure

```
app new/
├── index.html                      ← loads Inter Variable + JetBrains Mono
├── vite.config.js
├── package.json                    ← React 19, Vite 8, Framer Motion only
├── public/
│   ├── favicon.svg
│   └── logo.svg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── content.js                  ← all copy centralized
    ├── styles.css                  ← tokens + utility classes (mirrors design-v2/tokens.css)
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Philosophy.jsx
        ├── SystemCards.jsx
        ├── SystemFlow.jsx
        ├── BuilderMindset.jsx
        ├── ChatShowcase.jsx
        ├── FinalCTA.jsx
        └── Footer.jsx
```

## Where the design lives
- Tokens are mirrored in `src/styles.css` (so the app is self-contained) and also in `../design-v2/tokens.css`.
- The governing document is **`../design-v2/DESIGN.md`** — when an agent makes visual changes, it should follow that file first.

## Known follow-ups
- Hook up `hello@insurgo.systems` or the real contact endpoint in `content.js → cta.primary.href`.
- Consider adding `@fontsource/inter` + `@fontsource/jetbrains-mono` for offline/self-hosted fonts.

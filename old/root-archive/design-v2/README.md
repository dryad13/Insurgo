# Insurgo Design System — v2

Linear-inspired structure. Insurgo-red as the single chromatic accent. Achromatic everything else.

## What's here

| File | Purpose |
|---|---|
| `DESIGN.md` | **Source of truth.** Agents and humans read this to build consistent UI. |
| `DESIGN.linear.md` | Unmodified Linear template from [`getdesign.md/linear`](https://getdesign.md/linear/design-md) — kept for reference. |
| `tokens.css` | Drop-in CSS custom properties (`--accent`, `--bg-canvas`, etc). |
| `preview.html` | **Dark preview** — the primary surface. Open in a browser. |
| `preview-light.html` | Light preview for print / letterhead / PDF contexts. |
| `README.md` | This file. |

## Why "v2"

The current site (`app/`) and deck (`presentation/`) use a dual-accent tron aesthetic — red `#FB0C0C` + cyan `#00F0FF`, plus aurora gradients, hex overlays, scan lines, and glowing particles. It's visually exciting but visually **loud**.

v2 strips that back to a disciplined system:

- **One chromatic accent.** Cyan is deprecated. Red earns every appearance.
- **Luminance ladder.** Depth comes from `rgba(255,255,255,0.02 → 0.04 → 0.05)`, not drop shadows.
- **Modular type scale.** Inter Variable with `"cv01", "ss03"`. Weight 510 everywhere. No more ad-hoc `clamp()`.
- **Whisper-thin borders.** `rgba(255,255,255,0.08)` — visible structure without noise.
- **Restraint over spectacle.** No scan lines, no aurora, no hex overlays. Darkness is the whitespace.

## How to use

### With an AI agent
Drop `DESIGN.md` at your project root (or point the agent at `design-v2/DESIGN.md`) and say:

> Use `DESIGN.md` as the design source of truth. Follow the typography, color, and component specs exactly.

### In code
Copy `tokens.css` into your project and `@import` it once:

```css
@import url("./design-v2/tokens.css");

body {
  font-family: var(--font-sans);
  font-feature-settings: var(--font-features);
  background: var(--bg-canvas);
  color: var(--text-primary);
}
```

### Fonts
Load Inter Variable and JetBrains Mono from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;510;590&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

For pixel-perfect fidelity install **Inter Variable** directly (the `510` weight is a variable-font axis position).

## Previewing

```bash
# From the repo root:
python3 -m http.server 5173 -d design-v2
# then open http://localhost:5173/preview.html
```

Or drag `preview.html` into a browser.

## Migration status

- [ ] `app/src/index.css` — replace v1 tokens with `tokens.css`
- [ ] `app/src/components/**` — remove cyan glows, aurora canvas, particle network
- [ ] `presentation/index.html` — swap League Spartan + Michroma → Inter Variable
- [ ] Kill `ParticleNetwork.jsx` / `TronBackground.jsx` (or keep behind a `v1` prop for legacy)

The old system stays live until each surface is migrated. v2 lives alongside, not destructively.

---

*Installed via `npx getdesign@latest add linear.app`, then rethemed.  
Thanks to [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) for the template.*

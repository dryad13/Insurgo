# Insurgo Design System — v2 (Linear-inspired, Insurgo-red accent)

> **Source of truth** for agents and humans building Insurgo's web, product, and presentation surfaces.  
> Structure adopted from [Linear's design system](./DESIGN.linear.md). Palette hybridized: Linear's achromatic neutrals + Insurgo's signature red (`#FB0C0C`) as the single chromatic accent. Cyan and multi-glow effects from v1 are **deprecated**.

---

## 1. Visual Theme & Atmosphere

Insurgo v2 is **dark-mode-native precision engineering** — a near-black canvas where information emerges from darkness through subtle gradations of white opacity, punctuated by a single, deliberate red accent. We replace v1's "tron demo" aesthetic (aurora gradients, scan lines, hex overlays, dual-accent glow) with restraint: **one chromatic color, one typeface, a strict luminance ladder, and whisper-thin borders**. The result is a system that reads as "infrastructure" rather than "promo graphic" — appropriate for a company whose product is automation and systems that run while clients sleep.

Typography is built entirely on **Inter Variable** with OpenType features `"cv01", "ss03"` enabled globally, giving the typeface a cleaner, more geometric character. The signature weight is **510** (between regular 400 and medium 500) — used for most UI text, navigation, and labels. Display sizes use aggressive negative letter-spacing (`-1.584px` at 72px down to `-1.056px` at 48px), creating compressed, authoritative headlines that feel engineered rather than decorated. **JetBrains Mono** serves as the monospace companion for code, agent output, and technical labels.

Color is almost entirely achromatic — dark backgrounds with white/gray text — punctuated by **Insurgo Red** (`#FB0C0C` base, `#FF3434` for interactive, `#FF5555` for hover). This accent is used sparingly and intentionally: primary CTAs, active states, focus rings, brand marks, and red-on-dark data callouts only. Borders use ultra-thin, semi-transparent white (`rgba(255,255,255,0.05)` to `rgba(255,255,255,0.08)`), creating structure without visual noise.

**Key Characteristics**
- Dark-mode-native: `#0A0A0F` marketing canvas, `#0F1011` panel, `#191A1B` elevated surface, `#28282C` hover
- Inter Variable with `"cv01", "ss03"` globally — this is non-negotiable
- Signature weight **510** for default UI and navigation; 590 for strong emphasis; 400 for reading
- Aggressive negative tracking at display sizes (`-1.584px` @ 72px, `-1.056px` @ 48px)
- **Single chromatic accent**: Insurgo Red `#FB0C0C` / `#FF3434` / `#FF5555`
- Semi-transparent white borders throughout: `rgba(255,255,255,0.05)` to `rgba(255,255,255,0.08)`
- Near-zero-opacity button backgrounds: `rgba(255,255,255,0.02)` to `rgba(255,255,255,0.05)`
- Depth via **luminance stepping**, not drop shadows
- Success green (`#27A644`) reserved for status indicators only
- **Deprecated from v1**: cyan `#00F0FF`, aurora gradients, scan lines, hex-pattern overlays, dual glows, Michroma

---

## 2. Color Palette & Roles

### Background Surfaces
| Token | Hex | Role |
|---|---|---|
| `--bg-canvas` | `#0A0A0F` | Page background — marketing, hero, deck slides |
| `--bg-panel` | `#0F1011` | Sidebar, sticky nav, secondary panels |
| `--bg-surface` | `#191A1B` | Cards, dropdowns, dialogs, elevated containers |
| `--bg-surface-2` | `#28282C` | Hover-elevated, popovers, command palette |

### Text & Content
| Token | Hex | Role |
|---|---|---|
| `--text-primary` | `#F7F8F8` | Headings and default text (not pure white — eye-comfort) |
| `--text-secondary` | `#D0D6E0` | Body copy, descriptions |
| `--text-tertiary` | `#8A8F98` | Metadata, placeholders, de-emphasized |
| `--text-quaternary` | `#62666D` | Timestamps, disabled, subtle labels |

### Brand & Accent (Insurgo Red)
| Token | Hex | Role |
|---|---|---|
| `--accent` | `#FB0C0C` | Primary CTA background, brand marks |
| `--accent-hover` | `#FF3434` | Hover on primary CTA, interactive accent |
| `--accent-active` | `#FF5555` | Pressed / active-link color |
| `--accent-deep` | `#950707` | Gradient bottom stop, pressed shadow |
| `--accent-focus` | `rgba(251,12,12,0.45)` | Focus ring, selection halo |
| `--accent-tint` | `rgba(251,12,12,0.10)` | Selection background, subtle highlight |

### Status
| Token | Hex | Role |
|---|---|---|
| `--status-green` | `#27A644` | Active / in-progress indicator |
| `--status-emerald` | `#10B981` | Success pill, completion |
| `--status-amber` | `#E8A33D` | Warning (new in v2) |
| `--status-red` | `#FB0C0C` | Error — same hex as accent; reserve for error context |

### Borders & Dividers
| Token | Value | Role |
|---|---|---|
| `--border-subtle` | `rgba(255,255,255,0.05)` | Default whisper-thin line |
| `--border-standard` | `rgba(255,255,255,0.08)` | Cards, inputs, code blocks |
| `--border-strong` | `#23252A` | Solid separators where needed |
| `--border-accent` | `rgba(251,12,12,0.30)` | Brand-highlighted card / active input |
| `--border-accent-strong` | `rgba(251,12,12,0.55)` | Focus border |

### Overlay
| Token | Value | Role |
|---|---|---|
| `--overlay` | `rgba(0,0,0,0.85)` | Modal / dialog backdrop |

---

## 3. Typography Rules

### Font Family
- **Primary:** `Inter Variable` → fallback `-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, 'Segoe UI', Roboto, sans-serif`
- **Monospace:** `JetBrains Mono` → fallback `ui-monospace, 'SF Mono', Menlo, Consolas, monospace`
- **OpenType:** `font-feature-settings: "cv01", "ss03";` applied globally — this is what separates Insurgo v2 from generic Inter.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|---|
| Display XL | Inter | 72px (4.5rem) | 510 | 1.00 | -1.584px | Hero headline |
| Display | Inter | 48px (3.00rem) | 510 | 1.00 | -1.056px | Section title |
| H1 | Inter | 32px (2.00rem) | 400 | 1.13 | -0.704px | Page/section |
| H2 | Inter | 24px (1.50rem) | 400 | 1.33 | -0.288px | Subsection |
| H3 | Inter | 20px (1.25rem) | 590 | 1.33 | -0.240px | Card title, feature |
| Body Large | Inter | 18px (1.13rem) | 400 | 1.60 | -0.165px | Intro / lead copy |
| Body Emphasis | Inter | 17px (1.06rem) | 590 | 1.60 | 0 | Strong paragraph |
| Body | Inter | 16px (1.00rem) | 400 | 1.50 | 0 | Default reading |
| Body Medium | Inter | 16px | 510 | 1.50 | 0 | Navigation, UI labels |
| Small | Inter | 15px (0.94rem) | 400 | 1.60 | -0.165px | Secondary body |
| Caption | Inter | 13px (0.81rem) | 510 | 1.50 | -0.13px | Metadata, timestamps |
| Label | Inter | 12px (0.75rem) | 510 | 1.40 | 0 | Button text, pills |
| Micro | Inter | 11px (0.69rem) | 510 | 1.40 | 0 | Tiny labels, badges |
| Mono Body | JetBrains | 14px | 400 | 1.50 | 0 | Code, agent output |
| Mono Label | JetBrains | 12px | 400 | 1.40 | 0 | Technical metadata |

### Principles
- **510 is the signature weight.** Use Inter Variable's 510 (between 400 and 500) for default emphasis — navigation, labels, button text, all-caps callouts. It creates subtle emphasis without the heaviness of true medium.
- **Tracking scales inversely with size.** Display text runs negative (−1.584px at 72px, −1.056px at 48px). Below 16px, tracking relaxes to near-zero.
- **Three-tier weight system:** 400 (read), 510 (emphasize/navigate), 590 (announce). Do **not** use 700/bold. Use 300 only for deliberately de-emphasized lead copy.
- **OpenType is identity.** Without `"cv01", "ss03"` this is generic Inter — with them, it's Linear/Insurgo-grade Inter. Apply on every Inter text node.

---

## 4. Component Stylings

### Buttons

**Primary (Brand Red)**
- Background: `#FB0C0C`
- Text: `#FFFFFF`, Inter 14–16px weight 510
- Padding: `8px 16px`
- Radius: `6px`
- Hover: bg → `#FF3434`
- Active: bg → `#FF5555`
- Focus shadow: `0 0 0 3px rgba(251,12,12,0.25)`
- Use: Primary CTA only (one per view)

**Ghost (Default)**
- Background: `rgba(255,255,255,0.02)`
- Text: `#E2E4E7`
- Border: `1px solid rgba(255,255,255,0.08)`
- Radius: `6px`
- Hover: bg → `rgba(255,255,255,0.05)`
- Use: Secondary action, cancel, "Learn more"

**Subtle (Toolbar)**
- Background: `rgba(255,255,255,0.04)`
- Text: `#D0D6E0`
- Padding: `0 8px`, height `28px`
- Radius: `6px`
- Use: Inline toolbar actions, contextual buttons

**Pill**
- Background: `transparent`
- Text: `#D0D6E0`
- Border: `1px solid #23252A`
- Padding: `0 10px 0 5px`
- Radius: `9999px`
- Use: Filter chips, tags, category labels

**Icon (Circle)**
- Background: `rgba(255,255,255,0.03)`
- Border: `1px solid rgba(255,255,255,0.08)`
- Radius: `50%`
- Size: `32×32` or `28×28`
- Use: Close, menu toggle, icon-only

### Cards & Containers
- Background: `rgba(255,255,255,0.02)` default, `rgba(255,255,255,0.04)` on hover
- Border: `1px solid rgba(255,255,255,0.08)`
- Radius: `8px` (standard), `12px` (featured), `22px` (large panel)
- Shadow: none by default; depth comes from background luminance step
- Accent card (Insurgo-branded feature): border → `rgba(251,12,12,0.30)`, no fill change

### Inputs & Forms
- Background: `rgba(255,255,255,0.02)`
- Text: `#D0D6E0`
- Placeholder: `#62666D`
- Border: `1px solid rgba(255,255,255,0.08)`
- Padding: `10px 12px`
- Radius: `6px`
- Focus: border → `rgba(251,12,12,0.55)`, shadow `0 0 0 3px rgba(251,12,12,0.18)`

### Badges & Pills
- **Success**: bg `#10B981`, text `#F7F8F8`, radius `9999px`, 10px/510
- **Neutral**: transparent, text `#D0D6E0`, border `1px solid #23252A`, radius `9999px`, 12px/510
- **Subtle**: bg `rgba(255,255,255,0.05)`, text `#F7F8F8`, radius `2px`, 10px/510
- **Accent**: bg `rgba(251,12,12,0.10)`, text `#FF5555`, border `1px solid rgba(251,12,12,0.30)`, radius `9999px`

### Navigation
- Dark sticky header on `#0F1011`, `1px solid rgba(255,255,255,0.05)` bottom border
- Logo mark left-aligned (Insurgo SVG, 20–24px tall)
- Links: Inter 13–14px weight 510, `#D0D6E0` → `#F7F8F8` on hover
- Primary CTA right-aligned using **Primary Red** button
- Mobile: hamburger at `<768px`
- Command palette trigger: `/` or `Cmd+K`, visual style matches **Ghost Button**

### Tables (for Proposal/Presentation)
- Wrapper: `rgba(255,255,255,0.02)` bg, `1px solid rgba(255,255,255,0.08)`, radius `12px`, padding `12px 16px`
- Header: Inter 11px weight 510 uppercase `letter-spacing: 0.09em`, color `#8A8F98`, bottom border `1px solid rgba(255,255,255,0.05)`
- Row: 14px Inter weight 400, cell padding `10px 12px`, bottom border `1px solid rgba(255,255,255,0.05)`
- Total row: weight 590, bg `rgba(251,12,12,0.06)`, top border `1px solid rgba(251,12,12,0.30)`
- Numeric column: `font-variant-numeric: tabular-nums;` right-aligned

### Code Block
- Background: `#0F1011`
- Text: JetBrains 14px weight 400, `#D0D6E0`
- Border: `1px solid rgba(255,255,255,0.08)`, radius `8px`, padding `12px 14px`
- Inline code: bg `rgba(255,255,255,0.04)`, radius `4px`, padding `1px 6px`

---

## 5. Layout Principles

### Spacing Scale (8px grid)
```
1px, 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px, 128px
```
Primary rhythm: **8 / 16 / 24 / 32**. Use 4 only for tight icon gaps. Micro-values (7, 11) permissible only for optical alignment.

### Grid & Container
- **Max content width:** `1200px`
- **Hero:** centered single column, `96–128px` vertical padding
- **Feature grid:** `3 × 1fr` at desktop, `2 × 1fr` at 768–1024px, `1 × 1fr` below 768px
- **Section gap:** `80px` desktop, `48px` mobile — no visible dividers, darkness separates sections

### Whitespace Philosophy
Darkness *is* whitespace. Content emerges from the near-black canvas. Do **not** add lines, dividers, or background panels to create separation — let vertical padding do the work.

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `--r-micro` | `2px` | Inline badges, subtle tags |
| `--r-sm` | `4px` | Small containers |
| `--r-md` | `6px` | Buttons, inputs |
| `--r-card` | `8px` | Cards, popovers |
| `--r-panel` | `12px` | Featured panels, tables |
| `--r-lg` | `22px` | Large panels |
| `--r-pill` | `9999px` | Pills, chips |
| `--r-full` | `50%` | Circular avatars, icon buttons |

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | `#0A0A0F`, no shadow | Page background |
| 1 — Subtle | `rgba(0,0,0,0.03) 0 1.2px 0` | Micro-elevation on toolbar buttons |
| 2 — Surface | bg `rgba(255,255,255,0.02)` + border `rgba(255,255,255,0.08)` | Cards, inputs |
| 2b — Inset | `inset 0 0 12px rgba(0,0,0,0.2)` | Recessed panels |
| 3 — Ring | `0 0 0 1px rgba(0,0,0,0.2)` | Border-as-shadow |
| 4 — Elevated | `0 2px 4px rgba(0,0,0,0.4)` | Floating dropdowns |
| 5 — Dialog | `0 8px 2px rgba(0,0,0,0), 0 5px 2px rgba(0,0,0,0.01), 0 3px 2px rgba(0,0,0,0.04), 0 1px 1px rgba(0,0,0,0.07), 0 0 1px rgba(0,0,0,0.08)` | Popovers, modals, command palette |
| Focus | `0 0 0 3px rgba(251,12,12,0.25)` + border strong | Keyboard focus |

**Shadow philosophy:** on dark surfaces, dark shadows are invisible. Elevate via background luminance stepping (`0.02 → 0.04 → 0.05`), not via shadow darkness. Use drop shadow only on floating elements (dropdowns, dialogs).

---

## 7. Do's and Don'ts

### Do
- Apply `font-feature-settings: "cv01", "ss03"` globally — this is the look.
- Use weight **510** as your default UI/label weight.
- Use aggressive negative tracking at display sizes.
- Build on the luminance ladder (`#0A0A0F` → `#0F1011` → `#191A1B` → `#28282C`).
- Use semi-transparent white borders — whisper-thin, always.
- Keep button backgrounds near-zero opacity (`0.02`–`0.05`) for all non-primary buttons.
- Reserve **Insurgo Red** for primary CTAs, focus rings, active states, and brand marks only.
- Use `#F7F8F8` as primary text — not pure `#FFFFFF`.

### Don't
- Don't use cyan (`#00F0FF`) or any secondary chromatic accent — it's deprecated from v1.
- Don't add aurora gradients, scan-line animations, hex-pattern overlays, or dual-color glows — v2 is restrained.
- Don't use Michroma — it's replaced by Inter Variable weight 510.
- Don't use pure white text — `#F7F8F8` is the primary.
- Don't use solid colored backgrounds for secondary buttons — transparency is the system.
- Don't apply red decoratively — it's reserved for interactive/CTA and brand moments.
- Don't use positive letter-spacing on display type — Inter at large sizes always runs negative.
- Don't use drop shadows for elevation on dark surfaces — use luminance stepping.
- Don't use weight 700/bold — max weight is 590.
- Don't introduce warm colors into UI chrome beyond the red accent.

---

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile Small | `<600px` | Single column, compact padding (16px edges) |
| Mobile | `600–768px` | Standard mobile, CTAs full-width |
| Tablet | `768–1024px` | 2-column feature grids begin |
| Desktop | `1024–1280px` | Full nav, 3-column grids |
| Large | `>1280px` | Full layout, generous margins |

### Touch & Targets
- Minimum touch target: `44×44px` (CTAs, nav links, icon buttons)
- Pill tags: `10px` horizontal padding minimum
- Inputs: `48px` height on mobile for easy tapping

### Type Scale Collapse
- Display XL `72px` → `56px` (tablet) → `40px` (mobile), tracking adjusts proportionally
- Display `48px` → `36px` → `28px`
- H1 `32px` → `28px` → `24px`
- Body remains `16px` across breakpoints (never below 15px for reading)

### Layout Collapse
- Hero stays centered single column, padding reduces `128px → 64px → 48px`
- Feature grid: `3 → 2 → 1` columns
- Navigation: horizontal links collapse to hamburger at `<768px`
- Tables: wrap values (`white-space: normal`, `word-break: break-word`), never horizontal-scroll as primary strategy
- Footer: multi-column → single stacked column

---

## 9. Agent Prompt Guide

### Quick Color Reference
- Page background: `#0A0A0F`
- Panel background: `#0F1011`
- Surface: `#191A1B`
- Primary text: `#F7F8F8`
- Body text: `#D0D6E0`
- Muted text: `#8A8F98`
- Accent (primary CTA, focus): `#FB0C0C`
- Accent hover: `#FF3434`
- Accent pressed: `#FF5555`
- Border (default): `rgba(255,255,255,0.08)`
- Border (subtle): `rgba(255,255,255,0.05)`
- Border (accent): `rgba(251,12,12,0.30)`

### Example Component Prompts

**Hero**
> "Create a hero on `#0A0A0F`. Headline 72px Inter Variable weight 510, line-height 1.00, letter-spacing -1.584px, color `#F7F8F8`, `font-feature-settings: 'cv01', 'ss03'`. Subtitle 18px weight 400, line-height 1.60, color `#8A8F98`. Primary CTA: bg `#FB0C0C`, white text, 6px radius, 8px 16px padding, hover `#FF3434`. Secondary: ghost button, `rgba(255,255,255,0.02)` bg, `1px solid rgba(255,255,255,0.08)` border."

**Feature card**
> "Card on dark bg. `rgba(255,255,255,0.02)` background, `1px solid rgba(255,255,255,0.08)` border, 8px radius, 24px padding. Title 20px Inter weight 590, `#F7F8F8`, letter-spacing -0.24px. Body 15px weight 400, `#8A8F98`, letter-spacing -0.165px. No shadow — hover increases bg to `rgba(255,255,255,0.04)`."

**Pricing table row**
> "Row in pricing table: three cells, cell padding 10px 12px, 14px Inter weight 400 `#D0D6E0` for label and detail, 14px weight 590 `#F7F8F8` for value, `font-variant-numeric: tabular-nums`, right-aligned. Bottom border `1px solid rgba(255,255,255,0.05)`. Total row: bg `rgba(251,12,12,0.06)`, top border `rgba(251,12,12,0.30)`, weight 590."

**Navigation**
> "Sticky nav on `#0F1011`, 64px tall, `1px solid rgba(255,255,255,0.05)` bottom border. Logo 24px tall left. Links Inter 14px weight 510 `#D0D6E0`, hover `#F7F8F8`. Primary CTA right: `#FB0C0C` bg, white, 6px radius, `padding: 8px 16px`."

**Command palette**
> "`#191A1B` bg, `1px solid rgba(255,255,255,0.08)`, 12px radius, multi-layer dialog shadow. Input 16px Inter weight 400 `#F7F8F8`. Results: 13px weight 510 `#D0D6E0` label, 12px `#62666D` metadata. Active row: bg `rgba(251,12,12,0.10)`, left border 2px `#FB0C0C`."

### Iteration Checklist
1. `font-feature-settings: "cv01", "ss03"` on all Inter text — non-negotiable.
2. Letter-spacing scales inversely with size (see typography table).
3. Three weights only: 400, 510, 590.
4. Depth via background opacity `0.02 → 0.04 → 0.05`, not shadow darkness.
5. Red is the *only* chromatic color. Everything else is achromatic.
6. Borders are always semi-transparent white (or red for brand-active), never solid dark on dark.
7. JetBrains Mono for code/agent-output only; Inter Variable everything else.

---

## Migration from v1

| v1 element | v2 treatment |
|---|---|
| Cyan `#00F0FF` accents | Removed — Insurgo Red is the sole accent |
| Aurora / scan-line / hex overlays | Removed — darkness is the background |
| Dual-glow effects on cards | Single subtle luminance step on hover |
| `Michroma` for uppercase labels | Inter weight 510, `letter-spacing: 0.09em`, uppercase |
| `League Spartan` body | Inter Variable (preferred) — v1 systems can be left in place until refactor |
| `clamp()` ad-hoc type scale | Modular scale above; `clamp()` only for hero display |
| Red + cyan tron styling | Monochrome luminance ladder + single-accent red |

---

## File Manifest
- `DESIGN.md` — this file (source of truth)
- `DESIGN.linear.md` — original unmodified Linear template (reference)
- `preview.html` — dark preview (color + type + components)
- `preview-light.html` — light preview (for printable / light-context surfaces)
- `tokens.css` — CSS custom properties ready to drop into any project

---

*Document version 2.0 — Insurgo brand, Linear-inspired structure.  
Installed via `npx getdesign@latest add linear.app` then re-themed.*

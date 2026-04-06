# Immutable (BIOME) Design System Reference

> Source: `@biom3/design-tokens` v0.4.8 — the official design token package powering `demo.immutable.com` and all Immutable products.
>
> Import: `import '@biom3/design-tokens/css/base-onDark.global.css';`
> Storybook: https://biome-storybook.immutable.com/

---

## Themes

BIOME ships two themes. The demo uses **onDark** (dark background, light text).

| Theme | CSS import | Background feel |
|-------|-----------|-----------------|
| `onDark` | `css/base-onDark.global.css` | Dark charcoal (`#131313`) |
| `onLight` | `css/base-onLight.global.css` | Near-white (`#FFFFFF`) |

Token values below are for **onDark** unless noted with *(onLight)*.

---

## Color Palette

### Brand Colors

| Token | CSS Variable | onDark Value | onLight Value |
|-------|-------------|-------------|---------------|
| brand-1 (primary text/foreground) | `--base-color-brand-1` | `#F3F3F3` | `#131313` |
| brand-2 (inverse background) | `--base-color-brand-2` | `#131313` | `#FFFFFF` |
| brand-3 (subtle borders) | `--base-color-brand-3` | `#E0E0E0` | `#E0E0E0` |
| brand-4 (secondary text) | `--base-color-brand-4` | `#B6B6B6` | `#868686` |
| brand-5 (teal highlight) | `--base-color-brand-5` | `#36E0F8` | `#36E0F8` |
| brand-6 (teal dark) | `--base-color-brand-6` | `#1F8290` | `#1F8290` |

### Neutral Surfaces (onDark)

| Token | CSS Variable | Value |
|-------|-------------|-------|
| neutral-500 (card bg) | `--base-color-neutral-500` | `#292929` |
| neutral-600 | `--base-color-neutral-600` | `#252525` |
| neutral-700 | `--base-color-neutral-700` | `#202020` |
| neutral-800 | `--base-color-neutral-800` | `#1C1C1C` |
| neutral-900 (page bg) | `--base-color-neutral-900` | `#131313` |
| neutral-1000 (deepest bg) | `--base-color-neutral-1000` | `#0D0D0D` |

### Accent Colors

| Token | CSS Variable | onDark Value | onLight Value |
|-------|-------------|-------------|---------------|
| accent-1 (links, CTAs) | `--base-color-accent-1` | `#F191FA` (pink) | `#B026BD` (purple) |
| accent-2 (teal bright) | `--base-color-accent-2` | `#36E0F8` | `#1FD3F5` |
| accent-3 | `--base-color-accent-3` | `#6FD6F2` | `#67C6E0` |
| accent-4 | `--base-color-accent-4` | `#61ADEB` | `#5AA0D9` |
| accent-5 | `--base-color-accent-5` | `#99A8EA` | `#8395E5` |
| accent-6 | `--base-color-accent-6` | `#E4F4F7` | `#D8EFF4` |
| accent-7 | `--base-color-accent-7` | `#F8D1DE` | `#F5BDD0` |
| accent-8 | `--base-color-accent-8` | `#F2B7DA` | `#EC98CA` |

### Status Colors (onDark)

| Token | CSS Variable | Value |
|-------|-------------|-------|
| success-bright | `--base-color-status-success-bright` | `#ABF790` |
| success-dim | `--base-color-status-success-dim` | `#D5FAC7` |
| guidance-bright (info) | `--base-color-status-guidance-bright` | `#36E0F8` |
| guidance-dim | `--base-color-status-guidance-dim` | `#94E9F5` |
| attention-bright (warning) | `--base-color-status-attention-bright` | `#FAFD7E` |
| attention-dim | `--base-color-status-attention-dim` | `#F6F8B9` |
| fatal-bright (error) | `--base-color-status-fatal-bright` | `#FF637F` |
| fatal-dim | `--base-color-status-fatal-dim` | `#F9ABB9` |

### Translucent Overlays (onDark — white-based)

| Token | CSS Variable | Value |
|-------|-------------|-------|
| standard-100 | `--base-color-translucent-standard-100` | `#F7F7F70A` (4%) |
| standard-200 | `--base-color-translucent-standard-200` | `#F7F7F714` (8%) |
| standard-300 | `--base-color-translucent-standard-300` | `#F7F7F71F` (12%) |
| standard-400 | `--base-color-translucent-standard-400` | `#F7F7F729` (16%) |
| standard-500 | `--base-color-translucent-standard-500` | `#F7F7F73D` (24%) |
| standard-600 | `--base-color-translucent-standard-600` | `#F7F7F77A` (48%) |
| emphasis-100 | `--base-color-translucent-emphasis-100` | `#F7F7F70F` (6%) |

### Gradients

| Name | CSS Variable | Value |
|------|-------------|-------|
| Gradient 1 (brand hero) | `--base-gradient-1-spectrum` | `linear-gradient(105.76deg, #F191FA -46.96%, #83E3F0 99.99%)` |
| Gradient 2 (aurora) | `--base-gradient-2-spectrum` | Radial pink/blue aurora |
| Gradient 3 (ocean) | `--base-gradient-3-spectrum` | Radial teal/blue/white |
| Text highlight | `--base-color-text-highlight` | `#36E0F833` |

---

## Typography

### Font Families

| Role | CSS Variable | Value |
|------|-------------|-------|
| Heading primary | `--base-font-family-heading-primary` | `'Suisse-Intl', sans-serif` |
| Heading secondary | `--base-font-family-heading-secondary` | `'Suisse-Intl', sans-serif` |
| Body primary | `--base-font-family-body-primary` | `'Roboto', sans-serif` |
| Body secondary / mono | `--base-font-family-body-secondary` | `'Roboto Mono', monospace` |

> Fonts are loaded via: `@import url("https://biome.immutable.com/hosted-assets/css/im-fonts-v4.css");`
> Add to your CSS: `import '@biom3/design-tokens/css/text.global.css';`

### Heading Scale

| Style | CSS Variable | Font Size | Line Height | Weight |
|-------|-------------|-----------|-------------|--------|
| heading-xxLarge | `--base-text-heading-xxLarge-regular-fontSize` | `96px` | `112px` | 600 |
| heading-xLarge | `--base-text-heading-xLarge-regular-fontSize` | `64px` | `72px` | 600 |
| heading-large | `--base-text-heading-large-regular-fontSize` | `40px` | `48px` | 600 |
| heading-medium | `--base-text-heading-medium-regular-fontSize` | `28px` | `32px` | 600 |
| heading-small | `--base-text-heading-small-regular-fontSize` | `20px` | `28px` | 600 |
| heading-xSmall | `--base-text-heading-xSmall-regular-fontSize` | `16px` | `24px` | 600 |

All headings support: `light` (400), `regular` (600), `bold` (700) weight variants.

### Body Scale

| Style | CSS Variable | Font Size | Line Height | Weight (regular/bold) |
|-------|-------------|-----------|-------------|-----------------------|
| body-large | `--base-text-body-large-regular-fontSize` | `20px` | `28px` | 400 / 500 |
| body-medium | `--base-text-body-medium-regular-fontSize` | `16px` | `24px` | 400 / 500 |
| body-small | `--base-text-body-small-regular-fontSize` | `14px` | `20px` | 400 / 500 |
| body-xSmall | `--base-text-body-xSmall-regular-fontSize` | `12px` | `16px` | 400 / 500 |
| body-xxSmall | `--base-text-body-xxSmall-regular-fontSize` | `10px` | `14px` | 400 / 500 |

### Caption Scale

| Style | Font Size | Line Height | Letter Spacing | Casing |
|-------|-----------|-------------|----------------|--------|
| caption-medium-regular | `14px` | `20px` | `2px` | uppercase |
| caption-medium-bold | `14px` | `20px` | `2px` | uppercase / weight 700 |
| caption-small-regular | `10px` | `14px` | `2px` | uppercase |
| caption-small-bold | `10px` | `14px` | `2px` | uppercase / weight 700 |

---

## Spacing Scale

4px base unit — multiply by step number.

| Step | CSS Variable | Value |
|------|-------------|-------|
| x1 | `--base-spacing-x1` | `4px` |
| x2 | `--base-spacing-x2` | `8px` |
| x3 | `--base-spacing-x3` | `12px` |
| x4 | `--base-spacing-x4` | `16px` |
| x5 | `--base-spacing-x5` | `20px` |
| x6 | `--base-spacing-x6` | `24px` |
| x7 | `--base-spacing-x7` | `28px` |
| x8 | `--base-spacing-x8` | `32px` |
| x10 | `--base-spacing-x10` | `40px` |
| x12 | `--base-spacing-x12` | `48px` |
| x16 | `--base-spacing-x16` | `64px` |
| x20 | `--base-spacing-x20` | `80px` |
| x24 | `--base-spacing-x24` | `96px` |
| x25 | `--base-spacing-x25` | `100px` (max: x50 = 200px) |

Common UI spacings: `x2` (8px) for tight gaps, `x4` (16px) for component padding, `x6` (24px) for section gaps, `x8` (32px) for large gaps.

---

## Border Radius

2px base unit — multiply by step number.

| Step | CSS Variable | Value | Common Use |
|------|-------------|-------|------------|
| x1 | `--base-borderRadius-x1` | `2px` | Tags, chips |
| x2 | `--base-borderRadius-x2` | `4px` | Inputs, small cards |
| x3 | `--base-borderRadius-x3` | `6px` | Buttons |
| x4 | `--base-borderRadius-x4` | `8px` | Cards, panels |
| x6 | `--base-borderRadius-x6` | `12px` | Modals, large cards |
| x8 | `--base-borderRadius-x8` | `16px` | Large containers |
| x12 | `--base-borderRadius-x12` | `24px` | Pills |
| x16 | `--base-borderRadius-x16` | `32px` | Extra rounded |
| x25 | `--base-borderRadius-x25` | `50px` | Full pill / circle |

---

## Border Sizes

| Token | CSS Variable | Value |
|-------|-------------|-------|
| 100 | `--base-border-size-100` | `1px` |
| 200 | `--base-border-size-200` | `2px` |
| 300 | `--base-border-size-300` | `3px` |
| 400 | `--base-border-size-400` | `4px` |

---

## Shadows (Elevation)

| Token | CSS Variable | Value |
|-------|-------------|-------|
| 100 (subtle) | `--base-shadow-100` | `0px 1px 2px rgba(0,0,0,0.16), 0px 1px 4px 1px rgba(0,0,0,0.32)` |
| 200 | `--base-shadow-200` | `0px 2px 6px 2px rgba(0,0,0,0.16), 0px 1px 2px rgba(0,0,0,0.32)` |
| 300 | `--base-shadow-300` | `0px 4px 8px 4px rgba(0,0,0,0.16), 0px 1px 4px rgba(0,0,0,0.32)` |
| 400 | `--base-shadow-400` | `0px 6px 10px 4px rgba(0,0,0,0.16), 0px 2px 4px rgba(0,0,0,0.32)` |
| 500 (prominent) | `--base-shadow-500` | `0px 8px 12px 6px rgba(0,0,0,0.16), 0px 4px 4px rgba(0,0,0,0.32)` |

---

## Icon Sizes

| Token | CSS Variable | Value |
|-------|-------------|-------|
| 100 | `--base-icon-size-100` | `12px` |
| 200 | `--base-icon-size-200` | `16px` |
| 250 | `--base-icon-size-250` | `20px` |
| 300 | `--base-icon-size-300` | `24px` (default) |
| 400 | `--base-icon-size-400` | `32px` |
| 500 | `--base-icon-size-500` | `48px` |
| 600 | `--base-icon-size-600` | `64px` |

---

## Motion / Animation

| Token | Duration | Easing |
|-------|----------|--------|
| normal-gentle | `0.4s` | `ease-in-out` |
| normal-fast | `0.25s` | `ease-in-out` |
| bounce-gentle | `0.7s` | `cubic-bezier(0.47, 1.74, 0.41, 0.8)` |
| bounce-fast | `0.45s` | `cubic-bezier(0.47, 1.74, 0.41, 0.8)` |

---

## Backdrop Blur (Frost)

| Token | CSS Variable | Value |
|-------|-------------|-------|
| 100 | `--base-frost-100` | `blur(16px)` |
| 200 | `--base-frost-200` | `blur(24px)` |
| 300 | `--base-frost-300` | `blur(48px)` |

---

## Breakpoints

| Name | Value |
|------|-------|
| small | 450px |
| medium | 768px |
| large | 1024px |
| xLarge | 1280px |
| xxLarge | 1536px |
| xxxLarge | 1920px |

---

## Z-Index Scale

| Token | CSS Variable | Value |
|-------|-------------|-------|
| tooltip | `--base-zLevel-tooltip` | 12 |
| toast | `--base-zLevel-toast` | 11 |
| popover | `--base-zLevel-popover` | 10 |
| modal | `--base-zLevel-modal` | 9 |
| drawer | `--base-zLevel-drawer` | 8 |

---

## Publisher Overview Page — Design Recommendations

Based on the BIOME design system, use the following for the new Publisher Overview page:

### Layout
- **Page background**: `--base-color-neutral-900` (`#131313`) — dark canvas
- **Card backgrounds**: `--base-color-neutral-500` (`#292929`) with `--base-borderRadius-x4` (8px) and `--base-shadow-200`
- **Section gaps**: `--base-spacing-x8` (32px) between sections, `--base-spacing-x6` (24px) inside cards
- **Max content width**: ~1280px (xLarge breakpoint)

### Typography
- **Page title**: `heading-large` — 40px / 48px / weight 600 / `Suisse-Intl`
- **Section titles**: `heading-medium` — 28px / 32px / weight 600
- **Card titles**: `heading-small` — 20px / 28px / weight 600
- **Body copy**: `body-medium` — 16px / 24px / weight 400 / `Roboto`
- **Labels/metadata**: `body-small` — 14px / 20px
- **Captions/tags**: `caption-small` — 10px / 14px / uppercase / 2px letter-spacing

### Colors
- **Primary text**: `--base-color-brand-1` (`#F3F3F3`)
- **Secondary text**: `--base-color-brand-4` (`#B6B6B6`)
- **Accent / links**: `--base-color-accent-1` (`#F191FA`) for CTAs, `--base-color-brand-5` (`#36E0F8`) for highlights
- **Borders**: `--base-color-translucent-standard-200` (`#F7F7F714`) — subtle 1px borders
- **Hover states**: `--base-color-translucent-standard-300` overlay

### Buttons
- Primary CTA: gradient-1 background (`#F191FA → #83E3F0`), `--base-borderRadius-x3` (6px), `body-medium-bold`
- Secondary: `--base-color-translucent-standard-200` background, `--base-border-size-100` border, same radius

### Status Indicators
- **Live/Active**: `--base-color-status-success-bright` (`#ABF790`)
- **Pending**: `--base-color-status-attention-bright` (`#FAFD7E`)
- **Error**: `--base-color-status-fatal-bright` (`#FF637F`)
- **Info**: `--base-color-status-guidance-bright` (`#36E0F8`)

---

## Component Library

Install and use `@biom3/react` for all UI components — it consumes these tokens automatically:

```bash
npm install @biom3/react @biom3/design-tokens
```

```tsx
import '@biom3/design-tokens/css/base-onDark.global.css';
import '@biom3/design-tokens/css/text.global.css';
import { Body, Heading, Button, Card } from '@biom3/react';
```

Key components available: `Heading`, `Body`, `Caption`, `Button`, `Card`, `Badge`, `Icon`, `Table`, `Tabs`, `Modal`, `Drawer`, `Toast`, `Tooltip`, `MenuItem`, `Accordion`.

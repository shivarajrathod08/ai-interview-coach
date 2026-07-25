# AI Interview Coach — `src/assets/`

Drop-in replacement for the assets folder only. Nothing else in your app changes.

## Structure
```
src/assets/
├── logos/          7 files  — primary, dark, light, icon, favicon, loading, splash
├── icons/          79 files — auth (11), navigation (14), interview (23), dashboard (15), system (16)
├── illustrations/  19 files — login, register, welcome, empty/error/404/500 states, etc.
├── backgrounds/     7 files — auth, dashboard, interview, summary, hero, gradient shapes, AI pattern
├── avatars/         6 files — male, female, neutral, ai-assistant, recruiter, guest
├── images/          5 files — placeholders for company logo, profile, resume, thumbnails
├── animations/      5 files — SMIL-animated SVGs (spinner, success check, typing dots, AI thinking, pulse)
├── fonts/           fonts.css + README — Google Fonts setup and usage guide
└── index.js         barrel file exporting all 128 assets
```

## Design tokens
- Primary gradient: `#4F6BFF → #8B5CF6` (blue → purple), used for the brand mark, primary buttons, active states.
- Secondary gradient: `#22D3EE → #4F6BFF` (cyan → blue), used for AI-specific moments (thinking animation, AI avatar).
- Dark surface: `#0B1120` / `#151233` — auth and interview backgrounds.
- Light surface: `#F4F6FF` / `#EEF2FF` — dashboard and summary backgrounds.
- Status colors: success `#10B981`, error `#EF4444`, warning `#F59E0B`.
- Signature mark: a compass/spark glyph (circle + 8 radiating ticks) — reused across the primary logo, icon logo, favicon, loading logo and the "ai" interview icon, so the brand mark and the "AI is active" indicator are visually the same shape.

## Usage
```jsx
import { LogosPrimaryLogo, IconsAuthLock, IllustrationsLogin } from '@/assets';

<img src={LogosPrimaryLogo} alt="AI Interview Coach" />
<img src={IconsAuthLock} className="w-5 h-5 text-slate-500" />
<img src={IllustrationsLogin} alt="" className="w-full max-w-md" />
```
All icons use `stroke="currentColor"`, so wrap them in an element with a `color` (Tailwind `text-*`) to recolor — or open the `.svg` and swap `currentColor` for a fixed hex if you inline them as components.

## Fonts
Import `fonts/fonts.css` once at your app root, then use the three CSS variables it defines (`--font-display`, `--font-body`, `--font-mono`). Details in `fonts/README.md`.

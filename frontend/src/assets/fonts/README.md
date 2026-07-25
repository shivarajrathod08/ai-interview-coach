# Font System — AI Interview Coach

Three Google Fonts, three jobs. Loaded via `fonts.css`.

## Space Grotesk (display)
Used for: the logo wordmark, page titles, dashboard headline numbers (score, streak count), splash screen.
Why: a geometric, slightly technical grotesk that reads as confident and modern without feeling cold — pairs well with the blue-purple gradient mark and signals "AI product" without leaning on cliché monospace-everywhere styling.
Weights used: 600 (headings), 700 (page titles), 800 (hero/splash numbers).

## Inter (body/UI)
Used for: body copy, form labels, buttons, navigation, table content, notifications.
Why: near-universal legibility at small sizes, excellent number tabular alignment for stats/analytics tables, huge weight range for a clean UI type scale.
Weights used: 400 (body), 500 (labels/buttons), 600 (emphasis), 700 (small headings/cards).

## JetBrains Mono (utility)
Used for: coding-round interview questions, code snippets in feedback, timestamps, session IDs.
Why: distinguishes machine-context content (code, IDs) from conversational content, and it's designed for on-screen code legibility.
Weights used: 400 (body code), 500 (inline code emphasis).

## Usage
```css
h1, h2, .logo-text { font-family: var(--font-display); }
body, p, button, input, label { font-family: var(--font-body); }
code, pre, .question-code { font-family: var(--font-mono); }
```

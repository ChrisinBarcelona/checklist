# Venta Apartamento — Normandía 301

An interactive, bilingual (Español / English) checklist for preparing the sale of
**Avenida Carrera 70 #52-59, Apartamento 301, Normandía, Bogotá** — built from the
family preparation pack and the *certificado de tradición* for registration
**50C-1211767**.

## Opening it

No build step, no dependencies. Open `index.html` in any browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

It also works as a static site on GitHub Pages, Netlify, or any file share — the whole
thing is four files.

## What it does

- **Interactive checklist** — 19 tasks across the five phases of the pack (Value,
  Documents, Taxes, Agencies, Contract), plus 25 sub-items for the accountant's eight
  questions, the agency pre-checks and the eight non-negotiable contract clauses.
- **Everything in one place** — each task opens to reveal the full context from the
  pack: the ready-to-send letters and chat scripts, the "why it matters" notes, the
  warnings, cost ranges and question tables.
- **Copy buttons** — every letter and script copies to the clipboard as Spanish
  (the language the notaries, IDU and building management actually need), including
  the subject line.
- **Tracking board** — the pack's 13-row *tablero de seguimiento*, with reference
  number, status and date. Edits sync both ways between the board and the matching
  task, so there is one source of truth.
- **Bilingual** — an ES / EN toggle in the header switches the whole interface and all
  content. The sendable Spanish text never changes; in English mode a translation is
  shown underneath, for reference only.
- **Saved locally** — checkboxes, reference numbers, dates, notes and the chosen
  language persist in `localStorage` on that device. Nothing is sent anywhere; there is
  no server and no analytics. Each family member's phone keeps its own copy.
- **Print** — a print stylesheet expands every task, so the whole pack prints as a
  paper document.

## Files

| File | What it holds |
|---|---|
| `index.html` | Page shell and the section containers |
| `data.js` | All content, every string as `{ es, en }` |
| `app.js` | Rendering, state, i18n, localStorage, clipboard |
| `styles.css` | The theme |

To change wording or add a task, edit `data.js` only — the app renders from it.

## Design

The visual system follows the supplied style guide: `#1D3045` navy on a pale ground
with white type on the dark bands, Helvetica Neue ME, uppercase wide-tracked light
headings on a `clamp()` scale, circular outline controls, the full-screen navy
overlay menu, and stagger reveals on `cubic-bezier(0.16, 1, 0.3, 1)`. The scroll-tied
background video from that guide is specific to the one-page site it describes and is
not used here — it would work against a reference document meant to be read on a phone
on mobile data.

The font loads from `db.onlinewebfonts.com`; if that request is blocked the page falls
back to Helvetica Neue / Helvetica / Arial and looks essentially the same.

## Note

This is a preparation guide, not legal, accounting or valuation advice. The
*promesa de compraventa* must be reviewed by a real-estate lawyer before signing.

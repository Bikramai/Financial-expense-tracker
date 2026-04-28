# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

No test runner is configured.

## Architecture

This is a single-page React 19 app built with Vite. All application logic lives in `src/App.jsx` — there are no separate components, hooks, or context files yet.

**State:** All state is in-memory React `useState` inside `App`. There is no persistence layer — data resets on page reload. The transaction list is seeded with hardcoded sample data.

**Transaction shape:** `{ id, description, amount, type ("income"|"expense"), category, date (YYYY-MM-DD) }`

**Categories** are a fixed array defined in `App.jsx`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

**Derived values** (totalIncome, totalExpenses, balance) are computed inline on each render. Note: `amount` is stored as a string in state, so arithmetic reductions using `+` will concatenate rather than sum — this is a known bug.

**Styling** is plain CSS in `src/App.css` using class names `.income-amount`, `.expense-amount`, `.balance-amount` for color coding.

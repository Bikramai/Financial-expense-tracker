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

This is a single-page React 19 app built with Vite.

### Component tree

```
App
├── Summary          (src/Summary.jsx)
├── TransactionForm  (src/TransactionForm.jsx)
└── TransactionList  (src/TransactionList.jsx)
```

**`App` (`src/App.jsx`):** Owns the `transactions` array and `categories` list. Passes `transactions` down to all three children and an `onAdd` callback to `TransactionForm`.

**`Summary` (`src/Summary.jsx`):** Receives `transactions` and derives `totalIncome`, `totalExpenses`, and `balance` internally. No local state.

**`TransactionForm` (`src/TransactionForm.jsx`):** Owns form field state (`description`, `amount`, `type`, `category`). Calls `onAdd(transaction)` on submit with a fully constructed transaction object.

**`TransactionList` (`src/TransactionList.jsx`):** Owns filter state (`filterType`, `filterCategory`). Receives `transactions` and `categories` as props, applies filters locally before rendering.

### Data

**Transaction shape:** `{ id, description, amount, type ("income"|"expense"), category, date (YYYY-MM-DD) }`

- `amount` is a number. `TransactionForm` parses form input with `parseFloat` on submit.
- The transaction list is seeded with hardcoded sample data in `App`. There is no persistence layer — data resets on page reload.

**Categories** are a fixed array defined in `App.jsx`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`. Passed as a prop to `TransactionForm` and `TransactionList`.

**Styling** is plain CSS in `src/App.css` using class names `.income-amount`, `.expense-amount`, `.balance-amount` for color coding.

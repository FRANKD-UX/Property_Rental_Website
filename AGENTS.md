# AGENTS.md

## Project snapshot
- Vite + React app; entry at `src/main.tsx` renders `src/app/App.tsx`.
- Routing uses `react-router` v7 `createBrowserRouter` in `src/app/routes.tsx` with `RootLayout` + nested pages.
- Global state is via React Contexts: auth (`src/app/context/AuthContext.tsx`) and properties (`src/app/context/PropertyContext.tsx`).

## Key flows and data
- Auth is client-only: `login()` sets a user in `localStorage`; admin access is checked by `user.isAdmin`.
- Admin gate: `AdminPage` redirects to `/` if not logged in/admin (`src/app/pages/AdminPage.tsx`).
- Properties are stored in `localStorage` and read in `HomePage` via `useProperties()`.
- Admin CRUD: `AdminPage` uses `addProperty/updateProperty/deleteProperty`; image upload becomes base64 and is stored in state/localStorage.

## UI and styling conventions
- Styling is Tailwind utility classes (see `src/styles/index.css` -> `tailwind.css` + `theme.css`).
- Base theme tokens and default typography live in `src/styles/theme.css`.
- Components are in `src/app/components`; many are single-file presentational components.
- UI primitives from `src/app/components/ui` (shadcn-style) are available but not always used directly.

## Assets and imports
- Vite config adds `@` alias to `src` and a `figma:asset/` resolver to `src/assets` (`vite.config.ts`).
- Global styles are imported once in `src/main.tsx`.

## Commands (from `package.json` / `README.md`)
- Install deps: `npm i`
- Dev server: `npm run dev`
- Production build: `npm run build`

## Example touchpoints
- Routing layout: `src/app/pages/RootLayout.tsx` wraps `Header` + `Footer` + `Outlet`.
- Auth-aware UI: `src/app/components/Header.tsx` shows admin links and login modal.
- Property display: `src/app/components/PropertyCard.tsx` and `src/app/pages/HomePage.tsx`.


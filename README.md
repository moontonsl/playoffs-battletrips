# MPL Battle Trips (Standalone)

Independent React website extracted from the MSL project. Includes the MPL Battle Trips registration form, MLBB account verification (Moonton login API), admin topic management, and the legacy MPLS16 mini-game page.

## Features

- **Main registration form** (`/`) — MPL Battle Trips submission with MLBB UID verification
- **Admin panel** (`/update`) — Manage topic dropdown options (access code: `3054`)
- **Legacy MPLS16 page** (`/mpls16`) — Earlier mini-game registration form
- **MLBB API integration** — Moonton login script for account verification

## Getting Started

Install dependencies:

```bash
npm install
```

Run the frontend and API together:

```bash
npm run dev:all
```

Or run separately in two terminals:

```bash
npm run dev:server   # API on http://localhost:3001
npm run dev          # Frontend on http://localhost:5173
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Main Battle Trips registration form |
| `/update` | Admin topic settings |
| `/mpls16` | Legacy MPLS16 mini-game form |
| `/MPLS18Battletrips` | Redirects to `/` |

## Build for Production

```bash
npm run build
npm run start        # API server
npm run preview      # Preview built frontend
```

For production, serve the `dist/` folder with any static host and run the Express API (`server/index.js`) separately. Topic data is stored in `data/topics.json`.

## Project Structure

```
battletrips/
├── data/topics.json          # Topic configuration (persisted)
├── public/                   # Images (logos, backgrounds)
├── server/index.js           # Express API for topics CRUD
└── src/
    ├── components/MLLogin.jsx  # Moonton MLBB login integration
    ├── pages/Battletrips.jsx   # Main form
    ├── pages/Update.jsx        # Admin panel
    └── pages/MPLS16Battletrips.jsx
```

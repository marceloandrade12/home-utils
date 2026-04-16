# home-utils

A React + Vite + TypeScript app prepared as a home utilities dashboard.

## Stack

- React 19 + TypeScript + Vite
- React Router for navigation
- Zustand for app state
- shadcn/ui foundation (with Tailwind CSS v4)

## Available pages

- Home
- Expenses
- Meals
- Caravan
- More

The layout is responsive:

- Desktop: left navigation sidebar
- Mobile: bottom navigation bar

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Run on Linux with PM2

### 1. Install dependencies

```bash
npm install
```

### 2. Build the app

```bash
npm run build
```

### 3. Start with PM2

```bash
npm run pm2:start
```

The app is served from the production build on port 4173.

### Useful PM2 commands

```bash
npm run pm2:reload
npm run pm2:stop
npm run pm2:status
npm run pm2:logs
npm run pm2:save
```

### Start automatically on boot

Run the PM2 startup command suggested for your Linux system and then save the process list:

```bash
npx pm2 startup
npm run pm2:save
```

### One-command deploy helper

```bash
./scripts/pm2-deploy.sh
```

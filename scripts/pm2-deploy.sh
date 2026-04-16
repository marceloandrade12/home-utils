#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Starting or reloading PM2 process..."
npx pm2 startOrReload ecosystem.config.cjs --env production
npx pm2 save

echo "PM2 status:"
npx pm2 status home-utils

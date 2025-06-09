#!/bin/bash
set -e

# Directory where the project repo is located on the server
REPO_DIR="/opt/hstojcheski-live"

FRONTEND_DIR="$REPO_DIR"
BACKEND_DIR="$REPO_DIR/hstojcheski-live-backend"

BRANCH="master"

# Update source
cd "$REPO_DIR"

git fetch origin
# Fast-forward to the latest commit
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

# --- Backend ---
cd "$BACKEND_DIR"
# Install new deps only if package.json changed
git diff --name-only HEAD@{1} HEAD | grep -q "package.json" && npm install --production

# Restart backend via pm2
pm2 reload hstojcheski-live-backend || pm2 start server.js --name hstojcheski-live-backend

# --- Frontend ---
cd "$FRONTEND_DIR"
# Install new deps only if package.json changed
git diff --name-only HEAD@{1} HEAD | grep -q "package.json" && npm install
npm run build
rsync -a --delete dist/ /var/www/html/


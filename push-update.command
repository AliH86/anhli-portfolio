#!/bin/bash
cd "$(dirname "$0")"

echo "🧹 Clearing git lock files..."
rm -f .git/index.lock .git/HEAD.lock .git/refs/heads/main.lock .git/packed-refs.lock

echo "📦 Staging changes..."
git add index.html

echo "💬 Committing..."
git commit -m "Update: Momo widget, scroll animations, Pinterest gallery, mobile fixes, Suno sync"

echo "🚀 Pushing to GitHub Pages..."
git push

echo ""
echo "✅ Done! Check https://alih86.github.io/anhli-portfolio/ in ~1 min"
read -p "Press Enter to close..."

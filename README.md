# AURA SOLEIL — Fine Footwear Atelier

A production-ready, Shopify-inspired footwear e-commerce storefront crafted with React, Vite, Tailwind CSS, and Lucide Icons.

## Features
- **Curated Footwear Catalog:** 20 distinct shoe models with filters (sneakers, loafers, boots, sandals, dress), sorting, and search.
- **Interactive Experience:** Live cart drawer, wishlist toggle, stock alerts, size & color selection, and checkout modal.
- **Persistence:** LocalStorage integration for cart items and saved wishlist items.
- **Responsive & Polished:** Built for mobile, tablet, and desktop viewports with a high-end luxury aesthetic.
- **GitHub Pages Ready:** Pre-configured with `.github/workflows/deploy.yml` and relative Vite base path.

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

## GitHub Deployment Instructions

1. Initialize Git and commit the files:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Aura Soleil footwear e-commerce"
   git branch -M main
   ```
2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
3. Enable GitHub Pages:
   - Go to your repository on GitHub -> **Settings** -> **Pages**.
   - Under **Build and deployment > Source**, select **GitHub Actions**.
   - Your site will deploy automatically within 2 minutes!

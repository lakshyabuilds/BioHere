# Architecture Overview

Pi-Store is built on a modern, serverless architecture using **Vite + React (TypeScript)** on the frontend and **Firebase** (Firestore and Authentication) for the backend. 

## 1. Core Modules

### A. The Admin Subsystem
*   **Global Catalog Management:** The platform owner uploads premium digital products, including a secure `fileUrl` and a `basePrice` (minimum margin).
*   **Order & Payout Management:** Admins view all sales, track creator performance, and process monthly payouts to users who meet the 3-sale threshold.

### B. The Creator Dashboard (SaaS App)
*   **Store Builder:** Creators personalize their storefront UI with logos, primary/secondary/accent colors, and bio. 
*   **Library/Catalog:** Creators browse the admin catalog and import products to their own stores defining a custom selling price (which must exceed the base price). 
*   **Wallet & Progress:** A gamified tracker shows earnings, payout progress (3 sales required per month), and allows creators to save UPI/Bank details.

### C. The Public Storefronts
*   **Dynamic Generation:** Consumer-facing stores are generated dynamically at `getpistore.vercel.app/s/:slug`.
*   **Secure Fulfillment:** Once a buyer purchases an item, they are shown a secure post-purchase screen with the direct download link. Download assets are never exposed directly inside the Creator Dashboard to prevent unauthorized redistribution.

## 2. Database Schema (Firestore)

*   `users`: Stores user profile data and subscription status (`active`, `trialing`).
*   `products` (Catalog): The admin master list of products.
*   `stores`: Creator storefront configurations (colors, logos, slugs).
*   `storeProducts`: The pivot table connecting a `storeId` with a `catalogProductId`. Stores custom creator pricing and optional text overrides.
*   `orders`: Records all purchases, splitting accounting between `basePrice`, `creatorProfit` (80% of margin), and `adminProfit` (20% of margin + basePrice).

## 3. Deployment
The application is designed to be hosted seamlessly on platforms like Cloud Run, Vercel, or Firebase Hosting. Environment variables dictate the Stripe and Firebase connections.

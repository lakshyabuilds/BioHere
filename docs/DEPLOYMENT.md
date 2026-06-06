# Deployment Guide

This document outlines the steps to deploy Pi-Store into a production environment.

## 1. Prerequisites

*   A Firebase project with Firestore, Authentication, and Hosting enabled.
*   A Stripe and/or Razorpay account for handling payment gateways.
*   A Node.js environment for building the application.

## 2. Environment Variables

Ensure the following variables are set in your production build environment (e.g., in Vercel, Cloud Run, or your CI/CD pipeline):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 3. Build & Deploy Strategy

### A. Application Build
Run the standard Vite build command to generate static assets:
```bash
npm run build
```
The output will be placed in the `dist/` folder.

### B. Firestore Rules & Indexes
Deploy the `firestore.rules` file to ensure client-side database access remains secure. 
```bash
firebase deploy --only firestore:rules
```

### C. Frontend Hosting
If using Firebase Hosting:
```bash
firebase deploy --only hosting
```
*(If using Vercel or Cloud Run, ensure that all routes fallback to `index.html` to support React Router's client-side routing).*

## 4. Payment Gateway Integration
Currently, the system is designed to allow the Admin (Platform Owner) to collect all payments using Stripe or Razorpay. Once a purchase is recorded in the `orders` collection, the Admin manually or via script distributes the 80% profit shares via UPI / Bank Transfers in the first week of every month.

## 5. Post-Deploy Validation
*   Verify the ₹1 7-day trial flow is operational.
*   Configure a dummy store to ensure custom colors (Primary, Secondary, Accent) render correctly on the `/s/:slug` route.
*   Verify JSON-LD and SEO tags correctly inject the Pi-Store metadata.

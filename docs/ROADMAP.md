# BioHere Roadmap

## Phase 1: MVP & Core Operations (Current)
*   **Authentication & Onboarding:** Secure login with subscription gates (₹1 trial, ₹99/month).
*   **Admin Tools:** Product Catalog management (CRUD operations for base products).
*   **Creator Dashboard:** Store builder (branding options) and Catalog integration.
*   **Public Storefronts:** Dynamic generation of consumer-facing stores (`/s/:slug`).
*   **Accounting Logic:** Gamified wallet with 80/20 profit splitting engine and progress trackers (3 sales requirement).

## Phase 2: Payment Gateway Full Integration (Next 30 Days)
*   Integrate official **Stripe & Razorpay** checkout sessions for real-time payment captures.
*   Automate the delivery UI to generate expiring, signed download links for buyers post-purchase to prevent link sharing.
*   Webhook listeners to automatically record `orders` in Firestore upon successful payment.

## Phase 3: Analytics & Conversion Tools (Days 30-90)
*   **Advanced Analytics:** Views, conversion rates, and cart abandonment stats in the Creator Dashboard.
*   **Discount Code Engine:** Allow creators to generate their own promo codes (cutting entirely into their own margins, protecting the base price).
*   **Pixel Tracking:** Allow creators to attach Meta and TikTok pixels to their storefronts for advanced retargeting.

## Phase 4: Platform Scale & Autonomous Payouts (Month 3-6)
*   **Automated Payouts:** Direct integration with Stripe Connect or Razorpay Route for automated 1st-of-month fund distribution to creators.
*   **Expanded Catalog:** Partnering with top-tier digital creators to syndicate their products into the BioHere base catalog.

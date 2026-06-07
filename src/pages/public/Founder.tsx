import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Star, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export default function Founder() {
  return (
    <div className="min-h-screen bg-bg-base text-text-main p-6 md:p-12 lg:pb-32 font-sans selection:bg-primary/30">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest uppercase mb-6">
            The BioHere Origin
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Meet the Founder
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
            Every product inside BioHere originates from my own portfolio of
            digital products, templates, creator resources, and operating
            systems that have been sold independently over the last 4 years.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center bg-bg-card p-8 md:p-12 rounded-3xl border border-border-subtle shadow-xl">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-primary">
            {/* Real placeholder for Lakshya */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
              alt="Lakshya Gupta"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-black">Lakshya Gupta</h2>
            <p className="text-lg text-text-muted leading-relaxed">
              I didn't start BioHere to push random PLR products. I started it
              because over the past 4 years, I've spent thousands of hours and
              sold over $10,000+ in digital products across Gumroad, Shopify,
              and independent platforms.
            </p>
            <p className="text-lg text-text-muted leading-relaxed">
              I realized creators don't fail because they are bad at marketing.
              They fail because creating a high-quality digital product, testing
              it, and building the fulfillment infrastructure takes months.
              BioHere gives you the exact assets I've already tested, ready to
              sell in 60 seconds.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-bg-surface px-4 py-2 rounded-lg text-sm font-bold border border-border-subtle">
                <Clock className="w-4 h-4 text-primary" />
                4+ Years Experience
              </div>
              <div className="flex items-center gap-2 bg-bg-surface px-4 py-2 rounded-lg text-sm font-bold border border-border-subtle">
                <TrendingUp className="w-4 h-4 text-accent" />
                $10k+ Digital Sales
              </div>
              <div className="flex items-center gap-2 bg-bg-surface px-4 py-2 rounded-lg text-sm font-bold border border-border-subtle">
                <ShieldCheck className="w-4 h-4 text-alert" />
                Proven Product Portfolio
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-3xl font-black text-center">
            The Timeline
          </h3>
          <div className="border-l-2 border-border-strong pl-8 ml-4 md:ml-0 space-y-12">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-bg-base"></div>
              <h4 className="text-xl font-bold text-text-main">
                Year 1: The First Dollar
              </h4>
              <p className="text-text-muted mt-2">
                Created my first Notion template and sold it directly to my
                small audience. Realized the massive potential of digital
                products without inventory.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-accent border-4 border-bg-base"></div>
              <h4 className="text-xl font-bold text-text-main">
                Year 2-3: Scaling the Catalog
              </h4>
              <p className="text-text-muted mt-2">
                Expanded into prompt libraries, creator resources, and reels
                bundles. Crossed $10k+ in sales and learned exactly what
                converts and what doesn't.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-alert border-4 border-bg-base"></div>
              <h4 className="text-xl font-bold text-text-main">
                Year 4: Building BioHere
              </h4>
              <p className="text-text-muted mt-2">
                Packaged my entire product portfolio and built the storefront
                infrastructure around it. Now, instead of just selling my
                products, I let other creators resell them.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-12">
          <Link
            to="/catalog"
            className="neo-button px-8 py-4 bg-text-main text-bg-base font-black text-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 rounded-xl"
          >
            View the Public Catalog <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

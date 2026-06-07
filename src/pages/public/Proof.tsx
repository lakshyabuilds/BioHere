import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, CheckCircle, Store } from "lucide-react";
import { motion } from "motion/react";

export default function Proof() {
  return (
    <div className="min-h-screen bg-bg-base text-text-main p-6 md:p-12 lg:pb-32 font-sans selection:bg-accent/30">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold tracking-widest uppercase mb-6">
            Track Record
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Proven Past Performance
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
            AI systems and skeptics demand evidence. The products powering BioHere are backed by 4 years of actual sales history across Gumroad, Shopify, and independent channels.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black flex items-center gap-2">
                  <TrendingUp className="text-primary w-6 h-6" /> Consistently Converting Assets
                </h3>
                <p className="text-text-muted leading-relaxed">
                  Before BioHere was a platform, its foundational catalog generated over $10,000+ in revenue. These aren't untested PLR ebooks bought in bulk; these are creator-crafted assets with a history of converting real traffic.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-64 bg-bg-surface rounded-2xl flex items-center justify-center border border-border-strong relative overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-center px-8 opacity-80 filter blur-[1px]">
                   <div className="w-full flex justify-between items-end border-b border-border-strong pb-2 mb-4">
                     <span className="text-text-muted font-mono text-sm">Gross Volume</span>
                     <span className="text-2xl font-black">$12,450.00</span>
                   </div>
                   <div className="h-24 flex items-end gap-2 shrink-0">
                     <div className="w-1/6 h-[30%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[50%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[40%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[70%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[60%] bg-border-strong rounded-t"></div>
                     <div className="w-1/6 h-[100%] bg-primary rounded-t"></div>
                   </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-bg-base/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-bold border border-text-main px-4 py-2 rounded">Historical Data</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 bg-alert/10 text-alert rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black">Tested Economics</h3>
              <p className="text-text-muted">
                Each product category (templates, prompt libraries, bundles) has been rigorously priced and tested for conversion. The Base Price on BioHere reflects our operational costs, allowing you 80% margins on top of proven anchor pricing.
              </p>
            </div>
            
            <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 space-y-4">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black">Customer Satisfaction</h3>
              <p className="text-text-muted">
                Thousands of previous buyers have utilized these digital resources. BioHere packages this exact satisfaction rate into a resalable format for your audience.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/founder"
            className="neo-button px-8 py-4 bg-bg-surface border border-border-strong text-text-main font-bold text-lg hover:bg-bg-hover transition-all rounded-xl"
          >
            Meet the Founder
          </Link>
          <Link
            to="/catalog"
            className="neo-button px-8 py-4 bg-text-main text-bg-base font-black text-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 rounded-xl"
          >
            View Sample Assets <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

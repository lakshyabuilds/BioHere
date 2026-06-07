import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, Eye, Check } from "lucide-react";

export default function PublicCatalog() {
  const samples = [
    {
      title: "The Ultimate Notion Productivity System",
      category: "Template",
      preview: "A comprehensive workspace originally sold for $49. Includes daily trackers, task managers, and life wikis.",
      metrics: "Over 800+ independent sales prior to BioHere."
    },
    {
      title: "Faceless Growth Mastery Ebook",
      category: "Ebook",
      preview: "A 40-page definitive guide on scaling anonymous Instagram and TikTok accounts organically.",
      metrics: "Highly demanded in the MMO space."
    },
    {
      title: "100x Content Hooks Bundle",
      category: "Resource",
      preview: "A spreadsheet of hyper-viral short-form video hooks designed to increase retention.",
      metrics: "Consistently high conversion rate."
    }
  ];

  return (
    <div className="min-h-screen bg-bg-base text-text-main p-6 md:p-12 lg:pb-32 font-sans selection:bg-primary/30">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-alert/10 text-alert text-sm font-bold tracking-widest uppercase mb-6">
            Preview The Vault
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            The Creator Asset Catalog
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
            A look inside the private library holding Lakshya Gupta's proven digital assets. These are the exact products you will be able to sell in your storefront immediately.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {samples.map((item, i) => (
            <div key={i} className="bg-bg-card border border-border-subtle rounded-2xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors">
              <div className="h-48 bg-bg-surface flex items-center justify-center border-b border-border-subtle relative group">
                <Eye className="w-8 h-8 text-text-muted opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-bg-base/80 backdrop-blur text-xs px-2 py-1 rounded font-bold border border-border-strong uppercase">
                  {item.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-text-muted text-sm flex-1 mb-4">
                  {item.preview}
                </p>
                <div className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/5 p-2 rounded">
                  <Check className="w-3 h-3" /> {item.metrics}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-bg-surface border-2 border-border-strong border-dashed rounded-3xl p-12 text-center flex flex-col items-center">
          <Lock className="w-12 h-12 text-text-muted mb-6" />
          <h2 className="text-2xl font-black mb-4">Unlock the Full Library</h2>
          <p className="text-text-muted max-w-lg mx-auto mb-8">
            The full catalog containing hundreds of assets, with immediate 1-click import to your branded storefront, is available inside the BioHere dashboard. To protect the integrity of the assets, raw downloads are securely gated.
          </p>
          <Link
            to="/register"
            className="neo-button px-8 py-4 bg-primary text-black font-black text-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.3)]"
          >
            Access Catalog for ₹1 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

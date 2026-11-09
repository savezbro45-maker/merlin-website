import React from 'react';
import { PRICING_PLANS } from '../data/siteData';
import { PricingPlan } from '../types';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            INVESTMENT & TIERS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple & Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Every business has unique requirements. We evaluate your custom scope, complexity, and timeline to provide an exact fixed-rate quote with zero hidden fees.
          </p>
        </div>

        {/* Three Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isBusiness = plan.tier === 'BUSINESS';
            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 transition-all duration-200 flex flex-col justify-between relative ${
                  isBusiness
                    ? 'bg-white border-2 border-blue-600 shadow-xl relative -translate-y-1 lg:-translate-y-2'
                    : 'bg-white border border-slate-200 shadow-2xs hover:shadow-md'
                }`}
              >
                {/* Popular Indicator for Business Plan */}
                {isBusiness && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Tier Title */}
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900">
                      {plan.tier}
                    </h3>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                      Tailored Quote
                    </span>
                  </div>

                  {/* Ideal For (exact from prompt) */}
                  <p className="text-xs font-semibold text-slate-700 mb-4">
                    {plan.idealFor}
                  </p>

                  {/* Scope summary */}
                  <p className="text-sm text-slate-600 leading-relaxed pb-6 mb-6 border-b border-slate-100">
                    {plan.scope}
                  </p>

                  {/* Required Specifications breakdown */}
                  <div className="space-y-3.5 mb-8 text-xs sm:text-sm">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-500 font-medium">Pages Included</span>
                      <span className="font-semibold text-slate-900 text-right">{plan.pages}</span>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-500 font-medium">Responsive Design</span>
                      <span className="font-semibold text-slate-900 text-right">{plan.responsiveDesign}</span>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-500 font-medium">SEO Setup</span>
                      <span className="font-semibold text-slate-900 text-right">{plan.seoSetup}</span>
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <span className="text-slate-500 font-medium">Revision Allowance</span>
                      <span className="font-semibold text-slate-900 text-right">{plan.revisions}</span>
                    </div>
                  </div>

                  {/* Included features list */}
                  <div className="pt-6 border-t border-slate-100 mb-8 space-y-2.5">
                    <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                      What's Included
                    </div>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact CTA Button (Per prompt: Request a Quote button) */}
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-3.5 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 ${
                      isBusiness
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Request a Quote for {plan.tier}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2.5">
                    Custom statement of work sent within 24h
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Guarantee note */}
        <div className="mt-14 max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>All packages include milestone-based billing, full intellectual property rights transfer, and 30-day post-launch support.</span>
        </div>

      </div>
    </section>
  );
};

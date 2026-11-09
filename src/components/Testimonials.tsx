import React from 'react';
import { TESTIMONIALS } from '../data/siteData';
import { Star, MessageSquareQuote, Info } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            CLIENT FEEDBACK
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            What People Say
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Our goal is long-term business partnerships built on precision, reliable communication, and exceptional web performance.
          </p>

          {/* Mandatory Transparency Disclaimer (Per prompt: Never present fictional testimonials as real client reviews) */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-800 text-left">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              <strong>Concept Demonstrations:</strong> The testimonials below represent simulated client feedback archetypes used for portfolio presentation until live client work is onboarded.
            </span>
          </div>
        </div>

        {/* Testimonials 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex flex-col justify-between hover:border-blue-300 hover:shadow-xs transition-all relative"
            >
              <div>
                {/* Blue Stars (No orange or yellow) & Quote Mark */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-blue-600 text-blue-600" />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-6 h-6 text-blue-200" />
                </div>

                {/* Quote Body */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-6 border-t border-slate-200/80">
                <div className="font-bold text-sm text-slate-900">{item.author}</div>
                <div className="text-xs text-slate-500">
                  {item.role} · <span className="text-slate-700 font-medium">{item.company}</span>
                </div>
                <div className="mt-2 text-[11px] font-mono text-blue-600">
                  Project: {item.projectType}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/siteData';
import { Check, ArrowRight } from 'lucide-react';

interface ProcessProps {
  onStartProject: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onStartProject }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="process" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            METHODOLOGY
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How We Bring Your Ideas to Life
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            A transparent, disciplined four-stage pipeline engineered to deliver your digital product on schedule and without surprises.
          </p>
        </div>

        {/* Horizontal Four-Step Process (desktop horizontal grid, mobile stacked) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {PROCESS_STEPS.map((stepItem, index) => {
            const isSelected = activeStep === index;
            return (
              <div
                key={stepItem.step}
                onClick={() => setActiveStep(index)}
                className={`rounded-2xl p-6 sm:p-7 border transition-all duration-200 cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-blue-50/60 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div>
                  {/* Step Number & Status Indicator */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-extrabold font-mono text-blue-600">
                      {stepItem.step}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      Phase {index + 1}
                    </span>
                  </div>

                  {/* Step Name */}
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {stepItem.name}
                  </h3>

                  {/* Summary (exact from prompt) */}
                  <p className="text-sm font-medium text-slate-700 mb-4">
                    {stepItem.summary}
                  </p>

                  {/* Expanded detail */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {stepItem.details}
                  </p>
                </div>

                {/* Milestones list */}
                <div className="pt-4 border-t border-slate-200/70 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                    Key Deliverables
                  </div>
                  {stepItem.milestones.map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Process Note */}
        <div className="mt-14 text-center">
          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <span>Start with Phase 01: Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

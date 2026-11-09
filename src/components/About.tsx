import React, { useState } from 'react';
import { ABOUT_DATA, SITE_INFO } from '../data/siteData';
import { Eye, Target, Compass, Check, ArrowRight } from 'lucide-react';

interface AboutProps {
  onStartProject: () => void;
}

export const About: React.FC<AboutProps> = ({ onStartProject }) => {
  const [activeTab, setActiveTab] = useState<'vision' | 'mission' | 'approach'>('vision');

  const tabContent = {
    vision: ABOUT_DATA.vision,
    mission: ABOUT_DATA.mission,
    approach: ABOUT_DATA.approach,
  };

  return (
    <section id="about" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            ABOUT THE STUDIO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            {ABOUT_DATA.heading}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed text-balance">
            {ABOUT_DATA.description}
          </p>
        </div>

        {/* Modern Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Tabbed Principles (Vision, Mission, Approach) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tab Selectors (buttons with functional click handlers) */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-xl max-w-md">
              <button
                type="button"
                onClick={() => setActiveTab('vision')}
                className={`flex-1 min-w-[100px] py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'vision'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>My Vision</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('mission')}
                className={`flex-1 min-w-[100px] py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'mission'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>My Mission</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('approach')}
                className={`flex-1 min-w-[100px] py-2.5 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'approach'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>My Approach</span>
              </button>
            </div>

            {/* Active Core Philosophy Card */}
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs min-h-[220px] flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  {tabContent[activeTab].title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {tabContent[activeTab].text}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Bespoke Architectural Engineering</span>
                <button
                  onClick={onStartProject}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer group"
                >
                  <span>Build with MERLIN</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Three Foundation Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {ABOUT_DATA.pillars.map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs font-mono font-bold text-blue-600 mb-1.5">0{idx + 1}.</div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">{pillar.title}</h4>
                  <p className="text-xs text-slate-500 leading-normal">{pillar.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Studio Metrics & Craftsmanship Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-2xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              {/* Subtle blue accent glow inside dark navy card */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="text-xs font-semibold text-blue-400 tracking-wider uppercase mb-3">
                  THE MERLIN STANDARD
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Where Craft Meets Modern Engineering.
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-8">
                  Unlike traditional agencies bogged down by bloated teams and sluggish communication, MERLIN operates as an agile, founder-led studio. You get direct collaboration, rapid prototyping, and websites built to commercial perfection.
                </p>

                {/* Key Studio Commitments */}
                <div className="space-y-4 border-t border-slate-800 pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Direct Communication & Fast Turnaround</div>
                      <div className="text-xs text-slate-400">Regular video async updates and direct communication throughout development.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Clean Code & Complete Ownership</div>
                      <div className="text-xs text-slate-400">100% intellectual property ownership with full source code handoff upon launch.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Post-Launch Support & Warranty</div>
                      <div className="text-xs text-slate-400">30-day technical assurance guaranteeing smooth operations after deployment.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Location: {SITE_INFO.location}</span>
                  <span className="font-semibold text-white">Est. {SITE_INFO.year}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

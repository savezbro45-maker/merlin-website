import React, { useState } from 'react';
import { SITE_INFO } from '../data/siteData';
import { ArrowRight, Sparkles, CheckCircle2, Layout, Monitor, Shield, Zap } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'metrics' | 'code'>('preview');

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50">
      {/* Subtle decorative radial blue wash background (no harsh colors) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-blue-50/80 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Small label: WELCOME TO MERLIN STUDIO */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>WELCOME TO MERLIN STUDIO</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6 text-balance">
              Building Digital Experiences That Move Businesses Forward.
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
              {SITE_INFO.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onStartProject}
                className="px-6 py-3.5 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 whitespace-nowrap"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreWork}
                className="px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 whitespace-nowrap"
              >
                <span>Explore My Work</span>
              </button>
            </div>

            {/* Trust Statement */}
            <div className="pt-6 border-t border-slate-200/80 w-full">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-700">{SITE_INFO.trustStatement}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Visual of Floating Website Mockups & Browser Windows */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Primary Browser Window Frame */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-300">
                {/* Browser Top Chrome */}
                <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
                  </div>
                  
                  {/* URL Bar */}
                  <div className="flex-1 max-w-xs mx-auto bg-white border border-slate-200/90 rounded-md px-3 py-1 text-xs text-slate-500 flex items-center justify-between font-mono">
                    <span className="truncate">merlinstudio.dev/platform</span>
                    <Shield className="w-3 h-3 text-blue-600 shrink-0 ml-1.5" />
                  </div>

                  {/* Mode switcher tabs inside the interactive mockup */}
                  <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-md">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                        activeTab === 'preview'
                          ? 'bg-white text-blue-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      UI
                    </button>
                    <button
                      onClick={() => setActiveTab('metrics')}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                        activeTab === 'metrics'
                          ? 'bg-white text-blue-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Perf
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors ${
                        activeTab === 'code'
                          ? 'bg-white text-blue-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Stack
                    </button>
                  </div>
                </div>

                {/* Mockup Window Interior */}
                <div className="p-5 sm:p-6 bg-slate-50/50 min-h-[320px]">
                  {activeTab === 'preview' && (
                    <div className="space-y-4">
                      {/* Mini Mockup Hero */}
                      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                              M
                            </div>
                            <span className="text-xs font-bold text-slate-900">Apex Growth Suite</span>
                          </div>
                          <span className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            Production Ready
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 bg-slate-200 rounded-sm w-3/4" />
                          <div className="h-2.5 bg-slate-100 rounded-sm w-full" />
                          <div className="h-2.5 bg-slate-100 rounded-sm w-5/6" />
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="h-7 px-3 bg-blue-600 text-white rounded text-[11px] font-medium flex items-center">
                            Launch Project
                          </div>
                          <div className="h-7 px-3 bg-slate-100 text-slate-700 rounded text-[11px] font-medium flex items-center">
                            View Case Study
                          </div>
                        </div>
                      </div>

                      {/* Mini Metrics 2-column Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                          <div className="text-[11px] font-medium text-slate-500 mb-1">Conversion Rate</div>
                          <div className="text-xl font-bold text-slate-900 tabular-nums">+142.8%</div>
                          <div className="text-[10px] text-blue-600 mt-1 font-medium">Bespoke Lead Intake Funnel</div>
                        </div>
                        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                          <div className="text-[11px] font-medium text-slate-500 mb-1">First Contentful Paint</div>
                          <div className="text-xl font-bold text-slate-900 tabular-nums">0.38s</div>
                          <div className="text-[10px] text-blue-600 mt-1 font-medium">Core Web Vitals Pass (100%)</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'metrics' && (
                    <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-semibold text-slate-900">Google Lighthouse Audit</span>
                        <span className="text-xs font-bold text-blue-600">Grade A+</span>
                      </div>
                      
                      <div className="space-y-2.5 pt-1">
                        <div>
                          <div className="flex justify-between text-xs text-slate-600 mb-1">
                            <span>Performance Score</span>
                            <span className="font-semibold text-slate-900">100 / 100</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-600 mb-1">
                            <span>Accessibility Standard</span>
                            <span className="font-semibold text-slate-900">100 / 100</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-600 mb-1">
                            <span>Best Practices</span>
                            <span className="font-semibold text-slate-900">100 / 100</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-600 mb-1">
                            <span>Search Engine Optimization (SEO)</span>
                            <span className="font-semibold text-slate-900">100 / 100</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full w-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'code' && (
                    <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs shadow-inner">
                      <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 mb-3">
                        <span className="text-[11px]">merlin.config.ts</span>
                        <span className="text-[10px] text-blue-400">Strict TypeScript</span>
                      </div>
                      <p className="text-slate-400">// Enterprise-grade production setup</p>
                      <p className="text-blue-300">export const <span className="text-white">MerlinEngine</span> = &#123;</p>
                      <p className="pl-4 text-slate-300">framework: <span className="text-blue-200">'React 19 + Vite'</span>,</p>
                      <p className="pl-4 text-slate-300">styling: <span className="text-blue-200">'Tailwind CSS'</span>,</p>
                      <p className="pl-4 text-slate-300">typography: <span className="text-blue-200">'Plus Jakarta Sans'</span>,</p>
                      <p className="pl-4 text-slate-300">responsiveness: <span className="text-blue-200">'Mobile-First Adaptive'</span>,</p>
                      <p className="pl-4 text-slate-300">security: <span className="text-blue-200">'Zero-Vulnerability Strict'</span>,</p>
                      <p className="text-blue-300">&#125;;</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Floating UI Elements & Satellite Badges (carefully positioned for visual depth) */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-xl border border-slate-200 p-3.5 shadow-lg items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">100% Fluid Responsive</div>
                  <div className="text-[11px] text-slate-500">Phones, Tablets & Desktops</div>
                </div>
              </div>

              <div className="hidden sm:flex absolute -top-5 -right-5 bg-white rounded-xl border border-slate-200 p-3.5 shadow-lg items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Sub-Second Delivery</div>
                  <div className="text-[11px] text-slate-500">Optimized asset bundles</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

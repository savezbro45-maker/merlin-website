import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, Monitor, Tablet, Smartphone, Check, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestSimilar: (category: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-600">
              <span>{project.category}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Demo Project</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {project.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Responsive Viewport Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setDeviceView('desktop')}
                title="Desktop View"
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  deviceView === 'desktop'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('tablet')}
                title="Tablet View"
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  deviceView === 'tablet'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('mobile')}
                title="Mobile View"
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  deviceView === 'mobile'
                    ? 'bg-white text-blue-600 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Interactive Responsive Device Simulator Window */}
          <div className="bg-slate-100 rounded-2xl p-4 sm:p-6 border border-slate-200 flex justify-center items-center overflow-hidden">
            <div
              className={`transition-all duration-300 bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden ${
                deviceView === 'desktop'
                  ? 'w-full'
                  : deviceView === 'tablet'
                  ? 'w-[520px] max-w-full'
                  : 'w-[320px] max-w-full'
              }`}
            >
              {/* Device Window Chrome */}
              <div className="bg-slate-200/90 px-3 py-2 border-b border-slate-300 flex items-center justify-between text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                </div>
                <span className="text-[10px] truncate max-w-[180px]">
                  https://demo.{project.id}.merlinstudio.dev
                </span>
                <span className="text-[10px] text-blue-600 font-bold uppercase">{deviceView}</span>
              </div>

              {/* Simulated Device Image */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-50">
                <img
                  src={project.image}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-lg font-bold text-slate-900">Project Overview</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.description}
              </p>

              <h4 className="text-sm font-bold text-slate-900 pt-2">Key Architecture & Features</h4>
              <div className="space-y-2">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Specifications */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Client Archetype</span>
                <div className="font-semibold text-slate-900 mt-0.5">{project.clientType}</div>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Deliverables</span>
                <div className="text-slate-700 mt-0.5 leading-relaxed">{project.deliverables}</div>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Technology Stack</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-medium text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantified stats */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-slate-400 font-medium block mb-2">Simulated Impact Metrics</span>
                <div className="grid grid-cols-2 gap-2">
                  {project.stats.map((s, idx) => (
                    <div key={idx} className="bg-white p-2 rounded border border-slate-200">
                      <div className="text-sm font-bold text-slate-900 tabular-nums">{s.value}</div>
                      <div className="text-[10px] text-slate-500">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Want a website with this design language and technical standard?
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestSimilar(project.category);
              }}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build Similar Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

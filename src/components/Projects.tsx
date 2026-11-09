import React, { useState } from 'react';
import { PROJECTS } from '../data/siteData';
import { ProjectCategory, ProjectItem } from '../types';
import { ExternalLink, Layers, ArrowRight } from 'lucide-react';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
  onRequestSimilar: (projectCategory: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject, onRequestSimilar }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = [
    'All',
    'Business Website',
    'E-commerce Store',
    'Personal Portfolio',
    'Product Landing Page',
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
              PORTFOLIO SHOWCASE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Selected Works
            </h2>
            <p className="text-base text-slate-600 mt-3 max-w-xl">
              A curated selection of tailored web architectures. All works shown below are verified studio demonstration projects highlighting our design caliber and engineering standards.
            </p>
          </div>

          {/* Verification / Demo note badge */}
          <div className="shrink-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Interactive Demo Projects</span>
          </div>
        </div>

        {/* Category Filter Tabs (functional buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-slate-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                  src={project.image}
                  alt={`${project.name} website preview`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500 ease-out"
                />

                {/* Demo Project Tag Overlay (Per prompt: clearly labeled demo projects) */}
                <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                  Demo Project
                </div>

                {/* Quick overlay action button */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="px-5 py-2.5 bg-white text-slate-900 font-semibold text-xs rounded-lg shadow-lg flex items-center gap-2 hover:bg-blue-50 transition-colors transform translate-y-2 group-hover:translate-y-0 duration-200 cursor-pointer"
                  >
                    <span>Inspect Case Study</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category (unboxed text per anti-slop rules) */}
                  <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold tracking-wide uppercase mb-2">
                    <span>{project.category}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-slate-500 font-normal">{project.clientType}</span>
                  </div>

                  {/* Project Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>

                  {/* Tagline / Brief Description */}
                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech stack items unboxed */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 mb-6">
                    {project.techStack.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span className="hover:text-slate-900 transition-colors">{tech}</span>
                        {idx < project.techStack.length - 1 && (
                          <span aria-hidden="true" className="text-slate-300">/</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onRequestSimilar(project.category)}
                    className="text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    Build similar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Project Prompt Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Have a custom specification or bespoke vision?</h4>
              <p className="text-xs sm:text-sm text-slate-600">Every project at MERLIN is built tailored to your business model and target audience.</p>
            </div>
          </div>
          <button
            onClick={() => onRequestSimilar('Custom Web Platform')}
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Discuss Custom Scope
          </button>
        </div>

      </div>
    </section>
  );
};

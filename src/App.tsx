/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { ProjectItem, ServiceItem, PricingPlan } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [prefilledWebsiteType, setPrefilledWebsiteType] = useState<string>('');
  const [prefilledPlan, setPrefilledPlan] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleStartProject = (prefillType?: string, planName?: string) => {
    if (prefillType) setPrefilledWebsiteType(prefillType);
    if (planName) setPrefilledPlan(planName);
    scrollToSection('contact');
  };

  const handleExploreWork = () => {
    scrollToSection('projects');
  };

  const handleSelectPlan = (plan: PricingPlan) => {
    setPrefilledPlan(plan.tier);
    if (plan.tier === 'STARTER') {
      setPrefilledWebsiteType('Landing Page Design');
    } else if (plan.tier === 'BUSINESS') {
      setPrefilledWebsiteType('Business Website');
    } else if (plan.tier === 'PREMIUM') {
      setPrefilledWebsiteType('E-commerce Website');
    }
    scrollToSection('contact');
  };

  const handleClearPrefills = () => {
    setPrefilledWebsiteType('');
    setPrefilledPlan('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col">
      {/* 1. Sticky Navigation Bar */}
      <Navbar onOpenContact={() => handleStartProject()} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onStartProject={() => handleStartProject()}
          onExploreWork={handleExploreWork}
        />

        {/* 3. About Section */}
        <About onStartProject={() => handleStartProject()} />

        {/* 4. Services Section */}
        <Services
          onSelectService={(service) => setSelectedService(service)}
          onRequestQuote={(serviceTitle) => handleStartProject(serviceTitle)}
        />

        {/* 5. Featured Projects Section */}
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
          onRequestSimilar={(category) => handleStartProject(category)}
        />

        {/* 6. Why Choose MERLIN Section */}
        <WhyChooseUs />

        {/* 7. Work Process Section */}
        <Process onStartProject={() => handleStartProject()} />

        {/* 8. Pricing Section */}
        <Pricing onSelectPlan={handleSelectPlan} />

        {/* 9. Testimonials Section */}
        <Testimonials />

        {/* 10. FAQ Section */}
        <FAQ onContactClick={() => handleStartProject()} />

        {/* 11. Contact Section */}
        <Contact
          prefilledWebsiteType={prefilledWebsiteType}
          prefilledPlan={prefilledPlan}
          onClearPrefills={handleClearPrefills}
        />
      </main>

      {/* 12. Footer */}
      <Footer
        onNavClick={(href) => scrollToSection(href.replace('#', ''))}
        onServiceClick={(serviceTitle) => handleStartProject(serviceTitle)}
      />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilar={(category) => {
          setSelectedProject(null);
          handleStartProject(category);
        }}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestService={(serviceTitle) => {
          setSelectedService(null);
          handleStartProject(serviceTitle);
        }}
      />
    </div>
  );
}

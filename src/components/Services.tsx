import React from 'react';
import { SERVICES } from '../data/siteData';
import { ServiceItem } from '../types';
import {
  Building2,
  ShoppingBag,
  Zap,
  UserCheck,
  RefreshCw,
  Smartphone,
  ArrowRight,
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, onRequestQuote }) => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-blue-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-blue-600" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-blue-600" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-blue-600" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-blue-600" />;
      default:
        return <Building2 className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            EXPERTISE & CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            What I Can Build For You
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Every digital product is designed with commercial purpose, built using modern web standards, and optimized for maximum speed and conversion.
          </p>
        </div>

        {/* 6 Professional Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Modern Icon & Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {renderIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0{index + 1}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>
              </div>

              {/* Functional Actions */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer group/btn"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => onRequestQuote(service.title)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

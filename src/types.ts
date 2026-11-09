export type ProjectCategory = 
  | 'All'
  | 'Business Website'
  | 'E-commerce Store'
  | 'Personal Portfolio'
  | 'Product Landing Page';

export interface ProjectItem {
  id: string;
  name: string;
  category: 'Business Website' | 'E-commerce Store' | 'Personal Portfolio' | 'Product Landing Page';
  tagline: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  stats: { label: string; value: string }[];
  accentColor: string;
  clientType: string;
  deliverables: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  idealFor: string;
}

export interface PricingPlan {
  id: string;
  tier: 'STARTER' | 'BUSINESS' | 'PREMIUM';
  idealFor: string;
  scope: string;
  pages: string;
  responsiveDesign: string;
  seoSetup: string;
  revisions: string;
  features: string[];
  popular?: boolean;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  projectType: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  businessName: string;
  websiteType: string;
  projectDetails: string;
  selectedPlan?: string;
  appointmentDate?: string;
  appointmentTime?: string;
}

import React, { useState, useEffect } from 'react';
import { ContactFormData } from '../types';
import { SITE_INFO } from '../data/siteData';
import {
  saveAppointment,
  checkSupabaseStatus,
  SUPABASE_PROJECT_ID,
  SUPABASE_SQL_SETUP,
  SaveAppointmentResult,
} from '../lib/supabase';
import {
  Mail,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Shield,
  RotateCcw,
  Calendar,
  Database,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  MessageCircle,
} from 'lucide-react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
  </svg>
);

interface ContactProps {
  prefilledWebsiteType?: string;
  prefilledPlan?: string;
  onClearPrefills?: () => void;
}

export const Contact: React.FC<ContactProps> = ({
  prefilledWebsiteType,
  prefilledPlan,
  onClearPrefills,
}) => {
  // Today's date in YYYY-MM-DD format for datepicker min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    businessName: '',
    websiteType: 'Business Website',
    projectDetails: '',
    selectedPlan: '',
    appointmentDate: '',
    appointmentTime: 'Morning (09:00 - 12:00)',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SaveAppointmentResult | null>(null);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isRetryingSync, setIsRetryingSync] = useState(false);
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; hasTable: boolean; tableName?: string } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SITE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(SITE_INFO.whatsappNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  // Check Supabase connection on load
  useEffect(() => {
    checkSupabaseStatus().then((status) => {
      setDbStatus(status);
    });
  }, []);

  // Update websiteType or plan if prefill changes
  useEffect(() => {
    if (prefilledWebsiteType) {
      setFormData((prev) => ({
        ...prev,
        websiteType: prefilledWebsiteType,
      }));
    }
    if (prefilledPlan) {
      setFormData((prev) => ({
        ...prev,
        selectedPlan: prefilledPlan,
        projectDetails: prev.projectDetails
          ? prev.projectDetails
          : `I am interested in booking an appointment for the ${prefilledPlan} package. Here are my project details: `,
      }));
    }
  }, [prefilledWebsiteType, prefilledPlan]);

  const websiteTypeOptions = [
    'Business Website',
    'E-commerce Website',
    'Landing Page Design',
    'Personal Portfolio',
    'Website Redesign',
    'Responsive Website Development',
    'Custom Web Application',
  ];

  const timeSlotOptions = [
    'Morning (09:00 - 12:00)',
    'Afternoon (13:00 - 17:00)',
    'Evening (17:00 - 20:00)',
  ];

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business or project name is required.';
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Please select a preferred appointment date.';
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Please share a few details about your project goals.';
    } else if (formData.projectDetails.trim().length < 15) {
      newErrors.projectDetails = 'Please provide a bit more detail (at least 15 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Connect and save into Supabase backend tables
      const result = await saveAppointment(formData);
      setSubmissionResult(result);
      setSubmittedData({ ...formData });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      setSubmissionResult({
        success: false,
        error: message,
        persistedLocally: true,
      });
      setSubmittedData({ ...formData });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleRetrySync = async () => {
    if (!submittedData) return;
    setIsRetryingSync(true);
    const result = await saveAppointment(submittedData);
    setSubmissionResult(result);
    setIsRetryingSync(false);
    // Refresh db status
    checkSupabaseStatus().then((s) => setDbStatus(s));
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      businessName: '',
      websiteType: 'Business Website',
      projectDetails: '',
      selectedPlan: '',
      appointmentDate: '',
      appointmentTime: 'Morning (09:00 - 12:00)',
    });
    setErrors({});
    if (onClearPrefills) onClearPrefills();
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
            APPOINTMENT & INTAKE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed text-balance">
            Let's discuss your idea and build something amazing together. Book an introductory discovery appointment or submit your project scope below.
          </p>

          {/* Quick Direct Actions Banner & Supabase Backend Integration Badge */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={SITE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp ({SITE_INFO.whatsappNumber})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${SITE_INFO.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>{SITE_INFO.email}</span>
            </a>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700">
              <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>
                Supabase: <code className="font-mono text-slate-900 font-semibold">{SUPABASE_PROJECT_ID}</code>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Functional Appointment Booking & Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs">
              
              {submissionResult ? (
                /* Post-Submission State (Saved to Supabase or Setup Required) */
                <div className="py-4 text-center animate-in fade-in duration-300">
                  
                  {submissionResult.success ? (
                    /* Direct Supabase Success */
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5 border border-blue-200">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        Appointment Booked & Saved to Supabase!
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                        Thank you, <span className="font-semibold text-slate-900">{submittedData?.fullName}</span>. Your appointment has been recorded directly into your Supabase <code className="text-blue-600 font-semibold font-mono">public.{submissionResult.table}</code> table.
                      </p>

                      {/* Summary of submitted request */}
                      <div className="bg-white rounded-xl p-5 border border-slate-200 text-left max-w-md mx-auto mb-6 text-xs space-y-2.5">
                        <div className="text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>Booking Confirmation</span>
                          <span className="font-mono text-blue-600 font-bold">{submissionResult.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Contact Email:</span>
                          <span className="font-semibold text-slate-900">{submittedData?.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Business / Brand:</span>
                          <span className="font-semibold text-slate-900">{submittedData?.businessName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Appointment Date:</span>
                          <span className="font-semibold text-blue-600">{submittedData?.appointmentDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Time Slot:</span>
                          <span className="font-semibold text-slate-900">{submittedData?.appointmentTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Website Type:</span>
                          <span className="font-semibold text-slate-900">{submittedData?.websiteType}</span>
                        </div>
                        {submittedData?.selectedPlan && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Package Tier:</span>
                            <span className="font-semibold text-slate-900">{submittedData.selectedPlan}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-slate-100 flex justify-between text-slate-500">
                          <span>Database Destination:</span>
                          <span className="font-mono font-medium text-slate-700">cftpattxoelfpzicxbdr.supabase.co</span>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 max-w-md mx-auto text-xs text-blue-800 text-left mb-6 flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>
                          A calendar invite and preparation briefing will be dispatched to <strong>{submittedData?.email}</strong> prior to your scheduled consultation.
                        </span>
                      </div>
                    </>
                  ) : (
                    /* Table Not Created in Supabase Yet — Helpful Setup Assistant */
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-5 border border-blue-200">
                        <Database className="w-8 h-8" />
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        Appointment Captured Locally!
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                        We have securely saved <span className="font-semibold text-slate-900">{submittedData?.fullName}</span>'s appointment details. To store them permanently in Supabase, your project requires the <code className="font-mono font-semibold text-blue-600">appointments</code> table.
                      </p>

                      {/* SQL Setup Helper Card */}
                      <div className="bg-white rounded-xl p-5 border border-slate-200 text-left max-w-lg mx-auto mb-6 text-xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-900 uppercase tracking-wider">
                            1-Click Supabase Table Setup
                          </span>
                          <button
                            type="button"
                            onClick={handleCopySql}
                            className="px-2.5 py-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Copy className="w-3 h-3" />
                            <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL'}</span>
                          </button>
                        </div>

                        <p className="text-slate-500 mb-3">
                          Copy the SQL snippet below and paste it into your Supabase SQL editor:
                        </p>

                        <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto max-h-40 border border-slate-800">
                          <pre>{SUPABASE_SQL_SETUP}</pre>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                          <a
                            href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors text-xs"
                          >
                            <span>Open Supabase SQL Editor</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={handleRetrySync}
                            disabled={isRetryingSync}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-xs cursor-pointer disabled:opacity-50"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isRetryingSync ? 'animate-spin' : ''}`} />
                            <span>{isRetryingSync ? 'Syncing...' : 'Sync to Supabase Now'}</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Book Another Appointment / Submit Scope</span>
                  </button>
                </div>
              ) : (
                /* Active Appointment Booking & Project Request Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  
                  {/* Prefill Notice Banner */}
                  {(prefilledPlan || prefilledWebsiteType) && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-xs text-blue-800">
                      <span>
                        Customizing quote & appointment for: <strong>{prefilledPlan || prefilledWebsiteType}</strong>
                      </span>
                      {onClearPrefills && (
                        <button
                          type="button"
                          onClick={onClearPrefills}
                          className="text-blue-600 hover:text-blue-900 underline font-medium cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  )}

                  {/* Row 1: Full Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Full Name <span className="text-blue-600">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        placeholder="Sarah Jenkins"
                        className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all ${
                          errors.fullName ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.fullName && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-700 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Email Address <span className="text-blue-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="sarah@company.com"
                        className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all ${
                          errors.email ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.email && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-700 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Business Name & Website Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="businessName" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Business Name <span className="text-blue-600">*</span>
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => {
                          setFormData({ ...formData, businessName: e.target.value });
                          if (errors.businessName) setErrors({ ...errors, businessName: '' });
                        }}
                        placeholder="Company or Brand Name"
                        className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all ${
                          errors.businessName ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.businessName && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-700 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.businessName}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="websiteType" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Website Type <span className="text-blue-600">*</span>
                      </label>
                      <select
                        id="websiteType"
                        value={formData.websiteType}
                        onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                        className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer"
                      >
                        {websiteTypeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Appointment Date & Time Slot (Explicit Appointment Booking Controls) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl bg-white border border-slate-200">
                    <div>
                      <label htmlFor="appointmentDate" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>Preferred Appointment Date <span className="text-blue-600">*</span></span>
                      </label>
                      <input
                        id="appointmentDate"
                        type="date"
                        min={todayStr}
                        value={formData.appointmentDate || ''}
                        onChange={(e) => {
                          setFormData({ ...formData, appointmentDate: e.target.value });
                          if (errors.appointmentDate) setErrors({ ...errors, appointmentDate: '' });
                        }}
                        className={`w-full px-3.5 py-2.5 bg-slate-50 rounded-lg border text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all ${
                          errors.appointmentDate ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.appointmentDate && (
                        <div className="flex items-center gap-1.5 text-xs text-blue-700 mt-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.appointmentDate}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="appointmentTime" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>Preferred Time Slot <span className="text-blue-600">*</span></span>
                      </label>
                      <select
                        id="appointmentTime"
                        value={formData.appointmentTime || 'Morning (09:00 - 12:00)'}
                        onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer"
                      >
                        {timeSlotOptions.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Project Details */}
                  <div>
                    <label htmlFor="projectDetails" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Project Details & Consultation Goals <span className="text-blue-600">*</span>
                    </label>
                    <textarea
                      id="projectDetails"
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) => {
                        setFormData({ ...formData, projectDetails: e.target.value });
                        if (errors.projectDetails) setErrors({ ...errors, projectDetails: '' });
                      }}
                      placeholder="Share your goals, target timeline, requirements, or any reference websites for our discovery call..."
                      className={`w-full px-4 py-3 bg-white rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 transition-all ${
                        errors.projectDetails ? 'border-blue-500 bg-blue-50/20' : 'border-slate-200'
                      }`}
                    />
                    {errors.projectDetails && (
                      <div className="flex items-center gap-1.5 text-xs text-blue-700 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.projectDetails}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed active:scale-99"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Saving to Supabase Database...</span>
                        </>
                      ) : (
                        <>
                          <span>Book Appointment & Send Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 mt-3">
                      <Database className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>Data automatically writes to Supabase database table `public.appointments`</span>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Studio Information & Supabase Backend Specs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Professional Contact Information Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-7 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="text-xs font-semibold text-blue-400 tracking-wider uppercase mb-2">
                DIRECT CONTACT CHANNELS
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Get in Touch Directly.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Choose the communication channel that works best for your schedule. Instant messaging via WhatsApp or formal RFPs via Email.
              </p>

              {/* Direct Channels Grid */}
              <div className="space-y-4 border-t border-slate-800 pt-6 text-xs sm:text-sm">
                
                {/* 1. WhatsApp Contact Block */}
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                        <WhatsAppIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] text-slate-400 font-medium">Instant WhatsApp Chat</div>
                        <div className="font-bold text-white text-sm tracking-wide font-mono">
                          {SITE_INFO.whatsappNumber}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      title="Copy WhatsApp number"
                    >
                      {copiedPhone ? (
                        <>
                          <Check className="w-3 h-3 text-blue-400" />
                          <span className="text-blue-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Primary WhatsApp Contact Button */}
                  <a
                    href={SITE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer active:scale-98"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Open Chat on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
                  </a>
                </div>

                {/* 2. Clickable Email Address Block */}
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] text-slate-400 font-medium">Direct Studio Email</div>
                        <a
                          href={`mailto:${SITE_INFO.email}`}
                          className="font-bold text-white text-sm hover:text-blue-400 transition-colors truncate block"
                        >
                          {SITE_INFO.email}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                      title="Copy email address"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-blue-400" />
                          <span className="text-blue-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href={`mailto:${SITE_INFO.email}`}
                    className="w-full py-2.5 px-4 bg-slate-700/80 hover:bg-slate-700 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-600/70"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-300" />
                    <span>Send Email directly</span>
                  </a>
                </div>

                {/* Response Guarantee & Location Info */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Response Time</span>
                    </div>
                    <div className="font-semibold text-white text-xs">{SITE_INFO.responseGuarantee}</div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>Location</span>
                    </div>
                    <div className="font-semibold text-white text-xs">Global Remote</div>
                  </div>
                </div>

              </div>

              {/* Supabase Integration Details */}
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-2 text-xs">
                <div className="text-slate-400 font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>Supabase Backend Config</span>
                  <span className="text-blue-400 font-mono text-[10px]">Active</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60 font-mono text-[11px] space-y-1 text-slate-300">
                  <div>Project: <span className="text-white">{SUPABASE_PROJECT_ID}</span></div>
                  <div>Table: <span className="text-blue-300">public.appointments</span></div>
                  <div>Auth: <span className="text-slate-400">Publishable Key Configured</span></div>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">
                  Follow & Connect
                </div>
                <div className="flex items-center gap-3">
                  {['GitHub', 'LinkedIn', 'Twitter / X', 'Dribbble'].map((platform) => (
                    <span
                      key={platform}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
                      title={`${platform} profile placeholder`}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Quality Commitment Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <span>The MERLIN Client Promise</span>
              </div>
              <p>
                We accept only a limited number of client engagements at a time to guarantee uninterrupted focus, senior-level architectural design, and meticulous craftsmanship on every deliverable.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

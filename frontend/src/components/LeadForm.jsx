import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { API_BASE_URL } from '../config';

const LeadForm = ({ title = "Request an Instant Quote", subtitle = "Enter transport details below and our dispatch team will contact you in 15 minutes." }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    source: '',
    destination: '',
    materialType: '',
    weight: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Frontend validation
    if (!formData.name || !formData.phone || !formData.source || !formData.destination || !formData.materialType) {
      setError("Please fill out all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong. Please try again.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        source: '',
        destination: '',
        materialType: '',
        weight: '',
        message: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to submit inquiry. Please connect via phone or WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-xl border border-white/10 dark:border-brand-slate-800/40 relative overflow-hidden">
      {/* Decorative gradient accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue-500/10 rounded-full blur-2xl" />

      <h3 className="font-outfit font-extrabold text-2xl text-brand-slate-900 dark:text-white mb-2 relative z-10">
        {title}
      </h3>
      <p className="text-sm text-brand-slate-500 dark:text-brand-slate-400 mb-6 relative z-10 leading-relaxed">
        {subtitle}
      </p>

      {success ? (
        <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in relative z-10">
          <CheckCircle className="h-16 w-16 text-emerald-500 mb-4 animate-bounce" />
          <h4 className="font-outfit font-bold text-xl text-brand-slate-900 dark:text-white mb-2">
            Inquiry Submitted Successfully!
          </h4>
          <p className="text-sm text-brand-slate-500 dark:text-brand-slate-400 max-w-xs leading-relaxed">
            Our logistics coordinator is reviewing your route and cargo details. We will call you shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 text-sm font-bold text-brand-blue-500 hover:text-brand-blue-600 transition-colors"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-100 dark:border-red-950/30">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-brand-slate-600 dark:text-brand-slate-350 uppercase tracking-wider mb-1.5">
                Full Name <span className="text-brand-orange-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rajesh Kumar"
                className="w-full px-4 py-2.5 rounded-lg border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 transition-all"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-brand-slate-600 dark:text-brand-slate-355 uppercase tracking-wider mb-1.5">
                Phone Number <span className="text-brand-orange-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +91 91420 21216"
                className="w-full px-4 py-2.5 rounded-lg border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Source */}
            <div>
              <label className="block text-xs font-bold text-brand-slate-600 dark:text-brand-slate-355 uppercase tracking-wider mb-1.5">
                Source City <span className="text-brand-orange-500">*</span>
              </label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                placeholder="e.g. Jamshedpur"
                className="w-full px-4 py-2.5 rounded-lg border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 transition-all"
                required
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-bold text-brand-slate-600 dark:text-brand-slate-355 uppercase tracking-wider mb-1.5">
                Destination City <span className="text-brand-orange-500">*</span>
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g. Kolkata"
                className="w-full px-4 py-2.5 rounded-lg border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Material Type */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-brand-slate-600 dark:text-brand-slate-355 uppercase tracking-wider mb-1.5">
                Material Type <span className="text-brand-orange-500">*</span>
              </label>
              <input
                type="text"
                name="materialType"
                value={formData.materialType}
                onChange={handleChange}
                placeholder="e.g. Steel Sheets, Iron Scrap, Pipes"
                className="w-full px-4 py-2.5 rounded-lg border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 transition-all"
                required
              />
            </div>

            {/* Approximate Weight */}
            <div>
              <label className="block text-xs font-bold text-brand-slate-600 dark:text-brand-slate-355 uppercase tracking-wider mb-1.5">
                Cargo Weight
              </label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g. 25 Tons"
                className="w-full px-4 py-2.5 rounded-lg border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-brand-slate-600 dark:text-brand-slate-355 uppercase tracking-wider mb-1.5">
              Email Address (Optional)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. buyer@company.com"
              className="w-full px-4 py-2.5 rounded-lg border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 transition-all"
            />
          </div>

          {/* Message / Remarks */}
          <div>
            <label className="block text-xs font-bold text-brand-slate-600 dark:text-brand-slate-355 uppercase tracking-wider mb-1.5">
              Special Handling Notes / Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Add loading requirements, helper requests, or schedule details..."
              rows="3"
              className="w-full px-4 py-2.5 rounded-lg border border-brand-slate-200 dark:border-brand-slate-800 bg-white/50 dark:bg-brand-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue-500 transition-all resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-accent flex items-center justify-center gap-2 py-3 text-sm font-bold disabled:bg-brand-orange-500/50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                Processing quote...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Quote Request
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default LeadForm;

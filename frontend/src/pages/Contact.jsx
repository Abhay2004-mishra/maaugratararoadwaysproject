import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import LeadForm from '../components/LeadForm';

const Contact = () => {
  return (
    <div className="bg-brand-slate-50 dark:bg-brand-slate-950 min-h-screen py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-brand-orange-500 font-bold text-xs uppercase tracking-widest bg-brand-orange-500/10 px-3 py-1 rounded-full inline-block border border-brand-orange-500/20 mb-4"
        >
          Connect With Dispatch
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-brand-slate-900 dark:text-white"
        >
          Contact Our Booking Branch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-brand-slate-500 dark:text-brand-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          Request freight quotes, ask billing questions, or connect with our Jamshedpur logistics dispatch center.
        </motion.p>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-outfit font-extrabold text-2xl text-brand-slate-900 dark:text-white mb-6">
              Jamshedpur Head Office
            </h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-brand-blue-50 dark:bg-brand-slate-900 text-brand-blue-500 border border-brand-blue-100 dark:border-brand-slate-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-sm text-brand-slate-400 uppercase tracking-wide">Office Address</h4>
                  <p className="text-sm text-brand-slate-805 dark:text-brand-slate-200 leading-snug mt-1 font-semibold">
                    Maa Ugra Tara Roadways<br />
                    Long Town Basti, Burmamines,<br />
                    Jamshedpur, Jharkhand - 831007
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-brand-blue-50 dark:bg-brand-slate-900 text-brand-blue-500 border border-brand-blue-105 dark:border-brand-slate-800 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-sm text-brand-slate-400 uppercase tracking-wide">Phone Contacts</h4>
                  <div className="mt-1 flex flex-col font-semibold text-brand-slate-805 dark:text-brand-slate-200 text-sm">
                    <a href="tel:+919142021216" className="hover:text-brand-orange-500 transition-colors">Booking Desk: +91 9142021216</a>
                    <a href="tel:+919110919823" className="hover:text-brand-orange-500 transition-colors">Dispatch Support: +91 9110919823</a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-brand-blue-50 dark:bg-brand-slate-900 text-brand-blue-500 border border-brand-blue-105 dark:border-brand-slate-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-sm text-brand-slate-400 uppercase tracking-wide">Email Enquiries</h4>
                  <div className="mt-1 flex flex-col font-semibold text-brand-slate-805 dark:text-brand-slate-200 text-sm">
                    <a href="mailto:info@maaugratararoadways.com" className="hover:text-brand-orange-500 transition-colors">info@maaugratararoadways.com</a>
                    <a href="mailto:dispatch@maaugratararoadways.com" className="hover:text-brand-orange-500 transition-colors">dispatch@maaugratararoadways.com</a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4">
                <div className="w-11 h-11 rounded-lg bg-brand-blue-50 dark:bg-brand-slate-900 text-brand-blue-500 border border-brand-blue-105 dark:border-brand-slate-800 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-sm text-brand-slate-400 uppercase tracking-wide">Operating Hours</h4>
                  <p className="text-sm text-brand-slate-805 dark:text-brand-slate-200 leading-snug mt-1 font-semibold">
                    Office Branch: Mon - Sat (9:00 AM - 8:00 PM)<br />
                    Vehicle Dispatch: 24x7 Operations Support
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-5 bg-brand-blue-50/50 dark:bg-brand-slate-900/50 rounded-2xl border border-brand-blue-100 dark:border-brand-slate-800 space-y-4">
              <h3 className="font-outfit font-bold text-base text-brand-slate-900 dark:text-white">
                Urgent Loading?
              </h3>
              <p className="text-xxs text-brand-slate-500 dark:text-brand-slate-400 leading-relaxed">
                Connect directly on WhatsApp for immediate truck assignments. Send your source yard, drop location, and scrap/steel tonnage.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/919142021216?text=Hello%2C%20we%20have%20an%20urgent%20industrial%20load%20dispatch%20requirement%20from%20Jamshedpur."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  <MessageSquare className="h-4 w-4 fill-white" />
                  WhatsApp Dispatch
                </a>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <LeadForm title="Send a Quick Message" subtitle="For corporate billing, vehicle leasing, or rate quote schedules, fill in the details." />
          </div>

        </div>
      </section>

      {/* Google Map Embedded */}
      <section className="w-full h-[400px] border-t border-brand-slate-200 dark:border-brand-slate-800 relative">
        {/* Real coordinates mapping Jamshedpur Burmamines locality */}
        <iframe
          title="Maa Ugra Tara Roadways Jamshedpur Office Location"
          src="https://maps.google.com/maps?q=Long%20Town%20Basti,%20Burmamines,%20Jamshedpur&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="filter grayscale dark:invert dark:opacity-80 transition-all duration-300"
        />
        {/* Overlay compliance marker */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-brand-slate-900/90 backdrop-blur-md py-2 px-3 rounded-lg border border-brand-slate-200/50 dark:border-brand-slate-800/80 shadow-md text-xxs font-bold text-brand-slate-800 dark:text-white flex items-center gap-1.5 z-10">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>GSTIN: 20AAAFM9415A1ZD</span>
        </div>
      </section>
    </div>
  );
};

export default Contact;

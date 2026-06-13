import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileDown, FileText, CheckCircle, RefreshCw, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const Compliance = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/documents')
      .then(res => res.json())
      .then(data => {
        setDocuments(data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Using default fallback documents");
        setDocuments([
          {
            title: "Maa Ugra Tara Roadways GST Certificate",
            description: "GST Identification Number registration document verifying compliance and licensing status.",
            fileUrl: "/uploads/mock-gst-certificate.pdf",
            fileType: "pdf"
          },
          {
            title: "Standard Consignment Note & Challan Process",
            description: "Overview document describing company liability, delivery conditions, and digital challan steps.",
            fileUrl: "/uploads/mock-challan-template.pdf",
            fileType: "pdf"
          }
        ]);
        setLoading(false);
      });
  }, []);

  const steps = [
    {
      step: "01",
      title: "Consignment Booking",
      desc: "Our booking desk logs routing stations, weight scales, and material description. E-way bill validation occurs prior to dispatch."
    },
    {
      step: "02",
      title: "Loading & Weight Audit",
      desc: "At Jamshedpur yards, our ground officer audits vehicle chassis loading, apply rubber layers for metal sheets, and secure heavy tension chains."
    },
    {
      step: "03",
      title: "Digital Challan Generation",
      desc: "A formal Maa Ugra Tara Roadways Challan is issued with details of goods, pilot credentials, vehicle number, and dispatch logs."
    },
    {
      step: "04",
      title: "Safe Highway Transit",
      desc: "Pilots cross state lines under strict route monitoring. Direct toll integrations bypass checkpoint hold-ups."
    },
    {
      step: "05",
      title: "Signed Delivery Copy Return",
      desc: "Upon delivery, the consignee signs the receiving copy of the challan. Our dispatcher returns a digital scanned copy immediately to the client."
    }
  ];

  return (
    <div className="bg-white dark:bg-brand-slate-950 min-h-screen py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-brand-orange-500 font-bold text-xs uppercase tracking-widest bg-brand-orange-500/10 px-3 py-1 rounded-full inline-block border border-brand-orange-500/20 mb-4"
        >
          Trust & Legality
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-brand-slate-900 dark:text-white"
        >
          Compliance & Challans
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-brand-slate-500 dark:text-brand-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          GST registration details, legal transport licensing, and our professional cargo challan workflow.
        </motion.p>
      </section>

      {/* Challan Workflow Walkthrough */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-lg mx-auto mb-16 space-y-2">
          <span className="text-brand-blue-500 font-extrabold text-xs uppercase tracking-widest">Step-by-step Security</span>
          <h2 className="font-outfit font-extrabold text-3xl text-brand-slate-900 dark:text-white">Our Transport Challan Process</h2>
          <p className="text-xs text-brand-slate-400">
            How we manage consignments from Jamshedpur industrial yards to destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((item, idx) => (
            <div key={idx} className="relative glass-card p-6 rounded-2xl border border-brand-slate-100 dark:border-brand-slate-900 shadow-sm flex flex-col justify-between group hover:border-brand-orange-500/35 transition-colors duration-300">
              {/* Connector line design */}
              {idx < 4 && (
                <div className="hidden md:block absolute top-1/2 -right-[15px] -translate-y-1/2 w-6 h-[2px] bg-brand-slate-200 dark:bg-brand-slate-800 z-10" />
              )}
              <div>
                <span className="text-4xl font-extrabold text-brand-blue-500/20 dark:text-brand-blue-500/10 group-hover:text-brand-orange-500/30 transition-colors block mb-4">
                  {item.step}
                </span>
                <h3 className="font-outfit font-bold text-base text-brand-slate-900 dark:text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xxs text-brand-slate-500 dark:text-brand-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-slate-100 dark:border-brand-slate-850 flex items-center gap-1 text-[10px] font-bold text-brand-orange-500 uppercase">
                <CheckCircle className="h-3.5 w-3.5" /> Verified step
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Downloadable Documents Section */}
      <section className="py-16 bg-brand-slate-50 dark:bg-brand-slate-900/30 border-y border-brand-slate-100 dark:border-brand-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Info panel */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-brand-orange-500 font-bold text-xs uppercase tracking-widest bg-brand-orange-500/10 px-3 py-1 rounded-full border border-brand-orange-500/20 inline-block">
                Tax & Legal Audit
              </span>
              <h2 className="font-outfit font-extrabold text-3xl text-brand-slate-900 dark:text-white leading-tight">
                Download Compliance Certificates
              </h2>
              <p className="text-sm text-brand-slate-655 dark:text-brand-slate-400 leading-relaxed">
                We maintain active tax registrations, central e-way accounts, and logistics licenses. Corporate buyers can download our GST documentation and transport templates below.
              </p>
              <div className="flex items-center gap-3 text-xs font-bold text-brand-slate-600 dark:text-brand-slate-350">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <span>Verified by Professional Accountants</span>
              </div>
            </div>

            {/* Document List */}
            <div className="lg:col-span-7 space-y-4">
              {loading ? (
                <div className="text-center py-8 text-brand-slate-400 font-semibold animate-pulse">
                  Loading certificate list...
                </div>
              ) : (
                documents.map((doc, idx) => (
                  <div key={idx} className="bg-white dark:bg-brand-slate-900 p-5 rounded-2xl border border-brand-slate-200/60 dark:border-brand-slate-800/80 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-orange-50 dark:bg-brand-orange-950/20 text-brand-orange-500 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-outfit font-bold text-sm sm:text-base text-brand-slate-900 dark:text-white">
                          {doc.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-brand-slate-550 dark:text-brand-slate-400 line-clamp-1 mt-0.5">
                          {doc.description || "Official company document for compliance verification."}
                        </p>
                      </div>
                    </div>
                    {/* Trigger download */}
                    <a
                      href={doc.fileUrl.startsWith('/') ? `http://localhost:5001${doc.fileUrl}` : doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary py-2 px-3 hover:bg-brand-slate-100 flex items-center gap-1 text-xs font-bold text-brand-blue-500"
                    >
                      <FileDown className="h-4 w-4" />
                      Download
                    </a>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Compliance;

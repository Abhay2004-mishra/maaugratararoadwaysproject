import React from 'react';
import { Target, Compass, Award, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const timelineMilestones = [
    {
      year: '2001',
      title: 'Company Foundation',
      description: 'Maa Ugra Tara Roadways started in Jamshedpur with just two flatbed trucks hauling local scrap materials for foundry yards.'
    },
    {
      year: '2008',
      title: 'Inter-State Route Expansion',
      description: 'Successfully mapped transport links to Kolkata and Bhubaneswar, expanding fleet capacity to support regular iron ore hauls.'
    },
    {
      year: '25 Years',
      title: 'Corporate Partnerships',
      description: 'Signed agreements with major manufacturing suppliers and steel distributors, providing dedicated trucks and drivers.'
    },
    {
      year: '2019',
      title: 'Digitalization & GST Compliant',
      description: 'Launched digital challan logs and billing, acquiring national permits and standard compliance certifications.'
    },
    {
      year: '2026',
      title: '25+ Years of Excellence',
      description: 'Serving as Jamshedpur’s reliable heavy freight transporter, handling over 1,000 yearly runs with zero transit losses.'
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
          Company History & Purpose
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-brand-slate-900 dark:text-white"
        >
          25+ Years of Trusted Transport
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-brand-slate-500 dark:text-brand-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          Connecting steel mills, industrial warehouses, and manufacturing hubs across Eastern India since 2001.
        </motion.p>
      </section>

      {/* Main Mission/Vision Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border-brand-slate-100 dark:border-brand-slate-900 shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue-500/5 rounded-full blur-xl" />
            <div className="w-12 h-12 rounded-lg bg-brand-blue-500 text-white flex items-center justify-center mb-6 shadow-sm">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="font-outfit font-extrabold text-2xl text-brand-slate-900 dark:text-white mb-3">
              Our Dedicated Mission
            </h2>
            <p className="text-sm text-brand-slate-600 dark:text-brand-slate-405 leading-relaxed">
              To supply premium, safe, and highly efficient freight logistics solutions for heavy metal manufacturers and industrial enterprises. We aim to secure client supply chains by ensuring zero delay, verified route compliance, and instant, transparent communication.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border-brand-slate-100 dark:border-brand-slate-900 shadow-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange-500/5 rounded-full blur-xl" />
            <div className="w-12 h-12 rounded-lg bg-brand-orange-500 text-white flex items-center justify-center mb-6 shadow-sm">
              <Compass className="h-6 w-6" />
            </div>
            <h2 className="font-outfit font-extrabold text-2xl text-brand-slate-900 dark:text-white mb-3">
              Our Vision for Freight
            </h2>
            <p className="text-sm text-brand-slate-600 dark:text-brand-slate-405 leading-relaxed">
              To be recognized as Eastern India's most dependable heavy logistics coordinator. We strive to pioneer safety and audit standard operations in Roadways, leveraging digital logs, trained operators, and robust compliance tools to eliminate transit errors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-16 bg-brand-slate-50 dark:bg-brand-slate-900/30 border-y border-brand-slate-100 dark:border-brand-slate-900 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-outfit font-bold text-2xl text-brand-slate-900 dark:text-white">
              Why Customers Trust Us
            </h2>
            <p className="text-xs text-brand-slate-400 mt-2">
              Our reputation is built on reliability, regulatory compliance, and a safety-first approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Safety & Fleet Checks",
                desc: "We run mandatory inspection cycles on our engines, cargo fasteners, and brake systems before every route.",
                icon: <ShieldAlert className="h-5 w-5" />
              },
              {
                title: "Experienced Drivers",
                desc: "All truck pilots hold active heavy commercial licenses with minimum 5 years driving on mountainous interstate terrains.",
                icon: <Award className="h-5 w-5" />
              },
              {
                title: "Complete Challan Records",
                desc: "Our operations rely on professional billing logs, authorized consignment notes, and clear delivery documentation.",
                icon: <CheckCircle2 className="h-5 w-5" />
              }
            ].map((pillar, idx) => (
              <div key={idx} className="bg-white dark:bg-brand-slate-900 p-6 rounded-xl border border-brand-slate-100 dark:border-brand-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-blue-50 dark:bg-brand-blue-950/20 text-brand-blue-500 flex items-center justify-center flex-shrink-0">
                  {pillar.icon}
                </div>
                <div>
                  <h3 className="font-outfit font-bold text-base text-brand-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="font-outfit font-extrabold text-3xl text-brand-slate-900 dark:text-white text-center mb-16">
          Timeline of Business Growth
        </h2>

        {/* Timeline graphics */}
        <div className="relative border-l-2 border-brand-blue-100 dark:border-brand-slate-800 ml-4 md:ml-0 md:border-l-0 md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-1/2 md:before:-ml-[1px] md:before:border-l-2 md:before:border-brand-blue-100 md:before:dark:border-brand-slate-800">
          {timelineMilestones.map((milestone, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative mb-12 md:mb-16 flex flex-col md:flex-row md:items-center ${
                idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
              }`}
            >
              {/* Dot spacer */}
              <div className="absolute top-1.5 -left-[9px] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-brand-orange-500 border-4 border-white dark:border-brand-slate-950 z-10 shadow" />

              {/* Card wrapper */}
              <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${idx % 2 === 0 ? 'md:pr-10 text-left md:text-right' : 'md:pl-10 text-left'}`}>
                <div className="glass-card p-6 rounded-2xl border border-brand-slate-100 dark:border-brand-slate-900 shadow-sm">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange-500 mb-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{milestone.year}</span>
                  </div>
                  <h3 className="font-outfit font-bold text-lg text-brand-slate-900 dark:text-white mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;

import React from 'react';
import { Truck, ShieldCheck, Cog, Navigation, HelpCircle, Layers, CalendarRange, Users, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
  const serviceList = [
    {
      title: "Industrial Transportation",
      description: "Bulk raw material transport, heavy machinery, machinery parts, and industrial equipment shipping from production units to warehouse yards.",
      details: ["Specialized heavy fasteners", "Flatbed and box options", "Trained machinery pilots"],
      icon: <Cog className="h-6 w-6" />,
      color: "border-t-brand-blue-500"
    },
    {
      title: "Iron Transportation",
      description: "Secure delivery of iron ore, high-density billets, rods, and cast iron structures. Heavy-load balance sheets and safety locks are applied.",
      details: ["High payload capacity", "Double chains strapping", "Anti-skidding pads"],
      icon: <Layers className="h-6 w-6" />,
      color: "border-t-brand-orange-500"
    },
    {
      title: "Steel Transportation",
      description: "Dedicated hauling of hot-rolled and cold-rolled coils, TMT rebars, pipes, and structures from major manufacturers to distributors.",
      details: ["Coil cradle vehicles", "Rain protection tarpaulins", "E-way bills validation"],
      icon: <Truck className="h-6 w-6" />,
      color: "border-t-brand-blue-700"
    },
    {
      title: "Scrap Transportation",
      description: "Bulk scrap metal movement from fabricating units, industrial demolitions, and production shops directly to processing ovens and recycling centers.",
      details: ["Side-board containment", "Fast loading turnarounds", "Certified weighing scales logs"],
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "border-t-brand-orange-600"
    },
    {
      title: "Loading & Unloading Management",
      description: "Ground team operations ensuring strict safety protocols during packing, loading, weight auditing, and crane-lifting tasks at Jamshedpur yards.",
      details: ["Certified crane networks", "Weight checks", "On-site dispatch supervision"],
      icon: <Users className="h-6 w-6" />,
      color: "border-t-brand-blue-600"
    },
    {
      title: "Inter-State Logistics",
      description: "Strategic freight runs connecting Jamshedpur to industrial hubs across West Bengal, Odisha, Chhattisgarh, Bihar, and Jharkhand.",
      details: ["Multistate permits active", "Standard transit checklists", "Octroi & toll pre-clearance"],
      icon: <Navigation className="h-6 w-6" />,
      color: "border-t-brand-orange-700"
    },
    {
      title: "Dedicated Fleet Services",
      description: "Long-term contractual carriage agreements. Set aside dedicated trucks, pilots, and logistics support exclusively for your regular shipments.",
      details: ["Fixed monthly rate contracts", "Priority routing lines", "Dedicated account managers"],
      icon: <CalendarRange className="h-6 w-6" />,
      color: "border-t-brand-blue-550"
    },
    {
      title: "Route Planning & Safety",
      description: "Technological mapping of safe roadways to minimize travel durations, bypass bridge weight limits, and avoid high-hazard routes.",
      details: ["Bridge weight limit filters", "Congestion bypass paths", "Real-time updates to clients"],
      icon: <ShieldCheck className="h-6 w-6" />,
      color: "border-t-brand-orange-500"
    },
    {
      title: "Emergency Support",
      description: "On-call response for mechanical failures or transport obstacles. Quick dispatch of backup towing fleets, mechanics, and substitute drivers.",
      details: ["24/7 dispatcher standby", "Roadside recovery units", "Cargo transfer coverage"],
      icon: <HelpCircle className="h-6 w-6" />,
      color: "border-t-brand-blue-900"
    }
  ];

  return (
    <div className="bg-brand-slate-50 dark:bg-brand-slate-950 min-h-screen py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-brand-blue-600 dark:text-brand-blue-400 font-bold text-xs uppercase tracking-widest bg-brand-blue-50 dark:bg-brand-blue-950/40 px-3 py-1 rounded-full inline-block border border-brand-blue-100 dark:border-brand-blue-900/50 mb-4"
        >
          Comprehensive Solutions
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-brand-slate-900 dark:text-white"
        >
          Logistics & Hauling Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-brand-slate-500 dark:text-brand-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          Heavy commercial transport operations designed for security, efficiency, and compliance.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`glass-card p-6 rounded-2xl shadow-sm border-t-4 ${service.color} border-x border-b border-brand-slate-100 dark:border-brand-slate-900/60 flex flex-col justify-between hover:shadow-md transition-all duration-300`}
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-brand-blue-50 dark:bg-brand-slate-900 text-brand-blue-500 flex items-center justify-center mb-5 border border-brand-blue-100 dark:border-brand-slate-800">
                  {service.icon}
                </div>
                <h3 className="font-outfit font-bold text-lg text-brand-slate-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400 leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="border-t border-brand-slate-100 dark:border-brand-slate-850 pt-4 mt-2">
                <h4 className="text-xxs font-bold text-brand-slate-405 dark:text-brand-slate-400 uppercase tracking-wider mb-2">
                  Security Parameters:
                </h4>
                <ul className="space-y-1.5">
                  {service.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-1.5 text-xxs font-semibold text-brand-slate-700 dark:text-brand-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quote Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 text-center">
        <div className="glass-card p-8 rounded-2xl border border-brand-orange-500/20 bg-gradient-to-r from-brand-orange-500/5 to-transparent flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-lg space-y-2">
            <h3 className="font-outfit font-bold text-xl text-brand-slate-900 dark:text-white">
              Ready to schedule a load?
            </h3>
            <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400">
              Speak with our Jamshedpur booking branch directly for instant heavy-haul availability.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="tel:+919142021216" className="btn-primary text-xs px-5 py-2.5 font-bold">
              Call Booking Dept
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

import React, { useState, useEffect } from 'react';
import { Truck as TruckIcon, Shield, Anchor, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import truckImg from '../assets/truck.jpg';
import tripTrailerImg from '../assets/trip_trailer.png';
import download11Img from '../assets/download11.jpeg';
import truck10Img from '../assets/truck10.jpg';

const Fleet = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/trucks')
      .then(res => res.json())
      .then(data => {
        setTrucks(data);
        setLoading(false);
      })
      .catch(err => {
        console.log("Using fallback trucks data");
        setTrucks([
          {
            name: "Tata Signa 2823.K",
            capacity: "25 Tons",
            type: "10-Wheeler Open Truck",
            routes: ["Jamshedpur -> Kolkata", "Jamshedpur -> Patna"],
            imageUrl: truck10Img,
            isActive: true
          },
          {
            name: "BharatBenz 3523R",
            capacity: "31 Tons",
            type: "12-Wheeler Heavy Taurus",
            routes: ["Jamshedpur -> Bhubaneswar", "Jamshedpur -> Kolkata"],
            imageUrl: truckImg,
            isActive: true
          },
          {
            name: "Ashok Leyland 4019",
            capacity: "40 Tons",
            type: "18-Wheeler Heavy Trailer",
            routes: ["Jamshedpur -> Raipur", "Jamshedpur -> Kolkata"],
            imageUrl: tripTrailerImg,
            isActive: true
          },
          {
            name: "Tata LPT 1613",
            capacity: "10 Tons",
            type: "6-Wheeler Box Truck",
            routes: ["Jamshedpur -> Ranchi", "Jamshedpur -> Dhanbad"],
            imageUrl: download11Img,
            isActive: true
          }
        ]);
        setLoading(false);
      });
  }, []);

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
          Company Haulage Power
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-brand-slate-900 dark:text-white"
        >
          Our Dedicated Fleet
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-brand-slate-500 dark:text-brand-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          High-performance heavy vehicles operated by experienced logistics pilots, ensuring secure and damage-free transit.
        </motion.p>
      </section>

      {/* Truck Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {loading ? (
          <div className="flex justify-center items-center py-20 text-brand-slate-405">
            <span className="animate-pulse font-semibold">Loading fleet details...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trucks.map((truck, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden border border-brand-slate-100 dark:border-brand-slate-900 shadow-md flex flex-col sm:flex-row"
              >
                {/* Truck Image */}
                <div className="w-full sm:w-1/2 h-52 sm:h-auto overflow-hidden">
                  <img
                    src={truck.imageUrl.startsWith('/') ? `http://localhost:5001${truck.imageUrl}` : truck.imageUrl}
                    alt={truck.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-550"
                  />
                </div>

                {/* Truck Info */}
                <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xxs font-bold text-brand-orange-500 uppercase tracking-widest bg-brand-orange-500/10 px-2.5 py-0.5 rounded-full border border-brand-orange-500/20 mb-3 inline-block">
                      {truck.type}
                    </span>
                    <h3 className="font-outfit font-extrabold text-xl text-brand-slate-900 dark:text-white mb-2 leading-tight">
                      {truck.name}
                    </h3>
                    <div className="space-y-1.5 text-xs text-brand-slate-500 dark:text-brand-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Anchor className="h-4 w-4 text-brand-slate-400" />
                        <span>Load Capacity: <strong className="text-brand-slate-700 dark:text-brand-slate-205">{truck.capacity}</strong></span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <Compass className="h-4 w-4 text-brand-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold block mb-0.5">Primary Routes:</span>
                          <div className="flex flex-col gap-0.5 font-mono text-[10px] text-brand-slate-655 dark:text-brand-slate-350">
                            {truck.routes && truck.routes.map((route, rIdx) => (
                              <span key={rIdx}>• {route}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-brand-slate-100 dark:border-brand-slate-850 pt-4 mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active Transit Ready
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Fleet Standards */}
      <section className="py-16 bg-brand-slate-50 dark:bg-brand-slate-900/30 border-y border-brand-slate-100 dark:border-brand-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-outfit font-bold text-2xl text-brand-slate-900 dark:text-white">
              Fleet Standards & Maintenance
            </h2>
            <p className="text-xs text-brand-slate-400 mt-2">
              Every transport vehicle goes through routine health safety audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-blue-50 dark:bg-brand-slate-900 text-brand-blue-500 border border-brand-blue-105 dark:border-brand-slate-800 flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-base text-brand-slate-900 dark:text-white mb-2">
                  Pre-Trip Maintenance Cycles
                </h3>
                <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400 leading-relaxed">
                  We enforce full chassis lubrication, tyre pressure diagnostics, and brake checks prior to all interstate route assignments. This mitigates highway delays.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-orange-50 dark:bg-brand-slate-900 text-brand-orange-500 border border-brand-orange-105 dark:border-brand-slate-800 flex items-center justify-center flex-shrink-0">
                <TruckIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-outfit font-bold text-base text-brand-slate-900 dark:text-white mb-2">
                  Fastener Audits & Strapping
                </h3>
                <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400 leading-relaxed">
                  Iron scrap and heavy structural steel require precise balancing. We utilize double-tension chain locks and protective rubber linings to prevent load shifting during transit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fleet;

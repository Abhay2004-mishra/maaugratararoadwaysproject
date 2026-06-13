import React, { useState } from 'react';
import { Compass, MapPin, Truck, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Coverage = () => {
  const [selectedRoute, setSelectedRoute] = useState('kolkata');

  const routeDetails = {
    kolkata: {
      title: "Jamshedpur → Kolkata (Primary Route)",
      distance: "285 km",
      time: "6 - 8 Hours",
      cargo: "Steel coils, industrial scrap, machinery parts",
      frequency: "Daily multiple dispatch",
      status: "Highway NH-16 (Active Transit Route)"
    },
    bhubaneswar: {
      title: "Jamshedpur → Bhubaneswar",
      distance: "365 km",
      time: "8 - 10 Hours",
      cargo: "Iron ore, raw billets, heavy structural steel",
      frequency: "3 runs per week",
      status: "National Highway NH-20 (Heavy Traffic Route)"
    },
    patna: {
      title: "Jamshedpur → Patna",
      distance: "460 km",
      time: "10 - 12 Hours",
      cargo: "Commercial supplies, wire scrap, metal coils",
      frequency: "Alternate day dispatch",
      status: "State Highway Route (Fully Operational)"
    },
    raipur: {
      title: "Jamshedpur → Raipur",
      distance: "515 km",
      time: "12 - 14 Hours",
      cargo: "Industrial scrap, castings, fabricated rods",
      frequency: "Weekly dedicated runs",
      status: "Inter-State Highway (Toll Cleared)"
    },
    ranchi: {
      title: "Jamshedpur → Ranchi (Local Route)",
      distance: "130 km",
      time: "3 - 4 Hours",
      cargo: "Foundry scrap, local commercial cargo, components",
      frequency: "Multiple daily shuttles",
      status: "Local State Highway (High Priority Express)"
    }
  };

  return (
    <div className="bg-brand-slate-50 dark:bg-brand-slate-950 min-h-screen py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-brand-blue-600 dark:text-brand-blue-400 font-bold text-xs uppercase tracking-widest bg-brand-blue-50 dark:bg-brand-blue-950/40 px-3 py-1 rounded-full inline-block border border-brand-blue-105 dark:border-brand-blue-900/50 mb-4"
        >
          Regional Transit Network
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-extrabold text-brand-slate-900 dark:text-white"
        >
          Operational Coverage
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-brand-slate-500 dark:text-brand-slate-405 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          Direct heavy road-freight routes connecting Jamshedpur manufacturers to major cities across Eastern and Central India.
        </motion.p>
      </section>

      {/* Interactive Map and Route details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* SVG Route Map Visual */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-lg aspect-square bg-white dark:bg-brand-slate-900 rounded-3xl p-6 shadow-lg border border-brand-slate-100 dark:border-brand-slate-800 relative overflow-hidden">
              <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs font-bold text-brand-slate-400">
                <Compass className="h-4 w-4 animate-spin-slow" />
                <span>Eastern India Route Map</span>
              </div>
              
              {/* Dynamic Map Design */}
              <svg className="w-full h-full select-none" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* State outline grids (Abstract SVG lines) */}
                <path d="M 50,250 Q 150,150 250,220 T 450,250" stroke="currentColor" className="text-brand-slate-100 dark:text-brand-slate-800" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 120,400 Q 250,300 380,450" stroke="currentColor" className="text-brand-slate-100 dark:text-brand-slate-800" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 250,50 L 250,450" stroke="currentColor" className="text-brand-slate-100 dark:text-brand-slate-800" strokeWidth="1" strokeDasharray="10,10" />

                {/* State Labels */}
                <text x="70" y="220" className="text-[10px] font-bold fill-brand-slate-400 dark:fill-brand-slate-500 uppercase tracking-widest">Chhattisgarh</text>
                <text x="210" y="90" className="text-[10px] font-bold fill-brand-slate-400 dark:fill-brand-slate-500 uppercase tracking-widest">Bihar</text>
                <text x="170" y="270" className="text-[10px] font-bold fill-brand-slate-450 dark:fill-brand-slate-600 uppercase tracking-widest">Jharkhand</text>
                <text x="350" y="200" className="text-[10px] font-bold fill-brand-slate-400 dark:fill-brand-slate-500 uppercase tracking-widest">West Bengal</text>
                <text x="290" y="420" className="text-[10px] font-bold fill-brand-slate-400 dark:fill-brand-slate-500 uppercase tracking-widest">Odisha</text>

                {/* Animated connections from Jamshedpur */}
                {/* 1. Jamshedpur (230, 240) to Patna (230, 120) */}
                <path d="M 230,240 L 230,120" stroke={selectedRoute === 'patna' ? '#EA580C' : '#38bdf8'} strokeWidth={selectedRoute === 'patna' ? '4' : '2'} className="transition-all duration-300" strokeLinecap="round" />
                
                {/* 2. Jamshedpur (230, 240) to Ranchi (160, 210) */}
                <path d="M 230,240 L 160,210" stroke={selectedRoute === 'ranchi' ? '#EA580C' : '#38bdf8'} strokeWidth={selectedRoute === 'ranchi' ? '4' : '2'} className="transition-all duration-300" strokeLinecap="round" />

                {/* 3. Jamshedpur (230, 240) to Raipur (90, 290) */}
                <path d="M 230,240 L 90,290" stroke={selectedRoute === 'raipur' ? '#EA580C' : '#38bdf8'} strokeWidth={selectedRoute === 'raipur' ? '4' : '2'} className="transition-all duration-300" strokeLinecap="round" />

                {/* 4. Jamshedpur (230, 240) to Bhubaneswar (270, 390) */}
                <path d="M 230,240 L 270,390" stroke={selectedRoute === 'bhubaneswar' ? '#EA580C' : '#38bdf8'} strokeWidth={selectedRoute === 'bhubaneswar' ? '4' : '2'} className="transition-all duration-300" strokeLinecap="round" />

                {/* 5. Jamshedpur (230, 240) to Kolkata (360, 260) */}
                <path d="M 230,240 L 360,260" stroke={selectedRoute === 'kolkata' ? '#EA580C' : '#38bdf8'} strokeWidth={selectedRoute === 'kolkata' ? '4' : '2'} className="transition-all duration-300" strokeLinecap="round" strokeDasharray={selectedRoute === 'kolkata' ? '0' : '4,4'} />

                {/* Hub Point - Jamshedpur */}
                <circle cx="230" cy="240" r="10" fill="#0A66C2" className="animate-pulse" />
                <circle cx="230" cy="240" r="4" fill="#FFFFFF" />
                <text x="245" y="244" className="text-xs font-black fill-brand-blue-600 dark:fill-brand-blue-450 uppercase">Jamshedpur (Hub)</text>

                {/* Kolkata Node */}
                <circle cx="360" cy="260" r="7" fill={selectedRoute === 'kolkata' ? '#EA580C' : '#0A66C2'} onClick={() => setSelectedRoute('kolkata')} className="cursor-pointer transition-colors" />
                <text x="372" y="264" className="text-[10px] font-bold fill-brand-slate-700 dark:fill-brand-slate-300">Kolkata</text>

                {/* Bhubaneswar Node */}
                <circle cx="270" cy="390" r="7" fill={selectedRoute === 'bhubaneswar' ? '#EA580C' : '#0A66C2'} onClick={() => setSelectedRoute('bhubaneswar')} className="cursor-pointer transition-colors" />
                <text x="282" y="394" className="text-[10px] font-bold fill-brand-slate-700 dark:fill-brand-slate-300">Bhubaneswar</text>

                {/* Patna Node */}
                <circle cx="230" cy="120" r="7" fill={selectedRoute === 'patna' ? '#EA580C' : '#0A66C2'} onClick={() => setSelectedRoute('patna')} className="cursor-pointer transition-colors" />
                <text x="242" y="124" className="text-[10px] font-bold fill-brand-slate-700 dark:fill-brand-slate-300">Patna</text>

                {/* Raipur Node */}
                <circle cx="90" cy="290" r="7" fill={selectedRoute === 'raipur' ? '#EA580C' : '#0A66C2'} onClick={() => setSelectedRoute('raipur')} className="cursor-pointer transition-colors" />
                <text x="54" y="305" className="text-[10px] font-bold fill-brand-slate-700 dark:fill-brand-slate-300">Raipur</text>

                {/* Ranchi Node */}
                <circle cx="160" cy="210" r="7" fill={selectedRoute === 'ranchi' ? '#EA580C' : '#0A66C2'} onClick={() => setSelectedRoute('ranchi')} className="cursor-pointer transition-colors" />
                <text x="134" y="196" className="text-[10px] font-bold fill-brand-slate-700 dark:fill-brand-slate-300">Ranchi</text>
              </svg>
            </div>
          </div>

          {/* Route Details Panel */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-outfit font-extrabold text-2xl text-brand-slate-900 dark:text-white">
              Select Route to View Details
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(routeDetails).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedRoute(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                    selectedRoute === key
                      ? 'bg-brand-orange-500 text-white shadow-md'
                      : 'bg-brand-slate-100 hover:bg-brand-slate-205 dark:bg-brand-slate-900 dark:hover:bg-brand-slate-800 text-brand-slate-655 dark:text-brand-slate-300'
                  }`}
                >
                  {key === 'kolkata' ? 'Kolkata (Primary)' : key}
                </button>
              ))}
            </div>

            {/* Selected Route Info Card */}
            <motion.div
              key={selectedRoute}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 rounded-2xl border border-brand-slate-150 dark:border-brand-slate-850 shadow-md space-y-4"
            >
              <h3 className="font-outfit font-extrabold text-lg text-brand-slate-900 dark:text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-orange-500" />
                {routeDetails[selectedRoute].title}
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-brand-slate-400 font-medium block">Distance:</span>
                  <div className="flex items-center gap-1 font-bold text-brand-slate-800 dark:text-white">
                    <Truck className="h-4 w-4 text-brand-blue-500" />
                    {routeDetails[selectedRoute].distance}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-brand-slate-400 font-medium block">Avg. Transit Time:</span>
                  <div className="flex items-center gap-1 font-bold text-brand-slate-800 dark:text-white">
                    <Clock className="h-4 w-4 text-brand-blue-500" />
                    {routeDetails[selectedRoute].time}
                  </div>
                </div>
              </div>

              <div className="border-t border-brand-slate-100 dark:border-brand-slate-800 pt-3 text-xs space-y-2">
                <div>
                  <span className="text-brand-slate-400 font-medium block">Primary Cargo Hauled:</span>
                  <span className="font-semibold text-brand-slate-700 dark:text-brand-slate-300">
                    {routeDetails[selectedRoute].cargo}
                  </span>
                </div>
                <div>
                  <span className="text-brand-slate-400 font-medium block">Frequency:</span>
                  <span className="font-semibold text-brand-slate-700 dark:text-brand-slate-300">
                    {routeDetails[selectedRoute].frequency}
                  </span>
                </div>
                <div>
                  <span className="text-brand-slate-400 font-medium block">Route Compliance Status:</span>
                  <span className="font-bold text-brand-orange-500 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="h-4 w-4" />
                    {routeDetails[selectedRoute].status}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Areas Highlights */}
      <section className="py-16 bg-white dark:bg-brand-slate-900/40 border-t border-brand-slate-100 dark:border-brand-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-outfit font-bold text-2xl text-brand-slate-900 dark:text-white">
              State-Wise Logistics Operations
            </h2>
            <p className="text-xs text-brand-slate-400 mt-2">
              Serving industrial warehouses and heavy manufacturers across multiple state lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { state: "Jharkhand", hub: "Jamshedpur (Hub)", description: "Local transport from Tata Steel and scrap yards to Ranchi, Dhanbad, and Bokaro steel units." },
              { state: "West Bengal", hub: "Kolkata, Haldia", description: "Primary route transporting structural plates and coils directly to ports and commercial suppliers." },
              { state: "Odisha", hub: "Rourkela, Cuttack", description: "Hauling iron ore and minerals to blast furnaces and steel castings processing yards." },
              { state: "Bihar", hub: "Patna, Gaya", description: "Consignment drops for construction projects, rebar coils, and light metal scrap runs." },
              { state: "Chhattisgarh", hub: "Raipur, Bilaspur", description: "Hauling machinery components and processing foundry metal scrap batches." }
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-5 rounded-xl border border-brand-slate-100 dark:border-brand-slate-800 flex flex-col justify-between hover:border-brand-blue-500/30 transition-colors">
                <div>
                  <span className="text-xxs font-bold text-brand-orange-500 block mb-1">STATE AREA</span>
                  <h3 className="font-outfit font-extrabold text-base text-brand-slate-900 dark:text-white mb-2">
                    {item.state}
                  </h3>
                  <p className="text-xxs text-brand-slate-500 dark:text-brand-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-brand-slate-100 dark:border-brand-slate-850 text-[10px] font-bold text-brand-blue-500 uppercase tracking-wider">
                  Hub: {item.hub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Coverage;

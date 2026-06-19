import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Clock, Users, ArrowRight, Star, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import LeadForm from '../components/LeadForm';
import truckImg from '../assets/truck.jpg';
import tripTrailerImg from '../assets/trip_trailer.png';
import { API_BASE_URL } from '../config';


const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  useEffect(() => {
    // Fetch testimonials from API, fallback to default seed data if fails
    fetch(`${API_BASE_URL}/api/testimonials`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => {
        console.log("Using local testimonials fallback");
        setTestimonials([
          {
            clientName: "Rajesh Sharma",
            companyName: "Tata Steel Supplier Logistics",
            feedback: "Maa Ugra Tara Roadways has been our trusted transport partner for over a decade. Their timely delivery of steel scrap and iron ore coils, combined with seamless digital billing, makes them the best in Jamshedpur.",
            rating: 5
          },
          {
            clientName: "Amit Agarwal",
            companyName: "Jamshedpur Scrap Metal Industries",
            feedback: "Extremely reliable loading management and 24x7 support. Their challan process is transparent, and they maintain excellent logs. Highly recommended for heavy commercial transport.",
            rating: 5
          },
          {
            clientName: "Debasis Mohanty",
            companyName: "Eastern India Cement Works",
            feedback: "Outstanding multi-state logistics capability. We regularly transport bulk industrial materials across Odisha and West Bengal. Their drivers are experienced, and transit updates are prompt.",
            rating: 4
          }
        ]);
      });
  }, []);

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Animation constants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-brand-slate-900 text-white overflow-hidden py-12 sm:py-20">
        {/* Parallax truck background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1920" 
            alt="Maa Ugra Tara Roadways Heavy Freight Transport" 
            className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-slate-950 via-brand-slate-900/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Title / Info */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange-500/20 border border-brand-orange-500/30 text-brand-orange-400 text-xs font-bold uppercase tracking-wider"
              >
                <Award className="h-4 w-4" />
                25+ Years of Industry Trust
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              >
                Heavy Duty Freight & <br />
                <span className="text-gradient">Industrial Logistics</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-brand-slate-350 max-w-xl leading-relaxed"
              >
                Based in Jamshedpur, we specialize in transporting iron, steel, scrap, and industrial goods to West Bengal, Odisha, Bihar, Chhattisgarh, and neighboring states. Complete compliance and digitally managed challans.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <a href="#quote-form" className="btn-accent px-8 py-3.5 shadow-lg shadow-brand-orange-500/20">
                  Get Instant Quote
                </a>
                <Link to="/about" className="btn-secondary px-8 py-3.5 text-white border-white/20 hover:bg-white/10 dark:hover:bg-brand-slate-800">
                  Explore Experience
                </Link>
              </motion.div>
            </div>

            {/* Quick Inquiry Form */}
            <motion.div 
              id="quote-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-5 w-full"
            >
              <LeadForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Years Experience', value: '25+', color: 'from-brand-blue-500 to-indigo-500' },
            { label: 'Active Fleets', value: '10+', color: 'from-brand-orange-500 to-amber-500' },
            { label: 'Logistics Experts', value: '5+', color: 'from-brand-blue-600 to-cyan-500' },
            { label: 'Safe Deliveries', value: '1000+', color: 'from-emerald-500 to-teal-500' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card shadow-lg rounded-xl p-5 md:p-6 text-center border-white/40 dark:border-brand-slate-800/40"
            >
              <div className={`text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-1.5`}>
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-bold text-brand-slate-500 dark:text-brand-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust & Company Summary */}
      <section className="py-12 sm:py-20 bg-white dark:bg-brand-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image display */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-brand-slate-100 dark:border-brand-slate-900 group"
            >
              <img 
                src={truckImg} 
                alt="Jamshedpur Tata Steel scrap transport" 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <h4 className="text-white font-outfit font-bold text-lg mb-1">Tata Steel Logistics Operations</h4>
                  <p className="text-brand-slate-300 text-xs">Direct loading & transport services from Jamshedpur industrial hubs.</p>
                </div>
              </div>
            </motion.div>

            {/* Info Column */}
            <div className="space-y-6">
              <div className="text-brand-orange-500 font-bold text-sm uppercase tracking-wider">
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-slate-900 dark:text-white leading-tight">
                Your Strategic Logistics Partner in Jamshedpur
              </h2>
              <p className="text-brand-slate-655 dark:text-brand-slate-400 leading-relaxed text-base">
                For over 25 years, Maa Ugra Tara Roadways has been the logistical spine for steel processing units, commercial yards, and industrial manufactures in Jharkhand. We manage high-capacity road freight with top safety ratings and full legal documentation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue-50 dark:bg-brand-blue-950/30 text-brand-blue-600 dark:text-brand-blue-400 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-sm text-brand-slate-900 dark:text-white">100% Tax Compliant</h4>
                    <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400">GST verified and professional accountant audit logs.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange-50 dark:bg-brand-orange-950/30 text-brand-orange-655 dark:text-brand-orange-400 flex items-center justify-center flex-shrink-0">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-sm text-brand-slate-900 dark:text-white">Heavy-Duty Fleet</h4>
                    <p className="text-xs text-brand-slate-500 dark:text-brand-slate-400">10-wheelers, multi-axle trailers, and box containers.</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-brand-slate-100 dark:border-brand-slate-900">
                <Link to="/about" className="text-brand-blue-500 font-bold text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                  Read Company History & Vision
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Heavy Logistics Fleet Showcase */}
      <section className="py-16 sm:py-24 bg-brand-slate-900 text-white relative overflow-hidden">
        {/* Glow highlights */}
        <div className="absolute top-1/4 left-[10%] w-96 h-96 bg-brand-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-brand-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-orange-400 font-bold text-xs uppercase tracking-widest bg-brand-orange-500/10 px-4 py-1.5 rounded-full border border-brand-orange-500/20 inline-block"
            >
              Flagship Fleet
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold"
            >
              High-Capacity Heavy Carriers
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-brand-slate-350 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            >
              Explore our premium commercial fleet configurations engineered for maximum freight tonnage, complete route compliance, and zero transit failures.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 12-Wheeler Heavy Taurus Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col group hover:border-brand-blue-500/40 transition-colors duration-300"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img 
                  src={truckImg} 
                  alt="12-Wheeler Heavy Taurus Carrier" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950 via-brand-slate-950/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-6 left-6 px-3 py-1 rounded-md bg-brand-blue-600/90 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                  12-Wheeler configuration
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8 flex-grow flex flex-col justify-between space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  <h3 className="font-outfit font-extrabold text-2xl text-white group-hover:text-brand-blue-400 transition-colors">
                    BharatBenz 3523R Taurus
                  </h3>
                  <p className="text-brand-slate-350 text-sm leading-relaxed">
                    Designed for heavy-duty industrial scrap and steel logistics. The 12-wheel configuration distributes payload weight dynamically, allowing for high speed and exceptional road grip over interstate corridors.
                  </p>
                  
                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xxs text-brand-slate-400 uppercase tracking-widest font-semibold mb-1">Payload Capacity</div>
                      <div className="text-sm font-bold text-white">31 Tons</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xxs text-brand-slate-400 uppercase tracking-widest font-semibold mb-1">Active Routes</div>
                      <div className="text-sm font-bold text-white">Odisha & WB</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xxs text-brand-slate-400 uppercase tracking-widest font-semibold mb-1">Engine Power</div>
                      <div className="text-sm font-bold text-white">230 HP Turbo</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xxs text-brand-slate-400 uppercase tracking-widest font-semibold mb-1">Optimal For</div>
                      <div className="text-sm font-bold text-white">Scrap & Steel Coils</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    GPS Tracking Integrated
                  </span>
                  <a href="#quote-form" className="text-xs font-bold text-brand-blue-400 group-hover:text-brand-blue-300 inline-flex items-center gap-1.5 transition-all group-hover:translate-x-1">
                    Book This Configuration <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Heavy Tipper / Trip Trailer Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col group hover:border-brand-orange-500/40 transition-colors duration-300"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img 
                  src={tripTrailerImg} 
                  alt="Heavy Tipper Dump Trip Trailer" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950 via-brand-slate-950/20 to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-6 left-6 px-3 py-1 rounded-md bg-brand-orange-500/90 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                  Heavy Tip Trailer
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8 flex-grow flex flex-col justify-between space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  <h3 className="font-outfit font-extrabold text-2xl text-white group-hover:text-brand-orange-400 transition-colors">
                    Scania & Leyland Tipping Trailer
                  </h3>
                  <p className="text-brand-slate-350 text-sm leading-relaxed">
                    Specially optimized for loose bulk cargo, iron ore fines, construction aggregates, and recycling waste. Equips hydraulic direct-tip pistons that ensure rapid unloading at factory yards.
                  </p>
                  
                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xxs text-brand-slate-400 uppercase tracking-widest font-semibold mb-1">Payload Capacity</div>
                      <div className="text-sm font-bold text-white">40+ Tons</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xxs text-brand-slate-400 uppercase tracking-widest font-semibold mb-1">Active Routes</div>
                      <div className="text-sm font-bold text-white">Bihar, WB & Jharkhand</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xxs text-brand-slate-400 uppercase tracking-widest font-semibold mb-1">Tipping Angle</div>
                      <div className="text-sm font-bold text-white">48 Degrees Max</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="text-xxs text-brand-slate-400 uppercase tracking-widest font-semibold mb-1">Optimal For</div>
                      <div className="text-sm font-bold text-white">Iron Ore, Minerals, Coal</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Double-Tension Safety Chain Locks
                  </span>
                  <a href="#quote-form" className="text-xs font-bold text-brand-orange-400 group-hover:text-brand-orange-300 inline-flex items-center gap-1.5 transition-all group-hover:translate-x-1">
                    Book This Configuration <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section className="py-12 sm:py-20 bg-brand-slate-50 dark:bg-brand-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-brand-blue-500 font-bold text-xs uppercase tracking-widest bg-brand-blue-50 dark:bg-brand-blue-950/40 px-3 py-1 rounded-full border border-brand-blue-100 dark:border-brand-blue-900/50">
              Core Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-slate-900 dark:text-white">
              Industrial Transportation Solutions
            </h2>
            <p className="text-brand-slate-500 dark:text-brand-slate-400 text-sm">
              We provide professional freight movement with dedicated route management and real-time documentation.
            </p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Iron & Steel Transport',
                description: 'Bulk delivery of heavy coils, TMT bars, structural girders, and sheets from Jamshedpur steel units to nearby warehouses.',
                icon: <Award className="h-6 w-6" />,
                bg: 'bg-brand-blue-500'
              },
              {
                title: 'Scrap Metal Management',
                description: 'Safe transport of industrial scrap, manufacturing waste, and sheet metals to recycling zones and foundry structures.',
                icon: <Truck className="h-6 w-6" />,
                bg: 'bg-brand-orange-500'
              },
              {
                title: 'Inter-State Logistics',
                description: 'Regular bulk transportation routes mapping Jamshedpur to West Bengal (Kolkata), Odisha (Bhubaneswar), and Bihar (Patna).',
                icon: <ShieldCheck className="h-6 w-6" />,
                bg: 'bg-brand-blue-700'
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="glass-card glass-card-hover p-6 rounded-2xl border-white/60 dark:border-brand-slate-800/40 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${service.bg} text-white flex items-center justify-center mb-6 shadow-md`}>
                    {service.icon}
                  </div>
                  <h3 className="font-outfit font-bold text-xl text-brand-slate-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-brand-slate-600 dark:text-brand-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-slate-100 dark:border-brand-slate-800/40">
                  <Link to="/services" className="text-xs font-bold text-brand-blue-500 hover:text-brand-blue-600 inline-flex items-center gap-1">
                    Details & Rates <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Compliance banner */}
      <section className="py-12 sm:py-16 bg-brand-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl text-white">
            Legally Certified & GST Compliant Logistics
          </h2>
          <p className="text-brand-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Every shipment operates with active transport permits, digital e-way bills, and professional audit clearances. Maa Ugra Tara Roadways ensures zero administrative delays for your industrial consignment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold pt-4">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="h-4.5 w-4.5 text-brand-orange-500" />
              GST Identification Verified
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="h-4.5 w-4.5 text-brand-orange-500" />
              Commercial Transport Permits
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="h-4.5 w-4.5 text-brand-orange-500" />
              Digital Challan Logs
            </span>
          </div>
          <div className="pt-4">
            <Link to="/compliance" className="btn-accent px-6 py-2.5 text-sm font-bold shadow-lg shadow-brand-orange-600/20">
              View Legal Certificates & Challan Steps
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel */}
      {testimonials.length > 0 && (
        <section className="py-12 sm:py-20 bg-white dark:bg-brand-slate-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-brand-orange-500 font-bold text-xs uppercase tracking-widest mb-3">
              Client Reviews
            </div>
            <h2 className="text-3xl font-extrabold text-brand-slate-900 dark:text-white mb-10">
              Trusted by Leading Manufacturers
            </h2>

            {/* Card display */}
            <div className="glass-card p-5 sm:p-10 rounded-3xl border border-brand-slate-100 dark:border-brand-slate-900 shadow-xl relative min-h-60 flex flex-col justify-between">
              {/* Quotes decoration */}
              <div className="absolute top-6 left-6 text-8xl font-serif text-brand-slate-200 dark:text-brand-slate-800/30 select-none pointer-events-none">
                “
              </div>
              
              <div className="relative z-10">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[activeReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-brand-orange-500 text-brand-orange-500" />
                  ))}
                </div>
                <p className="text-base sm:text-lg text-brand-slate-650 dark:text-brand-slate-300 italic leading-relaxed mb-6">
                  "{testimonials[activeReviewIndex].feedback}"
                </p>
              </div>

              <div className="relative z-10 border-t border-brand-slate-100 dark:border-brand-slate-800/60 pt-6">
                <h4 className="font-outfit font-bold text-base text-brand-slate-900 dark:text-white">
                  {testimonials[activeReviewIndex].clientName}
                </h4>
                <p className="text-xs text-brand-orange-500 font-semibold mt-0.5">
                  {testimonials[activeReviewIndex].companyName}
                </p>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={handlePrevReview}
                  className="w-10 h-10 rounded-full bg-brand-slate-100 hover:bg-brand-slate-200 dark:bg-brand-slate-900 dark:hover:bg-brand-slate-800 text-brand-slate-650 dark:text-brand-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="text-xs font-bold text-brand-slate-400">
                  {activeReviewIndex + 1} / {testimonials.length}
                </div>
                <button
                  onClick={handleNextReview}
                  className="w-10 h-10 rounded-full bg-brand-slate-100 hover:bg-brand-slate-200 dark:bg-brand-slate-900 dark:hover:bg-brand-slate-800 text-brand-slate-655 dark:text-brand-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-12 sm:py-20 bg-brand-slate-50 dark:bg-brand-slate-900/30 border-t border-brand-slate-100 dark:border-brand-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl text-brand-slate-900 dark:text-white">
            Need Bulk Transport Fast?
          </h2>
          <p className="text-brand-slate-500 dark:text-brand-slate-405 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our dispatcher team is ready. Get a detailed quotation with estimated transit times, truck specifications, and complete logistics planning.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a href="tel:+919142021216" className="btn-primary px-8 py-3.5 flex items-center gap-2 font-bold shadow-md shadow-brand-blue-500/10">
              <Clock className="h-5 w-5 animate-pulse" />
              Call Now: +919142021216
            </a>
            <Link to="/contact" className="btn-secondary px-8 py-3.5 border-brand-slate-300 hover:bg-brand-slate-100 text-brand-slate-800 dark:text-white dark:border-brand-slate-700 dark:hover:bg-brand-slate-800 font-bold">
              Submit Routing Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

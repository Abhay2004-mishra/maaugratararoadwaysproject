import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Shield, Calendar, ArrowUpRight } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-slate-900 dark:bg-brand-slate-950 text-brand-slate-300 pt-16 pb-8 border-t border-brand-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Brief */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImg} alt="Maa Ugra Tara Roadways" className="h-8 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-outfit font-extrabold text-base leading-none text-white">
                  MAA UGRA TARA
                </span>
                <span className="font-sans font-bold text-xxs tracking-wider text-brand-orange-400">
                  ROADWAYS
                </span>
              </div>
            </Link>
            <p className="text-sm text-brand-slate-400 leading-relaxed pt-2">
              Trusted transportation and freight logistics company based in Jamshedpur. Specializing in heavy industrial goods, iron, steel, scrap, and cargo delivery across Eastern India for over 25 years.
            </p>
            <div className="flex flex-col gap-1 text-xs text-brand-slate-400 font-medium bg-brand-slate-950/40 p-3 rounded-lg border border-brand-slate-800">
              <div className="flex items-center gap-1.5 text-brand-orange-400">
                <Shield className="h-3.5 w-3.5" />
                <span>GST Registered & Licensed</span>
              </div>
              <div className="text-xxs text-brand-slate-400 mt-0.5">
                GSTIN: <span className="font-mono text-white">20AAAFM9415A1ZD</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-outfit font-bold text-base mb-6 border-l-4 border-brand-blue-500 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'Home Landing', path: '/' },
                { name: 'About History', path: '/about' },
                { name: 'Our Services', path: '/services' },
                { name: 'Fleet Strength', path: '/fleet' },
                { name: 'Coverage Area', path: '/coverage' },
                { name: 'Compliance & Challans', path: '/compliance' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="hover:text-brand-orange-400 transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-brand-slate-650 group-hover:text-brand-orange-400 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-outfit font-bold text-base mb-6 border-l-4 border-brand-orange-500 pl-3">
              Freight Services
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                'Industrial Transportation',
                'Iron & Steel Transport',
                'Scrap Metal Carriage',
                'Loading & Unloading',
                'Inter-State Logistics',
                'Dedicated Fleet Service',
                'Route Planning Support'
              ].map((service) => (
                <li key={service} className="text-brand-slate-400 hover:text-white transition-colors cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-outfit font-bold text-base mb-6 border-l-4 border-brand-blue-500 pl-3">
              Office Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-brand-orange-500 flex-shrink-0" />
                <span className="text-brand-slate-400 leading-snug">
                  Maa Ugra Tara Roadways<br />
                  Long Town Basti,Burmamines<br />
                  Jamshedpur, Jharkhand - 831007
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-blue-400 flex-shrink-0" />
                <a href="tel:+919142021216" className="hover:text-white transition-colors">
                  +91-91420-21216
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-blue-400 flex-shrink-0" />
                <a href="mailto:info@maaugratararoadways.com" className="hover:text-white transition-colors">
                  info@maaugratararoadways.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs text-brand-slate-400">
                <Calendar className="h-4 w-4 text-brand-orange-400 flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-brand-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-brand-slate-500 gap-4">
          <p>© {currentYear} Maa Ugra Tara Roadways. All rights reserved. Jamshedpur, Jharkhand.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-orange-400 transition-colors">Terms & Conditions</a>
            <Link to="/admin" className="hover:text-brand-blue-400 transition-colors font-medium">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

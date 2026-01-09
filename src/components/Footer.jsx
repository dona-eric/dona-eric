import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  MapPin, 
  Heart,
  ExternalLink,
  Sparkles
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Projets", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    { name: "ML Solutions", href: "/services" },
    { name: "Data Analysis", href: "/services" },
    { name: "AI Consulting", href: "/services" },
    { name: "Full Stack Dev", href: "/services" },
  ];

  const social = [
    { 
      name: "GitHub", 
      icon: Github, 
      href: "https://github.com/dona-eric",
      color: "hover:text-purple-400"
    },
    { 
      name: "LinkedIn", 
      icon: Linkedin, 
      href: "https://linkedin.com/in/dona-erick",
      color: "hover:text-blue-400"
    },
  ];

  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6 group">
              <h3 className="text-2xl font-black text-gradient group-hover:scale-105 transition-transform">
                Dona Éric
              </h3>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Ingénieur ML & Data Scientist spécialisé en IA, 
              transformant vos données en solutions intelligentes.
            </p>
            
            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Abomey-Calavi, Bénin</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-4 mb-6">
              <a
                href="mailto:donaerickoulodji@gmail.com"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>Email</span>
              </a>
              <a
                href="https://wa.me/2290141730240"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {social.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl bg-white/5 border border-white/10 ${item.color} transition-all duration-300 hover:border-white/20 hover:bg-white/10 group`}
                    aria-label={item.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-12" />

        {/* Status Badge - Centré */}
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30"
          >
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
            </div>
            {/* <div className="text-left">
              <p className="text-sm font-bold text-white">
                Actuellement disponible pour nouveaux projets
              </p>
              <p className="text-xs text-green-300">
                Freelance • Consulting • Collaborations long terme
              </p>
            </div> */}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <span>© {currentYear} Dona Éric</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Fait avec <Heart className="w-4 h-4 text-red-500 fill-red-500" /> en Afrique
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-zinc-500 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
              >
                <span>Confidentialité</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#"
                className="text-zinc-500 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
              >
                <span>Conditions</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
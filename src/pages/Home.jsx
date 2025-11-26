// src/pages/Home.jsx
import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import { Mail, Phone, Linkedin, MapPin, Send, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-gradient-radial text-white">
      <Hero />

      {/* About section (full) */}
      <About />

      {/* Services preview */}
      <section id="services-preview" className="py-12 section-unified">
        <Services />
      </section>

  {/* Contact CTA section */}
  <section id="contact" className="max-w-6xl mx-auto px-6 py-16 section-unified">
        <div className="text-center mb-12">
          <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-400">
            Contact
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
            Let’s Build Something Great Together
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
            I help organizations and innovators leverage <span className="text-purple-400 font-semibold">Machine Learning</span>, <span className="text-indigo-400 font-semibold">Data Science</span>, and <span className="text-blue-400 font-semibold">Artificial Intelligence</span> to build impactful, data-driven solutions. Let's transform your challenges into opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-purple-400" />
              Contact Information
            </h3>
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4 p-3 group">
                <div className="p-3 bg-purple-600/10 rounded-lg group-hover:bg-purple-600/20 transition">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <a href="mailto:donaerickoulodji@gmail.com" className="text-slate-200 hover:text-purple-400 font-medium transition">donaerickoulodji@gmail.com</a>
                </div>
              </div>
              {/* WhatsApp */}
              <div className="flex items-center gap-4 p-3 group">
                <div className="p-3 bg-emerald-600/10 rounded-lg group-hover:bg-emerald-600/20 transition">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">WhatsApp</p>
                  <a href="https://wa.me/2290141730240" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-emerald-400 font-medium transition">+229 01 41 73 02 40</a>
                </div>
              </div>
              {/* LinkedIn */}
              <div className="flex items-center gap-4 p-3 group">
                <div className="p-3 bg-blue-600/10 rounded-lg group-hover:bg-blue-600/20 transition">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">LinkedIn</p>
                  <a href="https://linkedin.com/in/dona-erick" target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-blue-400 font-medium transition">linkedin.com/in/dona-erick</a>
                </div>
              </div>
              {/* Location */}
              <div className="flex items-center gap-4 p-3 group">
                <div className="p-3 bg-slate-600/10 rounded-lg group-hover:bg-slate-600/20 transition">
                  <MapPin className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="text-slate-200 font-medium">Abomey-Calavi, Benin</p>
                </div>
              </div>
            </div>
          </div>
          {/* Zone d'appel à l’action */}
          <div className="p-10">
            <h3 className="text-3xl font-bold text-white mb-6 leading-tight">Ready to Start Your Project?</h3>
            <p className="text-slate-300 mb-8 leading-relaxed">Whether you need <span className="text-purple-400 font-semibold">data analysis</span>, <span className="text-indigo-400 font-semibold">machine learning</span> solutions, or <span className="text-blue-400 font-semibold">AI consulting</span>, I'm here to help you turn your vision into reality.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/2290141730240" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 group">
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Start a Conversation
              </a>
              <a href="mailto:donaerickoulodji@gmail.com" className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 hover:text-white group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Send an Email
              </a>
            </div>
            <div className="mt-10 pt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-400 mb-1">24h</p>
                <p className="text-xs text-slate-500">Response Time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-400 mb-1">100%</p>
                <p className="text-xs text-slate-500">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400 mb-1">10+</p>
                <p className="text-xs text-slate-500">Projects Delivered</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="relative">
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
            </div>
            <p className="text-lg font-semibold text-white">Currently Available for New Projects</p>
          </div>
          <p className="text-slate-400 text-sm">Open to freelance opportunities, consulting, and long-term collaborations</p>
        </div>
      </section>
    </main>
  );
}
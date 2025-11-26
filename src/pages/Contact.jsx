import React, { useState } from "react";
import { Loader2, CheckCircle, XCircle, Mail, User, MessageSquare, Phone, MapPin, Send, Clock, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("missing");
      return;
    }
    if (!validateEmail(form.email)) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xovkejww", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(null), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };
  const contactInfo = [
    {
      icon: MapPin,
      label: "Location",
      value: "Abomey-Calavi, Benin",
      color: "text-blue-400",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+229 01 51 34 42 89",
      color: "text-emerald-400",
    },
    {
      icon: Mail,
      label: "Email",
      value: "donaerickoulodji@gmail.com",
      href: "mailto:donaerickoulodji@gmail.com",
      color: "text-purple-400",
    },
  ];

  const quickStats = [
    { icon: Clock, label: "Response Time", value: "< 24h" },
    { icon: Globe, label: "Available", value: "Mon - Sun" },
    { icon: MessageSquare, label: "Languages", value: "EN / FR" },
  ];

  return (
    <section className="min-h-screen py-24 bg-gradient-radial text-white relative section-unified">
      {/* Background premium glassmorphism */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-400">
              Get in Touch
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-4 text-center hover:bg-purple-600/10 transition-all duration-300 hover:border-purple-500/20"
            >
              <stat.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-lg font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          <motion.div
            className="glass-card rounded-2xl p-8 shadow-lg hover:border-purple-500/20 transition-all duration-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">Send a Message</h2>
              <p className="text-slate-400">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-lg border border-purple-500/10 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400/30 outline-none transition-all duration-300 hover:border-purple-500/20 shadow-lg shadow-purple-500/10"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-lg border border-purple-500/10 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400/30 outline-none transition-all duration-300 hover:border-purple-500/20 shadow-lg shadow-purple-500/10"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 backdrop-blur-lg border border-purple-500/10 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400/30 outline-none transition-all duration-300 hover:border-purple-500/20 shadow-lg shadow-purple-500/10 resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === "sending"}
                className={`w-full px-6 py-4 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/20 flex items-center justify-center gap-3 transition-all duration-300 ${
                  status === "sending"
                    ? "bg-white/10 backdrop-blur-lg cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 hover:scale-105"
                }`}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <p className="text-emerald-400 font-semibold text-sm">Message Sent Successfully!</p>
                      <p className="text-emerald-300/80 text-xs mt-0.5">I'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <div>
                      <p className="text-red-400 font-semibold text-sm">Error Sending Message</p>
                      <p className="text-red-300/80 text-xs mt-0.5">Please try again or contact me directly.</p>
                    </div>
                  </motion.div>
                )}
                {status === "invalid" && (
                  <motion.p
                    className="text-orange-400 text-sm flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <XCircle className="w-4 h-4" />
                    Please enter a valid email address.
                  </motion.p>
                )}
                {status === "missing" && (
                  <motion.p
                    className="text-orange-400 text-sm flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <XCircle className="w-4 h-4" />
                    All fields are required.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-card rounded-2xl p-8 shadow-lg hover:bg-purple-600/10 transition-all duration-300 hover:border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-slate-700/50 border border-slate-600/50 group-hover:scale-110 transition-transform duration-300">
                        <info.icon className={`w-5 h-5 ${info.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-500 font-medium mb-1">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-slate-200 hover:text-purple-400 transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <>
                            <p className="text-slate-200 font-medium">{info.value}</p>
                            {info.secondaryValue && (
                              <p className="text-slate-300 text-sm mt-1">{info.secondaryValue}</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-purple-500/10 rounded-2xl p-8 shadow-lg shadow-purple-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <h4 className="text-xl font-bold text-white">Currently Available</h4>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">
                I'm currently accepting new projects and collaborations. Let's discuss how I can help bring your ideas to life.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1.5 bg-[hsl(var(--card))] text-xs text-slate-300 font-medium rounded-lg shadow-sm">
                  Data Science
                </span>
                <span className="inline-block px-3 py-1.5 bg-[hsl(var(--card))] text-xs text-slate-300 font-medium rounded-lg shadow-sm">
                  Machine Learning
                </span>
                <span className="inline-block px-3 py-1.5 bg-[hsl(var(--card))] text-xs text-slate-300 font-medium rounded-lg shadow-sm">
                  AI Consulting
                </span>
                <span className="inline-block px-3 py-1.5 bg-[hsl(var(--card))] text-xs text-slate-300 font-medium rounded-lg shadow-sm">
                  Data Engineering
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
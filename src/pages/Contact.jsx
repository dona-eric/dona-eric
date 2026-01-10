import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  Mail, 
  User, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  Globe,
  Sparkles,
  Linkedin,
  Github
} from "lucide-react";

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
      value: "+229 01 41 73 02 40",
      href: "tel:+2290141730240",
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
    <div className="bg-mesh text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-pink-900/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-12 group cursor-default"
            >
              <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm font-semibold text-purple-300">Get in Touch</span>
            </motion.div>

            {/* Titre avec animation rotation */}
            <motion.h1
              initial={{ opacity: 0, rotateY: -180 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-8"
              style={{ transformStyle: "preserve-3d" }}
            >
              Let's
              <br />
              <span className="text-gradient text-5xl md:text-6xl lg:text-7xl font-light">
                Connect
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
            >
              Have a project in mind or want to collaborate?{" "}
              <span className="text-white font-semibold">I'd love to hear from you.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 relative">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 text-center hover:border-white/20 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-zinc-400 mb-1">{stat.label}</p>
                  <p className="text-lg font-semibold text-white">{stat.value}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-20 md:h-24" />

      {/* Form & Info Section */}
      <section className="py-20 relative">
        <div className="container-custom px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur-xl opacity-20 animate-pulse" />
              
              <div className="relative glass-strong rounded-3xl p-8 md:p-10 border-2 border-white/20">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-3">Send a Message</h2>
                  <p className="text-zinc-400">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-3">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 text-white placeholder-zinc-600 rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-3">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 text-white placeholder-zinc-600 rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-zinc-300 mb-3">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 text-white placeholder-zinc-600 rounded-xl focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                        placeholder="Tell me about your project or inquiry..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full px-6 py-5 rounded-xl text-white font-bold text-lg shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    
                    {status === "sending" ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5 relative z-10" />
                        <span className="relative z-10">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <span className="relative z-10">Send Message</span>
                      </>
                    )}
                  </motion.button>

                  {/* Feedback Messages */}
                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30 flex items-start gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-emerald-400 font-semibold text-sm">Message Sent Successfully!</p>
                          <p className="text-emerald-300/80 text-xs mt-0.5">I'll get back to you within 24 hours.</p>
                        </div>
                      </motion.div>
                    )}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl bg-red-500/10 border-2 border-red-500/30 flex items-start gap-3"
                      >
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-400 font-semibold text-sm">Error Sending Message</p>
                          <p className="text-red-300/80 text-xs mt-0.5">Please try again or contact me directly.</p>
                        </div>
                      </motion.div>
                    )}
                    {status === "invalid" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-orange-400 text-sm flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Please enter a valid email address.
                      </motion.p>
                    )}
                    {status === "missing" && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-orange-400 text-sm flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        All fields are required.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Info Card */}
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.label} className="group">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-white/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                            <Icon className={`w-5 h-5 ${info.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-zinc-500 font-medium mb-1">{info.label}</p>
                            {info.href ? (
                              <a
                                href={info.href}
                                className="text-zinc-200 hover:text-purple-400 transition-colors font-medium"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <p className="text-zinc-200 font-medium">{info.value}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Social Links */}
                {/* <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-sm text-zinc-500 mb-4">Connect with me</p>
                  <div className="flex gap-3">
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://github.com/dona-eric"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                    >
                      <Github className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, y: -2 }}
                      href="https://linkedin.com/in/dona-erick"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all"
                    >
                      <Linkedin className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
                    </motion.a>
                  </div>
                </div> */}
              </div>

              {/* Availability Card */}
              {/* <div className="p-8 rounded-3xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Currently Available</h4>
                </div>
                <p className="text-zinc-300 leading-relaxed mb-6">
                  I'm currently accepting new projects and collaborations. Let's discuss how I can help bring your ideas to life.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Data Science", "Machine Learning", "AI Consulting", "MLOps"].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-white/10 text-xs text-zinc-300 font-medium rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ESPACEUR */}
      <div className="h-32 md:h-48" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-purple-500/20 rounded-full animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-pink-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
}
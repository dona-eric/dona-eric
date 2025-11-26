import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Mail,
  User,
  MessageSquare,
  Linkedin,
  Github,
  ArrowUpRight,
} from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }
    if (!validateEmail(form.email)) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xovkejww", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (res.ok) {
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

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond ultra subtil */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Texte de gauche – sobre, impactant */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                Discutons<br />
                <span className="text-zinc-400">de votre projet IA</span>
              </h2>
              <p className="text-xl text-zinc-400 mt-6 leading-relaxed max-w-lg">
                Que vous cherchiez un expert pour un contrat, une collaboration ou simplement un échange technique,
                je suis disponible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-zinc-400">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <span className="text-lg">Ouvert aux opportunités (CDI, freelance, mission)</span>
              </div>

              <div className="flex flex-wrap gap-4">
                {[
                  { Icon: Linkedin, href: "https://linkedin.com/in/dona-erick", label: "LinkedIn" },
                  { Icon: Github, href: "https://github.com/dona-eric", label: "GitHub" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-6 py-3 border border-zinc-800 rounded-full text-zinc-300 hover:border-zinc-600 hover:bg-white/5 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Formulaire – épuré, pro, moderne */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-8">
                Envoyez-moi un message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-white/15 transition-all duration-300"
                      placeholder="Dona Éric KOULODJI"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-white/15 transition-all duration-300"
                      placeholder="eric@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-white/15 transition-all duration-300 resize-none"
                      placeholder="Parlez-moi de votre projet, votre besoin, ou posez-moi une question technique..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {status === "sending" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>

              {/* Feedback */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400"
                  >
                    <CheckCircle className="w-6 h-6" />
                    <span>Message envoyé avec succès ! Je vous réponds sous 24h.</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 text-red-400"
                  >
                    <AlertCircle className="w-6 h-6" />
                    <span>Une erreur est survenue. Réessayez ou contactez-moi sur LinkedIn.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
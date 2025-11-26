import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, User, Phone, Sparkles } from "lucide-react";

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
  });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return false;
    if (!/\S+@\S+\.\S+/.test(form.email)) return false;
    if (!/^\+?\d{6,15}$/.test(form.phone.replace(/\s/g, ""))) return false;
    if (!form.interest) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xovkejww", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: form.interest,
          _subject: "Nouvelle inscription programme IA - Portfolio Dona Eric",
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", interest: "" });
        setTimeout(() => setStatus(null), 6000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const interests = [
    "Bootcamp Machine Learning intensif",
    "Formation RAG & Fine-tuning LLM",
    "Mentorat personnalisé (1-to-1)",
    "Atelier MLOps & déploiement",
    "Programme Data Science Afrique",
    "Consulting IA pour mon entreprise",
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond premium ultra discret */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Rejoignez la prochaine<br />
              <span className="text-zinc-400">vague d’experts IA africains</span>
            </h2>
            <p className="mt-6 text-xl text-zinc-400">
              Formations intensives, mentorat individuel, projets réels en production.
            </p>
          </div>

          {/* Formulaire premium */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Nom */}
              <div>
                <label className="flex items-center gap-3 text-sm font-medium text-zinc-400 mb-3">
                  <User className="w-5 h-5" />
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Dona Éric KOULODJI"
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-white/15 transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-3 text-sm font-medium text-zinc-400 mb-3">
                  <Mail className="w-5 h-5" />
                  Email professionnel
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="eric@entreprise.com"
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-white/15 transition-all duration-300"
                />
              </div>

              {/* Téléphone */}
              <div>
                <label className="flex items-center gap-3 text-sm font-medium text-zinc-400 mb-3">
                  <Phone className="w-5 h-5" />
                  Téléphone (WhatsApp recommandé)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+229 97 00 00 00"
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-white/15 transition-all duration-300"
                />
              </div>

              {/* Intérêt */}
              <div>
                <label className="flex items-center gap-3 text-sm font-medium text-zinc-400 mb-3">
                  <Sparkles className="w-5 h-5" />
                  Je souhaite rejoindre
                </label>
                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white focus:outline-none focus:border-zinc-500 focus:bg-white/15 transition-all duration-300"
                >
                  <option value="">— Choisir un programme —</option>
                  {interests.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
              >
                {status === "sending" ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Réserver ma place maintenant
                  </>
                )}
              </button>
            </form>

            {/* Feedback */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center gap-4 text-green-400"
                >
                  <CheckCircle className="w-10 h-10 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Inscription reçue !</p>
                    <p className="text-sm text-green-300">
                      Je te recontacte sous 24h avec les détails du programme choisi.
                    </p>
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-4 text-red-400"
                >
                  <AlertCircle className="w-10 h-10 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Erreur</p>
                    <p className="text-sm">Vérifie tes informations ou contacte-moi directement sur WhatsApp.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Petit footer discret */}
            <div className="text-center mt-10 text-zinc-500 text-sm">
              <p>Places limitées • Prochaines sessions : Janvier & Mars 2026</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
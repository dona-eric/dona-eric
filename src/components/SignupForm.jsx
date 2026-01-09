import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  User, 
  Phone, 
  Sparkles,
  Target,
  Zap,
  Award,
  Clock
} from "lucide-react";

export default function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
  });
  const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"
  const [focusedField, setFocusedField] = useState(null);

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
    { value: "Bootcamp Machine Learning intensif", icon: Target, color: "purple" },
    { value: "Formation RAG & Fine-tuning LLM", icon: Sparkles, color: "pink" },
    { value: "Mentorat personnalisé (1-to-1)", icon: Award, color: "cyan" },
    { value: "Atelier MLOps & déploiement", icon: Zap, color: "blue" },
    { value: "Programme Data Science Afrique", icon: Target, color: "emerald" },
    { value: "Consulting IA pour mon entreprise", icon: Sparkles, color: "orange" },
  ];

  const benefits = [
    { icon: Target, text: "Projets réels en production" },
    { icon: Zap, text: "Mentorat personnalisé" },
    { icon: Award, text: "Certification reconnue" },
    { icon: Clock, text: "Support illimité" }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background sophistiqué */}
      <div className="absolute inset-0 -z-10 bg-mesh">
        <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-20 w-[600px] h-[600px] bg-pink-900/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[140px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-custom px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            
            {/* Colonne gauche - Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Header */}
              <div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-6 group cursor-default"
                >
                  <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm font-semibold text-purple-300">Formations Premium</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6">
                  Rejoignez la prochaine vague
                  <br />
                  <span className="text-gradient">d'experts IA africains</span>
                </h2>
                
                <p className="text-lg text-zinc-400 leading-relaxed">
                  Formations intensives, mentorat individuel, projets réels en production. 
                  Passez de débutant à expert reconnu en <span className="text-white font-semibold">12 semaines</span>.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">
                        {benefit.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats mini */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="text-2xl font-black text-gradient mb-1">50+</div>
                  <div className="text-xs text-zinc-500">Étudiants formés</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="text-2xl font-black text-gradient mb-1">90%</div>
                  <div className="text-xs text-zinc-500">Satisfaction</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
                  <div className="text-2xl font-black text-gradient mb-1">24h</div>
                  <div className="text-xs text-zinc-500">Support</div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-zinc-500 mb-3">Programmes reconnus par :</p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-400 font-medium">
                    🎓 Universités partenaires
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-400 font-medium">
                    🏢 Entreprises tech
                  </div>
                  <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-400 font-medium">
                    🌍 Communauté africaine IA
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Colonne droite - Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {/* Card du formulaire */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-3xl blur-xl opacity-20 animate-pulse" />
                
                <div className="relative glass-strong rounded-3xl p-8 md:p-10 border-2 border-white/20">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Nom */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="flex items-center gap-3 text-sm font-semibold text-zinc-300 mb-3">
                        <User className="w-5 h-5 text-purple-400" />
                        Nom complet
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          placeholder="Dona Éric KOULODJI"
                          className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                        />
                        {focusedField === 'name' && (
                          <motion.div
                            layoutId="focus-indicator"
                            className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl -z-10 blur-sm"
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="flex items-center gap-3 text-sm font-semibold text-zinc-300 mb-3">
                        <Mail className="w-5 h-5 text-pink-400" />
                        Email professionnel
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          placeholder="eric@entreprise.com"
                          className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all duration-300"
                        />
                        {focusedField === 'email' && (
                          <motion.div
                            layoutId="focus-indicator"
                            className="absolute -inset-0.5 bg-gradient-to-r from-pink-600/30 to-purple-600/30 rounded-xl -z-10 blur-sm"
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Téléphone */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="flex items-center gap-3 text-sm font-semibold text-zinc-300 mb-3">
                        <Phone className="w-5 h-5 text-cyan-400" />
                        Téléphone (WhatsApp recommandé)
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          required
                          placeholder="+229 97 00 00 00"
                          className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all duration-300"
                        />
                        {focusedField === 'phone' && (
                          <motion.div
                            layoutId="focus-indicator"
                            className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/30 to-blue-600/30 rounded-xl -z-10 blur-sm"
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Intérêt */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="flex items-center gap-3 text-sm font-semibold text-zinc-300 mb-3">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        Programme souhaité
                      </label>
                      <div className="relative">
                        <select
                          name="interest"
                          value={form.interest}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('interest')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-zinc-900">
                            — Choisir un programme —
                          </option>
                          {interests.map((item) => (
                            <option key={item.value} value={item.value} className="bg-zinc-900">
                              {item.value}
                            </option>
                          ))}
                        </select>
                        {focusedField === 'interest' && (
                          <motion.div
                            layoutId="focus-indicator"
                            className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl -z-10 blur-sm"
                          />
                        )}
                        {/* Custom arrow */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-purple-500/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
                    >
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      
                      {status === "sending" ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                          <span>Réserver ma place maintenant</span>
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Feedback Messages */}
                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl flex items-start gap-4"
                      >
                        <div className="p-3 rounded-xl bg-green-500/20">
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-green-400 text-lg mb-1">
                            🎉 Inscription reçue avec succès !
                          </p>
                          <p className="text-sm text-green-300">
                            Je te recontacte sous 24h avec les détails du programme choisi et les prochaines étapes.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-8 p-6 bg-gradient-to-r from-red-500/10 to-pink-500/10 border-2 border-red-500/30 rounded-2xl flex items-start gap-4"
                      >
                        <div className="p-3 rounded-xl bg-red-500/20">
                          <AlertCircle className="w-8 h-8 text-red-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-red-400 text-lg mb-1">
                            Erreur d'envoi
                          </p>
                          <p className="text-sm text-red-300 mb-3">
                            Vérifie tes informations ou contacte-moi directement sur WhatsApp.
                          </p>
                          <a
                            href="https://wa.me/2290141730240"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-300 text-sm font-medium transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            Contacter via WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Footer info */}
                  <div className="mt-8 pt-6 border-t border-white/10 text-center space-y-3">
                    <div className="flex items-center justify-center gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                        <span className="text-zinc-400">Places limitées</span>
                      </div>
                      <span className="text-zinc-600">•</span>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-pink-400" />
                        <span className="text-zinc-400">Sessions : Jan & Mars 2026</span>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-600">
                      Tes données sont protégées et ne seront jamais partagées
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
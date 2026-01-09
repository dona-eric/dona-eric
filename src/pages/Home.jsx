import React from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import { Send, Mail, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-mesh text-white">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* ESPACEUR AUGMENTÉ ENTRE ABOUT ET SERVICES */}
      <div className="h-32 md:h-48" />

      {/* Services Section */}
      <section id="services" className="relative">
        <Services />
      </section>

      {/* ESPACEUR AUGMENTÉ ENTRE SERVICES ET CONTACT */}
      <div className="h-32 md:h-48" />

      {/* Contact CTA Section - Centré et épuré */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Background sophistiqué */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-24">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-16 group cursor-default"
              >
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm font-semibold text-purple-300">Discutons de votre projet</span>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </motion.div>

              {/* Titre avec animation de rotation 360° */}
              <motion.h2
                initial={{ opacity: 0, rotateY: -180 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-14 leading-[1.1]"
                style={{ transformStyle: "preserve-3d" }}
              >
                Prêt à transformer
                <br />
                <span className="text-gradient">vos idées en réalité ?</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
              >
                Que vous ayez besoin d'<span className="text-white font-semibold">analyse de données</span>, 
                de solutions de <span className="text-white font-semibold">machine learning</span>, 
                ou de <span className="text-white font-semibold">conseil en IA</span>, 
                je suis là pour vous accompagner.
              </motion.p>
            </div>

            {/* ESPACEUR AUGMENTÉ ENTRE DESCRIPTION ET CTA */}
            <div className="h-20 md:h-24" />

            {/* CTA Buttons - Centré */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/signup"
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 relative overflow-hidden"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
                <span className="relative z-10">Réserver ma place</span>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:donaerickoulodji@gmail.com"
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 glass border-2 border-white/20 text-white font-semibold text-lg rounded-full hover:bg-white/10 transition-all duration-300"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Envoyer un email</span>
              </motion.a>
            </motion.div>

            {/* ESPACEUR ENTRE CTA ET STATS */}
            <div className="h-16 md:h-20" />

            {/* Stats Grid - Centré */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-24"
            >
              {[
                { value: "24h", label: "Temps de réponse", color: "purple" },
                { value: "90%", label: "Satisfaction client", color: "pink" },
                { value: "7+", label: "Projets livrés", color: "cyan" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className={`text-3xl md:text-4xl font-black text-gradient mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* ESPACEUR ENTRE STATS ET STATUS BADGE */}
            <div className="h-16 md:h-20" />

            {/* Status Badge - Centré */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-white">
                    Actuellement disponible pour nouveaux projets
                  </p>
                  <p className="text-sm text-green-100">
                    Freelance • Consulting • Collaborations long terme
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ESPACEUR ENTRE STATUS BADGE ET LIENS ALTERNATIFS */}
            <div className="h-12 md:h-16" />

            {/* Alternative contact methods - Discret */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <p className="text-sm text-zinc-500 mb-4">
                Vous préférez un autre moyen de contact ?
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm ">
                <a 
                  href="https://linkedin.com/in/dona-erick" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/dona-eric" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                >
                  GitHub
                </a>
                <a 
                  href="tel:+2290141730240"
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all"
                >
                  +229 01 41 73 02 40
                </a>
              </div>
            </motion.div>
          </motion.div>

          <div className="h-20 md:h-24" />

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-purple-500/20 rounded-full animate-float" />
          <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-pink-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-20 w-16 h-16 border-2 border-cyan-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Optional: Testimonial Teaser ou Trust Badges */}
      <section className="py-16 relative">
        <div className="container-custom px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-sm text-zinc-500 mb-6 uppercase tracking-wider">
              Ils me font confiance
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-500">
              {/* Placeholder pour logos partenaires */}
              <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-sm font-medium">
                🏢 Entreprises Tech
              </div>
              <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-sm font-medium">
                🎓 Institutions Académiques
              </div>
              <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-400 text-sm font-medium">
                🚀 Startups Africaines
              </div>
            </div>
          </motion.div>
        </div>
        <div className="h-20 md:h-24" />
      </section>
    </main>
  );
}
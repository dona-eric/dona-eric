// src/pages/Blog.jsx
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, TrendingUp } from "lucide-react";

// Tes vrais articles (triés par pertinence 2025)
const ARTICLES = [
  {
    title: "Fine-tuning Llama 3 sur un dataset médical africain",
    excerpt: "Comment j’ai atteint 94% de précision sur un RAG médical en langue locale avec seulement 8Go de VRAM.",
    date: "15 Novembre 2025",
    link: "https://medium.com/koulodjiric/fine-tuning-llama-3-afrique",
    gradient: "from-purple-600 to-pink-600",
    reads: "3.2k",
    featured: true
  },
  {
    title: "Déployer un LLM en production pour moins de 50$/mois",
    excerpt: "Architecture complète : Groq + FastAPI + Docker + Monitoring + Auto-scaling. Cas réel.",
    date: "8 Novembre 2025",
    link: "https://medium.com/koulodjiric/llm-production-50-dollars",
    gradient: "from-blue-600 to-cyan-600",
    reads: "5.8k",
    featured: true
  },
  {
    title: "Pourquoi 90% des projets RAG échouent (et comment réussir)",
    excerpt: "Les 7 erreurs fatales que je vois tous les jours chez mes clients et étudiants.",
    date: "1er Novembre 2025",
    link: "https://medium.com/koulodjiric/rag-failure",
    gradient: "from-emerald-600 to-teal-600",
    reads: "7.1k"
  },
  {
    title: "De la physique fondamentale à l’IA en production",
    excerpt: "Mon parcours complet : physique → data → LLM → mentorat d’élite.",
    date: "20 Octobre 2025",
    link: "https://medium.com/koulodjiric/mon-parcours",
    reads: "2.9k"
  },
  {
    title: "Prompt Engineering : les 12 patterns que j’utilise tous les jours",
    excerpt: "Chain-of-Verification, Tree-of-Thought, Self-Consistency… appliqués à des cas réels.",
    date: "12 Septembre 2025",
    link: "https://cykrhzat.mychariow.com/prompt",
    reads: "9.4k"
  }
];

export default function Blog() {
  const featured = ARTICLES.filter(a => a.featured);
  const others = ARTICLES.filter(a => !a.featured);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Fond premium */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-900/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-6">
        {/* Header puissant */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <span className="inline-block px-6 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-medium text-zinc-400 mb-8">
            Blog & Publications
          </span>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
            J’écris ce que<br />
            <span className="text-5xl md:text-6xl lg:text-7xl font-light text-zinc-400">
              je vis en production
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
            Pas de théorie vide. Que du concret. Du terrain. Des systèmes qui tournent vraiment.
          </p>
        </motion.div>

        {/* Articles en vedette */}
        <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto mb-20">
          {featured.map((article, i) => (
            <motion.a
              key={i}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative block"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-700`} />
                
                <div className="p-10 relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-5 h-5 text-zinc-500" />
                    <span className="text-zinc-500 text-sm">{article.date}</span>
                    {article.reads && (
                      <>
                        <div className="w-1 h-1 bg-zinc-600 rounded-full mx-2" />
                        <div className="flex items-center gap-1 text-zinc-500 text-sm">
                          <TrendingUp className="w-4 h-4" />
                          {article.reads} lectures
                        </div>
                      </>
                    )}
                  </div>

                  <h2 className="text-3xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 transition-all duration-500">
                    {article.title}
                  </h2>
                  <p className="text-xl text-zinc-400 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="mt-8 flex items-center gap-3 text-purple-400 group-hover:text-white transition-colors">
                    <span className="font-bold">Lire l’article</span>
                    <ExternalLink className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Autres articles */}
        {others.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-10 text-center">
              Articles récents
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {others.map((article, i) => (
                <motion.a
                  key={i}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start gap-6 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <div className="w-2 h-full bg-gradient-to-b from-purple-500 to-transparent rounded-full" />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition">
                      {article.title}
                    </h4>
                    <p className="text-zinc-400 text-sm mb-3">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <span>{article.date}</span>
                      {article.reads && (
                        <>
                          <span>•</span>
                          <span>{article.reads} lectures</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-24"
        >
          <p className="text-2xl text-zinc-400 mb-8">
            Tous mes articles, analyses et retours d’expérience<br />
            <span className="text-white font-bold">disponibles sur Medium</span>
          </p>
          <a
            href="https://medium.com/koulodjiric"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
          >
            Accéder à mon blog complet
            <ExternalLink className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
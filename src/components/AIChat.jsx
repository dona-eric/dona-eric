import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, Sparkles, Zap } from "lucide-react";
import { sendToGroq } from "../api/groq";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Salut ! Je suis Eric, ton assistant IA personnel.\nPose-moi n’importe quelle question sur le Machine Learning, le code, les projets.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendToGroq(userMessage, newMessages);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("Groq error:", err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Désolé, je rencontre un problème technique. Réessaie dans quelques secondes." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bouton flottant – niveau luxe 2025 */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-500 font-semibold text-lg"
        aria-label="Ouvrir l'assistant IA"
      >
        <Bot className="w-7 h-7" />
        <span className="hidden sm:inline">Eric</span>
        <Sparkles className="w-5 h-5 animate-pulse" />
      </motion.button>

      {/* Fenêtre du chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-8 w-96 h-[580px] bg-black/70 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-violet-600/80 to-pink-600/80 backdrop-blur-xl border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-xl animate-pulse" />
                    <Bot className="w-10 h-10 text-white relative" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Eric</h3>
                    <p className="text-white/80 text-xs flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      En ligne • Réponse instantanée
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/20">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-5 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg"
                        : "bg-white/10 text-white backdrop-blur border border-white/10"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Loading */}
              {loading && (
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                      className="w-3 h-3 bg-gradient-to-r from-violet-400 to-pink-400 rounded-full"
                    />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Pose ta question..."
                  className="flex-1 px-5 py-3 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition placeholder:text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="p-3 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full disabled:opacity-50 transition shadow-lg hover:shadow-purple-500/50"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
              <p className="text-center text-xs text-gray-500 mt-2">
                Propulsé par Groq • OpenAI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
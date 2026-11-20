import React, { useState, useRef, useEffect } from "react";
import { sendToGroq } from "../api/groq";
import { useLanguage } from "../context/LanguageContext";
import "../styles/ChatWidget.css";

const GREETING = {
  en: "Hi! I'm Dona's AI assistant. Ask me anything about his background, projects or skills.",
  fr: "Bonjour ! Je suis l'assistant IA de Dona. Posez-moi une question sur son parcours, ses projets ou ses compétences.",
};

export default function ChatWidget() {
  const { tr, tx } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  // The greeting is rendered in the current language until the conversation starts.
  const [messages, setMessages] = useState([{ role: "assistant", greeting: true, content: GREETING.en }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const history = messages.filter(m => m.role !== "system").map(m => ({
        role: m.role,
        content: m.greeting ? tx(GREETING) : m.content
      }));
      
      const reply = await sendToGroq(userMessage, history);
      
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: tr("Sorry, a connection error occurred. Please try again.", "Désolé, une erreur de connexion est survenue. Veuillez réessayer.") }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        className={`chat-widget-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? tr("Close the assistant", "Fermer l'assistant") : tr("Open the assistant", "Ouvrir l'assistant")}
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      <div className={`chat-widget-window ${isOpen ? "open" : ""}`}>
        <div className="chat-widget-header">
          <div className="chat-widget-title">
            <div className="chat-widget-dot"></div>
            <span>Dona.ia</span>
          </div>
          <button className="chat-widget-close" onClick={() => setIsOpen(false)} aria-label={tr("Close", "Fermer")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="chat-widget-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message-wrapper ${msg.role === 'user' ? 'user' : 'assistant'}`}>
              <div className="chat-message-bubble">
                {msg.greeting ? tx(GREETING) : msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message-wrapper assistant">
              <div className="chat-message-bubble typing">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-widget-input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tr("Ask a question about my profile…", "Posez une question sur mon profil…")}
            className="chat-widget-input"
            disabled={isLoading}
          />
          <button type="submit" className="chat-widget-send" disabled={!input.trim() || isLoading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}

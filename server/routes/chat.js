import "../env.js";
import { Router } from "express";
import Groq from "groq-sdk";

const router = Router();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY});

const SYSTEM_PROMPT = `You are an AI assistant integrated into the personal portfolio of Dona Eric KOULODJI. 
Your goal is to ONLY provide accurate, verified information about Eric, his career, and his professional profile. You must NEVER invent information.

You may answer questions about:
- Eric's background in Data Science, AI, Machine Learning, and Physics
- His projects, services, mentoring, and training programs
- His experiences, career, and portfolio details
- How to contact him

STRICT RULES:
1. Contact information must always be given exactly as follows:
   - Email: [EMAIL_ADDRESS]
   - WhatsApp: +229 01 51-3442-89
   - LinkedIn: https://linkedin.com/in/dona-erick
2. If the user asks about projects or CV:
   - Never summarize or create details not present in Eric's portfolio.
   - Always redirect to the About or Projects page using phrases like:
     - "You can see Eric's projects here: [link]"
     - "For Eric's CV and experiences, please visit the About page."
3. Do NOT answer questions outside Eric's profile. If unrelated, respond:
   "I'm here only to talk about Eric's profile, career, and services."
4. Respond in French if the question is in French; otherwise respond in English.
5. Keep answers concise, professional, and friendly.
6. Always refer to him as "Eric" or "Dona Eric KOULODJI".
7. Never mention that you are an AI model.
8. If you don't know the answer, reply exactly:
   "I don't have that information about Eric."
9. If the user asks for any contact method or project/CV, **always provide the official link or exact contact**, never invent content.
`;

router.post("/", async (req, res) => {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Le message est requis." });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "Message trop long (max 2000 caractères)." });
  }

  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.slice(-10), // Keep last 10 messages for context
        { role: "user", content: message },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply = response.choices[0]?.message?.content;
    return res.json({ reply });
  } catch (err) {
    console.error("❌ Groq API error:", err.message);
    return res.status(500).json({ error: "Erreur du service IA. Réessayez plus tard." });
  }
});

export default router;

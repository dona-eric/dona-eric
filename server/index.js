import "./env.js";
import express from "express";
import cors from "cors";
import dns from "dns";
// Contournement d'un bug réseau Node.js fréquent (IPv6 -> Notion)
dns.setDefaultResultOrder("ipv4first");
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { initDatabase } from "./database.js";
import registrationRoutes from "./routes/registrations.js";
import masterclassesRoutes from "./routes/masterclasses.js";
import postsRoutes from "./routes/posts.js";
import academyRoutes from "./routes/academy.js";
import chatRoutes from "./routes/chat.js";
import productsRoutes from "./routes/products.js";
import customersRoutes from "./routes/customers.js";
import reviewsRoutes from "./routes/reviews.js";
import { startReminderScheduler, sendScheduledReminders } from "./reminderScheduler.js";
import { verifyTransport, sendTestEmail } from "./emailService.js";


const app = express();
const PORT = process.env.PORT || 3001;

// Nécessaire sur Render/Vercel pour récupérer la vraie IP du client derrière le proxy
app.set("trust proxy", 1);

app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://donerick.onrender.com",
    "https://donerick.vercel.app",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

// Limiteur de requêtes équilibré pour les formulaires d'inscription
const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 tentatives max par IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de tentatives d'inscription. Veuillez réessayer dans quelques minutes.", code: "TOO_MANY_REQUESTS" },
});

// Limiteur de requêtes pour le Chat AI
const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 10 minutes
  max: 60, // 60 messages par IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Limite de messages atteinte. Veuillez repatienter quelques minutes.", code: "TOO_MANY_REQUESTS" },
});

// Limiteur pour la soumission d'avis étudiants
const reviewsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de soumissions d'avis. Veuillez patienter avant d'en poster un nouveau.", code: "TOO_MANY_REQUESTS" },
});

app.use("/api/register", registrationLimiter);
app.use("/api/academy/register", registrationLimiter);
app.use("/api/reviews", reviewsLimiter);
app.use("/api/chat", chatLimiter);

app.use("/api", registrationRoutes);
app.use("/api/masterclasses", masterclassesRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/academy", academyRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/reviews", reviewsRoutes);
app.get("/api/health", (_, res) => res.json({ status: "ok" }));


// ── Route de test email (DEBUG)
app.get("/api/test-email", async (req, res) => {
  const to = req.query.to || process.env.EMAIL_USER;
  try {
    const info = await sendTestEmail(to);
    return res.json({
      success: true,
      message: `Email de test envoyé à ${to}`,
      messageId: info.messageId,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      hint: "Vérifiez EMAIL_USER",
    });
  }
});

// ── Route de déclenchement de rappels (pour cron externe) ───────
const VALID_REMINDER_TYPES = ["morning", "five_minutes", "started"];
app.get("/api/send-reminders/:type", async (req, res) => {
  const { type } = req.params;
  if (!VALID_REMINDER_TYPES.includes(type)) {
    return res.status(400).json({
      error: `Type invalide. Types acceptés: ${VALID_REMINDER_TYPES.join(", ")}`,
    });
  }
  try {
    await sendScheduledReminders(type);
    return res.json({ success: true, message: `Rappels '${type}' déclenchés.` });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, async () => {
  await initDatabase();
  await verifyTransport(); // Vérifie le SMTP dès le démarrage
  startReminderScheduler();
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
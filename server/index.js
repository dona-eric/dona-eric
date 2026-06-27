import "dotenv/config";
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
import { startReminderScheduler, sendScheduledReminders } from "./reminderScheduler.js";
import { verifyTransport, sendTestEmail } from "./emailService.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://donerick.onrender.com",
    "https://donerick.vercel.app",
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  methods: ["GET", "POST"],
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Trop de tentatives. Réessayez dans 15 minutes." },
});
app.use("/api/register", limiter);

app.use("/api", registrationRoutes);
app.use("/api/masterclasses", masterclassesRoutes);
app.use("/api/posts", postsRoutes);
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
      hint: "Vérifiez EMAIL_USER et EMAIL_PASS dans .env (App Password Gmail).",
    });
  }
});

app.get("/api/debug-env", (req, res) => {
  const mask = (val) => {
    if (!val) return "undefined/empty";
    return `${val.substring(0, 3)}...${val.substring(val.length - 3)} (length: ${val.length})`;
  };
  return res.json({
    EMAIL_USER: mask(process.env.EMAIL_USER),
    EMAIL_PASS: mask(process.env.EMAIL_PASS),
    EMAIL_FROM: mask(process.env.EMAIL_FROM),
    PORT: process.env.PORT || "default 3001",
    NODE_ENV: process.env.NODE_ENV || "not set"
  });
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
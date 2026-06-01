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
import { startReminderScheduler } from "./reminderScheduler.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
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

app.listen(PORT, async () => {
  await initDatabase();
  startReminderScheduler();
  console.log(`🚀 Serveur démarré sur https://donerick.onrender.com`);
});
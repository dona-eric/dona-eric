import { Router } from "express";
import { z } from "zod";
import {
  insertAcademyRegistration,
  checkAcademyDuplicate,
  countAcademyRegistrations,
} from "../database.js";
import { sendAcademyConfirmationEmail } from "../emailService.js";

const router = Router();

const academySchema = z.object({
  first_name:    z.string().min(2).max(50).trim(),
  last_name:     z.string().min(2).max(50).trim(),
  email:         z.string().email().toLowerCase().trim(),
  country:       z.string().min(2).max(50).trim(),
  profession:    z.string().min(2).max(100).trim(),
  current_level: z.string().min(2).max(200).trim(),
  objective:     z.string().min(2).max(200).trim(),
  motivation:    z.string().max(1000).optional().default(""),
});

// POST /api/academy/register
router.post("/register", async (req, res) => {
  try {
    const data = academySchema.parse(req.body);

    // Check for duplicate email
    const existing = await checkAcademyDuplicate(data.email);
    if (existing) {
      return res.status(409).json({
        error: "Cette adresse email est déjà pré-inscrite.",
        code: "DUPLICATE_EMAIL",
      });
    }

    // Insert registration
    await insertAcademyRegistration({
      ...data,
      ip_address: req.ip || req.headers["x-forwarded-for"] || null,
    });

    // Send welcome email (non-blocking)
    sendAcademyConfirmationEmail(data)
      .then(() => console.log(`📧 Email MLAcademy envoyé à ${data.email}`))
      .catch((emailErr) => {
        console.error("❌ Erreur envoi email MLAcademy:", emailErr.message);
        import("fs").then(fs => fs.writeFileSync("email_error.log", emailErr.stack || emailErr.message));
      });

    const count = await countAcademyRegistrations();
    const fullName = `${data.first_name} ${data.last_name}`;

    return res.status(201).json({
      success: true,
      message: "Pré-inscription enregistrée avec succès !",
      data: {
        name: fullName,
        email: data.email,
        count,
      },
    });
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        error: "Données invalides.",
        details: err.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
      });
    }
    console.error("❌ Erreur serveur Academy:", err);
    return res.status(500).json({ error: "Erreur serveur. Réessayez." });
  }
});

// GET /api/academy/count
router.get("/count", async (req, res) => {
  try {
    const count = await countAcademyRegistrations();
    return res.json({ count });
  } catch (err) {
    console.error("Erreur count academy:", err);
    return res.json({ count: 0 });
  }
});

export default router;

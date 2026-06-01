import { Router } from "express";
import { z } from "zod";
import {insertRegistration,checkDuplicate,countRegistrations,logEmail,} from "../database.js";
import { sendConfirmationEmail } from "../emailService.js";
import { getMasterclassById } from "../services/notionService.js";
import { isOpen } from "../../src/config/masterclasses.config.js";

const router = Router();

const registrationSchema = z.object({
  masterclass_id: z.string().min(1),
  first_name:     z.string().min(2).max(50).trim(),
  last_name:      z.string().min(2).max(50).trim(),
  email:          z.string().email().toLowerCase().trim(),
  profession:     z.string().min(2).max(100).trim(),
  domain:         z.string().min(2).max(100).trim(),
  message:        z.string().max(500).optional().default(""),
  prerequisites:  z.array(z.string()).min(1, "Veuillez valider les prérequis"),
});

// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const data = registrationSchema.parse(req.body);

    const masterclass = await getMasterclassById(data.masterclass_id);
    if (!masterclass) {
      return res.status(404).json({ error: "Événement introuvable." });
    }

    if (!isOpen(masterclass)) {
      return res.status(400).json({
        error: "Les inscriptions pour cet événement sont closes.",
        code: "REGISTRATIONS_CLOSED",
      });
    }

    if (masterclass.seats > 0) {
      const count = await countRegistrations(data.masterclass_id);
      if (count >= masterclass.seats) {
        return res.status(400).json({
          error: "Toutes les places sont prises pour cet événement.",
          code: "NO_SEATS",
        });
      }
    }

    const existing = await checkDuplicate(data.masterclass_id, data.email);
    if (existing) {
      return res.status(409).json({
        error: "Cette adresse email est déjà inscrite à cet événement.",
        code: "DUPLICATE_EMAIL",
      });
    }

    const result = await insertRegistration({
      ...data,
      prerequisites: JSON.stringify(data.prerequisites),
      ip_address: req.ip || req.headers["x-forwarded-for"] || null,
    });

    let emailStatus = "sent";
    try {
      await sendConfirmationEmail(data, masterclass);
      await logEmail(Number(result.lastInsertRowid), data.email, "sent", null);
    } catch (emailErr) {
      emailStatus = "failed";
      await logEmail(Number(result.lastInsertRowid), data.email, "failed", emailErr.message);
      console.error("❌ Erreur envoi email:", emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Inscription enregistrée avec succès !",
      emailSent: emailStatus === "sent",
      data: {
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        masterclass: masterclass.title,
        date: masterclass.date,
      },
    });

  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        error: "Données invalides.",
        details: err.errors.map((e) => ({ field: e.path.join("."), message: e.message })),
      });
    }
    console.error("❌ Erreur serveur:", err);
    return res.status(500).json({ error: "Erreur serveur. Réessayez." });
  }
});

// GET /api/count/:masterclassId
router.get("/count/:masterclassId", async (req, res) => {
  const { masterclassId } = req.params;
  const masterclass = await getMasterclassById(masterclassId);
  if (!masterclass) return res.status(404).json({ error: "Événement introuvable." });

  const count     = await countRegistrations(masterclassId);
  const remaining = masterclass.seats > 0 ? masterclass.seats - count : null;

  return res.json({
    registered: count,
    total:      masterclass.seats || null,
    remaining,
    isFull:     masterclass.seats > 0 && count >= masterclass.seats,
  });
});

// GET /api/check/:masterclassId?email=xxx
router.get("/check/:masterclassId", async (req, res) => {
  const { masterclassId } = req.params;
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email requis." });

  const existing = await checkDuplicate(masterclassId, email.toLowerCase().trim());
  return res.json({ alreadyRegistered: !!existing });
});

export default router;
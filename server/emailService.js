import nodemailer from "nodemailer";
import { generateEmailHTML, generateEmailText } from "./templates/confirmationEmail.js";

// ── Transport SMTP ──────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",        // Changer ici si vous utilisez autre chose
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // App password, PAS votre vrai mot de passe
  },
});

/**
 * Envoie l'email de confirmation à un inscrit
 * @param {Object} registration - Données de l'inscrit
 * @param {Object} masterclass  - Infos du masterclass depuis config
 */
export async function sendConfirmationEmail(registration, masterclass) {
  const { first_name, last_name, email } = registration;
  const { emailContent } = masterclass;
  const fullName = `${first_name} ${last_name}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: emailContent.subject,
    html: generateEmailHTML({ fullName, masterclass, registration }),
    text: generateEmailText({ fullName, masterclass }), // Fallback texte brut
  };

  return transporter.sendMail(mailOptions);
}

import nodemailer from "nodemailer";
import { generateEmailHTML, generateEmailText } from "./templates/confirmationEmail.js";

// Transport SMTP (Port 587 requis pour éviter le blocage de port 465 sur Render)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // App password, PAS votre vrai mot de passe
  },
});

/**
 * Vérifie la connexion SMTP au démarrage.
 * Appelé dans index.js pour diagnostiquer les problèmes dès le boot.
 */
export async function verifyTransport() {
  try {
    await transporter.verify();
    console.log(" Transport SMTP vérifié — prêt à envoyer des emails via", process.env.EMAIL_USER);
    return true;
  } catch (err) {
    console.error("SMTP TRANSPORT INVALIDE — Les emails NE PARTIRONT PAS.");
    console.error("   Cause:", err.message);
    console.error("   → Vérifiez EMAIL_USER et EMAIL_PASS (App Password) dans .env");
    return false;
  }
}

/**
 * Envoie un email avec 1 retry automatique en cas d'échec réseau.
 */
async function sendWithRetry(mailOptions, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`📧 Email envoyé à ${mailOptions.to} (messageId: ${info.messageId})`);
      return info;
    } catch (err) {
      if (attempt < retries) {
        console.warn(` Tentative ${attempt + 1} échouée pour ${mailOptions.to}: ${err.message}. Retry dans 2s...`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err; // Relance après tous les retries
      }
    }
  }
}

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
    from: process.env.EMAIL_FROM || `"DTech-Africa" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: emailContent.subject,
    html: generateEmailHTML({ fullName, masterclass, registration }),
    text: generateEmailText({ fullName, masterclass }),
  };

  return sendWithRetry(mailOptions);
}

/**
 * Envoie un email de test pour vérifier que le pipeline fonctionne.
 * @param {string} recipientEmail - Adresse email de destination
 */
export async function sendTestEmail(recipientEmail) {
  const mailOptions = {
    from: process.env.EMAIL_FROM || `"DTech-Africa" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: "🧪 Test Pipeline Email — DTech-Africa",
    html: `
      <div style="font-family:Arial,sans-serif;padding:40px;background:#f3f4f6;text-align:center;">
        <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:40px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <h1 style="color:#111827;font-size:24px;">✅ Pipeline Email Fonctionnel</h1>
          <p style="color:#6b7280;font-size:16px;line-height:1.6;">
            Cet email confirme que le transport SMTP est correctement configuré pour
            <strong>${process.env.EMAIL_USER}</strong>.
          </p>
          <p style="color:#9ca3af;font-size:13px;margin-top:24px;">
            Envoyé le ${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Porto-Novo" })}
          </p>
        </div>
      </div>`,
    text: `Test pipeline email OK. Envoyé via ${process.env.EMAIL_USER} le ${new Date().toISOString()}.`,
  };

  return sendWithRetry(mailOptions, 0); // Pas de retry pour un test
}

import "./env.js";
import { generateEmailHTML, generateEmailText } from "./templates/confirmationEmail.js";
import { generateAcademyWelcomeHTML, generateAcademyWelcomeText } from "./templates/academyWelcomeEmail.js";

/**
 * Extraire nom et email depuis "Nom <email@domaine.com>" ou "email@domaine.com"
 */
function parseEmailSender(senderStr) {
  const defaultEmail = process.env.EMAIL_USER || "dtech.afrik@gmail.com";
  if (!senderStr) return { name: "DTech-Africa", email: defaultEmail };

  const match = senderStr.match(/^(?:"?([^"]*)"?\s)?<?([^>]+)>?$/);
  if (match) {
    return {
      name: match[1]?.trim() || "DTech-Africa",
      email: match[2]?.trim() || defaultEmail
    };
  }
  return { name: "DTech-Africa", email: senderStr.trim() };
}

/**
 * Envoie un email transactionnel via l'API REST de Brevo
 */
export async function sendBrevoEmail({ to, subject, htmlContent, textContent, sender, recipientName }) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    throw new Error("Clé d'API BREVO_API_KEY manquante dans le fichier d'environnement.");
  }

  const senderObj = parseEmailSender(sender || process.env.EMAIL_FROM || process.env.EMAIL_USER);

  const payload = {
    sender: senderObj,
    to: [
      {
        email: to,
        name: recipientName || to.split("@")[0]
      }
    ],
    subject,
    htmlContent,
    textContent: textContent || undefined
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    if (response.status === 401 && errData.message?.includes("unrecognised IP")) {
      console.error("⚠️ [Brevo IP Restriction] Votre adresse IP n'est pas autorisée sur votre compte Brevo.");
      console.error("👉 Rendez-vous sur https://app.brevo.com/security/authorised_ips pour autoriser cette IP ou décocher la restriction d'IP.");
    }
    throw new Error(`Erreur API Brevo (${response.status}): ${errData.message || response.statusText}`);
  }

  const result = await response.json();
  console.log(`📧 Email Brevo envoyé avec succès à ${to} (messageId: ${result.messageId})`);
  return result;
}

/**
 * Vérifie la validité de la clé Brevo au démarrage
 */
export async function verifyTransport() {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("⚠️ BREVO_API_KEY manquante — Les emails ne pourront pas être envoyés.");
    return false;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/account", {
      method: "GET",
      headers: {
        "api-key": apiKey,
        "Accept": "application/json"
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ API Brevo vérifiée — Compte prêt: ${data.email}`);
      return true;
    } else {
      const errData = await response.json().catch(() => ({}));
      console.warn(`⚠️ Clé API Brevo présente mais rejetée (${response.status}): ${errData.message || "Erreur d'authentification"}`);
      if (response.status === 401 && errData.message?.includes("unrecognised IP")) {
        console.warn("👉 Veuillez autoriser l'adresse IP courante sur https://app.brevo.com/security/authorised_ips");
      }
      return false;
    }
  } catch (err) {
    console.error("⚠️ Échec de vérification Brevo:", err.message);
    return false;
  }
}

/**
 * Envoie l'email de confirmation à un inscrit masterclass via Brevo
 */
export async function sendConfirmationEmail(registration, masterclass) {
  const { first_name, last_name, email } = registration;
  const { emailContent } = masterclass;
  const fullName = `${first_name} ${last_name}`;

  return sendBrevoEmail({
    to: email,
    recipientName: fullName,
    sender: process.env.EMAIL_FROM || `"DTech-Africa" <${process.env.EMAIL_USER}>`,
    subject: emailContent.subject,
    htmlContent: generateEmailHTML({ fullName, masterclass, registration }),
    textContent: generateEmailText({ fullName, masterclass })
  });
}

/**
 * Envoie l'email de confirmation à un inscrit MLAcademy via Brevo
 */
export async function sendAcademyConfirmationEmail(registration) {
  const { first_name, last_name, email } = registration;
  const fullName = `${first_name} ${last_name}`;

  return sendBrevoEmail({
    to: email,
    recipientName: fullName,
    sender: process.env.EMAIL_FROM || `"MLAcademy" <${process.env.EMAIL_USER}>`,
    subject: "🎓 Bienvenue chez MLAcademy — Pré-inscription confirmée",
    htmlContent: generateAcademyWelcomeHTML({ fullName, data: registration }),
    textContent: generateAcademyWelcomeText({ fullName })
  });
}

/**
 * Envoie un email de test via Brevo
 */
export async function sendTestEmail(recipientEmail) {
  return sendBrevoEmail({
    to: recipientEmail,
    recipientName: recipientEmail.split("@")[0],
    sender: process.env.EMAIL_FROM || `"DTech-Africa" <${process.env.EMAIL_USER}>`,
    subject: "🧪 Test API Brevo — DTech-Africa",
    htmlContent: `
      <div style="font-family:Arial,sans-serif;padding:40px;background:#f3f4f6;text-align:center;">
        <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:40px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          <h1 style="color:#111827;font-size:24px;">✅ Pipeline Brevo Fonctionnel</h1>
          <p style="color:#6b7280;font-size:16px;line-height:1.6;">
            Cet email confirme que l'API Brevo est correctement configurée.
          </p>
          <p style="color:#9ca3af;font-size:13px;margin-top:24px;">
            Envoyé le ${new Date().toLocaleString("fr-FR", { timeZone: "Africa/Porto-Novo" })}
          </p>
        </div>
      </div>`,
    textContent: `Test API Brevo OK. Envoyé le ${new Date().toISOString()}.`
  });
}

/**
 * ─────────────────────────────────────────────────────────────────
 *  SCHEDULER — reminderScheduler.js
 *  Tourne en arrière-plan via node-cron.
 *  Chaque matin à 8h00 : envoie un email de rappel à tous les
 *  inscrits dont le masterclass a lieu AUJOURD'HUI.
 * ─────────────────────────────────────────────────────────────────
 */

import cron from "node-cron";
import nodemailer from "nodemailer";
import { getRegistrantsByMasterclass } from "./database.js";
import { MASTERCLASSES, formatDate } from "../src/config/masterclasses.config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── Requête : tous les inscrits d'un masterclass ───────────────


/**
 * Vérifie si un masterclass a lieu aujourd'hui
 */
function isToday(dateStr) {
  const today = new Date();
  const event = new Date(dateStr);
  return (
    today.getFullYear() === event.getFullYear() &&
    today.getMonth()    === event.getMonth()    &&
    today.getDate()     === event.getDate()
  );
}

/**
 * Envoie l'email de rappel à un inscrit
 */
async function sendReminderEmail(registrant, masterclass) {
  const { first_name, last_name, email } = registrant;
  const { title, time, emailContent, themeColor, theme, type } = masterclass;
  const typeLabel = type === "webinaire" ? "Webinaire" : "Masterclass";

  const sessionLinkHTML = emailContent.sessionLink
    ? `<a href="${emailContent.sessionLink}"
         style="display:inline-block;margin-top:16px;padding:14px 36px;
                background:${themeColor};color:#fff;border-radius:8px;
                text-decoration:none;font-weight:700;font-size:16px;">
         🔗 Rejoindre maintenant
       </a>`
    : `<p style="color:#6B7280;font-style:italic;margin-top:12px;">
         Le lien de connexion vous a été communiqué lors de votre inscription.
       </p>`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Rappel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `⏰ C'est aujourd'hui ! — ${typeLabel} "${title}"`,
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#F3F4F6;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0"
             style="max-width:560px;background:#fff;border-radius:16px;
                    overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,${themeColor},${themeColor}BB);
                     padding:40px;text-align:center;">
            <div style="font-size:56px;margin-bottom:12px;">⏰</div>
            <p style="margin:0 0 6px;color:rgba(255,255,255,0.8);font-size:13px;
                      text-transform:uppercase;letter-spacing:2px;">${theme}</p>
            <h1 style="margin:0;color:#fff;font-size:26px;font-weight:800;line-height:1.3;">
              C'est aujourd'hui !
            </h1>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#111827;">
              Bonjour ${first_name} ${last_name} 👋
            </p>
            <p style="margin:0 0 24px;color:#4B5563;font-size:16px;line-height:1.7;">
              Votre ${typeLabel} <strong style="color:${themeColor};">"${title}"</strong>
              commence <strong>aujourd'hui à ${time}</strong>.
              On vous attend ! 🎉
            </p>

            <!-- Infos clés -->
            <div style="background:#F9FAFB;border-radius:12px;border:1px solid #E5E7EB;
                        padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 10px;font-size:15px;color:#374151;">
                📅 <strong>Date :</strong> ${formatDate(masterclass.date)}
              </p>
              <p style="margin:0 0 10px;font-size:15px;color:#374151;">
                ⏰ <strong>Heure :</strong> ${time}
              </p>
              <p style="margin:0;font-size:15px;color:#374151;">
                💻 <strong>Format :</strong> ${masterclass.format}
              </p>
            </div>

            <!-- Checklist rappel -->
            <div style="background:#EFF6FF;border-radius:12px;border:1px solid #BFDBFE;
                        padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 12px;font-weight:700;color:#1E40AF;font-size:15px;">
                ✅ Avant de rejoindre, vérifiez :
              </p>
              ${masterclass.prerequisites.map(req =>
                `<p style="margin:0 0 8px;font-size:14px;color:#374151;">☑️ ${req}</p>`
              ).join("")}
            </div>

            <!-- Lien session -->
            <div style="text-align:center;">
              ${sessionLinkHTML}
            </div>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:24px 40px;background:#F9FAFB;border-top:1px solid #E5E7EB;
                     text-align:center;">
            <p style="margin:0;color:#9CA3AF;font-size:13px;">
              Une question ? <a href="mailto:${emailContent.contact}"
                style="color:${themeColor};text-decoration:none;font-weight:600;">
                ${emailContent.contact}
              </a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    text: `Bonjour ${first_name},\n\nRappel : votre ${typeLabel} "${title}" a lieu AUJOURD'HUI à ${time}.\n${emailContent.sessionLink ? `Lien : ${emailContent.sessionLink}` : ""}\n\nContact : ${emailContent.contact}`,
  });
}

/**
 * Tâche principale : s'exécute tous les jours à 8h00
 * Format cron : "minute heure * * *"
 */
export function startReminderScheduler() {
  cron.schedule("0 10 * * *", async () => {
    console.log(`\n⏰ [${new Date().toLocaleString("fr-FR")}] Vérification des rappels...`);

    const todayEvents = MASTERCLASSES.filter((mc) => isToday(mc.date));

    if (todayEvents.length === 0) {
      console.log("   Aucun événement aujourd'hui.");
      return;
    }

    for (const masterclass of todayEvents) {
        const registrants = await getRegistrantsByMasterclass(masterclass.id);
      console.log(`   📧 ${masterclass.title} → ${registrants.length} inscrits à notifier`);

      let sent = 0, failed = 0;

      for (const registrant of registrants) {
        try {
          await sendReminderEmail(registrant, masterclass);
          sent++;
          // Petite pause entre chaque email (évite le spam filter)
          await new Promise((r) => setTimeout(r, 300));
        } catch (err) {
          failed++;
          console.error(`   ❌ Échec pour ${registrant.email}:`, err.message);
        }
      }

      console.log(`  ✅ Rappels envoyés : ${sent} réussis, ${failed} échoués`);
    }
  }, {
    timezone: "Africa/Porto-Novo", // ← GMT+1 Bénin
  });

  console.log("📅 Scheduler de rappels actif (8h00 chaque matin, heure de Cotonou)");
}
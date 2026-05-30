import cron from "node-cron";
import nodemailer from "nodemailer";
import { getRegistrantsByMasterclass } from "./database.js";
import { MASTERCLASSES } from "../src/config/masterclasses.config.js";
import { generateReminderHTML, generateReminderText } from "./templates/reminderEmail.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Vérifie si un masterclass a lieu demain (24h avant)
 */
function isTomorrow(dateStr) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const event = new Date(dateStr);
  return (
    tomorrow.getFullYear() === event.getFullYear() &&
    tomorrow.getMonth()    === event.getMonth()    &&
    tomorrow.getDate()     === event.getDate()
  );
}

/**
 * Envoie l'email de rappel à un inscrit
 */
async function sendReminderEmail(registrant, masterclass) {
  const { email } = registrant;
  const { title, type } = masterclass;
  const typeLabel = type === "webinaire" ? "Webinaire" : "Masterclass";

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Rappel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `⏰ J-1 : Votre ${typeLabel} "${title}" c'est demain !`,
    html: generateReminderHTML({ registrant, masterclass }),
    text: generateReminderText({ registrant, masterclass }),
  });
}

/**
 * Tâche principale : s'exécute tous les jours à 8h00
 * Format cron : "minute heure * * *"
 */
export function startReminderScheduler() {
  cron.schedule("0 8 * * *", async () => {
    console.log(`\n⏰ [${new Date().toLocaleString("fr-FR")}] Vérification des rappels...`);

    const tomorrowEvents = MASTERCLASSES.filter((mc) => isTomorrow(mc.date));

    if (tomorrowEvents.length === 0) {
      console.log("   Aucun événement demain.");
      return;
    }

    for (const masterclass of tomorrowEvents) {
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
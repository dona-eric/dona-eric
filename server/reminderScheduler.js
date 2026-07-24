import "./env.js";
import cron from "node-cron";
import { getRegistrantsByMasterclass } from "./database.js";
import { getMasterclasses } from "./services/notionService.js";
import { generateReminderHTML, generateReminderText } from "./templates/reminderEmail.js";
import { sendBrevoEmail } from "./emailService.js";

/** Vérifie si un masterclass a lieu aujourd'hui **/
function isToday(dateStr) {
  if (!dateStr) return false;
  
  const today = new Date();
  
  // Convert today's date to GMT+1 / Africa/Porto-Novo date string
  const dateStringPortoNovo = today.toLocaleDateString("en-CA", {
    timeZone: "Africa/Porto-Novo"
  }); // returns "YYYY-MM-DD"
  
  return dateStr === dateStringPortoNovo;
}

function getSubject(typeLabel, title, reminderType) {
  if (reminderType === "morning") {
    return `Aujourd'hui : Votre ${typeLabel} "${title}"`;
  }
  if (reminderType === "five_minutes") {
    return `Dans 5 minutes : Votre ${typeLabel} "${title}" débute`;
  }
  if (reminderType === "started") {
    return `En direct : Le ${typeLabel} "${title}" a commencé`;
  }
  return `Rappel : Votre ${typeLabel} "${title}"`;
}

/** Envoie l'email de rappel à un inscrit via Brevo API **/
async function sendReminderEmail(registrant, masterclass, reminderType) {
  const { email, first_name, last_name } = registrant;
  const { title, type } = masterclass;
  const typeLabel = type === "webinaire" ? "Webinaire" : "Masterclass";
  const subject = getSubject(typeLabel, title, reminderType);
  const fullName = `${first_name || ''} ${last_name || ''}`.trim();

  await sendBrevoEmail({
    to: email,
    recipientName: fullName || email.split("@")[0],
    sender: process.env.EMAIL_FROM || `"Rappel" <${process.env.EMAIL_USER}>`,
    subject,
    htmlContent: generateReminderHTML({ registrant, masterclass, reminderType }),
    textContent: generateReminderText({ registrant, masterclass, reminderType })
  });
}

export async function sendScheduledReminders(reminderType) {
  console.log(`\n⏰ [${new Date().toLocaleString("fr-FR")}] Déclenchement rappel : ${reminderType}...`);
  try {
    const allMasterclasses = await getMasterclasses();
    const todayEvents = allMasterclasses.filter((mc) => isToday(mc.date));

    if (todayEvents.length === 0) {
      console.log("   Aucun événement aujourd'hui.");
      return;
    }

    for (const masterclass of todayEvents) {
      const registrants = await getRegistrantsByMasterclass(masterclass.id);
      console.log(`📧 ${masterclass.title} (${reminderType}) → ${registrants.length} inscrits à notifier`);

      let sent = 0, failed = 0;

      for (const registrant of registrants) {
        try {
          await sendReminderEmail(registrant, masterclass, reminderType);
          sent++;
          // Pause entre chaque envoi Brevo
          await new Promise((r) => setTimeout(r, 200));
        } catch (err) {
          failed++;
          console.error(`Échec Brevo pour ${registrant.email}:`, err.message);
        }
      }

      console.log(`Rappels Brevo envoyés (${reminderType}) : ${sent} réussis, ${failed} échoués`);
    }
  } catch (error) {
    console.error("Erreur dans sendScheduledReminders Brevo:", error);
  }
}

/** Tâches principales de planification des rappels */
export function startReminderScheduler() {
  // 1. Matin : 08h00
  cron.schedule("0 8 * * *", async () => {
    await sendScheduledReminders("morning");
  }, {
    timezone: "Africa/Porto-Novo",
  });

  // 2. Soir pré-live : 19h55
  cron.schedule("55 19 * * *", async () => {
    await sendScheduledReminders("five_minutes");
  }, {
    timezone: "Africa/Porto-Novo",
  });

  // 3. Soir live : 20h00
  cron.schedule("0 20 * * *", async () => {
    await sendScheduledReminders("started");
  }, {
    timezone: "Africa/Porto-Novo",
  });

  console.log("Scheduler de rappels Brevo actif (08h00, 19h55, et 20h00, heure de Cotonou)");
}
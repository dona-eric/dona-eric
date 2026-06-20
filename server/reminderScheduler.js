import cron from "node-cron";
import nodemailer from "nodemailer";
import { getRegistrantsByMasterclass } from "./database.js";
import { getMasterclasses } from "./services/notionService.js";
import { generateReminderHTML, generateReminderText } from "./templates/reminderEmail.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/** Vérifie si un masterclass a lieu aujourd'hui **/
function isToday(dateStr) {
  if (!dateStr) return false;
  
  // Format is YYYY-MM-DD
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

/** Envoie l'email de rappel à un inscrit **/
async function sendReminderEmail(registrant, masterclass, reminderType) {
  const { email } = registrant;
  const { title, type } = masterclass;
  const typeLabel = type === "webinaire" ? "Webinaire" : "Masterclass";
  const subject = getSubject(typeLabel, title, reminderType);

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"Rappel" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: generateReminderHTML({ registrant, masterclass, reminderType }),
    text: generateReminderText({ registrant, masterclass, reminderType }),
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
          // Petite pause entre chaque email (évite le spam filter)
          await new Promise((r) => setTimeout(r, 300));
        } catch (err) {
          failed++;
          console.error(`Échec pour ${registrant.email}:`, err.message);
        }
      }

      console.log(`Rappels envoyés (${reminderType}) : ${sent} réussis, ${failed} échoués`);
    }
  } catch (error) {
    console.error("Erreur dans sendScheduledReminders:", error);
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

  console.log("Scheduler de rappels actif (08h00, 19h55, et 20h00, heure de Cotonou)");
}
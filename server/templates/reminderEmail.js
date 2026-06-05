import { formatDate } from "../../src/config/masterclasses.config.js";

export function generateReminderHTML({ registrant, masterclass, reminderType }) {
  const { first_name, last_name } = registrant;
  const { title, time, emailContent, themeColor, theme, type } = masterclass;
  const typeLabel = type === "webinaire" ? "Webinaire" : "Masterclass";

  let headerText = "C'est aujourd'hui !";
  let bodyText = `Votre ${typeLabel} <strong style="color:${themeColor};">"${title}"</strong> commence aujourd'hui à <strong>${time}</strong>. Préparez-vous !`;
  let ctaText = "Rejoindre la session";
  
  if (reminderType === "five_minutes") {
    headerText = "Début dans 5 minutes !";
    bodyText = `Le direct de votre ${typeLabel} <strong style="color:${themeColor};">"${title}"</strong> va commencer dans <strong>5 minutes</strong>. Rejoignez-nous pour ne rien manquer.`;
    ctaText = "Accéder au direct";
  } else if (reminderType === "started") {
    headerText = "Le direct a commencé !";
    bodyText = `Nous sommes en direct ! Le ${typeLabel} <strong style="color:${themeColor};">"${title}"</strong> a débuté. Rejoignez la session immédiatement via le lien ci-dessous.`;
    ctaText = "Rejoindre le direct";
  }

  const sessionLinkHTML = emailContent.sessionLink
    ? `<a href="${emailContent.sessionLink}"
         style="display:inline-block;margin-top:16px;padding:14px 36px;
                background:${themeColor};color:#ffffff;border-radius:8px;
                text-decoration:none;font-weight:700;font-size:16px;">
         ${ctaText}
       </a>`
    : `<p style="color:#6B7280;font-style:italic;margin-top:12px;">
         Le lien de connexion sera disponible sous peu.
       </p>`;

  const checklistHTML = masterclass.prerequisites && masterclass.prerequisites.length > 0
    ? `
      <div style="background:#EFF6FF;border-radius:12px;border:1px solid #BFDBFE;
                  padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 12px;font-weight:700;color:#1E40AF;font-size:15px;">
          Avant de rejoindre, vérifiez :
        </p>
        ${masterclass.prerequisites.map(req =>
          `<p style="margin:0 0 8px;font-size:14px;color:#374151;">— ${req}</p>`
        ).join("")}
      </div>`
    : "";

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#F3F4F6;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0"
             style="max-width:560px;background:#ffffff;border-radius:16px;
                    overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,${themeColor},${themeColor}BB);
                     padding:40px;text-align:center;">
            <p style="margin:0 0 6px;color:rgba(255,255,255,0.8);font-size:13px;
                      text-transform:uppercase;letter-spacing:2px;">${theme}</p>
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;line-height:1.3;">
              ${headerText}
            </h1>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 20px;font-size:20px;font-weight:700;color:#111827;">
              Bonjour ${first_name} ${last_name}
            </p>
            <p style="margin:0 0 24px;color:#4B5563;font-size:16px;line-height:1.7;">
              ${bodyText}
            </p>

            <!-- Infos clés -->
            <div style="background:#F9FAFB;border-radius:12px;border:1px solid #E5E7EB;
                        padding:20px 24px;margin-bottom:28px;">
              <p style="margin:0 0 10px;font-size:15px;color:#374151;">
                <strong>Date :</strong> ${formatDate(masterclass.date)}
              </p>
              <p style="margin:0 0 10px;font-size:15px;color:#374151;">
                <strong>Heure :</strong> ${time}
              </p>
              <p style="margin:0;font-size:15px;color:#374151;">
                <strong>Format :</strong> ${masterclass.format}
              </p>
            </div>

            <!-- Checklist rappel -->
            ${checklistHTML}

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
</html>`;
}

export function generateReminderText({ registrant, masterclass, reminderType }) {
  const { first_name } = registrant;
  const { title, time, emailContent, type } = masterclass;
  const typeLabel = type === "webinaire" ? "Webinaire" : "Masterclass";

  let bodyText = `Rappel : votre ${typeLabel} "${title}" a lieu AUJOURD'HUI à ${time}.`;
  
  if (reminderType === "five_minutes") {
    bodyText = `Le direct de votre ${typeLabel} "${title}" commence dans 5 minutes.`;
  } else if (reminderType === "started") {
    bodyText = `Le direct de votre ${typeLabel} "${title}" a commencé. Rejoignez-nous maintenant.`;
  }

  return `Bonjour ${first_name},\n\n${bodyText}\n${emailContent.sessionLink ? `Lien de connexion : ${emailContent.sessionLink}` : ""}\n\nContact : ${emailContent.contact}`;
}

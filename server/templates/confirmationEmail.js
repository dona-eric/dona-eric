import { formatDate } from "../../src/config/masterclasses.config.js";

export function generateEmailHTML({ fullName, masterclass, registration }) {
  const {
    title, subtitle, date, time, duration, format, theme,
    themeColor, objectives, program, prerequisites,
    speaker, emailContent, location,
  } = masterclass;

  const objectivesHTML = objectives
    .map((obj) => `<li style="margin-bottom:8px;padding-left:8px;">${obj}</li>`)
    .join("");

  const programHTML = program
    .map(
      (step) => `
      <tr>
        <td style="padding:10px 16px;color:${themeColor};font-weight:700;white-space:nowrap;width:80px;">
          ${step.time}
        </td>
        <td style="padding:10px 16px;color:#374151;border-left:2px solid #E5E7EB;">
          ${step.title}
        </td>
      </tr>`
    )
    .join("");

  const sessionLinkHTML = emailContent.sessionLink
    ? `<a href="${emailContent.sessionLink}"
         style="display:inline-block;margin-top:12px;padding:14px 32px;
                background:${themeColor};color:#fff;border-radius:8px;
                text-decoration:none;font-weight:700;font-size:16px;">
         🔗 Rejoindre la session
       </a>`
    : `<p style="color:#6B7280;font-style:italic;">
         Le lien de connexion vous sera communiqué 24h avant l'événement.
       </p>`;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${emailContent.subject}</title>
</head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- WRAPPER -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;background:#ffffff;border-radius:16px;
                    overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,${themeColor},${themeColor}CC);
                     padding:48px 40px;text-align:center;">
            <p style="margin:0 0 8px;color:rgba(255,255,255,0.8);font-size:13px;
                      text-transform:uppercase;letter-spacing:2px;">${theme}</p>
            <h1 style="margin:0 0 12px;color:#fff;font-size:28px;line-height:1.3;font-weight:800;">
              ${title}
            </h1>
            <p style="margin:0;color:rgba(255,255,255,0.9);font-size:15px;">${subtitle}</p>
            <!-- Badge confirmation -->
            <div style="display:inline-block;margin-top:24px;padding:8px 20px;
                        background:rgba(255,255,255,0.2);border-radius:100px;
                        color:#fff;font-size:14px;font-weight:600;">
              ✅ Inscription confirmée
            </div>
          </td>
        </tr>

        <!-- SALUTATION -->
        <tr>
          <td style="padding:40px 40px 0;">
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;">
              Bonjour ${fullName} 👋
            </p>
            <p style="margin:0;color:#6B7280;font-size:16px;line-height:1.6;">
              ${emailContent.welcomeMessage}
            </p>
          </td>
        </tr>

        <!-- INFOS CLÉS -->
        <tr>
          <td style="padding:32px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="background:#F9FAFB;border-radius:12px;overflow:hidden;
                          border:1px solid #E5E7EB;">
              <tr>
                <td style="padding:20px 24px;border-bottom:1px solid #E5E7EB;">
                  <span style="font-size:20px;">📅</span>
                  <strong style="display:block;color:#374151;margin-top:4px;">Date</strong>
                  <span style="color:#111827;">${formatDate(date)}</span>
                </td>
                <td style="padding:20px 24px;border-bottom:1px solid #E5E7EB;border-left:1px solid #E5E7EB;">
                  <span style="font-size:20px;">⏰</span>
                  <strong style="display:block;color:#374151;margin-top:4px;">Horaire</strong>
                  <span style="color:#111827;">${time}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 24px;">
                  <span style="font-size:20px;">⏱️</span>
                  <strong style="display:block;color:#374151;margin-top:4px;">Durée</strong>
                  <span style="color:#111827;">${duration}</span>
                </td>
                <td style="padding:20px 24px;border-left:1px solid #E5E7EB;">
                  <span style="font-size:20px;">💻</span>
                  <strong style="display:block;color:#374151;margin-top:4px;">Format</strong>
                  <span style="color:#111827;">${format}${location ? ` — ${location}` : ""}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- LIEN DE SESSION -->
        <tr>
          <td style="padding:32px 40px 0;text-align:center;">
            <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:12px;padding:24px;">
              <p style="margin:0 0 4px;font-weight:700;color:#166534;font-size:16px;">
                🔐 Votre accès à la session
              </p>
              ${sessionLinkHTML}
              <p style="margin:12px 0 0;color:#6B7280;font-size:13px;">
                ${emailContent.reminder}
              </p>
            </div>
          </td>
        </tr>

        <!-- OBJECTIFS -->
        <tr>
          <td style="padding:32px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:18px;color:#111827;font-weight:700;">
              🎯 Ce que vous apprendrez
            </h2>
            <ul style="margin:0;padding-left:20px;color:#374151;font-size:15px;line-height:1.7;">
              ${objectivesHTML}
            </ul>
          </td>
        </tr>

        <!-- PROGRAMME -->
        <tr>
          <td style="padding:32px 40px 0;">
            <h2 style="margin:0 0 16px;font-size:18px;color:#111827;font-weight:700;">
              🗓️ Programme de la session
            </h2>
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;">
              ${programHTML}
            </table>
          </td>
        </tr>

        <!-- SPEAKER -->
        <tr>
          <td style="padding:32px 40px 0;">
            <div style="display:flex;align-items:center;background:#F9FAFB;
                        border-radius:12px;padding:20px 24px;border:1px solid #E5E7EB;">
              <div>
                <p style="margin:0;font-weight:700;color:#111827;font-size:16px;">
                  👤 ${speaker.name}
                </p>
                <p style="margin:4px 0 0;color:#6B7280;font-size:14px;">${speaker.title}</p>
              </div>
            </div>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:40px;background:#F9FAFB;margin-top:32px;text-align:center;
                     border-top:1px solid #E5E7EB;">
            <p style="margin:0 0 8px;color:#6B7280;font-size:14px;">
              Une question ? Contactez-nous à
              <a href="mailto:${emailContent.contact}"
                 style="color:${themeColor};text-decoration:none;font-weight:600;">
                ${emailContent.contact}
              </a>
            </p>
            <p style="margin:0;color:#9CA3AF;font-size:12px;">
              Vous recevez cet email car vous vous êtes inscrit(e) à notre événement.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function generateEmailText({ fullName, masterclass }) {
  const { title, date, time, format, emailContent, objectives } = masterclass;
  return `
Bonjour ${fullName},

${emailContent.welcomeMessage}

━━━━━━━━━━━━━━━━━━━━━━━
  ${title}
━━━━━━━━━━━━━━━━━━━━━━━

📅 Date   : ${formatDate(date)}
⏰ Heure  : ${time}
💻 Format : ${format}
${emailContent.sessionLink ? `🔗 Lien   : ${emailContent.sessionLink}` : ""}

OBJECTIFS :
${objectives.map((o, i) => `  ${i + 1}. ${o}`).join("\n")}

${emailContent.reminder}

Contact : ${emailContent.contact}
  `.trim();
}

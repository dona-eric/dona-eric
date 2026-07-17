export function generateAcademyWelcomeHTML({ fullName, data }) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue chez MLAcademy</title>
</head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F3F4F6;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;background:#ffffff;border-radius:16px;
                    overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#6366f1,#4f46e5);
                     padding:48px 40px;text-align:center;">
            <p style="margin:0 0 8px;color:rgba(255,255,255,0.8);font-size:13px;
                      text-transform:uppercase;letter-spacing:2px;">MLAcademy</p>
            <h1 style="margin:0 0 12px;color:#fff;font-size:28px;line-height:1.3;font-weight:800;">
              Bienvenue, ${fullName} !
            </h1>
            <p style="margin:0;color:rgba(255,255,255,0.9);font-size:15px;">
              Votre pré-inscription a bien été enregistrée.
            </p>
            <div style="display:inline-block;margin-top:24px;padding:8px 20px;
                        background:rgba(255,255,255,0.2);border-radius:100px;
                        color:#fff;font-size:14px;font-weight:600;">
              ✅ Pré-inscription confirmée
            </div>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.7;">
              Merci pour votre intérêt pour <strong>MLAcademy</strong> ! Vous faites partie des premiers à rejoindre
              notre programme de formation intensive en Data Science, IA et MLOps.
            </p>

            <!-- Roadmap Preview -->
            <div style="background:#F9FAFB;border-radius:12px;border:1px solid #E5E7EB;
                        padding:24px;margin-bottom:24px;">
              <h2 style="margin:0 0 16px;font-size:18px;color:#111827;font-weight:700;">
                🗺️ Votre parcours en 90 jours
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:8px 0;color:#6366f1;font-weight:600;">Niveau 0</td>
                  <td style="padding:8px 0;color:#374151;">Orientation (Gratuit)</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#3b82f6;font-weight:600;">Niveau 1</td>
                  <td style="padding:8px 0;color:#374151;">Python, SQL, Git, Statistiques</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#8b5cf6;font-weight:600;">Niveau 2</td>
                  <td style="padding:8px 0;color:#374151;">Machine Learning & Deep Learning</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#06b6d4;font-weight:600;">Niveau 3</td>
                  <td style="padding:8px 0;color:#374151;">Docker, Kubernetes, Cloud</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#ec4899;font-weight:600;">Niveau 4</td>
                  <td style="padding:8px 0;color:#374151;">LLM, RAG, Agents IA</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#f59e0b;font-weight:600;">Niveau 5</td>
                  <td style="padding:8px 0;color:#374151;">MLOps & Production</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#10b981;font-weight:600;">Niveau 6</td>
                  <td style="padding:8px 0;color:#374151;">Portfolio & Carrière</td>
                </tr>
              </table>
            </div>

            <!-- Next Steps -->
            <div style="background:#EFF6FF;border-radius:12px;border:1px solid #BFDBFE;
                        padding:20px 24px;margin-bottom:24px;">
              <p style="margin:0 0 8px;font-weight:700;color:#1E40AF;font-size:15px;">
                📋 Prochaines étapes
              </p>
              <p style="margin:0 0 8px;font-size:14px;color:#374151;">
                1. Nous vous contacterons dès l'ouverture officielle des inscriptions.
              </p>
              <p style="margin:0 0 8px;font-size:14px;color:#374151;">
                2. Rejoignez notre communauté Discord pour commencer à échanger.
              </p>
              <p style="margin:0;font-size:14px;color:#374151;">
                3. Suivez-nous sur LinkedIn et YouTube pour ne rien manquer.
              </p>
            </div>

            <p style="margin:0;color:#6B7280;font-size:14px;line-height:1.6;">
              Si vous avez des questions, n'hésitez pas à nous écrire à
              <a href="mailto:dtech.afrik@gmail.com" style="color:#6366f1;text-decoration:none;font-weight:600;">
                dtech.afrik@gmail.com
              </a>.
            </p>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:24px 40px;background:#F9FAFB;border-top:1px solid #E5E7EB;
                     text-align:center;">
            <p style="margin:0;color:#9CA3AF;font-size:12px;">
              Vous recevez cet email car vous vous êtes pré-inscrit(e) à MLAcademy.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function generateAcademyWelcomeText({ fullName }) {
  return `
Bienvenue chez MLAcademy, ${fullName} !

Votre pré-inscription a bien été enregistrée. Merci pour votre intérêt !

Votre parcours en 90 jours :
- Niveau 0 : Orientation (Gratuit)
- Niveau 1 : Python, SQL, Git, Statistiques
- Niveau 2 : Machine Learning & Deep Learning
- Niveau 3 : Docker, Kubernetes, Cloud
- Niveau 4 : LLM, RAG, Agents IA
- Niveau 5 : MLOps & Production
- Niveau 6 : Portfolio & Carrière

Prochaines étapes :
1. Nous vous contacterons à l'ouverture officielle des inscriptions.
2. Rejoignez notre communauté Discord.
3. Suivez-nous sur LinkedIn et YouTube.

Contact : dtech.afrik@gmail.com
  `.trim();
}

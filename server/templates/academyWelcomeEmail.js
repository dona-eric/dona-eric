export function generateAcademyWelcomeHTML({ fullName, data }) {
  const profession = data?.profession || "";
  const country = data?.country || "";
  const level = data?.current_level || "";

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue chez MLAcademy</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 15px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0"
             style="max-width:600px;background:#ffffff;border-radius:16px;
                    overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.25);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 100%);
                     padding:42px 36px;text-align:center;">
            <p style="margin:0 0 6px;color:rgba(255,255,255,0.85);font-size:12px;
                      text-transform:uppercase;letter-spacing:2.5px;font-weight:700;">MLAcademy</p>
            <h1 style="margin:0 0 10px;color:#ffffff;font-size:26px;line-height:1.3;font-weight:800;">
              Bienvenue, ${fullName} !
            </h1>
            <p style="margin:0;color:rgba(255,255,255,0.9);font-size:15px;line-height:1.5;">
              Votre pré-inscription est officiellement confirmée.
            </p>
            <div style="display:inline-block;margin-top:20px;padding:8px 22px;
                        background:rgba(255,255,255,0.2);border-radius:100px;
                        color:#ffffff;font-size:13px;font-weight:700;letter-spacing:0.5px;">
              ⚡ Statut : Candidature Validée
            </div>
          </td>
        </tr>

        <!-- RECAP PERSONNALISÉ -->
        ${data ? `
        <tr>
          <td style="padding:24px 36px 0;">
            <div style="background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;padding:18px 20px;">
              <p style="margin:0 0 10px;font-weight:700;color:#334155;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">
                📌 Récapitulatif de votre profil :
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#475569;">
                ${profession ? `<tr><td style="padding:4px 0;width:120px;font-weight:600;">Profession :</td><td style="padding:4px 0;color:#0f172a;">${profession}</td></tr>` : ''}
                ${country ? `<tr><td style="padding:4px 0;font-weight:600;">Pays :</td><td style="padding:4px 0;color:#0f172a;">${country}</td></tr>` : ''}
                ${level ? `<tr><td style="padding:4px 0;font-weight:600;">Niveau Actuel :</td><td style="padding:4px 0;color:#0f172a;">${level}</td></tr>` : ''}
              </table>
            </div>
          </td>
        </tr>
        ` : ''}

        <!-- BODY -->
        <tr>
          <td style="padding:32px 36px 40px;">
            <p style="margin:0 0 24px;font-size:15px;color:#334155;line-height:1.7;">
              Ravi de vous compter parmi nous ! Vous rejoignez une communauté passionnée et ambitieuse. Notre mission est de vous propulser de <strong>débutant à expert opérationnel en Data Science, IA & MLOps en 90 jours</strong>.
            </p>

            <!-- MANDATORY ACTION BOX -->
            <div style="background:linear-gradient(135deg,#fff7ed 0%,#ffedd5 100%);
                        border-radius:14px;border:2px solid #fdba74;
                        padding:24px;margin-bottom:28px;">
              <h2 style="margin:0 0 10px;font-size:17px;color:#9a3412;font-weight:800;display:flex;align-items:center;">
                🚨 Étape Obligatoire pour Tous les Inscrits
              </h2>
              <p style="margin:0 0 18px;font-size:14px;color:#7c2d12;line-height:1.6;">
                Pour valider votre accès aux masterclasses en direct, aux ressources pédagogiques et recevoir les rappels de sessions, vous devez <strong>obligatoirement suivre nos 2 canaux officiels</strong> :
              </p>

              <!-- BUTTONS -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding-right:8px;">
                    <a href="https://www.linkedin.com/in/dona-erick" target="_blank"
                       style="display:block;background:#0a66c2;color:#ffffff;text-align:center;
                              padding:12px 14px;border-radius:10px;text-decoration:none;
                              font-weight:700;font-size:13px;box-shadow:0 3px 10px rgba(10,102,194,0.3);">
                      🔗 Suivre sur LinkedIn
                    </a>
                  </td>
                  <td width="50%" style="padding-left:8px;">
                    <a href="https://www.youtube.com/@mlacademie" target="_blank"
                       style="display:block;background:#ff0000;color:#ffffff;text-align:center;
                              padding:12px 14px;border-radius:10px;text-decoration:none;
                              font-weight:700;font-size:13px;box-shadow:0 3px 10px rgba(255,0,0,0.3);">
                      🔴 S'abonner sur YouTube
                    </a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- ROADMAP -->
            <div style="background:#f8fafc;border-radius:14px;border:1px solid #e2e8f0;
                        padding:24px;margin-bottom:28px;">
              <h2 style="margin:0 0 16px;font-size:17px;color:#0f172a;font-weight:800;">
                🗺️ Votre Programme de Formation en 90 jours
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
                <tr>
                  <td style="padding:7px 0;color:#6366f1;font-weight:700;width:90px;">Niveau 0</td>
                  <td style="padding:7px 0;color:#334155;">Orientation & Fondations (Gratuit)</td>
                </tr>
                <tr>
                  <td style="padding:7px 0;color:#3b82f6;font-weight:700;">Niveau 1</td>
                  <td style="padding:7px 0;color:#334155;">Python, SQL, Git & Analyse de Données</td>
                </tr>
                <tr>
                  <td style="padding:7px 0;color:#8b5cf6;font-weight:700;">Niveau 2</td>
                  <td style="padding:7px 0;color:#334155;">Machine Learning & Deep Learning Pratique</td>
                </tr>
                <tr>
                  <td style="padding:7px 0;color:#06b6d4;font-weight:700;">Niveau 3</td>
                  <td style="padding:7px 0;color:#334155;">Docker, Kubernetes & Infrastructure Cloud</td>
                </tr>
                <tr>
                  <td style="padding:7px 0;color:#ec4899;font-weight:700;">Niveau 4</td>
                  <td style="padding:7px 0;color:#334155;">LLM, Generative AI & Agents Intelligents (RAG)</td>
                </tr>
                <tr>
                  <td style="padding:7px 0;color:#f59e0b;font-weight:700;">Niveau 5</td>
                  <td style="padding:7px 0;color:#334155;">MLOps, CI/CD & Déploiement en Production</td>
                </tr>
                <tr>
                  <td style="padding:7px 0;color:#10b981;font-weight:700;">Niveau 6</td>
                  <td style="padding:7px 0;color:#334155;">Projets Réels, Portfolio & Préparation Carrière</td>
                </tr>
              </table>
            </div>

            <!-- SIGNATURE -->
            <div style="border-top:1px solid #e2e8f0;padding-top:20px;">
              <p style="margin:0 0 4px;font-weight:700;color:#0f172a;font-size:14px;">
                Dona Eric KOULODJI
              </p>
              <p style="margin:0 0 12px;color:#64748b;font-size:13px;">
                Fondateur MLAcademy | Data Scientist & AI Engineer
              </p>
              <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">
                Un doute ou une question ? Écrivez-nous à 
                <a href="mailto:dtech.afrik@gmail.com" style="color:#4f46e5;text-decoration:none;font-weight:600;">
                  dtech.afrik@gmail.com
                </a>
              </p>
            </div>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:20px 36px;background:#f8fafc;border-top:1px solid #e2e8f0;
                     text-align:center;">
            <p style="margin:0 0 8px;color:#94a3b8;font-size:12px;">
              Vous recevez cet email suite à votre pré-inscription à MLAcademy.
            </p>
            <p style="margin:0;color:#64748b;font-size:12px;">
              LinkedIn : <a href="https://www.linkedin.com/in/dona-erick" style="color:#0a66c2;text-decoration:none;">Dona Eric KOULODJI</a> | 
              YouTube : <a href="https://www.youtube.com/@mlacademie" style="color:#ff0000;text-decoration:none;">@data-world-o4u</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`;
}

export function generateAcademyWelcomeText({ fullName }) {
  return `
Bienvenue chez MLAcademy, ${fullName} !

Votre pré-inscription est officiellement enregistrée et confirmée.

🚨 ÉTAPE OBLIGATOIRE POUR TOUS LES INSCRITS :
Pour valider l'accès aux masterclasses en direct, aux ressources pédagogiques et recevoir les rappels, vous devez OBLIGATOIREMENT vous abonner et nous suivre sur nos 2 réseaux officiels :
1. LinkedIn : https://www.linkedin.com/in/dona-erick
2. YouTube : https://www.youtube.com/@mlacademie

Votre parcours de formation en 90 jours :
- Niveau 0 : Orientation & Fondations (Gratuit)
- Niveau 1 : Python, SQL, Git & Analyse de Données
- Niveau 2 : Machine Learning & Deep Learning Pratique
- Niveau 3 : Docker, Kubernetes & Cloud
- Niveau 4 : LLM, Generative AI & Agents Intelligents (RAG)
- Niveau 5 : MLOps, CI/CD & Déploiement Production
- Niveau 6 : Projets Réels, Portfolio & Carrière

Dona Eric KOULODJI
Fondateur MLAcademy | Data Scientist & AI Engineer
Contact : dtech.afrik@gmail.com
  `.trim();
}

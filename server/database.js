import { createClient } from "@libsql/client";

export const db = createClient({
  url:       process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});

export async function initDatabase() {
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS registrations (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      masterclass_id TEXT    NOT NULL,
      first_name     TEXT    NOT NULL,
      last_name      TEXT    NOT NULL,
      email          TEXT    NOT NULL,
      profession     TEXT    NOT NULL,
      domain         TEXT    NOT NULL,
      message        TEXT    DEFAULT '',
      prerequisites  TEXT    NOT NULL,
      confirmed_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
      ip_address     TEXT,
      UNIQUE(masterclass_id, email)
    );
    CREATE INDEX IF NOT EXISTS idx_mc_id ON registrations(masterclass_id);
    CREATE INDEX IF NOT EXISTS idx_email  ON registrations(email);
    CREATE TABLE IF NOT EXISTS email_logs (
      id      INTEGER PRIMARY KEY AUTOINCREMENT,
      reg_id  INTEGER REFERENCES registrations(id),
      email   TEXT    NOT NULL,
      status  TEXT    NOT NULL,
      error   TEXT    DEFAULT NULL,
      sent_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log("✅ Tables Turso prêtes");
}

export async function insertRegistration(data) {
  return db.execute({
    sql: `INSERT INTO registrations
            (masterclass_id, first_name, last_name, email, profession, domain, message, prerequisites, ip_address)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.masterclass_id, data.first_name, data.last_name,
      data.email, data.profession, data.domain,
      data.message, data.prerequisites, data.ip_address,
    ],
  });
}

export async function checkDuplicate(masterclassId, email) {
  const result = await db.execute({
    sql:  "SELECT id FROM registrations WHERE masterclass_id = ? AND email = ?",
    args: [masterclassId, email],
  });
  return result.rows[0] ?? null;
}

export async function countRegistrations(masterclassId) {
  const result = await db.execute({
    sql:  "SELECT COUNT(*) as count FROM registrations WHERE masterclass_id = ?",
    args: [masterclassId],
  });
  return Number(result.rows[0].count);
}

export async function getRegistrantsByMasterclass(masterclassId) {
  const result = await db.execute({
    sql:  "SELECT first_name, last_name, email FROM registrations WHERE masterclass_id = ?",
    args: [masterclassId],
  });
  return result.rows;
}

export async function logEmail(regId, email, status, error) {
  return db.execute({
    sql:  "INSERT INTO email_logs (reg_id, email, status, error) VALUES (?, ?, ?, ?)",
    args: [regId, email, status, error],
  });
}
import "dotenv/config";
import { db } from "./database.js";

async function main() {
  const regs = await db.execute("SELECT * FROM registrations ORDER BY id DESC LIMIT 5");
  console.log("=== REGISTRATIONS ===");
  console.log(regs.rows);
  
  const logs = await db.execute("SELECT * FROM email_logs ORDER BY id DESC LIMIT 10");
  console.log("\n=== EMAIL LOGS ===");
  console.log(logs.rows);
}
main().catch(console.error);

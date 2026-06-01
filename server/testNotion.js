import { Client } from "@notionhq/client";
import dotenv from "dotenv";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function test() {
  try {
    const response = await notion.databases.query({ database_id: databaseId });
    console.log("Connexion Notion réussie !", response.results.length, "lignes trouvées.");
    if (response.results.length > 0) {
      console.log("Premier élément:", JSON.stringify(response.results[0].properties, null, 2).substring(0, 200) + "...");
    }
  } catch (error) {
    console.error("Erreur Notion:", error.message);
  }
}
test();

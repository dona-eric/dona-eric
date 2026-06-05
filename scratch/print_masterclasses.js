import { getMasterclasses } from "../server/services/notionService.js";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

async function run() {
  const masterclasses = await getMasterclasses();
  console.log(JSON.stringify(masterclasses.map(m => ({
    id: m.id,
    title: m.title,
    date: m.date,
    link: m.link,
    type: m.type,
    status: m.status
  })), null, 2));
}

run();

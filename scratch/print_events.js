import { getMasterclasses } from "../server/services/notionService.js";
import { isOpen } from "../src/config/masterclasses.config.js";

async function run() {
  const masterclasses = await getMasterclasses();
  
  masterclasses.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(a.date) - new Date(b.date);
  });

  const getDeadline = (item) => {
    if (!item.date) return new Date(0);
    return item.date.includes("T") ? new Date(item.date) : new Date(`${item.date}T16:00:00+01:00`);
  };

  const now = new Date();
  const activeEvents = masterclasses.filter(item => getDeadline(item) > now);
  const openEventId = activeEvents.length > 0 ? activeEvents[0].id : null;

  console.log("=== RAW DATA ===");
  console.log("Current date-time (ISO):", now.toISOString());
  console.log("Current date-time (Local):", now.toString());
  
  for (const mc of masterclasses) {
    const deadline = getDeadline(mc);
    const isPast = deadline <= now;
    const isEventOpen = !isPast && mc.id === openEventId;
    const isLocked = !isPast && mc.id !== openEventId;
    
    console.log(`\nEvent: ${mc.title}`);
    console.log(`Date: ${mc.date}`);
    console.log(`Deadline: ${deadline.toISOString()}`);
    console.log(`isPast: ${isPast}`);
    console.log(`isOpen: ${isEventOpen}`);
    console.log(`isLocked: ${isLocked}`);
    console.log(`openEventId: ${openEventId}`);
  }
}

run();

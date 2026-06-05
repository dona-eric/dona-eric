import fetch from "node-fetch";

async function run() {
  try {
    const res = await fetch("https://donerick.vercel.app/formations");
    const html = await res.text();
    const match = html.match(/src="(\/assets\/index-[^"]+\.js)"/);
    const jsUrl = "https://donerick.vercel.app" + match[1];
    
    const jsRes = await fetch(jsUrl);
    const jsCode = await jsRes.text();
    
    // search for the fetch call
    const snippets = jsCode.match(/.{0,50}masterclasses.{0,50}/g);
    console.log("Snippets:", snippets.join("\n---\n"));
  } catch (e) {
    console.error(e);
  }
}
run();

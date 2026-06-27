import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function main() {
  console.log("Testing SMTP connection for:", process.env.EMAIL_USER);
  try {
    await transporter.verify();
    console.log("SMTP transport verified successfully!");
    
    console.log("Sending a test email to:", process.env.EMAIL_USER);
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Test SMTP - Local Test Script",
      text: "If you receive this, the app password and nodemailer settings are 100% correct.",
      html: "<b>If you receive this, the app password and nodemailer settings are 100% correct.</b>"
    });
    console.log("Email sent successfully! Message ID:", info.messageId);
  } catch (err) {
    console.error("SMTP Test Failed!");
    console.error(err);
  }
}

main();

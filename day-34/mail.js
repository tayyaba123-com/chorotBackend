import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error(" Transporter Error:", error);
  } else {
    console.log(" Email transporter is ready");
  }
});



export async function sendEmail({ to, subject, html, text }) {

  // console.log("Incoming Email Request:");
  // console.log("To:", to);
  // console.log("Subject:", subject);

  
  if (!to || !subject || !html) {
    console.error(" Missing required fields");
    return "Failed: Missing email fields";
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.GOOGLE_USER,
      to,
      subject,
      html,
      text: text || html
    });

    console.log("Email sent:", info.response);
    return `Email sent successfully to ${to}`;

  } catch (error) {

    
    console.error(" Error sending email:");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Command:", error.command);

    if (error.response) {
      console.error("Response:", error.response);
    }

    return "Failed to send email";
  }
}
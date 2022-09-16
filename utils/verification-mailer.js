const nodemailer = require("nodemailer");

const data = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
  },
  secured: false,
};

const transport = nodemailer.createTransport(data);

async function sendVerificationMail(name, email, link) {
  const mail = {
    from: "Cab Service <support@parivest.com>",
    to: `${email}`,
    subject: "Email Verification For Cab Service System",
    text: `Hi ${name}, \n 
        Please click the link below to verify your email for the Cab Service System\n
        ${link}
        \n
        Welcome,\n
        Cab Service System
        `,
  };
  const info = await transport.sendMail(mail);
  return info;
}
module.exports = { sendVerificationMail };

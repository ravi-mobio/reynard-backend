require("dotenv").config();

// using libraries
const nodeMailer = require("nodemailer");

//environment variables
const { EMAIL_ID_MAIL, MAIL_PORT, EMAIL_PASSWORD_MAIL, NODE_ENV } = process.env;

let transport = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for 465, false for other ports
  auth: {
    user: EMAIL_ID_MAIL,
    pass: EMAIL_PASSWORD_MAIL,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendMailer = async (toMail, subject, template, urlLink) => {
  if (NODE_ENV === "development" || NODE_ENV === "local") {
    const message = {
      from: EMAIL_ID_MAIL,
      to: toMail,
      subject: subject,
      html: template({ urlLink }),
    };

    return await transport.sendMail(message);
  }
};

//Modified off of the CDCW Firebase Contact Form
import { config } from "firebase-functions";
import mailer from "nodemailer";

console.log("config", config());
//to make it work you need gmail account
const gmailEmail = config().gmail.login;
const gmailPassword = config().gmail.pass;

//creating function for sending emails
export default function(message: any, name: any, email: any) {
  let transporter = mailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      type: "login",
      user: gmailEmail,
      pass: gmailPassword
    }
  });

  // setup email data with unicode symbols
  //this is how your email are going to look like
  let mailOptions = {
    from: gmailEmail, // sender address
    to: "alexdelrio@prepbaseballreport.com", // list of receivers
    subject: "Contact Form Received", // Subject line
    text: "Message for you:" + message, // plain text body
    html: `` // html body
  };

  //this is callback function to return status to firebase console
  const getDeliveryStatus = function(error: any, info: any) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    // EX Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  };

  //call of this function send an email, and return status
  transporter.sendMail(mailOptions, getDeliveryStatus);
}

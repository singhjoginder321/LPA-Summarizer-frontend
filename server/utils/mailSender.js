const nodemailer = require("nodemailer");

// Define the mailSender function
const mailSender = async (email, title, body) => {
  try {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: process.env.MAIL_SECURE === "true", // Use true if the environment variable is set to 'true'
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send mail using the transporter
    const info = await transporter.sendMail({
      from: `"Joginder " <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log(info.response);
    return info;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

module.exports = mailSender;

const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");
const multer = require("multer");
const FormData = require("form-data");
const upload = multer();
const serverErrorTemplate = require("../tempelates/emailTempelate");
const mailSender = require("../utils/mailSender");

const router = express.Router();

// Mail transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API endpoint to process the legal document
router.post("/process-document", upload.single("pdf"), async (req, res) => {
  const { email, rules } = req.body; // Expecting email and rules in the form data
  const pdfBuffer = req.file.buffer; // PDF binary data

  try {
    // Create a FormData instance
    const formData = new FormData();
    formData.append("pdf", pdfBuffer, { filename: "document.pdf" });
    formData.append("email", email);
    formData.append("rules", rules); // Include rules in the payload

    // Forward the payload to the external API
    const response = await axios.post(
      "https://ai-workbench.flipnow.cloud/dev/legal-document-processing/api/getSummary",
      formData,
      {
        headers: {
          ...formData.getHeaders(), // Set appropriate headers for FormData
        },
      }
    );

    if (response.data.success) {
      // Handle success response
      return res.status(200).json({
        message: "Summary processed successfully",
        data: response.data,
      });
    } else {
      throw new Error("API did not return success");
    }
  } catch (error) {
    // console.error("Error calling external API:", error);

    // // Send error email
    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Error Processing Document",
    //   text: `There was an error processing your document: ${error.message}`,
    // };

    // await transporter.sendMail(mailOptions);

    const emailBody = serverErrorTemplate();
    console.log(email);
    await mailSender(email, "Error Occurred in the Server", emailBody);

    return res
      .status(500)
      .json({ message: "Error processing document, email sent to user" });
  }
});

module.exports = router;

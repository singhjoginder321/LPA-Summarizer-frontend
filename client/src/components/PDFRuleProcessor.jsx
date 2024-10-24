import { PDFDocument } from "pdf-lib";
import React, { useRef, useState } from "react";
import {
  FaClipboardList,
  FaCloudUploadAlt,
  FaFilePdf,
  FaRegEdit,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateSummary } from "../Services/apiService";
import RulesEditor from "./RulesEditor";

function PDFRuleProcessor({
  onGenerateSummary,
  model,
  setShowErrorPage,
  setErrorMessage,
}) {
  const [pdf, setPdf] = useState(null);
  const [email, setEmail] = useState("");
  const [rules, setRules] =
    useState(`1. Give me a summary of 2000 words or above with a proper title for the full summary, Bullet points for each article/section and one text paragraph.
2. Every article should be present as a single section of the summary with appropriate heading of its own.
3. Make this a formatted html text so that it can be displayed in a browser.
4. Enclose the Entire summary in a single div tag.
5. Ensure that the summary does not cut off in the middle of a line and ends properly.
6. Emphasize more on the Fees and expenses compared to the other articles/ sections of the document.`);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleSaveRules = (newRules) => {
    setRules(newRules);
    setIsEditorOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!pdf || !email || !rules) {
      toast.error("Please fill in all fields: PDF, Email, and Rules.");
      return;
    }

    console.log("Submit", model);

    const SampleformData = { pdf, email, rules };
    const formData = new FormData();
    formData.append("llm", model);
    formData.append("file", pdf);
    formData.append("email", email);
    formData.append("rules", rules);
    console.log("Form Data:", formData);

    try {
      const result = await generateSummary(formData);
      console.log("Summary generated:", result);
      onGenerateSummary(SampleformData);
      toast.success("Summary generated successfully!");
    } catch (error) {
      setShowErrorPage(true);
      setErrorMessage(error.message);
      toast.error(error.message || "Failed to generate summary.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setError(""); // Reset error

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file.");
      return;
    }

    // Validate page count using pdf-lib
    const arrayBuffer = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();

    const maxPages = 20; // Set page limit
    if (pageCount > maxPages) {
      const errorMessage = `PDF exceeds the maximum page limit of ${maxPages} pages.`;
      // toast.error(errorMessage);
      setError(errorMessage);
      setPdf(null);
      return;
    }

    // Set the valid PDF
    setPdf(selectedFile);
    toast.success(`Page count: ${pageCount}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setPdf(droppedFile);
    } else {
      toast.error("Please upload a valid PDF file.");
      setPdf(null);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setPdf(null);
    setEmail("");
    setRules(`1. Give me a summary of 2000 words or above with a proper title for the full summary, Bullet points for each article/section and one text paragraph.
2. Every article should be present as a single section of the summary with appropriate heading of its own.
3. Make this a formatted html text so that it can be displayed in a browser.
4. Enclose the Entire summary in a single div tag.
5. Ensure that the summary does not cut off in the middle of a line and ends properly.
6. Emphasize more on the Fees and expenses compared to the other articles/ sections of the document.`);
    setError("");
    toast.info("Form has been reset.");
  };

  const isFormValid = () => {
    return model && pdf && email.trim() && rules;
  };
  return (
    <div className="mt-8 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-[85vw] bg-white rounded-lg shadow-lg overflow-hidden mb-8 p-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div
            className={`bg-[#fffbf3] p-6 rounded-lg shadow-md flex flex-col items-center justify-center border-2 border-dashed ${
              isDragging ? "border-custom-blue bg-blue-50" : "border-gray-300"
            } transition-all duration-300 ease-in-out cursor-pointer w-full md:w-1/2 hover:border-custom-blue hover:bg-blue-50`}
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onMouseLeave={handleMouseLeave}
            style={{ height: "190px" }}
          >
            <FaCloudUploadAlt className="text-custom-blue text-4xl" />
            <p className="text-gray-500 font-semibold">Upload a File</p>
            <p className="text-gray-400 text-sm">
              Drag and drop files here, or click the area above
            </p>
            <div className="flex items-center text-gray-500 text-sm font-medium mt-2">
              <i>Note: Please ensure your PDF has no more than 20 pages.</i>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />

            {/* Display Uploaded PDF or Error Here */}
            <div className="mt-2 text-center flex-grow">
              {pdf ? (
                <div className="bg-green-100 border border-green-300 text-green-800 text-sm font-medium rounded-md p-2 transition duration-200 ease-in-out">
                  <span>Uploaded PDF: </span>
                  <span className="font-bold">{pdf.name}</span>
                </div>
              ) : (
                error && (
                  <div className="bg-red-100 border border-red-300 text-red-800 text-sm font-medium rounded-md p-2 transition duration-200 ease-in-out">
                    <span>Upload Error: </span>
                    <span className="font-bold">{error}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-[#fff6f8] p-6 rounded-lg shadow-md w-full md:w-1/2">
            <div className="flex items-center mb-4">
              <HiMail className="text-custom-blue text-3xl mb-2 mr-2" />
              <label className="block text-gray-700 mb-2 font-bold text-[1.3rem]">
                Email
              </label>
            </div>
            <input
              type="email"
              className=" text-[1.1rem] block w-full p-3 border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:outline-none rounded-md transition duration-200 hover:shadow-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Please enter a valid email address."
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
            <p className="text-gray-500 text-sm mt-2">
              We will send the summary to this email.
            </p>
          </div>
        </div>

        <div className="bg-[#fff6f8] p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center">
              <FaClipboardList className="text-custom-blue mb-1 text-[1.4rem] mr-1" />
              <label className="block text-gray-700 font-bold text-[1.3rem]">
                Rules
              </label>
            </div>
            <button
              type="button"
              onClick={() => setIsEditorOpen(true)}
              className="bg-custom-purple text-white pr-1 pl-2 py-2 rounded-md hover:bg-custom-hover-purple font-semibold transition flex items-center"
            >
              <FaRegEdit className="font-semibold" />
            </button>
          </div>
          {rules && (
            <div className="text-[1.1rem] h-[290px] overflow-y-auto p-4 bg-[#fff7ff] border border-[#ffd1ff] rounded-md">
              <pre className="whitespace-pre-wrap">{rules}</pre>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6 gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="py-3 px-4 text-black text-base rounded-lg hover:bg-gradient-45 hover:text-white"
          >
            Reset
          </button>
          <button
            type="submit"
            onClick={handleFormSubmit}
            className={`py-3 px-4 rounded-lg transition-all ${
              isFormValid()
                ? "bg-gradient-45 text-white hover:bg-gradient-hover"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Generate Summary
          </button>
        </div>

        <RulesEditor
          isOpen={isEditorOpen}
          onSave={handleSaveRules}
          onClose={() => setIsEditorOpen(false)}
        />
      </div>
    </div>
  );
}

export default PDFRuleProcessor;

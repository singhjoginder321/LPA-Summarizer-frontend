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

function PDFRuleProcessor({ onGenerateSummary }) {
  const [pdf, setPdf] = useState(null);
  const [email, setEmail] = useState("joginder.singh@kanerika.com");
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

    const SampleformData = { pdf, email, rules };
    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("email", email);
    formData.append("rules", rules);
    console.log("Form Data:", formData);
    onGenerateSummary(SampleformData);

    try {
      const result = await generateSummary(formData);
      console.log("Summary generated:", result);
      toast.success("Summary generated successfully!");
    } catch (error) {
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
      const errorMessage = `PDF exceeds the maximum page limit of ${maxPages} pages. Please upload a PDF with 20 pages or less.`;
      toast.error(`PDF exceeds the maximum page limit of ${maxPages} pages.`);
      setError(errorMessage);
      setPdf(null);
      return;
    }

    // Set the valid PDF
    setPdf(selectedFile);
    toast.success(`PDF uploaded successfully. Page count: ${pageCount}`);
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

  return (
    <div className="mt-8 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="p-8">
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
            >
              <FaCloudUploadAlt className="text-custom-blue text-4xl" />
              <p className="text-gray-500 font-semibold">Upload a File</p>
              <p className="text-gray-400 text-sm">
                Drag and drop files here, or click the button below
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              <button
                type="button"
                className="mt-4 text-lg bg-custom-purple text-white px-8 py-1 rounded-md hover:bg-custom-hover-purple font-semibold transition"
              >
                upload PDF
              </button>
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
                className="block w-full p-3 border border-gray-300 focus:ring-2 focus:ring-purple-300 focus:outline-none rounded-md transition duration-200 hover:shadow-lg"
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

          {pdf ? (
            <div className="mb-4 p-4 bg-[#fff6f8] rounded-md">
              <h3 className="font-semibold text-lg flex items-center">
                <FaFilePdf className="mr-2 text-red-600" />
                Uploaded PDF:
              </h3>
              <p>{pdf.name}</p>
            </div>
          ) : (
            error && (
              <div className="mb-4 p-4 bg-red-100 rounded-md border border-red-400">
                <h3 className="font-semibold text-lg text-red-600">
                  Upload Error:
                </h3>
                <p className="text-red-600">{error}</p>
              </div>
            )
          )}

          <div className="bg-[#fff6f8] p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FaClipboardList className="text-custom-blue mb-1 text-[1.4rem] mr-1" />
                <label className="block text-gray-700 font-bold text-[1.3rem]">
                  Rules
                </label>
              </div>
              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="bg-custom-purple text-white px-4 py-2 rounded-md hover:bg-custom-hover-purple font-semibold transition flex items-center"
              >
                <FaRegEdit className="mr-2 font-semibold" />
                Add/Edit Rules
              </button>
            </div>
            {rules && (
              <div className="max-h-[200px] overflow-y-auto p-4 bg-[#fff7ff] border border-[#ffd1ff] rounded-md">
                <pre className="whitespace-pre-wrap">{rules}</pre>
              </div>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="bg-blue-500 hover:text-white bg-gradient-45 hover:bg-gradient-hover text-white font-semibold px-6 py-3 rounded-md text-2xl transition"
            >
              Generate Summary
            </button>
          </div>
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

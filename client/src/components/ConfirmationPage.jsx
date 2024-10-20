import React from "react";
import {
  FaCheckCircle,
  FaClipboardList,
  FaEnvelope,
  FaFilePdf,
} from "react-icons/fa";

function ConfirmationPage({ data, onGoBack }) {
  const { email, pdf, rules } = data || {};

  return (
    <div className="flex items-center justify-center py-8">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl transition-transform transform">
        <h2 className="text-3xl font-extrabold text-center mb-4 text-gray-800">
          <FaCheckCircle className="inline-block text-green-600 mr-2" />
          Confirmation
        </h2>
        <p className="confirmation-message text-lg mb-4 text-center text-gray-700 font-light leading-relaxed">
          <span className="font-semibold text-gray-800">
            Thank you for your submission!
          </span>
          <br />
          <span className="block mt-2 text-gray-600">
            We are currently processing your request, and you can expect the
            result to be sent to the email you provided shortly.
          </span>
        </p>

        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Your Details:
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-md border border-gray-200 shadow-md">
            {/* Email Section */}
            <div className="flex items-center mb-3 p-2 bg-white rounded-lg shadow-sm transition hover:shadow-md min-h-[45px]">
              <FaEnvelope className="mr-2 text-blue-600 text-xl" />
              <div className="flex items-center flex-1">
                <span className="font-medium text-gray-800 mr-2">Email:</span>
                <p className="text-gray-600 flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-sm">
                  {email || "No email provided"}
                </p>
              </div>
            </div>

            {/* PDF Section */}
            <div className="flex items-center mb-3 p-2 bg-white rounded-lg shadow-sm transition hover:shadow-md min-h-[45px]">
              <FaFilePdf className="mr-1 text-red-600 text-xl" />
              <div className="flex items-center">
                <span className="font-medium text-gray-800 mr-2">
                  Uploaded PDF:
                </span>
                <p className="text-gray-600 flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-xs">
                  {pdf ? pdf.name : "No PDF uploaded"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-3 transition hover:shadow-md">
              <div className="flex items-center">
                <FaClipboardList className="text-custom-blue mb-2 text-xl mr-1" />
                <h4 className="font-medium text-gray-800 mb-2">Rules:</h4>
              </div>
              <pre className="whitespace-pre-wrap text-gray-600 max-h-28 overflow-auto p-2 border rounded-md bg-gray-100">
                {rules || "No rules provided"}
              </pre>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onGoBack}
            className="bg-custom-blue text-white px-6 py-2 rounded-md hover:bg-custom-hover-purple transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;

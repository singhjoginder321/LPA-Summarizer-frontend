import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

function ErrorPage({ errorMessage, onRetry }) {
  return (
    <div className="flex items-center justify-center py-8 min-h-[90vh] bg-transparent -mt-12">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-xl transition-transform transform">
        <h2 className="text-3xl font-extrabold text-center mb-4 text-custom-purple">
          <FaExclamationCircle className="inline-block text-custom-purple mr-2" />
          Error
        </h2>
        <p className="error-message text-lg mb-4 text-center text-gray-700 font-light leading-relaxed">
          <span className="font-semibold text-gray-800">
            Oops! Something went wrong.
          </span>
          <br />
          <span className="block mt-2 text-gray-600">
            {errorMessage ||
              "We encountered an unexpected error. Please try again later."}
          </span>
        </p>

        <div className="text-center">
          <button
            onClick={onRetry}
            className="bg-custom-purple text-white px-6 py-2 rounded-md hover:bg-custom-hover-purple transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;

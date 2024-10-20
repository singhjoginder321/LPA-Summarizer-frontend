import React, { useState } from "react";

function RulesEditor({ isOpen, onSave, onClose }) {
  const [rules, setRules] =
    useState(`1. Give me a summary of 2000 words or above with a proper title for the full summary, Bullet points for each article/section and one text paragraph.
2. Every article should be present as a single section of the summary with appropriate heading of its own.
3. Make this a formatted html text so that it can be displayed in a browser.
4. Enclose the Entire summary in a single div tag.
5. Ensure that the summary does not cut off in the middle of a line and ends properly.
6. Emphasize more on the Fees and expenses compared to the other articles/ sections of the document.`);

  if (!isOpen) return null;

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white w-full max-w-5xl rounded-lg shadow-lg p-6 relative flex flex-col"
        style={{ maxHeight: "70vh", minHeight: "55vh" }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add/Edit Rules
        </h2>

        {/* Text Area for Rules */}
        <textarea
          value={rules}
          onChange={(e) => setRules(e.target.value)}
          className="flex-grow p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 focus:outline-none transition duration-200 ease-in-out resize-none"
          placeholder="Enter your rules here..."
        />

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => onSave(rules)}
            className="bg-custom-purple font-semibold text-white px-5 py-2 rounded-md shadow-md hover:bg-custom-hover-purple transition duration-200 ease-in-out"
          >
            Save Rules
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-gray-700 transition duration-200 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default RulesEditor;

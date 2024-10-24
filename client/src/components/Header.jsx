import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import logo from "../assets/kanerika-logo.svg";

function Header({ setModel }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedModel, setSelectedModel] = useState("GPT-4o");

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setModel(model);
    console.log("Model selected", model);
    setShowDropdown(false);
  };

  return (
    <nav className="flex items-center justify-between py-2 bg-white border-b border-gray-300 shadow-lg relative">
      {/* Left: Logo */}
      <div className="flex items-center ml-3">
        <img src={logo} alt="Home Icon" className="h-10" />
      </div>

      {/* Center: Title */}
      <div className="flex items-center flex-grow justify-center">
        <p className="text-2xl text-custom-blue font-bold">
          Legal Document Summarizer
        </p>

        {/* Instruction Icon with Tooltip */}
        <div className="relative ml-4">
          <button
            className="flex items-center p-2 rounded  transition duration-200"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <FaInfoCircle className="h-7 w-7 text-custom-blue hover:text-custom-orange" />
          </button>

          {showTooltip && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-custom-blue text-white border border-blue-700 p-4 rounded-lg shadow-lg z-10 transition-opacity duration-300 ease-in-out opacity-100 transform translate-y-2">
              {/* Tooltip Content */}
              <div className="relative">
                {/* <div className="flex items-center mb-2">
                  <FaInfoCircle className="mr-2 text-white" />
                  <span className="font-semibold text-lg">Instructions</span>
                </div> */}
                <ul className="list-disc pl-5 space-y-1">
                  <li>Prompt Engineering</li>
                  <li>Map-Reduce Model</li>
                  <li>Large Document Summarization</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Dropdown for Model Selection */}
      <div className="relative mr-3">
        <select
          className="w-48 flex items-center text-custom-blue font-bold border-custom-blue p-2 pr-1 border rounded-md bg-white shadow-md hover:bg-gray-100 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedModel}
          onChange={(e) => handleModelSelect(e.target.value)}
        >
          <option value="GPT-4o" className="font-bold">
            GPT-4o
          </option>
          <option value="Claude 3.5" className="font-bold">
            Claude 3.5
          </option>
        </select>
      </div>
    </nav>
  );
}

export default Header;

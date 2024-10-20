import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa"; // Import the instruction icon
// import { Link } from "react-router-dom";
import logo from "../assets/logo-kanerika.png";

function Header() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <nav className="flex items-center justify-between py-2 bg-white border-b border-gray-300 shadow-lg relative">
      {/* Left: Logo */}
      <div className="flex items-center ml-3">
        <div className="flex items-center">
          <img src={logo} alt="Home Icon" className="h-10 " />
        </div>
      </div>

      {/* Center: Title */}
      <h2 className="max-md:hidden text-3xl text-custom-blue font-bold flex-grow text-center ml-[-8rem]">
        LPA Summarizer
      </h2>

      {/* Right: Instruction Icon with Tooltip */}
      <div className="flex items-center mr-2 relative">
        <button
          className="flex items-center p-2 rounded "
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <FaQuestionCircle className="h-8 w-8 text-custom-blue hover:text-custom-hover-orange duration-300 " />
        </button>

        {showTooltip && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-gray-800 text-white border border-gray-700 p-4 rounded-lg shadow-lg z-10 transition-opacity duration-300 ease-in-out opacity-100 transform translate-y-2">
            <div className="relative">
              <div className="arrow absolute -top-2 right-4 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-gray-800"></div>
              <ul className="list-disc pl-5">
                <li>Prompt Engineering</li>
                <li>Map-Reduce Model</li>
                <li>Large Document Summarization</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;

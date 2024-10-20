import React, { useState } from "react";
import { DiVim } from "react-icons/di";
import ConfirmationPage from "./components/ConfirmationPage";
import Header from "./components/Header"; // Import the Header component
import PDFRuleProcessor from "./components/PDFRuleProcessor";

function App() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);

  const handleGenerateSummary = (data) => {
    setConfirmationData(data);
    setShowConfirmation(true);
  };

  const handleGoBack = () => {
    setShowConfirmation(false);
    setConfirmationData(null);
  };

  return (
    <div className="bg-purple-50 min-h-[100vh]">
      <Header />
      {showConfirmation ? (
        <ConfirmationPage data={confirmationData} onGoBack={handleGoBack} />
      ) : (
        <PDFRuleProcessor onGenerateSummary={handleGenerateSummary} />
      )}
    </div>
  );
}

export default App;

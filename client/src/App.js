import React, { useState } from "react";
import ConfirmationPage from "./components/ConfirmationPage";
import ErrorPage from "./components/ErrorPage"; // Import the ErrorPage component
import Header from "./components/Header"; // Import the Header component
import PDFRuleProcessor from "./components/PDFRuleProcessor";

function App() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [model, setModel] = useState("GPT-4o");
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerateSummary = async (data) => {
    setConfirmationData(data);
    setShowConfirmation(true);
  };

  const handleGoBack = () => {
    setShowConfirmation(false);
    setConfirmationData(null);
    setShowErrorPage(false); // Reset error page state
    setErrorMessage(""); // Clear the error message
  };

  const handleRetry = () => {
    setShowErrorPage(false); // Hide the error page
    setErrorMessage(""); // Clear the error message
    // Additional retry logic can be added here
  };

  return (
    <div className="bg-custom-gradient-light min-h-[100vh]">
      <Header setModel={setModel} />
      {showErrorPage ? (
        <ErrorPage errorMessage={errorMessage} onRetry={handleRetry} /> // Render ErrorPage on error
      ) : showConfirmation ? (
        <ConfirmationPage data={confirmationData} onGoBack={handleGoBack} />
      ) : (
        <PDFRuleProcessor
          onGenerateSummary={handleGenerateSummary}
          model={model}
          setErrorMessage={setErrorMessage}
          setShowErrorPage={setShowErrorPage}
        />
      )}
    </div>
  );
}

export default App;

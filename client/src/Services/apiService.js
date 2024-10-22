import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL:
    "https://ai-workbench.flipnow.cloud/dev/legal-document-processing/api/getSummary",
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Function to send the summary request
export const generateSummary = async (formData) => {
  try {
    // const response = await apiClient.post("/process-document", formData);
    const response = await apiClient.post("/getSummary", formData);
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error generating summary."
    );
  }
};

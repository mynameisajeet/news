import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import App from "./App"; // Adjust the import as needed

// Get the root element where the React app will be rendered
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Render your App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { SettingsProvider } from "./context/SettingsContext";

import "./index.css";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>


    <Toaster
  position="top-right"
  reverseOrder={false}
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "12px",
      background: "#ffffff",
      color: "#222",
      fontSize: "15px",
    },
    success: {
      iconTheme: {
        primary: "#0f4c3a",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#d32f2f",
        secondary: "#fff",
      },
    },
  }}
/>
  </StrictMode>
);
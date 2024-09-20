import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { IssuerProvider } from "./context/IssuerContext";
import { EmitterProvider } from "./context/EmitterContext";
import { VerifierProvider } from "./context/VerifierContext";

createRoot(document.getElementById("root")).render(
  <EmitterProvider>
    <IssuerProvider>
      <VerifierProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </VerifierProvider>
    </IssuerProvider>
  </EmitterProvider>
);

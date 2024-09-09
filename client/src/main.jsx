import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { IssuerProvider } from "./context/IssuerContext";
import { EmitterProvider } from "./context/EmitterContext";

createRoot(document.getElementById("root")).render(
  <EmitterProvider>
    <IssuerProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </IssuerProvider>
  </EmitterProvider>
);

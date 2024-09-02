import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { IssuerProvider } from './context/IssuerContext';

createRoot(document.getElementById("root")).render(
  <IssuerProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </IssuerProvider>
);

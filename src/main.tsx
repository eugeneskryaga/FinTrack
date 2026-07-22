import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App/App.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";

import "./index.css";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import { AuthProvider } from "./app/providers/AuthProvider.tsx";

import "./index.css";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

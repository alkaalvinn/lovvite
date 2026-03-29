import "./app.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Editor } from "./pages/Editor";
import { TemplateGallery } from "./pages/TemplateGallery";
import { Viewer } from "./pages/Viewer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/new" element={<TemplateGallery />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/i/:token" element={<Viewer />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

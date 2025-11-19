// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CandidateProvider } from "./context/CandidateContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ReferralForm from "./pages/ReferralForm";

export default function App() {
  return (
    <CandidateProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/refer" element={<ReferralForm />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CandidateProvider>
  );
}

import React from "react";
import Checklist from "./components/CheckList.jsx";
import Dua from "./components/Dua.jsx";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login.jsx";
import logo from "./assets/logo.png";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <header className="bg-white/60 backdrop-blur-sm border-b">
        <div className="app-container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-semibold px-2 text-lg text-slate-800 leading-tight tracking-tight">
              Ramadan Checklist
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm text-slate-700 hover:text-teal-600">
              Home
            </Link>
            <Link
              to="/checklist"
              className="text-sm text-slate-700 hover:text-teal-600"
            >
              Checklist
            </Link>
            <Link
              to="/login"
              className="text-sm text-slate-700 hover:text-teal-600"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="app-container flex-1 py-8">
        <Routes>
          <Route path="/" element={<Dua />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <footer className="text-center py-6 text-sm text-slate-500">
        {new Date().getFullYear()} Ramzan Checklist — Made with ❤️
      </footer>
    </div>
  );
}

export default App;

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Portfolio from "./Portfolio";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="Portfolio" />} />
        <Route path="/Portfolio/*" element={<Portfolio />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

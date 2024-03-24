import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Prescription from "./pages/Prescription";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import LoginRegister from "./pages/LoginRegister";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/my-account" element={<LoginRegister />} />
          <Route path="/" element={<Home />} />
          <Route path="/prescription" element={<Prescription />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

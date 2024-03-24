import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Prescription from "./pages/Prescription";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import LoginRegister from "./pages/LoginRegister";
import Shop from "./pages/Shop";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/my-account" element={<LoginRegister />} />
          <Route path="/" element={<Home />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Prescription from "./pages/Prescription";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import LoginRegister from "./pages/LoginRegister";
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";
import DisplayStaff from "./pages/DisplayStaff";
import AddStaff from "./pages/AddStaff";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/my-account" element={<LoginRegister />} />
          <Route path="/" element={<Home />} />
          <Route path="/prescription" element={<Prescription />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/display-staff" element={<DisplayStaff />} />
          <Route path="/dashboard/add-staff" element={<AddStaff />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

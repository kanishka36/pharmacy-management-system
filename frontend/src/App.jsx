import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Prescription from "./pages/Prescription";
import LoginRegister from "./pages/LoginRegister";
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";
import StockManage from "./pages/StockManage";
import StaffManage from "./pages/StaffManage";

const App = () => {
  const shouldHideNavFooter = [
    "/dashboard",
    "/dashboard/staff",
    "/dashboard/stock",
  ].includes(window.location.pathname);

  return (
    <BrowserRouter>
      {shouldHideNavFooter ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/staff" element={<StaffManage />} />
          <Route path="/dashboard/stock" element={<StockManage />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/my-account" element={<LoginRegister />} />
            <Route path="/" element={<Home />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/staff" element={<StaffManage />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;

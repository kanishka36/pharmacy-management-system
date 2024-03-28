import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Prescription from "./pages/Prescription";
import LoginRegister from "./pages/LoginRegister";
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";
import DisplayStaff from "./pages/DisplayStaff";
import AddStaff from "./pages/AddStaff";
import StockManage from "./pages/StockManage";

const App = () => {
  const shouldHideNavFooter = [
    "/dashboard",
    "/dashboard/display-staff",
    "/dashboard/add-staff",
    "/dashboard/stock",
  ].includes(window.location.pathname);

  return (
    <BrowserRouter>
      {shouldHideNavFooter ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/display-staff" element={<DisplayStaff />} />
          <Route path="/dashboard/add-staff" element={<AddStaff />} />
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
            <Route path="/dashboard/display-staff" element={<DisplayStaff />} />
            <Route path="/dashboard/add-staff" element={<AddStaff />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;

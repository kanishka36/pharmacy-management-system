import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Prescription from "./pages/Prescription";
import LoginRegister from "./pages/LoginRegister";
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";
import StockManage from "./pages/StockManage";
import StaffManage from "./pages/StaffManage";
import WebsiteLayout from "./components/WebsiteLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout component={Home} />} />
        <Route
          path="/my-account"
          element={<WebsiteLayout component={LoginRegister} />}
        />
        <Route
          path="/prescription"
          element={<WebsiteLayout component={Prescription} />}
        />
        <Route path="/shop" element={<WebsiteLayout component={Shop} />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/staff" element={<StaffManage />} />
        <Route path="/dashboard/stock" element={<StockManage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/website/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import CustomerAccount from "./pages/website/CustomerAccount";
import Shop from "./pages/website/Shop";
import LoginRegister from "./pages/website/LoginRegister";
import Prescription from "./pages/website/Prescription";
import StockManage from "./pages/dashboard/StockManage";
import StaffManage from "./pages/dashboard/StaffManage";
import WebsiteLayout from "./components/WebsiteLayout";
import OnlyStaffPrivateRoute from "./components/OnlyStaffPrivateRoute";
import Cart from "./pages/website/Cart";

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
        <Route
          path="/profile"
          element={<WebsiteLayout component={CustomerAccount} />}
        />
        <Route path="/cart" element={<WebsiteLayout component={Cart} />} />
        <Route element={<OnlyStaffPrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/staff" element={<StaffManage />} />
          <Route path="/dashboard/stock" element={<StockManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

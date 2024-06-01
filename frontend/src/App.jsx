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
import PrescriptionHandling from "./pages/dashboard/PrescriptionHandling";
import WebsiteLayout from "./components/WebsiteLayout";
import OnlyStaffPrivateRoute from "./components/OnlyStaffPrivateRoute";
import Cart from "./pages/website/Cart";
import PrescriptionView from "./components/dashboardComponents/PrescriptionView";
import PayHerePayment from "./components/PayHerePayment";
import Return from "./components/Return";
import Cancel from "./components/Cancel";
import Notify from "./components/Notify";

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
        <Route path="/payhere" element={<WebsiteLayout component={PayHerePayment}/>} /> {/* Add PayHere payment route */}
        <Route path="/return" element={<WebsiteLayout component={Return} />} /> {/* Add PayHere return route */}
        <Route path="/cancel" element={<WebsiteLayout component={Cancel} />} /> {/* Add PayHere cancel route */}
        <Route path="/notify" element={<WebsiteLayout component={Notify} />} /> {/* Add PayHere notify route */}
        <Route element={<OnlyStaffPrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/staff" element={<StaffManage />} />
          <Route path="/dashboard/stock" element={<StockManage />} />
          <Route path="/dashboard/prescription" element={<PrescriptionHandling />} />
          <Route path="/dashboard/prescription/:id" element={<PrescriptionView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

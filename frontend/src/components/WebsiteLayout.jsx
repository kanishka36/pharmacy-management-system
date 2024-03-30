import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const WebsiteLayout = ({ component: Component }) => {
  return (
    <>
      <Navbar />
      <Component />
      <Footer />
    </>
  );
};

export default WebsiteLayout;

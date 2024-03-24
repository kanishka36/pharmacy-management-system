import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-blue-300 p-10">
        <div className="grid grid-cols-4">
          <div className="ml-3">
            <img alt="logo" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et harum
              ad corrupti facere rerum optio quam cumque neque ut repellat.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              rerum magni aliquam?
            </p>
            <div className="flex flex-col max-w-40">
              <div className="flex">
                <img alt="social-icon" />
                <img alt="social-icon" />
                <img alt="social-icon" />
                <img alt="social-icon" />
              </div>
            </div>
          </div>
          <div className="ml-3">
            <h2>Department</h2>
            <p>Mother & Baby Care</p>
            <p>Beauty Care</p>
            <p>Diabetic Care</p>
            <p>Ayurveda</p>
          </div>
          <div className="ml-3">
            <h2>Help</h2>
            <p>My account</p>
            <p>Contact Us</p>
          </div>
          <div className="mx-3">
            <h2>Contact Store</h2>
            <div className="flex">
              <img alt="" />
              <p>Address</p>
            </div>
            <div className="flex">
              <img alt="" />
              <p>Phone NUmber</p>
            </div>
            <div className="flex">
              <img alt="" />
              <p>Phone NUmber</p>
            </div>
            <div className="flex">
              <img alt="" />
              <p>email</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

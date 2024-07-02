import React from "react";
import Logo from "../assets/images/logo.jpg";
import fb from "../assets/images/fb.png";
import inst from "../assets/images/in.png";
import tw from "../assets/images/tw.png";
import wh from "../assets/images/wh.png";
import phone from "../assets/images/phone.png"
import email from "../assets/images/email.png"
import location from "../assets/images/location.png"

const Footer = () => {
  return (
    <div className="bg-indigo-300 p-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-poppins">
        {/* Logo and About Section */}
        <div className="ml-3">
          <img
            src={Logo}
            alt="logo"
            className="max-w-60 mix-blend-multiply mb-4"
          />
          <p className="text-sm text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et harum ad
            corrupti facere rerum optio quam cumque neque ut repellat.
          </p>
          <p className="text-sm text-gray-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            rerum magni aliquam?
          </p>
          {/* Social Icons */}
          <div className="flex mt-4">
            <img src={fb} alt="social-icon" className="w-6 h-6 mr-2" />
            <img src={inst} alt="social-icon" className="w-6 h-6 mr-2" />
            <img src={tw} alt="social-icon" className="w-6 h-6 mr-2" />
            <img src={wh} alt="social-icon" className="w-6 h-6" />
          </div>
        </div>

        {/* Department Section */}
        <div className="ml-3">
          <h2 className="text-lg font-semibold text-indigo-600">Department</h2>
          <p className="text-sm text-gray-800">Mother & Baby Care</p>
          <p className="text-sm text-gray-800">Beauty Care</p>
          <p className="text-sm text-gray-800">Diabetic Care</p>
          <p className="text-sm text-gray-800">Ayurveda</p>
        </div>

        {/* Help Section */}
        <div className="ml-3">
          <h2 className="text-lg font-semibold text-indigo-600">Help</h2>
          <p className="text-sm text-gray-800">My Account</p>
          <p className="text-sm text-gray-800">Contact Us</p>
        </div>

        {/* Contact Store Section */}
        <div className="mx-3">
          <h2 className="text-lg font-semibold text-indigo-600">
            Contact Store
          </h2>
          {/* Address */}
          <div className="flex items-center mt-2">
            <img
              src={location}
              alt="address-icon"
              className="w-5 mr-2"
            />
            <p className="text-sm text-gray-800">
              123 Main Street, Colombo, Sri Lanka
            </p>
          </div>
          {/* Phone Numbers */}
          <div className="flex items-center mt-2">
            <img
              src={phone}
              alt="phone-icon"
              className="w-5 mr-2"
            />
            <p className="text-sm text-gray-800">+123 456 7890</p>
          </div>
          <div className="flex items-center mt-2">
            <img
              src={phone}
              alt="phone-icon"
              className="w-5 mr-2"
            />
            <p className="text-sm text-gray-800">+987 654 3210</p>
          </div>
          {/* Email */}
          <div className="flex items-center mt-2">
            <img
              src={email}
              alt="email-icon"
              className="w-5 mr-2"
            />
            <p className="text-sm text-gray-800">contact@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

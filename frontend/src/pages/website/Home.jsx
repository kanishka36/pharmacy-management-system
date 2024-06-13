import React from "react";
import { CategorySlider, HeroSlider } from "../../components/Slider";
import "swiper/css";
import ChatBotWrapper from "../../components/websiteComponents/ChatBotWrapper";


const Home = () => {
  
  return (
    <>
      <div className="full-width flex flex-col justify-center align-center">
        <HeroSlider />
      </div>
      <div className="container flex justify-center mx-auto text-center my-6 font-poppins">
        <div className="flex flex-col w-4/5 bg-indigo-400 p-6 rounded-lg text-white">
          <h2 className="text-5xl font-medium mb-3">WELCOME TO STORE</h2>
          <p className="text-lg">
            One-stop-shop for all your medicinal and grocery needs. Conveniently
            order high quality products directly acquired from authorized
            dealers and suppliers.
          </p>
        </div>
      </div>
      <div className="container mx-auto text-center font-poppins">
        <h3 className="text-3xl font-medium text-indigo-600 mb-3">Category</h3>
        <CategorySlider />
      </div>
      <ChatBotWrapper />
    </>
  );
};

export default Home;

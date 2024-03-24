import React from "react";
import { CategorySlider, HeroSlider } from "../components/Slider";
import "swiper/css";

const Home = () => {
  return (
    <>
      <div className="full-width flex flex-col justify-center align-center">
        <HeroSlider />
      </div>
      <div className="container flex justify-center mx-auto text-center my-3 font-poppins">
        <div className="flex flex-col w-4/5">
          <h2 className="text-3xl">WELCOME TO STORE</h2>
          <p className="text-lg">
            One-stop-shop for all your medicinal and grocery needs. Conveniently
            order high quality products directly acquired from authorized
            dealers and suppliers.
          </p>
        </div>
      </div>
      <div className="container mx-auto text-center font-poppins">
        <h3 className="text-2xl mb-3">Category</h3>
        <CategorySlider />
      </div>
    </>
  );
};

export default Home;

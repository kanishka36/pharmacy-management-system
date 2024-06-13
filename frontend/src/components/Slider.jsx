// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// import required modules
import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";

import slide1 from "../assets/images/slider1.jpg";
import slide2 from "../assets/images/slider2.jpg";
import slide3 from "../assets/images/slider3.jpg";
import { displayCategory } from "../api/stock";
import { useEffect, useState } from "react";

const HeroData = [slide1, slide2, slide3, slide1, slide2, slide3];

export const HeroSlider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        effect={"fade"}
        fadeEffect={{
          crossFade: true,
          duration: 1000,
        }}
        loop={true}
        modules={[Pagination, Autoplay, EffectFade]}
        className="mySwiper w-full"
      >
        {HeroData.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="text-slate-500 flex justify-center align-center bg-white"
          >
            <img src={slide} alt="" className="w-full" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const CategorySlider = () => {
  const [category, setCategory] = useState([])
  const fetchCategory = async () => {
    try {
      const response = await displayCategory();
      setCategory(response)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=> {
    fetchCategory();
  },[])

  return (
    <div>
      <Swiper
        slidesPerView={7}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper pb-20 mx-10"
      >
        {category.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="text-slate-500 fle flex-col justify-center align-center bg-white border-solid border border-indigo-600 p-8 uppercase h-32"
          >
            {/* {<img src={slide} alt="icon" />} */}
            {slide.category}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

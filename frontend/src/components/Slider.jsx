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

const HeroData = [slide1, slide2, slide1, slide2, slide1, slide2];
const CategoryData = [
  "KIDS",
  "PERSONAL CARE",
  "DIABETIC CARE",
  "SURGICAL ITEMS",
  "AYURVEDA",
  "VITAMINS & NUTRITIONS",
  "ADULT CARE",
  "MOTHER & BABY CARE",
];

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
        navigation={true}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        className="mySwiper"
      >
        {HeroData.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="text-slate-500 flex justify-center align-center bg-white"
          >
            <img src={slide} alt="" className="w-4/5" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export const CategorySlider = () => {
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
        {CategoryData.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="text-slate-500 fle flex-col justify-center align-center bg-white border-solid border-2 border-sky-500 p-8"
          >
            {<img src={slide} alt="icon" />}
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

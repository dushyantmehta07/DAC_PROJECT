import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";

const HomeCarousel = () => {
  const navigate = useNavigate();

  const items = homeCarouselData.map((item, index) => (
    <img
      key={index}
      src={item.image}
      alt={`banner-${index}`}
      className="w-full h-[420px] md:h-[480px] lg:h-[520px] object-cover cursor-pointer rounded-md"
      onClick={() => navigate(item.path)}
      onDragStart={(e) => e.preventDefault()}
      loading="lazy"
    />
  ));

  return (
    <AliceCarousel
      items={items}
      mouseTracking
      autoPlay
      infinite
      autoPlayInterval={2000}
      animationDuration={500}
      disableButtonsControls
      disableDotsControls={false}
    />
  );
};

export default HomeCarousel;

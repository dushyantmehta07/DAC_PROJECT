import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";

import { sareePage1 } from "../Data/Saree/page1";
import { dressPage1 } from "../Data/dress/page1";
import { nightsuitsPage1 } from "../Data/NightSuits/nightsuits";
import { kurtaPage1 } from "../Data/Kurta/kurta";
import { mensShoesPage1 } from "../Data/shoes";
import { mens_kurta } from "../Data/Men/men_kurta";
import { lehenga_page1 } from "../Data/Women/Lehengas";

const Homepage = () => {
  return (
    <div>
      {/* HOME CAROUSEL */}
      
        <HomeCarousel />
     

      {/* PRODUCT SECTIONS */}
      <div className="space-y-10 py-20">
        <HomeProductSection data={mens_kurta} section={"Men's Kurta"} />
        <HomeProductSection data={mensShoesPage1} section={"Men's Shoes"} />
        <HomeProductSection data={lehenga_page1} section={"Lehengas"} />
        <HomeProductSection data={sareePage1} section={"Saree"} />
        <HomeProductSection data={dressPage1} section={"Dress"} />
        <HomeProductSection data={nightsuitsPage1} section={"Women's NightSuits"} />
        <HomeProductSection data={kurtaPage1} section={"Women's Kurtas"} />
      </div>
    </div>
  );
};

export default Homepage;

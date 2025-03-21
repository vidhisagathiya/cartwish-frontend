import React from "react";
import iphone from "../../assets/iphone-14-pro.webp";
import mac from "../../assets/mac-system-cut.jfif";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy iphone 14 pro"
        subtitle="Experience the poweer of latest iphone 14 with our most pro camera ever"
        link="/product/67c3ac457c852ec7845e7b72"
        image={iphone}
      />
      <FeaturedProducts />
      <HeroSection
        title="Build the ultimate setup"
        subtitle="You can add Studio Display and colour-matched Magic accessories to your bag after configure your Mac mini."
        link="/product/67c3ac457c852ec7845e7b7a"
        image={mac}
      />
      {/*hero section*/}
    </div>
  );
};

export default HomePage;

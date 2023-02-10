// Library Imports
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Custom Component Imports
import { Button } from "../componentsindex";
import images from "../../img";

// Style Imports
import Style from "./HeroSection.module.css";

// Data Related Imports
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  const router = useRouter();

  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>{titleData} 🖼️</h1>
          <p>
            Explore The Hottest NFTs Across the World of Digital and Own Unique
            Digital Assets with Our NFT Marketplace.
          </p>
          <Button
            btnName="Get Started Now!"
            handleClick={() => router.push("/searchPage")}
          />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

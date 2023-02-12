import React from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Brand.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
import Link from "next/link";

const Brand = () => {
  const router = useRouter();
  return (
    <div className={Style.Brand}>
      <div className={Style.Brand_box}>
        <div className={Style.Brand_box_left}>
          <Link href="/">
            <Image src={images.logo} alt="navbar logo" height={60} width={60} />
          </Link>
          <h1>Earn, Buy, Sell, Trade, Exchange.</h1>
          <p>Discover the future of collecting with our NFT marketplace.</p>

          <div className={Style.Brand_box_left_btn}>
            <Button
              btnName="Create"
              handleClick={() => router.push("/uploadNFT")}
            />
            <Button
              btnName="Discover"
              handleClick={() => router.push("/searchPage")}
            />
          </div>
        </div>
        <div className={Style.Brand_box_right}>
          <Image src={images.earn} alt="brand logo" width={800} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Brand;

import React, { useState } from "react";

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTDetailsPage.module.css";

const NFTDetailsPage = ({ nft }) => {
  const [imgDimensions, setImgDimensions] = useState({
    width: "...",
    height: "...",
  });
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft} setImgDimensions={setImgDimensions} />
        <NFTDescription nft={nft} imgDimensions={imgDimensions} />
      </div>
    </div>
  );
};

export default NFTDetailsPage;

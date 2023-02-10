import React from "react";
import Image from "next/image";

//INTERNALIMPORT
import Style from "./Video.module.css";
import { Title } from "../componentsindex";

const Video = () => {
  return (
    <div className={Style.Video}>
      <Title
        heading="NFT World"
        paragraph="Delve and Dive Deeply into the world of NFTs."
      />
      <div className={Style.Video_box}>
        <div className={Style.Video_box_frame}>
          <div className={Style.Video_box_frame_left}>
            <video
              autoPlay
              loop
              muted
              src={"./nftvideo.mp4"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className={Style.Video_box_frame_left_img}
            />
          </div>
          <div className={Style.Video_box_frame_right}>Hey</div>
        </div>
      </div>
    </div>
  );
};

export default Video;

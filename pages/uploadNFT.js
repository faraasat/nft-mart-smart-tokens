// Library Imports
import React, { useContext, useState } from "react";
import PropagateLoader from "react-spinners/PacmanLoader";

// Custom Components and Functions Imports
import { UploadNFT } from "../UploadNFT/uploadNFTIndex";

// Data Related Imports
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

// Style Import
import Style from "../styles/upload-nft.module.css";

const uploadNFT = () => {
  const [publishLoading, setPublishLoading] = useState(false);
  const { uploadToIPFS, createNFT } = useContext(NFTMarketplaceContext);

  return (
    <>
      {publishLoading && (
        <div className={Style.uploadNFT_loader_align}>
          <PropagateLoader loading={publishLoading} size={70} color="#fff" />
          <h2>Please Wait. We are minting your NFT!</h2>
        </div>
      )}
      <div className={Style.uploadNFT}>
        <div className={Style.uploadNFT_box}>
          <div className={Style.uploadNFT_box_heading}>
            <h1>Create New NFT</h1>
            <p>
              Customize your display name, create a unique profile URL, and
              manage your personal settings to your preference.
            </p>
          </div>
          <div className={Style.uploadNFT_box_title}>
            {/* <h2>Image, Video, Audio, or 3D Model</h2> */}
            <h2>Upload Your Image</h2>
            {/* <p>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 10 MB
          </p> */}
            <p>
              File types supported: JPG, PNG, SVG, GIF, WEBM. Max size: 10 MB
            </p>
          </div>
          <div className={Style.uploadNFT_box_form}>
            <UploadNFT
              uploadToIPFS={uploadToIPFS}
              createNFT={createNFT}
              setPublishLoading={setPublishLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default uploadNFT;

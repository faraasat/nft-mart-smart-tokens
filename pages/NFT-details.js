import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";
import Head from "next/head";

import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import Style from "../styles/upload-nft.module.css";

const NFTDetails = () => {
  const { buyNFTLoading } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>NFT Description</title>
      </Head>
      {buyNFTLoading && (
        <div className={Style.uploadNFT_loader_align}>
          <PacmanLoader loading={buyNFTLoading} size={70} color="#fff" />
          <h2>Please Wait for Buy Operation to Complete!</h2>
        </div>
      )}
      <div>
        <NFTDetailsPage nft={nft} />
        {/* <Category /> */}
        <Brand />
      </div>
    </>
  );
};

export default NFTDetails;

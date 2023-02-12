import React, { useEffect, useState, useContext } from "react";

import Style from "../styles/searchPage.module.css";
import { Slider, Brand, Loader, NFTCard } from "../components/componentsindex";
import { SearchBar } from "../SearchPage/searchBarIndex";
import { Filter } from "../components/componentsindex";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import Head from "next/head";

const searchPage = () => {
  const { fetchNFTs, setError } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState("");
  const [nftsCopy, setNftsCopy] = useState("");
  const [nftLoading, setNftLoading] = useState(false);

  useEffect(() => {
    setNftLoading(true);
    try {
      fetchNFTs().then((items) => {
        setNfts(items?.reverse());
        setNftsCopy(items);
        if (!items) {
          setNfts([]);
          setNftsCopy([]);
        }
      });
      setNftLoading(false);
    } catch (error) {
      setNftLoading(false);
      setError("Please reload the browser", error);
    }
    setNftLoading(false);
  }, []);

  const onHandleSearch = (value) => {
    console.log(value);
    if (nfts !== "") {
      if (value === "") {
        setNfts(nftsCopy);
      } else {
        const filteredNFTS = nftsCopy.filter(({ name }) =>
          name.toLowerCase().includes(value.toLowerCase())
        );
        setNfts(filteredNFTS);
      }
      // if (filteredNFTS.length === 0) {
      //   setNfts(nftsCopy);
      // } else {
      //   setNfts(filteredNFTS);
      // }
    }
  };

  const onClearSearch = () => {
    setNfts(nftsCopy);
  };

  // const collectionArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];
  return (
    <>
      <Head>
        <title>Smart Token - Search NFTs</title>
      </Head>
      <div className={Style.searchPage}>
        <Banner bannerImage={images.creatorbackground2} />
        <SearchBar
          onHandleSearch={onHandleSearch}
          onClearSearch={onClearSearch}
        />
        {/* <Filter /> */}
        {nftLoading || nfts === "" ? (
          <Loader />
        ) : !nftLoading && nfts && nfts.length == 0 ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              height: 200,
            }}
          >
            <div
              style={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
                fontSize: 30,
              }}
            >
              🧐 OOPs...?!? No NFT Found!
            </div>
          </div>
        ) : (
          <NFTCard NFTData={nfts} />
        )}
        {/* <Slider /> */}
        <Brand />
      </div>
    </>
  );
};

export default searchPage;

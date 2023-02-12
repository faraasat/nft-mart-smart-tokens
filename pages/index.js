// Library Imports
import React, { useState, useEffect, useContext } from "react";

// Custom Component Imports
import {
  HeroSection,
  Service,
  BigNFTSilder,
  Subscribe,
  Title,
  NFTCard,
  Brand,
  Video,
  Loader,
} from "../components/componentsindex";
import { getTopCreators } from "../TopCreators/TopCreators";

// Data Related Imports
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

// Styling Imports
import Style from "../styles/index.module.css";

const Home = () => {
  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftLoading, setNftLoading] = useState(false);

  useEffect(() => {
    try {
      setNftLoading(true);
      fetchNFTs().then((items) => {
        if (items) {
          setNfts(items?.reverse());
        }
      });
      setNftLoading(false);
    } catch (err) {
      setNftLoading(false);
    }
  }, []);

  // const creators = getTopCreators(nfts);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      {/* <BigNFTSilder /> */}
      {/* <Title
        heading="Audio Collection"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      <AudioLive />
      <Title
        heading="Creators Overview"
        paragraph="Explore the owners and creators of your favourite NFTs."
      />
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )} */}
      {/* <Slider />
      <Collection /> */}
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      {/* <Filter /> */}
      {nftLoading && nfts.length == 0 ? (
        <Loader />
      ) : !nftLoading && nfts.length == 0 ? (
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
      {/* <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      />
      <Category /> */}
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;

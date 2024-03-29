import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Brand, Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";
import Head from "next/head";

const author = () => {
  // const followerArray = [
  //   {
  //     background: images.creatorbackground1,
  //     user: images.user1,
  //     seller: "7d64gf748849j47fy488444",
  //   },
  //   {
  //     background: images.creatorbackground2,
  //     user: images.user2,
  //     seller: "7d64gf748849j47fy488444",
  //   },
  //   {
  //     background: images.creatorbackground3,
  //     user: images.user3,
  //     seller: "7d64gf748849j47fy488444",
  //   },
  //   {
  //     background: images.creatorbackground4,
  //     user: images.user4,
  //     seller: "7d64gf748849j47fy488444",
  //   },
  //   {
  //     background: images.creatorbackground5,
  //     user: images.user5,
  //     seller: "7d64gf748849j47fy488444",
  //   },
  //   {
  //     background: images.creatorbackground6,
  //     user: images.user6,
  //     seller: "7d64gf748849j47fy488444",
  //   },
  // ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  // const [like, setLike] = useState(false);
  // const [follower, setFollower] = useState(false);
  // const [following, setFollowing] = useState(false);

  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(
    NFTMarketplaceContext
  );

  const [nfts, setNfts] = useState("");
  // const [myNFTs, setMyNFTs] = useState("");
  const [nftListedLoading, setNftListedLoading] = useState(false);
  // const [nftOwnLoading, setNftOwnLoading] = useState(false);

  useEffect(() => {
    setNftListedLoading(true);
    try {
      if (currentAccount) {
        fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items) => {
          if (items) setNfts(items);
          else setNfts([]);
        });
      }
      setNftListedLoading(false);
    } catch (err) {
      console.log(err);
      setNftListedLoading(false);
    }
    setNftListedLoading(false);
  }, [currentAccount, collectiables]);

  // useEffect(() => {
  //   setNftOwnLoading(true);
  //   try {
  //     if (currentAccount) {
  //       fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items) => {
  //         if (items) setMyNFTs(items);
  //         else setMyNFTs([]);
  //       });
  //     }
  //     setNftOwnLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setNftOwnLoading(false);
  //   }
  //   setNftOwnLoading(false);
  // }, [currentAccount, created]);

  // console.log(nfts, myNFTs);

  return (
    <>
      <Head>
        <title>Smart Token - Author Profile</title>
      </Head>
      <div className={Style.author}>
        <Banner bannerImage={images.creatorbackground2} />
        {/* <AuthorProfileCard currentAccount={currentAccount} /> */}
        <AuthorTaps
          setCollectiables={setCollectiables}
          setCreated={setCreated}
          // setLike={setLike}
          // setFollower={setFollower}
          // setFollowing={setFollowing}
        />
        <AuthorNFTCardBox
          // collectiables={collectiables}
          created={created}
          // like={like}
          // follower={follower}
          // following={following}
          nfts={nfts}
          // myNFTS={myNFTs}
          // nftOwnLoading={nftOwnLoading}
          nftListedLoading={nftListedLoading}
          currentAccount={currentAccount}
        />
        {/* <Title
        heading="Popular Creators"
        paragraph="Click on music icon and enjoy NTF music or audio
"
      />
      <div className={Style.author_box}>
        {followerArray.map((el, i) => (
          <FollowerTabCard i={i} el={el} />
        ))}
      </div> */}

        <Brand />
      </div>
    </>
  );
};

export default author;

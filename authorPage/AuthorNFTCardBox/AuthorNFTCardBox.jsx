import React, { useState } from "react";

import Style from "./AuthorNFTCardBox.module.css";
// import images from "../../img";
import { NFTCardTwo } from "../../collectionPage/collectionIndex";
import { Loader } from "../../components/componentsindex";
// import FollowerTabCard from "../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
// import { Loader } from "../../components/componentsindex";

const AuthorNFTCardBox = ({
  collectiables,
  created,
  // like,
  // follower,
  // following,
  nfts,
  myNFTS,
  nftOwnLoading,
  nftListedLoading,
  currentAccount,
}) => {
  // const collectiablesArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];

  // const createdArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  // ];

  // const likeArray = [
  //   images.nft_image_1,
  //   images.nft_image_2,
  //   images.nft_image_3,
  //   images.nft_image_1,
  //   images.nft_image_2,
  // ];

  // const followerArray = [
  //   {
  //     background: images.creatorbackground1,
  //     user: images.user1,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  //   {
  //     background: images.creatorbackground2,
  //     user: images.user2,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  //   {
  //     background: images.creatorbackground3,
  //     user: images.user3,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  //   {
  //     background: images.creatorbackground4,
  //     user: images.user4,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  //   {
  //     background: images.creatorbackground5,
  //     user: images.user5,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  //   {
  //     background: images.creatorbackground6,
  //     user: images.user6,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  // ];

  // const followingArray = [
  //   {
  //     background: images.creatorbackground3,
  //     user: images.user3,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  //   {
  //     background: images.creatorbackground4,
  //     user: images.user4,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  //   {
  //     background: images.creatorbackground5,
  //     user: images.user5,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  //   {
  //     background: images.creatorbackground6,
  //     user: images.user6,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  //   {
  //     background: images.creatorbackground1,
  //     user: images.user1,
  //     seller: "d84ff74hf99999f9974hf774f99f",
  //   },
  // ];

  return (
    <div className={Style.AuthorNFTCardBox}>
      {collectiables && (
        <>
          {!currentAccount ||
          (currentAccount && currentAccount.length === 0) ? (
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
                ❗ Please Connect Your Wallet!
              </div>
            </div>
          ) : nftListedLoading ? (
            <Loader />
          ) : !nftListedLoading && (!nfts || (nfts && nfts.length === 0)) ? (
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
            <NFTCardTwo NFTData={nfts} />
          )}
        </>
      )}
      {created && (
        <>
          {!currentAccount ||
          (currentAccount && currentAccount.length === 0) ? (
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
                ❗ Please Connect Your Wallet!
              </div>
            </div>
          ) : nftOwnLoading ? (
            <Loader />
          ) : !nftOwnLoading && (!myNFTS || (myNFTS && myNFTS.length === 0)) ? (
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
            <NFTCardTwo NFTData={myNFTS} />
          )}
        </>
      )}
      {/* {like && <NFTCardTwo NFTData={nfts} />}
      {follower && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followerArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} />
          ))}
        </div>
      )}
      {following && (
        <div className={Style.AuthorNFTCardBox_box}>
          {followingArray.map((el, i) => (
            <FollowerTabCard i={i} el={el} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default AuthorNFTCardBox;

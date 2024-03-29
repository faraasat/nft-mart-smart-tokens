import React, { useContext } from "react";
import Link from "next/link";

import Style from "./Discover.module.css";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Discover = ({ setDiscover }) => {
  const { currentAccount } = useContext(NFTMarketplaceContext);

  const discover = [
    // {
    //   name: "Collection",
    //   link: "collection",
    // },
    {
      name: "Search",
      link: "searchPage",
    },
    {
      name: "Author Profile",
      link: "author",
    },
    // {
    //   name: "NFT Details",
    //   link: "NFT-details",
    // },
    // {
    //   name: "Account Setting",
    //   link: "account",
    // },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    // {
    //   name: "Connect Wallet",
    //   link: "connectWallet",
    // },
    // {
    //   name: "Blog",
    //   link: "blog",
    // },
  ];
  return (
    <div>
      {discover.map((el, i) => {
        if (
          el.name === "Upload NFT" &&
          currentAccount &&
          currentAccount.length > 0
        ) {
          return (
            <div
              key={i + 1}
              className={Style.discover}
              onClick={() => setDiscover(false)}
            >
              <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
            </div>
          );
        } else if (el.name !== "Upload NFT") {
          return (
            <div
              key={i + 1}
              className={Style.discover}
              onClick={() => setDiscover(false)}
            >
              <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Discover;

import Head from "next/head";

import { NavBar, Footer } from "../components/componentsindex";
import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Smart Token</title>
      <meta charSet="UTF-8" />
      <meta
        name="description"
        content="Here you can create smart tokens that can be lended and borrowed, transferred, bidded and minted"
      />
      <meta
        name="keywords"
        content="metaverse, token, marketplace, bid, mint, burn, tokens, smart, smart tokens, erc20, erc721, erc1155, fungible, non fungible, chain, blockchain, web3"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <NFTMarketplaceProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </NFTMarketplaceProvider>
  </>
);

export default MyApp;

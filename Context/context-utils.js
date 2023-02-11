// Library Imports
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";

// Custom Functions Import
import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  transferFundsAddress,
  transferFundsABI,
} from "./constants";

// project id and secret key for the IPFS API
export const projectId = "2LRzojdW6k7pHCaQPH5C6oN2cOl";
export const projectSecretKey = "d555b8395fb6630a48ad8cbdc5019532";
export const auth = `Basic ${Buffer.from(
  `${projectId}:${projectSecretKey}`
).toString("base64")}`;

// project url for IPFS
export const subdomain = "https://nftplace.infura-ipfs.io";

// connection object for the IPFS client
export const client = ipfsHttpClient({
  host: "infura-ipfs.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// to fetch NFTMarketplace Contract
export const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

export const fetchTransferFundsContract = (signerOrProvider) =>
  new ethers.Contract(transferFundsAddress, transferFundsABI, signerOrProvider);

// to connect to NFTMarketplace Contract
export const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal({
      network: "maticmum",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    // const provider = new ethers.providers.JsonRpcProvider("");
    // const contract = fetchContract(provider);
    console.log(
      provider,
      contract,
      await provider.listAccounts(),
      await provider.getNetwork()
    );
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

// const abc = async () => {
//   if ((await ethereum.request({ method: "eth_accounts" })).length > 0) {
//     const cont = await connectingWithSmartContract();
//     console.log(cont);
//     console.log(await cont.fetchMarketItems());
//   }
// };

// abc();

export const requestAccounts = async () => {
  return await window.ethereum.request({
    method: "eth_requestAccounts",
  });
};

export const getAccounts = async () => {
  return await window.ethereum.request({
    method: "eth_accounts",
  });
};

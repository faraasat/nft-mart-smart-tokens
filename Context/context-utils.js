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
export const projectId = "2Lh50dMU8ZZ6zOlsS0ReRxT5eaZ";
export const projectSecretKey = "daf21bdb3a7df8d3b91ebedacaf21a82";
export const auth = `Basic ${Buffer.from(
  `${projectId}:${projectSecretKey}`
).toString("base64")}`;

// project url for IPFS
export const subdomain = "https://nftmart.infura-ipfs.io";

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
    // const web3Modal = new Web3Modal({
    //   network: "maticmum",
    //   cacheProvider: true,
    // });
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    // const contract = fetchContract(signer);
    // const provider = new ethers.providers.JsonRpcProvider("");
    // const contract = fetchContract(provider);
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-mumbai.g.alchemy.com/v2/Yq1F4URSZIlAfsBKQiv_PAD5P3Fn6N6z"
    );
    const contract = fetchContract(provider);
    // const signedContract = contract.connect(provider.getSigner());
    // return signedContract;
    return contract;
  } catch (error) {
    console.log("connectingWithSmartContract=> ", error);
  }
};

export const connectingWithSmartContractUsingWeb3Modal = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("connectingWithSmartContract=> ", error);
  }
};

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

// Library Imports
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";

// Custom Functions Import
import {
  client,
  connectingWithSmartContract,
  connectingWithSmartContractUsingWeb3Modal,
  fetchContract,
  fetchTransferFundsContract,
  getAccounts,
  requestAccounts,
  subdomain,
} from "./context-utils";

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Explore, Gather, and Sell NFTs";

  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [buyNFTLoading, SetBuyNFTLoading] = useState(false);
  const router = useRouter();

  const walletRequests = async (func) => {
    try {
      return func();
    } catch (error) {
      if (error.code === 4001) {
        setError(
          "User Reject the request to connect to the wallet. Please allow your wallet to be accessed!"
        );
        setOpenError(true);
        return [];
      }
      return "continue";
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum || (window.ethereum && !window.ethereum.isMetaMask))
        return setOpenError(true), setError("Install MetaMask");

      const accounts = await walletRequests(async () => {
        return await requestAccounts();
      });
      if (accounts !== "continue") {
        if (
          typeof accounts !== "undefined" &&
          accounts &&
          accounts.length > 0
        ) {
          return await checkIfWalletConnected();
        } else {
          setCurrentAccount([]);
          setError("No Account Found. Please give app access of the account!");
          setOpenError(true);
        }
      }
    } catch (error) {
      if (error.code === 4001) {
        setError(
          "User Reject the request to connect to the wallet. Please allow your wallet to be accessed!"
        );
        setOpenError(true);
      } else if (error.code !== -32002) {
        setError("Something wrong while connecting to wallet!");
        setOpenError(true);
      }
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum || (window.ethereum && !window.ethereum.isMetaMask))
        return setOpenError(true), setError("Install MetaMask");

      const accounts = await walletRequests(async () => {
        return await getAccounts();
      });

      if (accounts !== "continue") {
        if (
          typeof accounts !== "undefined" &&
          accounts &&
          accounts.length > 0
        ) {
          setCurrentAccount(accounts[0]);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const getBalance = await provider.getBalance(accounts[0]);
          const bal = ethers.utils.formatEther(getBalance);
          setAccountBalance(bal);
          return true;
        } else {
          setCurrentAccount([]);
          return false;
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    const checkWallet = async () => {
      let isConnected = await checkIfWalletConnected();
      if (typeof isConnected === "boolean") {
        isConnected = await connectWallet();
        if (typeof isConnected === "boolean" && isConnected) {
          await connectingWithSmartContract();
        }
      }
    };
    try {
      checkWallet();
    } catch (error) {
      if (error.code === 4001) {
        setError(
          "User Reject the request to connect to the wallet. Please allow your wallet to be accessed!"
        );
        setOpenError(true);
      }
    }
  }, []);

  const uploadToIPFS = async (file) => {
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("uploadToIPFS", error);
      setError("Error Uploading to IPFS");
      setOpenError(true);
    }
  };

  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return setError("Data Is Missing"), setOpenError(true);
    const data = JSON.stringify({ name, description, image });
    try {
      const added = await client.add(data);
      const url = `${subdomain}/ipfs/${added.path}`;
      await createSale(url, price);
      router.push("/searchPage");
    } catch (error) {
      console.log("createNFTLogs", error);
      setError("Error while creating NFT");
      setOpenError(true);
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContractUsingWeb3Modal();
      const listingPrice = await contract.getListingPrice();
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice.toString(),
          })
        : await contract.resellToken(id, price, {
            value: listingPrice.toString(),
          });
      await transaction.wait();
      console.log("createSaleLogs=>", transaction);
    } catch (error) {
      console.log("createSaleErrors=>", error);
      setError("error while creating sale");
      setOpenError(true);
    }
  };

  const fetchNFTs = async () => {
    try {
      // if (currentAccount
      // const web3Modal = new Web3Modal();
      // const connection = await web3Modal.connect();
      // const provider = new ethers.providers.Web3Provider(connection);) {

      const contract = await connectingWithSmartContract();
      const data = await contract.fetchMarketItems();
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI, {});
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );
            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );
      console.log("FetchNFTS => ", items);
      return items;
      // }
    } catch (error) {
      // setError("Error while fetching NFTS");
      // setOpenError(true);
      console.log(error);
    }
  };

  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      if (currentAccount) {
        const contract = await connectingWithSmartContract();

        const data =
          type == "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();

        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
            }
          )
        );
        console.log(items);
        return items;
      }
    } catch (error) {
      console.log(error);
      // setError("Error while fetching listed NFTs");
      // setOpenError(true);
    }
  };

  useEffect(() => {
    fetchNFTs();
    fetchMyNFTsOrListedNFTs();
  }, []);

  const buyNFT = async (nft) => {
    SetBuyNFTLoading(true);
    try {
      const contract = await connectingWithSmartContractUsingWeb3Modal();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      router.push("/author");
      SetBuyNFTLoading(false);
    } catch (error) {
      SetBuyNFTLoading(false);
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };

  const connectToTransferFunds = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchTransferFundsContract(signer);
      return contract;
    } catch (error) {
      // console.log(error);
    }
  };

  const [transactionCount, setTransactionCount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferEther = async (address, ether, message) => {
    try {
      if (currentAccount) {
        const contract = await connectToTransferFunds();
        // console.log(address, ether, message);

        const unFormatedPrice = ethers.utils.parseEther(ether);
        // //FIRST METHOD TO TRANSFER FUND
        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: address,
              gas: "0x5208",
              value: unFormatedPrice._hex,
            },
          ],
        });

        const transaction = await contract.addDataToBlockchain(
          address,
          unFormatedPrice,
          message
        );

        // console.log(transaction);

        setLoading(true);
        transaction.wait();
        setLoading(false);

        const transactionCount = await contract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        window.location.reload();
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();

        const avaliableTransaction = await contract.getAllTransactions();

        const readTransaction = avaliableTransaction.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

        setTransactions(readTransaction);
        // console.log(transactions);
      } else {
        // console.log("On Ethereum");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <NFTMarketplaceContext.Provider
      value={{
        buyNFTLoading,
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        setOpenError,
        openError,
        error,
        transferEther,
        getAllTransactions,
        loading,
        accountBalance,
        transactionCount,
        transactions,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};

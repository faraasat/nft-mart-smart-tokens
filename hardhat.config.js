require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.17",
  networks: {
    polygon_mumbai: {
      chainId: 80001,
      // url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [`0x${process.env.ACCOUNT_PRIVATE_KEY}`],
    },
  },
};

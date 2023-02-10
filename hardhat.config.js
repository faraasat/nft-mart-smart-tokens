require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    //   hardhat: {},

    polygon_mumbai: {
      // chainId: 80001,
      url: "https://endpoints.omniatech.io/v1/matic/mumbai/public",
      // url: process.env.POLYGON_MUMBAI,
      accounts: [
        `0x${"937c6615bdcb1667436ca3295d71a414ce3de80a8c225e77d887d61bc84e5de1"}`,
      ],
    },

  },
};

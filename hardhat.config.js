/** @format */

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  },
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5,
    },
    // hardhat: {
    //   chainId: 31337,
    // },
  },
};

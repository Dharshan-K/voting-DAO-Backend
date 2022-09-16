/** @format */
console.log("-------");

// /** @format */

// const fs = require("fs");
// const { ethers } = require("hardhat");

// const CONTRACT_ADDRESS_FILE =
//   "../voting_DAO frontend/voting_dao/constants/contractAddress.json";
// const ABI_FILE = "../voting_DAO frontend/voting_dao/constants/abi.json";

// module.exports = async function () {
//   console.log("starting update----------------");
//   console.log(process.env.UPDATE_FRONT_END);
//   console.log("updating frontend-------------");
//   updateContractAddresses();
//   updateAbi();
//   updateFrontend();
// };
// async function updateFrontend() {
//   console.log("frontend updated");
//   const votingContract = await ethers.getContract("voting");
//   console.log(votingContract);
//   fs.writeFileSync(CONTRACT_ADDRESS_FILE, "hello everyone");
// }
// async function updateAbi() {
//   const votingContract = await ethers.getContract("voting");
//   console.log("updating ABI-------------");
//   fs.writeFileSync(
//     ABI_FILE,
//     votingContract.interface.format(ethers.utils.FormatTypes.json)
//   );
// }

// async function updateContractAddresses() {
//   const votingContract = await ethers.getContract("voting");
//   console.log("updating ADDRESS-------------");
//   const chainId = network.config.chainId.toString();
//   const currentAddresses = JSON.parse(
//     fs.readFileSync(CONTRACT_ADDRESS_FILE, "utf8")
//   );
//   if (chainId in currentAddresses) {
//     if (!currentAddresses[chainId].includes(votingContract.address)) {
//       currentAddresses[chainId].push(votingContract.address);
//     }
//   }
//   {
//     currentAddresses[chainId] = [votingContract.address];
//   }
//   fs.writeFileSync(CONTRACT_ADDRESS_FILE, JSON.stringify(currentAddresses));
// }

// module.exports.tags = ["all", "frontend"];

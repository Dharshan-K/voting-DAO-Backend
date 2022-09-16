/** @format */

const { network, deployments, getNamedAccounts, ethers } = require("hardhat");
const ABI_FILE = "../voting_DAO frontend/voting_dao/constants/abi.json";
const CONTRACT_ADDRESS_FILE =
  "../voting_DAO frontend/voting_dao/constants/contractAddress.json";
const fs = require("fs");
require("dotenv").config();

module.exports = async function () {
  const { deployer } = await getNamedAccounts({
    getNamedAccounts,
    deployments,
  });
  console.log("deploying contract----------------");
  const { deploy, log } = deployments;
  const votingDeployed = await deploy("voting", {
    from: deployer,
  });

  console.log("the address deployed is");
  console.log(network.name);
  // console.log(process.env.GOERLI_RPC_URL, process.env.GOERLI_PRIVATE_KEY);

  const votingContract = await ethers.getContract("voting");
  // console.log(votingContract);
  // const creatingProposal = await votingContract.createProposal(
  //   "Proposal 1",
  //   "this is about Proposal 1"
  // );
  const proposalCount = await votingContract.getProposalCount();

  console.log(parseInt(proposalCount));
  console.log("updating ABI-------------");
  fs.writeFileSync(
    ABI_FILE,
    votingContract.interface.format(ethers.utils.FormatTypes.json)
  );
  console.log("updating ADDRESS-------------");
  const chainId = network.config.chainId.toString();
  fs.writeFileSync(CONTRACT_ADDRESS_FILE, "{}");
  const currentAddresses = JSON.parse(
    fs.readFileSync(CONTRACT_ADDRESS_FILE, "utf8")
  );
  console.log("updating ADDRESS-------------");
  if (chainId in currentAddresses) {
    if (!currentAddresses[chainId].includes(votingContract.address)) {
      currentAddresses[chainId].push(votingContract.address);
    }
  }
  {
    currentAddresses[chainId] = [votingContract.address];
  }
  fs.writeFileSync(CONTRACT_ADDRESS_FILE, JSON.stringify(currentAddresses));
};

module.exports.tags = ["all", "voting"];

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const {
  AURORA_API_URL,
  LUNIVERSE_NODE_ID,
  PRIVATE_KEY,
  EXPLORER_API_KEY,
  TIXO_ADDRESS,
} = process.env;

task("etherscan-verify", "Verifies on etherscan", async (taskArgs, hre) => {
  console.log("Verifying contract on etherscan...");
  await hre.run("verify:verify", {
    address: TIXO_ADDRESS,
    network: taskArgs["network"],
  });
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.1",
  defaultNetwork: "auroraTestnet",
  networks: {
    auroraTestnet: {
      url: AURORA_API_URL ?? `https://testnet.aurora.dev`,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 100000000000,
    },
  },
  etherscan: {
    apiKey: {
      auroraTestnet: EXPLORER_API_KEY,
    },
  },
};

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const { PRIVATE_KEY, EXPLORER_API_KEY, TIXO_ADDRESS } = process.env;

task("etherscan-verify", "Verifies on etherscan", async (taskArgs, hre) => {
  console.log("Verifying contract on etherscan...");
  await hre.run("verify:verify", {
    address: TIXO_ADDRESS,
    network: taskArgs["network"],
  });
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "ftmTestnet",
  networks: {
    ftmTestnet: {
      url: "https://rpc.testnet.fantom.network/",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4002,
    },
  },
  etherscan: {
    apiKey: {
      ftmTestnet: FTMSCAN_API_KEY,
    },
  },
};

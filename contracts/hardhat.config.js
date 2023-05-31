require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const {
  MUMBAI_API_URL,
  LUNIVERSE_NODE_ID,
  PRIVATE_KEY,
  POLYGONSCAN_API_KEY,
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
  defaultNetwork: "mumbai",
  networks: {
    mumbai: {
      url:
        MUMBAI_API_URL ??
        `https://polygon-mumbai.luniverse.io/${LUNIVERSE_NODE_ID}`,
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 100000000000,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
};

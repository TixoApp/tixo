require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  defaultNetwork: "theta_testnet",
  networks: {
    theta_privatenet: {
      url: "http://localhost:18888/rpc",
      accounts: [
        "1111111111111111111111111111111111111111111111111111111111111111",
        "2222222222222222222222222222222222222222222222222222222222222222",
        "3333333333333333333333333333333333333333333333333333333333333333",
      ],
      chainId: 366,
      gasPrice: 4000000000000,
    },
    goerli: {
      url: process.env.GOERLI_API_URL ?? "",
      accounts: [`${process.env.PRIVATE_KEY}`],
      gasPrice: 100000000000,
    },
    theta_testnet: {
      url: `https://eth-rpc-api-testnet.thetatoken.org/rpc`,
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 365,
      gasPrice: 4000000000000,
    },
    theta_mainnet: {
      url: `https://eth-rpc-api.thetatoken.org/rpc`,
      accounts: [
        "1111111111111111111111111111111111111111111111111111111111111111",
      ],
      chainId: 361,
      gasPrice: 4000000000000,
    },
  },
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: "none",
      },
    },
  },
};

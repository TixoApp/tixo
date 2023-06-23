const hre = require("hardhat");

async function main() {
  const EncodeAuroraToken = await hre.ethers.getContractFactory(
    "EncodeAuroraToken"
  );
  const encodeAuroraToken = await EncodeAuroraToken.deploy();

  console.log("deploying...");

  await encodeAuroraToken.deployed();

  console.log(`Deployed successfully at: ${encodeAuroraToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  console.log(error.message);
  process.exitCode = 1;
});

const hre = require("hardhat");

async function main() {
  const TixoCollectionV1 = await hre.ethers.getContractFactory(
    "TixoCollectionV1"
  );
  const tixoCollectionV1 = await TixoCollectionV1.deploy();

  console.log("deploying...");

  await tixoCollectionV1.deployed();

  console.log(`Deployed successfully at: ${tixoCollectionV1.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  console.log(error.message);
  process.exitCode = 1;
});

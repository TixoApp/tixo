const hre = require("hardhat");

async function main() {
  try {
    const TixoCollectionV1 = await hre.ethers.getContractFactory(
      "TixoCollectionV1"
    );

    const tixo = await TixoCollectionV1.attach(
      process.env.TIXO_ADDRESS // deployed contract address
    );

    console.log("TixoCollectionV1 attached to:", tixo.address);

    console.log("Fetching last event ID...");

    const txn = await tixo.getLastEventId();
    console.log("last event Id: ", txn);
  } catch (err) {
    console.log(err.message);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

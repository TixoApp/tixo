const hre = require("hardhat");

async function main() {
  try {
    const EncodeAuroraToken = await hre.ethers.getContractFactory(
      "EncodeAuroraToken"
    );

    const token = await EncodeAuroraToken.attach(
      "0x440551d6b96D37C04656EB41594fECe89249bd3a"
    );

    console.log("EncodeAuroraToken attached to:", token.address);

    console.log("Creating event...");

    const txn = await token.safeMint(
      "0xDfCce953c63B353B117aa41D99E52c3f26DE4161",
      1,
      "https://bafybeiazbvmb3adxkyb3ov3y7isxzn7n6ctr4xt7fuzotmjcmdcutlpx34.ipfs.w3s.link/metadata.json"
    );
    await txn.wait();
    console.log("event created ", txn);
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

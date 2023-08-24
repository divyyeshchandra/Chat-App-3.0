const hre = require("hardhat");

async function main() {
  //STAKING CONTRACT
  const ChatApp = await hre.ethers.deployContract("ChatApp");

  await ChatApp.waitForDeployment();

  //TOKEN CONTRACT
  console.log(` ChatApp Address: ${ChatApp.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

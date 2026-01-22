const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Deploy Tokens
  const TokenA = await hre.ethers.getContractFactory("TokenA");
  const tokenA = await TokenA.deploy();
  await tokenA.deployed();

  const TokenB = await hre.ethers.getContractFactory("TokenB");
  const tokenB = await TokenB.deploy();
  await tokenB.deployed();

  console.log("Token A:", tokenA.address);
  console.log("Token B:", tokenB.address);

  // Deploy AMM
  const AMM = await hre.ethers.getContractFactory("SimpleAMM");
  const amm = await AMM.deploy(tokenA.address, tokenB.address);
  await amm.deployed();

  console.log("AMM Contract deployed to:", amm.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

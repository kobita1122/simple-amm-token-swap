const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleAMM", function () {
  it("Should swap A for B", async function () {
    const [owner] = await ethers.getSigners();

    // Deploy everything
    const TokenA = await ethers.getContractFactory("TokenA");
    const tokenA = await TokenA.deploy();
    
    const TokenB = await ethers.getContractFactory("TokenB");
    const tokenB = await TokenB.deploy();

    const AMM = await ethers.getContractFactory("SimpleAMM");
    const amm = await AMM.deploy(tokenA.address, tokenB.address);

    // Add Liquidity
    await tokenA.approve(amm.address, ethers.utils.parseEther("1000"));
    await tokenB.approve(amm.address, ethers.utils.parseEther("1000"));
    await amm.addLiquidity(ethers.utils.parseEther("500"), ethers.utils.parseEther("500"));

    // Swap
    await tokenA.approve(amm.address, ethers.utils.parseEther("10"));
    await amm.swapAtoB(ethers.utils.parseEther("10"));

    expect(await tokenB.balanceOf(owner.address)).to.not.equal(0);
  });
});

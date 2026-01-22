# Simple AMM Token Swap

A lightweight, flat-structure DEX for educational and prototyping purposes. This repository implements the core logic of Uniswap V1/V2, using a Constant Product Formula to determine swap rates between two assets.

## Features
- **AMM Contract:** Implements `x * y = k` pricing.
- **Liquidity:** Users can add liquidity to the pool.
- **Swapping:** Instant swaps between Token A and Token B.
- **Two-Way Binding:** Calculates estimated output before swapping.

## Quick Start
1. **Install:** `npm install`
2. **Deploy:** `npx hardhat run deploy.js --network goerli`
3. **Setup:** Update `app.js` with the deployed AMM and Token addresses.
4. **Run:** Open `index.html`.

## Tech Stack
- Solidity ^0.8.17
- Ethers.js
- Hardhat
- HTML/CSS/JS

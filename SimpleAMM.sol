// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleAMM {
    IERC20 public tokenA;
    IERC20 public tokenB;

    uint256 public reserveA;
    uint256 public reserveB;

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function addLiquidity(uint256 _amountA, uint256 _amountB) external {
        require(_amountA > 0 && _amountB > 0, "Invalid amounts");
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transferFrom(msg.sender, address(this), _amountB);
        reserveA += _amountA;
        reserveB += _amountB;
    }

    function getSwapAmount(uint256 _amountIn, uint256 _reserveIn, uint256 _reserveOut) public pure returns (uint256) {
        // x * y = k
        // (x + dx)(y - dy) = xy
        // dy = (y * dx) / (x + dx)
        uint256 amountInWithFee = _amountIn * 997; // 0.3% fee
        uint256 numerator = amountInWithFee * _reserveOut;
        uint256 denominator = (_reserveIn * 1000) + amountInWithFee;
        return numerator / denominator;
    }

    function swapAtoB(uint256 _amountA) external {
        uint256 amountB = getSwapAmount(_amountA, reserveA, reserveB);
        require(amountB > 0, "Insufficent output amount");
        
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transfer(msg.sender, amountB);
        
        reserveA += _amountA;
        reserveB -= amountB;
    }

    function swapBtoA(uint256 _amountB) external {
        uint256 amountA = getSwapAmount(_amountB, reserveB, reserveA);
        require(amountA > 0, "Insufficent output amount");

        tokenB.transferFrom(msg.sender, address(this), _amountB);
        tokenA.transfer(msg.sender, amountA);

        reserveB += _amountB;
        reserveA -= amountA;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenA is ERC20 {
    constructor() ERC20("Alpha Coin", "ALPH") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}

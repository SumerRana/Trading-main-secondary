// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WoodToken is ERC20 {
    constructor() ERC20("WoodToken", "WOOD") {
        _mint(msg.sender, 10000 * 10 ** decimals());
    }
}
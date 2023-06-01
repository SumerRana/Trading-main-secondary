// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// WOOD is a resource token of https://theblockchain.land/ and is used to build(mint) in-game items(NFTs)
// WOOD provides access to create in-game NFTs items like tools, buildings, ships, etc
// WOOD is a mintable and burnable XRC20 token, with 100k pre mint and no max supply, WOOD can be traded on DEXs
// You can mint WOOD by sending XDC and staking a PioneerNFT to a TheBlockchain.Land LandNFT contract
// contact admin@theblockchain.land  

contract WoodInTheBlockchainLand is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("Wood in TheBlockchain.Land", "WOOD") {
        _mint(msg.sender, 100000 * 10 ** decimals());
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
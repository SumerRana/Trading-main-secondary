// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// FISH is a resource token of https://theblockchain.land/ and is used to feed PioneerNFTs in-game characters
// FISH provides access PioneerNFTs with strength
// FISH is a mintable and burnable XRC20 token, with 100k pre mint and no max supply, FISH can be traded on DEXs
// You can mint FISH by sending XDC and staking a PioneerNFT to a TheBlockchain.Land LandNFT contract
// contact admin@theblockchain.land  

contract FishInTheBlockchainLand is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("Fish in TheBlockchain.Land", "FISH") {
        _mint(msg.sender, 100000 * 10 ** decimals());
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
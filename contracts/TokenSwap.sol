// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TokenSwap is ERC721, Ownable {
    using Counters for Counters.Counter;
    IERC20 public erc20Token;

    Counters.Counter private _tokenIdCounter;

    constructor(address _erc20TokenAddress) ERC721("LumberNFT", "LUMBER") {
        erc20Token = IERC20(_erc20TokenAddress);
    }

    function swapTokensForNFT() public {
        require(erc20Token.balanceOf(msg.sender) >= 10 * 10 ** 18, "Insufficient ERC20 tokens");

        erc20Token.transferFrom(msg.sender, address(this), 10 * 10 ** 18);

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _mint(msg.sender, tokenId);
    }

    function withdrawToken() public onlyOwner {
        erc20Token.transfer(msg.sender, erc20Token.balanceOf(address(this)));
    }
}

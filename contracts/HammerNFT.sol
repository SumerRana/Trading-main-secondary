// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract HammerNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Payment {
        address paymentCurrency1;
        address paymentCurrency2;
        uint256 amount1;
        uint256 amount2;
    }

    Payment public HammerPrice;

    constructor(
        address _paymentCurrency1,
        address _paymentCurrency2,
        uint256 _amount1,
        uint256 _amount2
    ) ERC721("Hammer", "HAM") {
        require(_paymentCurrency1 != address(0) && _paymentCurrency2 != address(0), "Token addresses cannot be address zero");
        HammerPrice = Payment(_paymentCurrency1, _paymentCurrency2, _amount1, _amount2);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function buyHammer() public {
        require(
            IERC20(HammerPrice.paymentCurrency1).transferFrom(msg.sender, address(this), HammerPrice.amount1),
            "Failed to transfer paymentCurrency1!"
        );
        require(
            IERC20(HammerPrice.paymentCurrency2).transferFrom(msg.sender, address(this), HammerPrice.amount2),
            "Failed to transfer paymentCurrency2!"
        );

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(
            tokenId,
            string(
                abi.encodePacked(
                    "https://gateway.pinata.cloud/ipfs/QmYDm8Bzye4RMS7h9HUv1KoupajqXcsfKUWwMeGvsC3ZkA/Eggo00",
                    Strings.toString(tokenId),
                    ".json"
                )
            )
        );
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

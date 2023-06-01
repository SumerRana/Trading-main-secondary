// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Faucet is Ownable {
    ERC20 public token;

    struct Airdrop {
        uint256 lastTimeClaimed;
        uint256 amountClaimed;
    }

    event TokenAirdropped(address indexed claimer, uint256 claimTime);
    mapping(address => Airdrop) private tokensDropped;

    constructor(ERC20 _token) {
        require(address(_token) != address(0), "Token address can't be address zero");
        token = _token;
    }

    function depositToken(uint256 amount) public {
        require(token.transferFrom(msg.sender, address(this), amount), "Token transfer failed!");
    }

    function claimTokens() public {
        Airdrop storage airdrop = tokensDropped[msg.sender];
        require(currentTime() > airdrop.lastTimeClaimed + 1 days, "User claimed less than 24 hours ago");

        airdrop.lastTimeClaimed = currentTime();
        airdrop.amountClaimed += 50 ether;

        require(token.transfer(msg.sender, 50 ether), "Token transfer failed!");
        emit TokenAirdropped(msg.sender, airdrop.lastTimeClaimed);
    }

    function currentTime() private view returns (uint256) {
        return block.timestamp;
    }
}
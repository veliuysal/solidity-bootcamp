//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;

//Using ERC721URIStorage and Counters contracts of Openzeppelin's contracts
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

//For debugging NFT contract
import "hardhat/console.sol";

// This is the main building block for smart contracts.
contract BootcampNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Bootcamp NFT", "BCNFT") {}

    function awardItem(
        address player,
        string memory tokenURI
    ) public returns (uint256) {
        console.log("Award Item Function is working..", player, tokenURI);
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    function getTokenIds() external view returns (uint256) {
        return _tokenIds.current();
    }
}

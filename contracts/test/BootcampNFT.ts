import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BootcampNFT } from "../typechain-types";

describe("Bootcamp Token Contract", () => {
  let bootcampNFT: BootcampNFT;
  let OWNER: SignerWithAddress,
    FIRST: SignerWithAddress,
    SECOND: SignerWithAddress,
    THIRD: SignerWithAddress;

  beforeEach(async () => {
    let nft = await ethers.getContractFactory("BootcampNFT");
    bootcampNFT = await nft.deploy();
  });

  before(async function () {
    const accounts = await ethers.getSigners();
    OWNER = accounts[0];
    FIRST = accounts[1];
    SECOND = accounts[2];
    THIRD = accounts[3];
  });

  describe("Deployment", () => {
    it("is Current ID equals to Zero", async () => {
      expect(await bootcampNFT.getTokenIds()).to.equal(Number(0));
    });
    it("is Name 'Bootcamp NFT'", async () => {
      expect(await bootcampNFT.name()).to.equal("Bootcamp NFT");
    });
    it("is Symbol 'BCNFT'", async () => {
      expect(await bootcampNFT.symbol()).to.equal("BCNFT");
    });
  });
  describe("Others", () => {
    it("is Award Item Working", async () => {
      await bootcampNFT.awardItem(FIRST.address, "veliuysal.dev");
      expect(await bootcampNFT.getTokenIds()).to.equal(Number(1));
    });
    it("is Award Item Correct", async () => {
      await bootcampNFT.awardItem(FIRST.address, "veliuysal.dev");
      expect(await bootcampNFT.balanceOf(FIRST.address)).to.equal(Number(1));
    });
    it("is Award Item Correct Minted", async () => {
        await bootcampNFT.awardItem(FIRST.address, "veliuysal.dev");
        expect(await bootcampNFT.ownerOf(Number(0))).to.equal(FIRST.address);
      });
  });
});

import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { BootcampToken } from "../typechain-types";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Bootcamp Token Contract", () => {
  let bootcampToken: BootcampToken;
  let OWNER: SignerWithAddress,
    FIRST: SignerWithAddress,
    SECOND: SignerWithAddress,
    THIRD: SignerWithAddress;

  beforeEach(async () => {
    let token = await ethers.getContractFactory("BootcampToken");
    bootcampToken = await token.deploy();
    await bootcampToken.waitForDeployment();
  });

  before(async function () {
    const accounts = await ethers.getSigners();
    OWNER = accounts[0];
    FIRST = accounts[1];
    SECOND = accounts[2];
    THIRD = accounts[3];
  });

  describe("Deployment", () => {
    it("is Name Correct", async () => {
      expect(await bootcampToken.name()).to.equal("Bootcamp Token");
    });

    it("is Symbol Correct", async () => {
      expect(await bootcampToken.symbol()).to.equal("BCT");
    });

    it("is Initial Supply Correct", async () => {
      expect(await bootcampToken.totalSupply()).to.equal(Number(1000000));
    });
    it("is Decimal Zero", async () => {
      expect(await bootcampToken.decimals()).to.equal(Number(0));
    });
  });

  describe("Check Balance", () => {
    it("is Owner Balance Correct when initial creation", async () => {
      expect(await bootcampToken.balanceOf(OWNER.address)).to.equal(
        Number(1000000)
      );
    });
    //Transfer other accounts and check balances
  });
});

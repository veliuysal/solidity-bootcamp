import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const BootcampNFT = await ethers.getContractFactory("BootcampNFT");
   const bootcampNFT = await BootcampNFT.deploy();
  await bootcampNFT.waitForDeployment();
  console.log("Bootcamp NFT deployed to: ", bootcampNFT.target);

  //const BootcampToken = await ethers.getContractFactory("BootcampToken");
  //const bootcampToken = await BootcampToken.deploy();
  //await bootcampToken.waitForDeployment();
  //console.log("Bootcamp Token deployed to: ", bootcampToken.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

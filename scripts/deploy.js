const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CLAYInTheBlockchainLand = await hre.ethers.getContractFactory("CLAYInTheBlockchainLand");
  const clay = await CLAYInTheBlockchainLand.deploy();
  await clay.deployed();

  console.log("CLAY deployed to:", clay.address);

  const FishInTheBlockchainLand = await hre.ethers.getContractFactory("FishInTheBlockchainLand");
  const fish = await FishInTheBlockchainLand.deploy();
  await fish.deployed();

  console.log("FISH deployed to:", fish.address);

  const RockInTheBlockchainLand = await hre.ethers.getContractFactory("RockInTheBlockchainLand");
  const rock = await RockInTheBlockchainLand.deploy();
  await rock.deployed();

  console.log("ROCK deployed to:", rock.address);

  const WoodInTheBlockchainLand = await hre.ethers.getContractFactory("WoodInTheBlockchainLand");
  const wood = await WoodInTheBlockchainLand.deploy();
  await wood.deployed();

  console.log("WOOD deployed to:", wood.address);

  const WoolInTheBlockchainLand = await hre.ethers.getContractFactory("WoolInTheBlockchainLand");
  const wool = await WoolInTheBlockchainLand.deploy();
  await wool.deployed();

  console.log("WOOL deployed to:", wool.address);

  const TokenSwap = await hre.ethers.getContractFactory("TokenSwap");
  const tokenSwap = await TokenSwap.deploy(wood.address);
  await tokenSwap.deployed();

  console.log("TokenSwap deployed to:", tokenSwap.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
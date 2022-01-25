import { task } from "hardhat/config";
import dotenv from "dotenv";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/types";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const ETH_URL = process.env.ETH_URL;
const POLYGON_URL = process.env.POLYGON_URL;
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;
const POLYGON_PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  paths: {
    artifacts: "../frontend/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `${ETH_URL}`,
      accounts: [`0x${ETH_PRIVATE_KEY}`],
    },
    matic: {
      url: `${POLYGON_URL}`,
      accounts: [`0x${POLYGON_PRIVATE_KEY}`],
    },
  },
  typechain: {
    outDir: "./types",
    target: "ethers-v5",
  },
};

export default config;

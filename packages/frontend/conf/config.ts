import { ChainId, Config, MULTICALL_ADDRESSES } from '@usedapp/core';
import {
  GreeterContractAddress as LocalhostGreeterContractAddress,
  MulticallContractAddress as LocalhostMulticallContractAddress,
  MyNFTContractAddress as LocalhostMyNFTContractAddress,
} from '../artifacts/contracts/addresses/localhostContractAddress';
import {
  GreeterContractAddress as RinkebyGreeterContractAddress,
  MulticallContractAddress as RinkebyMulticallContractAddress,
  MyNFTContractAddress as RinberkyMyNFTContractAddress,
} from '../artifacts/contracts/addresses/rinkebyContractAddress';
import {
  GreeterContractAddress as PolygonGreeterContractAddress,
  MulticallContractAddress as PolygonMulticallContractAddress,
  MyNFTContractAddress as PolygonMyNFTContractAddress,
} from '../artifacts/contracts/addresses/maticContractAddress';

const ETH_URL = process.env.NEXT_PUBLIC_ETH_URL;
const POLYGON_URL = process.env.NEXT_PUBLIC_POLYGON_URL;

export const devChains: ChainId[] = [ChainId.Localhost];

export const allowedChains: ChainId[] = [
  ChainId.Localhost,
  ChainId.Rinkeby,
  ChainId.Polygon,
].filter((chaindId) => {
  if (process.env.NODE_ENV === 'production') {
    return !devChains.includes(chaindId);
  }
  return chaindId;
});

export const getDappConfig = (chainId: number): Config => ({
  readOnlyUrls: {
    [ChainId.Rinkeby]: `${ETH_URL}`,
    [ChainId.Hardhat]: 'http://localhost:8545',
    [ChainId.Localhost]: 'http://localhost:8545',
    [ChainId.Polygon]: `${POLYGON_URL}`,
  },
  supportedChains: [
    ChainId.Mainnet,
    ChainId.Goerli,
    ChainId.Kovan,
    ChainId.Rinkeby,
    ChainId.Ropsten,
    ChainId.xDai,
    ChainId.Localhost,
    ChainId.Hardhat,
    ChainId.Polygon,
  ],
  multicallAddresses: {
    ...MULTICALL_ADDRESSES,
    [ChainId.Rinkeby]: contractConfig[chainId].multicall,
    [ChainId.Localhost]: contractConfig[chainId].multicall,
    [ChainId.Polygon]: contractConfig[chainId].multicall,
  },
});

const contractConfig: Record<number, { greeter?: string; multicall: string; myNft?: string }> = {
  [ChainId.Localhost]: {
    greeter: LocalhostGreeterContractAddress,
    multicall: LocalhostMulticallContractAddress,
    myNft: LocalhostMyNFTContractAddress,
  },
  [ChainId.Rinkeby]: {
    greeter: RinkebyGreeterContractAddress,
    multicall: RinkebyMulticallContractAddress,
    myNft: RinberkyMyNFTContractAddress,
  },
  [ChainId.Polygon]: {
    greeter: PolygonGreeterContractAddress,
    multicall: PolygonMulticallContractAddress,
    myNft: PolygonMyNFTContractAddress,
  },
};

export default contractConfig;

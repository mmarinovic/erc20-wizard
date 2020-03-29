import { IContract } from './contract';

export interface IContractDeploymentOptions {
  web3Provider: any;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  compiledContract: IContract;
}

export interface IContractDeploymentResult {
  account: string;
  error?: Error;
  contractAddress?: string;
}

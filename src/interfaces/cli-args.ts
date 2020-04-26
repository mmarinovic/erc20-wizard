import { EthereumNetworkType } from '../types/ethereum-network';

export interface ICliArgs {
  config: string;
  help: boolean;
  ropsten: boolean;
  main: boolean;
  rinkeby: boolean;
}

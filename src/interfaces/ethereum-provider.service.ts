import PrivateKeyProvider from 'truffle-privatekey-provider';
import { EthereumNetworkType } from '../types/ethereum-network';

export interface IEthereumProviderService {
  createWeb3PrivateKeyProvider(
    networkType: EthereumNetworkType,
    privateKey: string
  ): PrivateKeyProvider;
}

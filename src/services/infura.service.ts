import { EthereumNetworkType } from '../types/ethereum-network';
import { IEthereumProviderService } from '../interfaces/ethereum-provider.service';
import { ConfigurationService } from './configuration.service';

import PrivateKeyProvider from 'truffle-privatekey-provider';

export class InfuraService implements IEthereumProviderService {
  constructor(private configurationService: ConfigurationService) {}

  createWeb3PrivateKeyProvider(
    networkType: EthereumNetworkType,
    privateKey: string
  ) {
    const authorizedUrl = this.buildAuthorizedInfuraUrl(networkType);
    return new PrivateKeyProvider(privateKey, authorizedUrl);
  }

  private buildAuthorizedInfuraUrl(networkType: EthereumNetworkType) {
    const config = this.configurationService.get();
    const baseUrl = this.resolveNetworkUrl(networkType);
    return `${baseUrl}/${config.infura.projectId}`;
  }

  private resolveNetworkUrl(networkType: EthereumNetworkType) {
    switch (networkType) {
      case 'main':
        return 'https://mainnet.infura.io/v3';
      case 'rinkeby':
        return 'https://rinkeby.infura.io/v3';
      case 'ropsten':
        return 'https://ropsten.infura.io/v3';
      default:
        throw new Error('Network is not supported');
    }
  }
}

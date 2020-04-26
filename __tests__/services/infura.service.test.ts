import cases from 'jest-in-case';
import { InfuraService } from '../../src/services/infura.service';
import { ConfigurationService } from '../../src/services/configuration.service';
import PrivateKeyProvider from 'truffle-privatekey-provider';

jest.mock('truffle-privatekey-provider');

describe('InfuraService', () => {
  const configurationService = new ConfigurationService();
  const infuraService = new InfuraService(configurationService);

  beforeEach(() => {
    configurationService.set('testInfuraProjetId');
    jest.clearAllMocks();
  });

  describe('createWeb3PrivateKeyProvider', () => {
    cases(
      'valid networks',
      (opts) => {
        const provider = infuraService.createWeb3PrivateKeyProvider(
          opts.network,
          'testPrivateKey'
        );

        expect(provider).not.toBeNull();
        expect(PrivateKeyProvider).toHaveBeenCalledWith(
          'testPrivateKey',
          opts.resultNetworkUrl
        );
      },
      [
        {
          network: 'main',
          resultNetworkUrl: 'https://mainnet.infura.io/v3/testInfuraProjetId',
        },
        {
          network: 'rinkeby',
          resultNetworkUrl: 'https://rinkeby.infura.io/v3/testInfuraProjetId',
        },
        {
          network: 'ropsten',
          resultNetworkUrl: 'https://ropsten.infura.io/v3/testInfuraProjetId',
        },
      ]
    );

    it('throws for invalid network', () => {
      expect(() => {
        infuraService.createWeb3PrivateKeyProvider(
          'invalid-network' as any,
          'testPrivateKey'
        );
      }).toThrow();
    });
  });
});

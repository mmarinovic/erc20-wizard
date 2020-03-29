import Web3 from 'web3';
import {
  IContractDeploymentOptions,
  IContractDeploymentResult,
} from '../interfaces/contract-deployment';

export class ContractDeploymentService {
  options: IContractDeploymentOptions;

  web3: Web3;
  gasLimit = 5000000;

  constructor(options: IContractDeploymentOptions) {
    this.options = options;
    this.web3 = new Web3(options.web3Provider);
  }

  async deploy(): Promise<IContractDeploymentResult> {
    const {
      compiledContract,
      symbol,
      decimals,
      totalSupply,
      name,
    } = this.options;
    const deployAccount = await this.resolveDeploymentAccount();

    try {
      const result = await new this.web3.eth.Contract(
        JSON.parse(compiledContract.interface)
      )
        .deploy({
          data: compiledContract.bytecode,
          arguments: [name, symbol, decimals, totalSupply],
        })
        .send({
          gas: this.gasLimit,
          from: deployAccount,
        });

      return {
        account: deployAccount,
        contractAddress: result.options.address,
      };
    } catch (error) {
      return { error, account: deployAccount };
    }
  }

  private async resolveDeploymentAccount() {
    const accounts = await this.web3.eth.getAccounts();
    return accounts[0];
  }
}

import commandLineArgs from 'command-line-args';
import colors from 'colors/safe';
import { ContractDeploymentService } from './services/contract-deployment.service';
import { ContractTemplateService } from './services/contract-template.service';
import { ConsoleService } from './services/console.service';
import { IPromptResult } from './interfaces/prompt-result';
import { EthereumNetworkType } from './types/ethereum-network';
import { IContractDeploymentResult } from './interfaces/contract-deployment';
import { IEthereumProviderService } from './interfaces/ethereum-provider.service';

const options: {
  network: EthereumNetworkType;
} = commandLineArgs([{ name: 'network', type: String, defaultOption: true }]);

export class Controller {
  constructor(
    private consoleService: ConsoleService,
    private ethereumProviderService: IEthereumProviderService,
    private contractTemplateService: ContractTemplateService
  ) {}

  init() {
    this.consoleService.initPrompt(this.onConsoleInputReceived.bind(this));
  }

  private async onConsoleInputReceived({
    privateKey,
    tokenDecimals,
    tokenName,
    tokenSymbol,
    tokenTotalSupply,
  }: IPromptResult) {
    const web3Provider = this.ethereumProviderService.createWeb3PrivateKeyProvider(
      options.network,
      privateKey
    );
    const compiledContract = this.contractTemplateService.compileTemplate(
      tokenName
    );
    const deploymentService = new ContractDeploymentService({
      compiledContract,
      web3Provider,
      name: tokenName,
      decimals: tokenDecimals,
      symbol: tokenSymbol,
      totalSupply: tokenTotalSupply,
    });

    this.consoleService.showSpinner('Deploying');
    const result = await deploymentService.deploy();
    this.consoleService.stopSpinner();

    this.handleResult(tokenName, result);

    process.exit();
  }

  private handleResult(tokenName: string, result: IContractDeploymentResult) {
    const resultMessage = result.error
      ? colors.red(
          `Error deploying ${tokenName} from ${result.account}. ${result.error.message}`
        )
      : colors.green(
          `${tokenName} successfuly deployed from ${result.account} to ${result.contractAddress}.`
        );

    console.log(resultMessage);
  }
}

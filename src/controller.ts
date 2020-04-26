import { ContractDeploymentService } from './services/contract-deployment.service';
import { ContractTemplateService } from './services/contract-template.service';
import { ConfigurationService } from './services/configuration.service';
import { ConsoleService } from './services/console.service';
import { IPromptResult } from './interfaces/prompt-result';
import { IContractDeploymentResult } from './interfaces/contract-deployment';
import { IEthereumProviderService } from './interfaces/ethereum-provider.service';
import { EthereumNetworkType } from './types/ethereum-network';
import { cliMessages, errorMessageTemplate } from './constants/cli';
import { ICliArgs } from './interfaces/cli-args';

export class Controller {
  constructor(
    private consoleService: ConsoleService,
    private ethereumProviderService: IEthereumProviderService,
    private contractTemplateService: ContractTemplateService,
    private configurationService: ConfigurationService
  ) {}

  init() {
    console.log(cliMessages.welcome);
    console.log('');

    const args = this.consoleService.getArgs(process.argv);
    const network = this.tryGetNetwork(args);
    if (network) {
      this.startDeployment(network);
    } else if (args.config !== undefined) {
      args.config == '' ? this.showConfig() : this.configure(args.config);
    } else {
      this.showHelp();
    }
  }

  private showHelp() {
    console.log(cliMessages.help);
    process.exit();
  }

  private showConfig() {
    const config = this.configurationService.get();
    console.log(cliMessages.configDisplay(config.infura.projectId));
    process.exit();
  }

  private configure(infuraProjectId: string) {
    if (!infuraProjectId) {
      console.error(cliMessages.invalidProjectId);
      console.log(cliMessages.help);
      process.exit(1);
    }

    this.configurationService.set(infuraProjectId);
    console.log(cliMessages.configureSuccess);
    process.exit();
  }

  private startDeployment(network: EthereumNetworkType) {
    this.validateConfiguration();
    this.consoleService.initPrompt(this.onConsoleInputReceived(network));
  }

  private onConsoleInputReceived(network: EthereumNetworkType) {
    return async ({
      privateKey,
      tokenDecimals,
      tokenName,
      tokenSymbol,
      tokenTotalSupply,
    }: IPromptResult) => {
      try {
        const web3Provider = this.ethereumProviderService.createWeb3PrivateKeyProvider(
          network,
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

        this.consoleService.showSpinner(cliMessages.deploying);
        const result = await deploymentService.deploy();
        this.consoleService.stopSpinner();

        this.handleResult(tokenName, result);
      } catch (error) {
        console.error(errorMessageTemplate(error.message));
        process.exit(1);
      }
    };
  }

  private handleResult(tokenName: string, result: IContractDeploymentResult) {
    if (result.error) {
      console.error(
        cliMessages.deploymentError(
          tokenName,
          result.account,
          result.error.message
        )
      );
      process.exit(1);
    } else {
      console.log(
        cliMessages.deploymentSuccess(
          tokenName,
          result.account,
          result.contractAddress
        )
      );
      process.exit();
    }
  }

  private tryGetNetwork(args: ICliArgs): EthereumNetworkType | null {
    return args.main
      ? 'main'
      : args.rinkeby
      ? 'rinkeby'
      : args.ropsten
      ? 'ropsten'
      : null;
  }

  private validateConfiguration() {
    const config = this.configurationService.get();
    if (!config.infura.projectId) {
      console.error(cliMessages.notConfigured);
      process.exit(1);
    }
  }
}

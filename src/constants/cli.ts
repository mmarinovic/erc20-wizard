import colors from 'colors/safe';
import { errorMessageTemplate } from '../helpers';

const cliPromptOptions = [
  {
    description: colors.magenta(
      'Please enter your private key. This will be used to sign contract transaction.'
    ),
    name: 'privateKey',
    required: true,
    hidden: true,
  },
  {
    description: 'Token name',
    name: 'tokenName',
    pattern: /^[a-zA-Z ]+$/,
    required: true,
  },
  {
    description: 'Token symbol',
    name: 'tokenSymbol',
    pattern: /^[a-zA-Z]+$/,
    required: true,
  },
  {
    description: 'Token decimal places',
    name: 'tokenDecimals',
    pattern: /^[0-9]+$/,
    required: true,
  },
  {
    description: 'Token total supply',
    name: 'tokenTotalSupply',
    pattern: /^[0-9]+$/,
    required: true,
  },
];

const cliOptions = {
  boolean: ['help'],
  string: ['config', 'network'],
};

const cliMessages = {
  welcome: '🧙  Welcome to Ethereum ERC20 token wizard! 🧙',
  help: `
  --help                            List commands
  --config                          Show configured infuraProjectId
  --config=infuraProjectId          Configure wizard to use 'infuraProjectId' when connecting to infura API. Get it at https://infura.io/.
  --main                            Start contract creation for Ethereum main network
  --rinkeby                         Start contract creation for Ethereum rinkeby testnet
  --ropsten                         Start contract creation for Ethereum ropsten testnet
  `,
  configureSuccess: '🚀 Sucessfully configured',
  invalidProjectId: errorMessageTemplate('Invalid Infura project id'),
  notConfigured: errorMessageTemplate(
    'CLI is not configured yet. Use --config to setup your infura project id. Get your project id at https://infura.io/'
  ),
  deploying: '🔥 Deploying 🔥',
  configDisplay: (projecId: string) =>
    `⚙️ Configured project Id is '${
      projecId || 'none'
    }'. To change project Id use --config=yourProjectId`,
  deploymentError: (tokenName: string, account: string, error: string) =>
    errorMessageTemplate(
      `Error deploying ${tokenName} from ${account}. ${error}`
    ),
  deploymentSuccess: (
    tokenName: string,
    account: string,
    contractAddress: string
  ) =>
    colors.green(
      `✅ ${tokenName} successfuly deployed from ${account} to ${contractAddress}`
    ),
};

export { cliPromptOptions, cliOptions, cliMessages, errorMessageTemplate };

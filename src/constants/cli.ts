import colors from 'colors/safe';

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

const errorMessageTemplate = (message: string) => colors.red(`❌ ${message}`);

const cliMessages = {
  welcome: '🏭  Welcome to Ethereum ERC20 token factory! 🏭',
  help: `
  --help                            Print help
  --config=infuraProjectId          Configure factory to use 'infuraProjectId' when connecting to infura API
  --main                            Start contract creation for Ethereum main network rinkeby and ropsten
  --rinkeby                         Start contract creation for Ethereum rinkeby testnet
  --ropsten                         Start contract creation for Ethereum ropsten testnet
  `,
  configureSuccess: '🚀 Sucessfully configured',
  invalidProjectId: errorMessageTemplate('Invalid Infura project id'),
  notConfigured: errorMessageTemplate(
    'CLI is not configured yet. Use --config to setup your infura project id'
  ),
  invalidNetwork: errorMessageTemplate(
    'Invalid Ethereum network. Allowed values are main, rinkeby and ropsten'
  ),
  deploying: '🔥 Deploying 🔥',
  configDisplay: (projecId: string) =>
    `⚙️ Configured project Id is '${projecId || 'none'}'`,
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

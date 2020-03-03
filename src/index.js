const prompt = require('prompt');
const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('web3');
const commandLineArgs = require('command-line-args');
const helpers = require('./helpers');

const options = commandLineArgs([{ name: 'network', type: String, defaultOption: true}])

deployContract = async (network, privateKey, name, symbol, decimals, totalSupply) => {
    const web3 = new Web3(helpers.createWeb3PrivateKeyProvider(network, privateKey));
    const contractPath = path.resolve(__dirname, 'contracts', 'Erc20TokenTemplate.sol');
    const source = fs.readFileSync(contractPath, 'utf8');
    const preparedSource = source.replace('Erc20TokenNamePlaceholder', name);
    const compiledContract = solc.compile(preparedSource, 1).contracts[':'+name];
    const accounts = await web3.eth.getAccounts();

    console.log('Deploying contract to ' + network + ' from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
        .deploy({ data: compiledContract.bytecode, arguments: [name, symbol, decimals, totalSupply] })
        .send({ gas: '1000000', from: accounts[0]})

    console.log('Contract deployed to: ', result.options.address);
}

prompt.start();

const promptItems = [
    { description: 'Please enter your private key. This will be used to sign contract transaction.', name: 'privateKey', required: true,  hidden: false }, 
    { description: 'Token name', name: 'tokenName', pattern: /^[a-zA-Z ]+$/, required: true },
    { description: 'Token symbol', name: 'tokenSymbol', pattern: /^[a-zA-Z]+$/, required: true },
    { description: 'Token decimal places', name: 'tokenDecimals', pattern: /^[0-9]+$/, required: true },
    { description: 'Token total supply', name: 'tokenTotalSupply', pattern: /^[0-9]+$/, required: true }
];

prompt.get(promptItems, async (_, result) => {
    const network = options.network;

    await deployContract(network, result.privateKey, result.tokenName, result.tokenSymbol, result.tokenDecimals, result.tokenTotalSupply);
    process.exit();
});

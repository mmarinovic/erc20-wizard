const PrivateKeyProvider = require('truffle-privatekey-provider');
const config = require('../config.json');

function resolveNetworkUrl(networkType){
    switch(networkType){
        case 'main':
            return 'https://mainnet.infura.io/v3';
        case 'rinkeby':
            return 'https://rinkeby.infura.io/v3';
        case 'ropsten':
            return 'https://ropsten.infura.io/v3';
        default:
            throw 'Network not supported';
    }
}

function createWeb3PrivateKeyProvider(networkType, privateKey){
    const { infura: { projectId }} = config;
    const baseUrl = resolveNetworkUrl(networkType);
    const authorizedUrl = `${baseUrl}/${projectId}`;
    return new PrivateKeyProvider(privateKey, authorizedUrl);
}

exports.createWeb3PrivateKeyProvider = createWeb3PrivateKeyProvider;
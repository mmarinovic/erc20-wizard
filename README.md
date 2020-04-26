# Ethereum ERC 20 Wizard
Create and deploy new ERC20 tokens on Ethereum network.

## Install
```
$ npm install -g erc20-wizard
```

## Configuration
First go and get your infura project id at https://infura.io/.
```
$ erc20-wizard --config=yourInfuraProjectId
```

## Usage
Deploying to `main` net:
```
$ erc20-wizard --main
```

Deploying to `ropsten` testnet:
```
$ erc20-wizardy --ropsten
```

Deploying to `rinkeby` testnet:
```
$ erc20-wizard --rinkeby
```

You will be asked to provide informations about ERC20 token:
1. Private key which will be used to sign the transaction. *Private key is not stored in the process*. Make sure you have some funds on your account since deploying a token costs ether.
2. Token information like name, symbol, decimal places and total supply

```javascript
prompt: Please enter your private key. This will be used to sign contract transaction.:
prompt: Token name:  MyAwesomeToken
prompt: Token symbol:  MAT
prompt: Token decimal places:  18
prompt: Token total supply:  100000000
Deploying contract to rinkeby from account 0xb33fbA424A6dc8479E76e0f539615Bf85dC52840
Contract deployed to:  0xE079B5727Bc87E3E0727c79cfaA99fD31159FEE0
```
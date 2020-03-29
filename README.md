# Ethereum ERC 20 Token Factory
Create and deploy new tokens on Ethereum network. Make sure you have some funds on your account since deploying a contract costs ether.

## Configuration
Infura requires a project ID to access the network. I added my ID to the `./config.json`, but requests are limited. Change that to fit your needs.

## Steps:
1. Run `yarn deploy:rinkeby`, `yarn deploy:ropsten` or `yarn deploy:main`
2. Insert your private key. It will be used to unlock account which will be a token owner.
3. Insert informations about your token

```javascript
prompt: Please enter your private key. This will be used to sign contract transaction.:
prompt: Token name:  MyAwesomeToken
prompt: Token symbol:  MAT
prompt: Token decimal places:  18
prompt: Token total supply:  100000000
Deploying contract to rinkeby from account 0xb33fbA424A6dc8479E76e0f539615Bf85dC52840
Contract deployed to:  0xE079B5727Bc87E3E0727c79cfaA99fD31159FEE0
```

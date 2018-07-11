# Ethereum ERC 20 Token Factory
Easily create and deploy new tokens on ethereum

Steps:
1. Run npm run rinkeby-deploy or npm run main-deploy
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

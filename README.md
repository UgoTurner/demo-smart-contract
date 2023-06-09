# [Workshop] Smart Contract on the Ethereum Blockchain

Write, deploy and interact with a Smart Contract on the Ethereum blockchain

## Install

- Ganache: https://trufflesuite.com/ganache/
- Truffle: https://github.com/trufflesuite/truffle
- Metamask: https://metamask.io/
- live-server: https://www.npmjs.com/package/live-server
- web3.js: https://web3js.readthedocs.io/

## Start

Test contract
```bash
cd ./test && truffle test
```

Compile & deploy
```bash
truffle deploy
```

Start dapp 
```bash
# in app.js, update abi.js + contract address
cd ./src && live-server
```

## Documentation

- Solidity: https://docs.soliditylang.org/
- Ethereum: https://ethereum.org/fr/developers/docs/
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/DuG0WNnbinvcFAXZwOScp",
      accounts: [ '7d5195e916c1007166c36e9ade2fa553f9b1de5f70076b5806a42e0b6099d5b3' ]
    },
  },
};

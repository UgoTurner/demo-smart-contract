module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1377",
    }
  },
  compilers: {
    solc: {
      version: "0.8.13",
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    }
}
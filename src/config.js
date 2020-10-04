module.exports = {
  blockchain: {
    nodeApiUrl: 'http://localhost:7740',
    rid: process.env.REACT_APP_BRID,
    explorerBaseUrl: 'https://explorer-testnet.chromia.com/',
  },
  eth: {
    hgetContractAddress: '0x7968bc6a03017ea2de509aaa816f163db0f35148',
    stakerContractAddress: '0xac9f425b4255ac392987af4447478f06bed3b786',
  },
  authServer: {
    url: 'http://localhost:8080',
  },
  matomo: {
    enabled: false,
    url: 'https://matomo.chromia.dev/',
    siteId: 3,
    trackErrors: true,
    jsFileName: 'js/',
    phpFilename: 'js/',
  },
  features: {},
  test: true,
};

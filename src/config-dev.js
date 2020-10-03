module.exports = {
  blockchain: {
    nodeApiUrl: 'http://35.205.218.13:7740',
    rid: '650FE2A3DF585E889CD80B0526B1A168DF654DD42ACD41E84D77997A1F1ACD1E',
    explorerBaseUrl: 'https://explorer-testnet.chromia.com/',
  },
  eth: {
    hgetContractAddress: '0x7968bc6a03017ea2de509aaa816f163db0f35148',
    stakerContractAddress: '0xac9f425b4255ac392987af4447478f06bed3b786',
  },
  authServer: {
    url: 'http://35.205.218.13:8080',
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
  logLevel: 'debug',
};

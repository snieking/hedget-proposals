module.exports = {
  blockchain: {
    nodeApiUrl: 'http://localhost:7740',
    rid: process.env.REACT_APP_BRID,
    explorerBaseUrl: 'https://explorer-testnet.chromia.com/',
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

const admin_priv_key = '';
const account_id = '';
const nodeApiUrl = 'http://localhost:7740';
const blockchainRID = '650FE2A3DF585E889CD80B0526B1A168DF654DD42ACD41E84D77997A1F1ACD1E';

// This script can be used to call the update_block operation which is used to update rate limiting.
const pcl = require('postchain-client');

const rest = pcl.restClient.createRestClient(nodeApiUrl, blockchainRID, 5);
const gtx = pcl.gtxClient.createClient(rest, Buffer.from(blockchainRID, 'hex'), []);

(async () => {
  const privKey = Buffer(admin_priv_key, 'hex');
  const pubKey = new pcl.util.createPublicKey(privKey);

  const tx = gtx.newTransaction([pubKey]);
  tx.addOperation('demote_core_user', account_id);
  tx.addOperation('nop');

  tx.sign(privKey, pubKey);
  await tx.postAndWaitConfirmation(privKey, pubKey);
})();

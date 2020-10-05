const admin_priv_key = '';
const eth_addr = '';
const nodeApiUrl = 'http://localhost:7740';
const blockchainRID = '57862189D255A82ED1DCCD925BD9F02DE8CFD32CF94D43022D68ED839FB91E01';

// This script can be used to call the update_block operation which is used to update rate limiting.
const pcl = require('postchain-client');

const rest = pcl.restClient.createRestClient(nodeApiUrl, blockchainRID, 5);
const gtx = pcl.gtxClient.createClient(rest, Buffer.from(blockchainRID, 'hex'), []);

(async () => {
  const privKey = Buffer(admin_priv_key, 'hex');
  const pubKey = new pcl.util.createPublicKey(privKey);

  const tx = gtx.newTransaction([pubKey]);
  tx.addOperation('demote_core_user', eth_addr);
  tx.addOperation('nop');

  tx.sign(privKey, pubKey);
  await tx.postAndWaitConfirmation(privKey, pubKey);
})();

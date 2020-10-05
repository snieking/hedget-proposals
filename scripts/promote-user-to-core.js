const admin_priv_key = '';
const eth_addr = '';
const nodeApiUrl = '';
const blockchainRID = '57862189D255A82ED1DCCD925BD9F02DE8CFD32CF94D43022D68ED839FB91E01';

const pcl = require('postchain-client');

const rest = pcl.restClient.createRestClient(nodeApiUrl, blockchainRID, 5);
const gtx = pcl.gtxClient.createClient(rest, Buffer.from(blockchainRID, 'hex'), []);

(async () => {
  const privKey = Buffer(admin_priv_key, 'hex');
  const pubKey = new pcl.util.createPublicKey(privKey);

  const tx = gtx.newTransaction([pubKey]);
  tx.addOperation('promote_to_core_user', eth_addr);
  tx.addOperation('nop');

  tx.sign(privKey, pubKey);
  await tx.postAndWaitConfirmation(privKey, pubKey);
})();

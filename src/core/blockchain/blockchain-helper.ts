import * as pc from 'postchain-client';
import config from '../../config';

export const restClient = pc.restClient.createRestClient(config.blockchain.nodeApiUrl, config.blockchain.rid);

export function createGtxClient(operationNames: string[]) {
  return pc.gtxClient.createClient(restClient, Buffer.from(config.blockchain.rid, 'hex'), operationNames);
}

export function query(name: string, data: any) {
  const gtx = createGtxClient([]);
  return gtx.query(name, data);
}

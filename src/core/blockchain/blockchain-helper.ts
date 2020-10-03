import * as pc from 'postchain-client';
import {
  Postchain,
  Blockchain,
  KeyPair,
  User,
  SingleSignatureAuthDescriptor,
  FlagsType
} from 'ft3-lib';
import config from '../../config';
import {AccountDetail, AccountState} from "../redux/account/account.state";
import {Operation} from "./Operation";

export const restClient = pc.restClient.createRestClient(config.blockchain.nodeApiUrl, config.blockchain.rid);
let blockchain: Blockchain;

export async function initBlockchain(): Promise<Blockchain> {
  if (!blockchain) {
    blockchain = await new Postchain(config.blockchain.nodeApiUrl).blockchain(
      Buffer.from(config.blockchain.rid, 'hex')
    );
  }
  return blockchain;
}

export function createGtxClient(operationNames: string[]) {
  return pc.gtxClient.createClient(restClient, Buffer.from(config.blockchain.rid, 'hex'), operationNames);
}

export function query(name: string, data: any) {
  const gtx = createGtxClient([]);
  return gtx.query(name, data);
}

let cachedUser: User = null;

function getUser(as: AccountState): User {
  if (!as.accountDetail) throw Error("user unknown");
  if (cachedUser) {
    return cachedUser; // TODO: check if details match
  }
  const authDescriptor = new SingleSignatureAuthDescriptor(
    as.keyPair.pubKey,
    [FlagsType.Transfer],
    ['block_time', 'lt', as.accountDetail.validUntil * 1000]
  );
  cachedUser = new User(as.keyPair, authDescriptor);
  return cachedUser;
}

export function addAuthToOperation(as: AccountState, op: Operation): Operation {
  if (!as.accountDetail) throw Error("user unknown");
  const user = getUser(as);
  return new Operation(op.name,
    [Buffer.from(as.accountDetail.accountID, 'hex'), user.authDescriptor.id, ...op.args]);
}

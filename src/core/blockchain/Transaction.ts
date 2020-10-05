import { v4 as uuidv4 } from 'uuid';
import { KeyPair } from 'ft3-lib';
import { Operation } from './Operation';
import { createGtxClient } from './blockchain-helper';

export class Transaction {
  private operations: Operation[] = [];

  private pubKey: Buffer;

  private privKey: Buffer;

  public static create() {
    return new Transaction();
  }

  public addOperation(operation: Operation) {
    this.operations.push(operation);
    return this;
  }

  public addNop() {
    this.operations.push(new Operation('nop', [uuidv4()]));
    return this;
  }

  public sign(kp: KeyPair) {
    this.privKey = kp.privKey;
    this.pubKey = kp.pubKey;
    return this;
  }

  public confirm(): Promise<any> {
    const gtx = createGtxClient([]);
    const req = gtx.newTransaction([this.pubKey]);
    this.operations.forEach((o) => req.addOperation(o.name, ...o.args));
    req.sign(this.privKey, this.pubKey);
    return req.postAndWaitConfirmation();
  }
}

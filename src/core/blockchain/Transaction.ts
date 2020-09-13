import { v4 as uuidv4 } from 'uuid';
import { Operation } from './Operation';
import { createGtxClient } from './blockchain-helper';

export class Transaction {
  private operations: Operation[] = [];

  private pubKey: string;

  private privKey: string;

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

  public sign(privKey: string, pubKey: string) {
    this.privKey = privKey;
    this.pubKey = pubKey;
    return this;
  }

  public confirm(): Promise<any> {
    const gtx = createGtxClient(this.operations.map((o) => o.name));
    const req = gtx.newTransaction([this.pubKey]);

    this.operations.forEach((o) => req[o.name](o.args));

    req.sign(this.privKey, this.pubKey);
    return req.send();
  }
}

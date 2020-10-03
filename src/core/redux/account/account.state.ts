import { KeyPair } from 'ft3-lib';

export enum AccountActionTypes {
  CHECK_AUTHORIZED = 'ACCOUNT/CHECK_AUTHORIZED',
  SET_ACCOUNT_DETAIL = 'ACCOUNT/SET_DETAIL',
}

export interface AccountDetail {
  validUntil: number;
  accountID: string;
}

export interface AccountState {
  isChecked: boolean;
  keyPair: KeyPair;
  accountDetail?: AccountDetail;
}

import { KeyPair } from '../../../shared/types';

export enum AccountActionTypes {
  CHECK_AUTHORIZED = 'ACCOUNT/CHECK_AUTHORIZED',
  CREATE_KEY_PAIR = 'ACCOUNT/SET_KEYS',
}

export interface AccountState {
  isChecked: boolean;
  keyPair: KeyPair;
}

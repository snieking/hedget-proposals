export enum AccountActionTypes {
  CHECK_AUTHORIZED = 'ACCOUNT/CHECK_AUTHORIZED',
  SET_KEYS = 'ACCOUNT/SET_KEYS',
}

export interface AccountState {
  isChecked: boolean;
  pubKey: string;
  privKey: string;
}

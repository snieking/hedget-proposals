import { KeyPair } from 'ft3-lib';

export enum AccountActionTypes {
  CHECK_CORE_ACCOUNT = 'ACCOUNT/CHECK_CORE_ACCOUNT',
  SET_CORE_ACCOUNT = 'ACCOUNT/SET_CORE_ACCOUNT',
  CHECK_AMOUNT_STAKED = 'ACCOUNT/CHECK_AMOUNT_STAKED',
  SET_AMOUNT_STAKED = 'ACCOUNT/SET_AMOUNT_STAKED',
  SET_ACCOUNT_DETAIL = 'ACCOUNT/SET_DETAIL',
  CHECK_ETH_ADDRESS = 'ACCOUNT/CHECK_ETH_ADDRESS',
  SET_ETH_ADDRESS = 'ACCOUNT/SET_ETH_ADDRESS'
}

export interface AccountDetail {
  validUntil: number;
  accountID: string;
}

export interface AccountState {
  isChecked: boolean;
  keyPair: KeyPair;
  accountDetail?: AccountDetail;
  ethAddress: string;
  isCoreAccount: boolean;
  amountStaked: number;
}

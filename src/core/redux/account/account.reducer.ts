/* eslint-disable  @typescript-eslint/camelcase */

import { createReducer } from '@reduxjs/toolkit';
import { KeyPair } from 'ft3-lib';
import { AccountDetail, AccountState } from './account.state';
import {
  setAccountDetail,
  setAmountStaked,
  setCoreAccount,
  setEthAddress
} from './account.actions';

function makeOrLoadKeyPair(): KeyPair {
  if ('hp_privkey' in localStorage) {
    const pk = localStorage.hp_privkey;
    return new KeyPair(pk);
  }

  const kp = new KeyPair();
  localStorage.hp_privkey = kp.privKey.toString('hex');
  return kp;
}

function getStoredAccountDetail(): AccountDetail | undefined {
  if ('hp_valid_until' in localStorage) {
    return {
      validUntil: parseInt(localStorage.hp_valid_until),
      accountID: localStorage.hp_account_id,
    };
  }
  return undefined;
}

function storeAccountDetail(ad: AccountDetail) {
  localStorage.hp_valid_until = ad.validUntil;
  localStorage.hp_account_id = ad.accountID;
}

const initialAccountState: AccountState = {
  isChecked: true,
  isCoreAccount: false,
  ethAddress: null,
  amountStaked: 0,
  keyPair: makeOrLoadKeyPair(),
  accountDetail: getStoredAccountDetail(),
};

export const accountReducer = createReducer(initialAccountState, (builder) => {
  builder
    .addCase(setAccountDetail, (state, action) => {
      storeAccountDetail(action.payload);
      state.accountDetail = action.payload;
    })
    .addCase(setCoreAccount, (state, action) => {
      state.isCoreAccount = action.payload;
    })
    .addCase(setAmountStaked, (state, action) => {
      state.amountStaked = action.payload;
    })
    .addCase(setEthAddress, (state, action) => {
      state.ethAddress = action.payload;
    });
});

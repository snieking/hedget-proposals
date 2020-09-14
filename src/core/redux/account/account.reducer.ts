import { createReducer } from '@reduxjs/toolkit';
import { AccountState } from './account.state';
import { checkAuthorized, createKeyPairFromPrivateKey } from './account.actions';

const initialAccountState: AccountState = {
  isChecked: false,
  keyPair: null,
};

export const accountReducer = createReducer(initialAccountState, (builder) => {
  builder
    .addCase(checkAuthorized, (state) => {
      state.isChecked = true;
    })
    .addCase(createKeyPairFromPrivateKey, (state, action) => {
      state.keyPair = {
        privkey: action.payload,
        pubkey: '',
      };
    });
});

import { createReducer } from '@reduxjs/toolkit';
import { AccountState } from './account.state';
import { checkAuthorized, setKeys } from './account.actions';

const initialAccountState: AccountState = {
  isChecked: false,
  pubKey: null,
  privKey: null,
};

export const accountReducer = createReducer(initialAccountState, (builder) => {
  builder
    .addCase(checkAuthorized, (state) => {
      state.isChecked = true;
    })
    .addCase(setKeys, (state, action) => {
      state.privKey = action.payload;
      state.pubKey = '';
    });
});

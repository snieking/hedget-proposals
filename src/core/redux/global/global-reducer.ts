import { createReducer } from '@reduxjs/toolkit';
import { GlobalState } from './global-state';
import { setLoading, setOperationPending } from './global-actions';

const initialGlobalState: GlobalState = {
  loading: false,
  operationPending: false,
};

export const globalReducer = createReducer(initialGlobalState, (builder) => {
  builder
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(setOperationPending, (state, action) => {
      state.operationPending = action.payload;
    });
});

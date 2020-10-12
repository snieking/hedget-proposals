import { createReducer } from '@reduxjs/toolkit';
import { SnackbarState } from './snackbar-state';
import { clearError, clearSuccess, notifyError, notifySuccess } from './snackbar-actions';

const initialSnackbarState: SnackbarState = {
  successMessage: null,
  errorMessage: null,
};

export const snackbarReducer = createReducer(initialSnackbarState, (builder) => {
  builder
    .addCase(notifySuccess, (state, action) => {
      state.successMessage = action.payload;
    })
    .addCase(clearSuccess, (state) => {
      state.successMessage = null;
    })
    .addCase(notifyError, (state, action) => {
      state.errorMessage = action.payload;
    })
    .addCase(clearError, (state) => {
      state.errorMessage = null;
    });
});

import { createAction } from '@reduxjs/toolkit';
import { SnackbarActionTypes } from './snackbar-state';
import { withPayloadType } from '../util';

export const notifySuccess = createAction(SnackbarActionTypes.NOTIFY_SUCCESS, withPayloadType<string>());

export const clearSuccess = createAction(SnackbarActionTypes.CLEAR_SUCCESS);

export const notifyError = createAction(SnackbarActionTypes.NOTIFY_ERROR, withPayloadType<string>());

export const clearError = createAction(SnackbarActionTypes.CLEAR_ERROR);

export const snackbarActions = {
  notifyError,
  notifySuccess,
};

import { createAction } from '@reduxjs/toolkit';
import { GlobalActionTypes } from './global-state';
import { withPayloadType } from '../util';

export const setLoading = createAction(GlobalActionTypes.SET_LOADING, withPayloadType<boolean>());

export const setOperationPending = createAction(GlobalActionTypes.SET_OPERATION_PENDING, withPayloadType<boolean>());

import { createAction } from '@reduxjs/toolkit';
import { AccountActionTypes } from './account.state';
import { withPayloadType } from '../util';

export const checkAuthorized = createAction(AccountActionTypes.CHECK_AUTHORIZED);

export const setKeys = createAction(AccountActionTypes.SET_KEYS, withPayloadType<string>());

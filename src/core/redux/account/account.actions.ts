import { createAction } from '@reduxjs/toolkit';
import { AccountActionTypes, AccountDetail } from './account.state';
import { withPayloadType } from '../util';

export const setAccountDetail = createAction(AccountActionTypes.SET_ACCOUNT_DETAIL, withPayloadType<AccountDetail>());

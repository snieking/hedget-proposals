import { createAction } from '@reduxjs/toolkit';
import { AccountActionTypes, AccountDetail } from './account.state';
import { withPayloadType } from '../util';

export const setAccountDetail = createAction(AccountActionTypes.SET_ACCOUNT_DETAIL, withPayloadType<AccountDetail>());

export const checkCoreAccount = createAction(AccountActionTypes.CHECK_CORE_ACCOUNT);

export const setCoreAccount = createAction(AccountActionTypes.SET_CORE_ACCOUNT, withPayloadType<boolean>());

export const checkAmountStaked = createAction(AccountActionTypes.CHECK_AMOUNT_STAKED);

export const setAmountStaked = createAction(AccountActionTypes.SET_AMOUNT_STAKED, withPayloadType<number>());

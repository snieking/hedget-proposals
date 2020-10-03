import { all } from 'redux-saga/effects';
import { accountWatcher } from './account/account.sagas';

export default function* saga() {
  yield all([accountWatcher()]);
}

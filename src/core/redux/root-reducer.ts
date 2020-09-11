import { combineReducers } from 'redux';
import ApplicationState from './application-state';
import { globalReducer } from './global/global-reducer';
import { accountReducer } from './account/account.reducer';

const reducer = combineReducers<ApplicationState>({
  global: globalReducer,
  account: accountReducer,
});

export default reducer;

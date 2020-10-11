import { combineReducers } from 'redux';
import ApplicationState from './application-state';
import { globalReducer } from './global/global-reducer';
import { accountReducer } from './account/account.reducer';
import { snackbarReducer } from './snackbar/snackbar-reducer';

const reducer = combineReducers<ApplicationState>({
  global: globalReducer,
  account: accountReducer,
  snackbar: snackbarReducer,
});

export default reducer;

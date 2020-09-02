import { combineReducers } from 'redux';
import ApplicationState from './application-state';
import { globalReducer } from './global/global-reducer';

const reducer = combineReducers<ApplicationState>({
  global: globalReducer,
});

export default reducer;

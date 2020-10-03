import logger from 'redux-logger';
import { configureStore, Middleware, EnhancedStore } from '@reduxjs/toolkit';
import reducer from './root-reducer';

const middleware: Middleware[] = [];

const devEnv = process.env.NODE_ENV === 'development';

if (devEnv) {
  middleware.push(logger);
}

export default (): EnhancedStore => {
  const store = configureStore({
    reducer,
    devTools: devEnv,
    middleware,
  });
  return store;
};

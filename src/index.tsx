import React from 'react';
import { render } from 'react-dom';
import getStore from './core/redux/Store';
import './index.css';

import App from './App';

const store = getStore();

render(<App store={store} />, window.document.getElementById('root'));

import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import App from './components/App';
const initialState = window.__INITIAL_STATE__;

loadableReady(() => {
  hydrate(<App initialState={initialState} />, document.getElementById('root'));
});

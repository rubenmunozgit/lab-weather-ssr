import React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App';
const initialState =  window.__INITIAL_STATE__;

hydrate(
    <App initialState={initialState} />,
  document.getElementById('root')
);
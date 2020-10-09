import React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App';
import './components/global.css';
const initialState =  window.__INITIAL_STATE__;

hydrate(
    <App initialState={initialState} />,
  document.getElementById('root')
);
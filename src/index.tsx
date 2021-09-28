import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AfazerProvider } from './contexts/AfazerContext';

ReactDOM.render(
  <React.StrictMode>
    <AfazerProvider>
      <App />
    </AfazerProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

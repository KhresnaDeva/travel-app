import React from 'react';
import ReactDOM from 'react-dom/client'; // Gunakan 'react-dom/client' untuk React 18
import { Provider } from 'react-redux';
import { store } from './store/store'; // Sesuaikan path dengan lokasi store
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

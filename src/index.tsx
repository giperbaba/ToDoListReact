import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { OnlineProvider } from './components/OnlineProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <OnlineProvider>
      <App />
    </OnlineProvider>
  </React.StrictMode>
);

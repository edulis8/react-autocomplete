import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppContext, AppProvider } from './AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);

function AppWrapper() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

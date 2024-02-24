import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/input.css';
import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit/AuthProvider';

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider
      store={store}
    >
     <App />
    </AuthProvider>
  </React.StrictMode>
);

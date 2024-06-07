import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from './context/AdminContext';
import { Auth0Provider } from '@auth0/auth0-react';
import { FormProvider } from './context/FormContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-5ih04lk23vfgomjx.us.auth0.com"
      clientId="VH4tIFbAvVcZq3ExS8skWOoEoGdVlP3W"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <ConfigProvider>
        <FormProvider>
          <App />
        </FormProvider>
      </ConfigProvider>
    </Auth0Provider>
  </React.StrictMode>
);

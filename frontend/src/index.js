import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-4kcfvgpqysz7l2oo.us.auth0.com"
    clientId="Sh40ZH5ozmKOrCgU8Gt59QVbIjOdAntI"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>

 
    <React.StrictMode>
      <App />
    </React.StrictMode>
   </Auth0Provider>
);


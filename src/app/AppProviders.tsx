import React from 'react';
import { AppRoutes } from 'app/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

function AppProviders() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

export default AppProviders;

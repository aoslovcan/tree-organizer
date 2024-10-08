import React from 'react';
import { AppRoutes } from 'app/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ModalProvider } from './modal';

function AppProviders() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <ModalProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ModalProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default AppProviders;

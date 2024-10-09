import React from 'react';
import { AppRoutes } from 'app/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ModalProvider } from './modal';
import { NotificationProvider } from './notification';

function AppProviders() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <NotificationProvider>
          <ModalProvider>
            <Router>
              <AppRoutes />
            </Router>
          </ModalProvider>
        </NotificationProvider>
      </Provider>
    </HelmetProvider>
  );
}

export default AppProviders;

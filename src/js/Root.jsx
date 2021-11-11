import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import theme from 'Themes/index';

import GlobalErrorDialog from './views/stateComponents/GlobalErrorDialog';
import GlobalSuccessToast from './views/stateComponents/GlobalSuccessToast';

import './common/i18n/i18n';
import 'fontsource-roboto';

const Root = ({ Routes, history, store }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>
          <Routes />
          <CssBaseline />
          <GlobalErrorDialog />
          <GlobalSuccessToast />
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

Root.propTypes = {
  history: PropTypes.object.isRequired,
  Routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default Root;

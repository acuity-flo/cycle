import React from 'react';
import ReactDOM from 'react-dom';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "react-billboardjs/lib/billboard.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#545454'
    },
    secondary: {
      main: '#8FB5DE'
    },
    error: {
      main: '#DEB88F'
    },
    success: {
      main: '#9BB47A'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'Hammersmith One, sans-serif',
    }
  },
})

theme.typography.body1 = {
  fontFamily: 'Roboto, sans-serif',
  fontSize: '1em',
  '@media(max-width: 400px)': {
    fontSize: '0.6em'
  }
}


ReactDOM.render(

  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

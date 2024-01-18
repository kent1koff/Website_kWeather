import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './components/MainPage/MainPage';
import { ThemeProvider } from './components/Theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <Main />
  </ThemeProvider>
);
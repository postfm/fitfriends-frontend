import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import '/public/css/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import App from './components/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
Modal.setAppElement('#root');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SidebarProvider } from './components/SidebarContext';

ReactDOM.render(
  <React.StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>

    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);

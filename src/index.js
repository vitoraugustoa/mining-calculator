import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter,
} from "react-router-dom";

import Routes from './Router/router';
import Container from './Components/Container/container';
import MiningContextProvider from './Contexts/miningContext';

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <section>
        <h1>Calculadora Mining</h1>
        <MiningContextProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </MiningContextProvider>
      </section>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

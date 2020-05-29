import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Game } from './Game/Game';

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="sm">
      <Game sizeField = {7}/>
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

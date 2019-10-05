import React from 'react';
import ReactDOM from 'react-dom';

import Heading from './heading';
import Stopwatch from './stopwatch';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Heading title="stopwatch" />
      <Stopwatch />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

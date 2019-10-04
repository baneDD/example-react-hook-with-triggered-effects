import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const Stopwatch = () => {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  const formatTime = time => {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return `${("00" + minutes).slice(-2)}:${("00" + seconds).slice(-2)}:${(
      "000" + milliseconds
    ).slice(-3)}`;
  };

  useEffect(() => {
    let interval = null;

    if (running) {
      let startTime = new Date().getTime();

      interval = setInterval(() => {
        let endTime = new Date().getTime();
        setElapsed(elapsed => elapsed + (endTime - startTime));
        startTime = endTime;
      });
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [elapsed, running]);

  const handleStart = () => {
    setRunning(!running);
  };

  const handleClear = () => {
    setRunning(false);
    setElapsed(0);
  };

  return (
    <div className="container">
      <div className="monitor">{formatTime(elapsed)}</div>
      <button className={running ? "red" : "green"} onClick={handleStart}>
        {running ? "Stop" : "Start"}
      </button>
      <button className="red" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Stopwatch />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

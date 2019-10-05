import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [elapsed, setElapsed] = useState(0); // Elapsed time for the timer, in milliseconds
  const [startTime, setStartTime] = useState(null); // Start time for the running timing session
  const [running, setRunning] = useState(false);
  const [clearing, setClearing] = useState(false);

  const formatTime = time => {
    const milliseconds = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);

    return `${('00' + minutes).slice(-2)}:${('00' + seconds).slice(
      -2,
    )}:${('000' + milliseconds).slice(-3)}`;
  };

  useEffect(() => {
    let interval = null;

    if (running) {
      interval = setInterval(() => {
        setElapsed(new Date() - startTime);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running, startTime]);

  // Required to correctly clear the timer if the user
  // hits the "clear" button while the timer is running
  useEffect(() => {
    setElapsed(0);
    setClearing(false);
  }, [clearing]);

  const handleStart = () => {
    // If this button was clicked while the timer is stopped,
    // record the current time minus any previously elapsed time
    if (!running) setStartTime(new Date().getTime() - elapsed);

    // Toggle the running flag
    setRunning(!running);
  };

  const handleClear = () => {
    setRunning(false);
    setClearing(true);
  };

  return (
    <div className="container">
      <div className="monitor">{formatTime(elapsed)}</div>
      <button
        className={running ? 'red' : 'green'}
        onClick={handleStart}
      >
        {running ? 'Stop' : 'Start'}
      </button>
      <button className="red" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default Stopwatch;

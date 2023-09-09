import React, { useState, useEffect } from 'react';
import "./App.css"

const App: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(30);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let audio: HTMLAudioElement;

    switch (seconds) {
      case 3:
        audio = new Audio('path_to_3_seconds_audio.mp3');
        audio.play();
        break;
      case 2:
        audio = new Audio('path_to_2_seconds_audio.mp3');
        audio.play();
        break;
      case 1:
        audio = new Audio('path_to_1_second_audio.mp3');
        audio.play();
        break;
      case 0:
        audio = new Audio('path_to_0_seconds_audio.mp3');
        audio.play();
        resetTimer();
        break;
      default:
        break;
    }

    if (!intervalId) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setIntervalId(id);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [seconds, intervalId]);

  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setSeconds(30);
    setIntervalId(null);
  };

  const adjustTime = (amount: number) => {
    setSeconds((prevSeconds) => {
      const newSeconds = prevSeconds + amount;
      if (newSeconds > 30) {
        return 30;
      }
      return Math.max(0, newSeconds);
    });
  };
  

  return (
    <div className="main-container">
      <div className="content has-text-centered">
        <h2>일격필살 타이머</h2>
        <h1 className="title" style={{ color: seconds <= 5 ? 'red' : 'inherit' }}>{seconds}초</h1>
        <div className="buttons are-centered">
          <button className="button is-primary is-large" onClick={() => adjustTime(1)}>+1초</button>
          <button className="button is-danger is-large ml-5" onClick={() => adjustTime(-1)}>-1초</button>
        </div>
        <div>
          <button className="button is-info is-large" onClick={resetTimer}>초기화</button>
        </div>
      </div>
    </div>

  );
  
};

export default App;

import React, { useState, useEffect } from 'react';
import "./App.css"

const App: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(30);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false); // 음성 상태를 관리하는 state

  useEffect(() => {
    let audio: HTMLAudioElement;
  
    if (isAudioOn) {
      switch (seconds) {
        case 3:
          audio = new Audio('/sound/ilpil_three.mp3');
          audio.play();
          break;
        case 2:
          audio = new Audio('/sound/ilpil_two.mp3');
          audio.play();
          break;
        case 1:
          audio = new Audio('/sound/ilpil_one.mp3');
          audio.play();
          break;
        case 0:
          audio = new Audio('/sound/ilpil_zero.mp3');
          audio.play();
          resetTimer();
          break;
        default:
          break;
      }
    }
  }, [seconds, isAudioOn]);
  
  useEffect(() => {
    if (seconds > 0) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      setIntervalId(id);
  
      return () => {
        clearInterval(id);
      };
    } else {
      resetTimer(); // seconds가 0이 되면 타이머를 초기화합니다.
    }
  }, [seconds]);
  
  
  

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
  

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  return (
    <div className="main-container">
      <div className="content has-text-centered">
        <h2>일격필살 타이머</h2>
        <button className = "button is-danger is-outlined" onClick={toggleAudio}>
          {isAudioOn ? "음성 ON" : "음성 OFF"}
        </button>
        <h1 className="title" style={{ color: seconds <= 5 ? 'red' : 'inherit' }}>{seconds}초</h1>
        <div className="buttons are-centered">
          <button className="button is-primary is-large" onClick={() => adjustTime(1)}>+1초</button>
          <button className="button is-danger is-large ml-5" onClick={() => adjustTime(-1)}>-1초</button>
        </div>
        <div>
          <button className="button is-info is-large" onClick={resetTimer}>초기화</button>
        </div>
        
      </div>
      <p className='has-text-grey-lighter mt-3'> "이 페이지의 음성은 인공지능 영상 제작 프로그램, 온에어스튜디오 OnAir Studio를 통해 제작되었습니다"
#온에어스튜디오 #onairstudio https://abit.ly/onairstudio </p>
    </div>

  );
  
};

export default App;

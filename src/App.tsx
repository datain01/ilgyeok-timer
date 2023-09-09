import React, { useState, useEffect } from 'react';
import "./App.css"

const App: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(30);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);

  const playAudio = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

  useEffect(() => {
    let audio: HTMLAudioElement;
  
    if (isAudioOn) {
      switch (seconds) {
        case 3:
          audio = new Audio('/sound/ilpil_three.mp3');
          break;
        case 2:
          audio = new Audio('/sound/ilpil_two.mp3');
          break;
        case 1:
          audio = new Audio('/sound/ilpil_one.mp3');
          break;
        case 0:
          audio = new Audio('/sound/ilpil_zero.mp3');
          break;
        default:
          return; // seconds가 3, 2, 1, 0이 아닌 경우 아무것도 하지 않고 반환
      }
      audio.play();
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
      resetTimer();
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
    if (!isAudioOn) {
      // 사용자 상호작용을 통해 오디오를 재생합니다.
      playAudio('/sound/ilpil_three.mp3');
    }
  };

  return (
    <div className="main-container">
      <div className="content has-text-centered">
        <h2>일격필살 타이머</h2>
        <button className="button is-danger is-outlined" onClick={toggleAudio}>
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
      <p className='has-text-centered'>made by datain <br/> contact: mystrange01@gmail.com</p>
      <p className='has-text-grey-lighter mt-3 has-text-centered'> "이 페이지의 음성은 인공지능 영상 제작 프로그램, 온에어스튜디오 OnAir Studio를 통해 제작되었습니다" <br/>
          #온에어스튜디오 #onairstudio https://abit.ly/onairstudio </p>
    </div>
  );
};

export default App;

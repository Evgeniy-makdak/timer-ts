import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReplayIcon from '@mui/icons-material/Replay';

const TimerContainer = styled.div`
  text-align: center;
`;

const TimerTitle = styled.h1`
  font-size: 24px;
`;

const TimerDisplay = styled.div`
  font-size: 32px;
  width: 100px;
  margin: 0 auto;
`;

const TimerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Timer: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  const handleStartStop = useCallback(() => {
    setRunning((prevRunning) => !prevRunning);
  }, []);

  const handleReset = useCallback(() => {
    setRunning(false);
    setTime(0);
  }, []);

  const formatTime = useCallback((time: number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = (time % 1000).toString().padStart(2, '0').slice(0, 2);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds}`;
  }, []);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (running) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [running]);

  return (
    <TimerContainer>
      <TimerTitle>Timer</TimerTitle>
      <TimerDisplay>{formatTime(time)}</TimerDisplay>
      <TimerButtons>
        <Button variant="contained" color="primary" onClick={handleStartStop}>
          {running ? <PauseIcon /> : <PlayArrowIcon />}
          <Typography>{running ? 'Pause' : 'Start'}</Typography>
        </Button>
        <Button variant="contained" color="secondary" onClick={handleReset}>
          <ReplayIcon />
          <Typography>Reset</Typography>
        </Button>
      </TimerButtons>
    </TimerContainer>
  );
};

export default Timer;

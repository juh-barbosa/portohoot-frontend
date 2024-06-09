import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const Timer = () => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [duration, setDuration] = useState('');
  const socket = io('http://localhost:8000'); // Certifique-se de usar a URL correta do seu servidor

  // Função debounce
  const debounce = (func: { (time: any): void; (arg0: any): void; }, wait: number | undefined) => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    return function(...args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // @ts-ignore
        func(...args);
      }, wait);
    };
  };

  // Função de atualização do tempo restante com debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetRemainingTime = useCallback(debounce((time) => {
    setRemainingTime(time);
  }, 500), []); // 500ms de debounce

  useEffect(() => {
    socket.on('timer-update', (time) => {
      debouncedSetRemainingTime(time);
    });

    return () => {
      socket.disconnect();
    };
  }, [debouncedSetRemainingTime, socket]);

  const startTimer = () => {
    const timerData = {
      event: 'start-timer',
      data: {
        duration: parseInt(duration, 10),
      },
    };
    socket.emit('start-timer', timerData); // Não há necessidade de JSON.stringify aqui
  };
  console.log(remainingTime)
  return (
    <div>
      <h1>Timer</h1>
      <div>
        <label>
          Duration (seconds):
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <button onClick={startTimer}>Start Timer</button>
      </div>
      <div>
        {remainingTime !== null && <h2>Remaining Time: {remainingTime} seconds</h2>}
        <h2>Remaining Time: {remainingTime} seconds</h2>
      </div>
    </div>
  );
};

export default Timer;

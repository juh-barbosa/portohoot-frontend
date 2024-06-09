import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Timer = () => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [duration, setDuration] = useState('');
  const socket = io('https://portohoot-backend-juhbarbosas-projects.vercel.app/'); // Certifique-se de usar a URL correta do seu servidor

  useEffect(() => {
    socket.on('timer-update', (time) => {
      setRemainingTime(time);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const startTimer = () => {
    const timerData = {
      event: 'start-timer',
      data: {
        duration: parseInt(duration, 10),
      },
    };
    socket.emit('start-timer', timerData); // Não há necessidade de JSON.stringify aqui
  };

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
      </div>
    </div>
  );
};

export default Timer;

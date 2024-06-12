import {useCallback, useEffect, useState} from "react";
import io from "socket.io-client";
import styles from './Cronometer.module.sass'
import http from "../../environment/environment";

export default function Cronometer(){
    const [remainingTime, setRemainingTime] = useState(null);
    const [status, setStatus] = useState(true)
    const socket = io('https://portohoot-backend.onrender.com');
    // const socket = io('http://localhost:5000');

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

  async function ativarJogo(){
      await http.post('release')
      setStatus(false)
  }

      const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };

    return(
        <section className={styles.container}>
            <div className={styles.container__title}>
                <h1>PortoHoot</h1>
            </div>
            <div className={styles.container__timer}>
                <span
                    style={remainingTime != null && remainingTime <= 10 ? {color: "#ff0000"} : {}}> {remainingTime != null && remainingTime > 0 ? formatTime(remainingTime) : '00:00'}</span>
            </div>
            <div className={styles.container__developer}>
                <span className={styles.container__developer_one}>DESENVOLVEDORA:</span>
                <span className={styles.container__developer_two}>Julia Barbosa de Freitas</span>
            </div>
            {
                status ?
                    <div className={styles.container__button}>
                        <button onClick={() => ativarJogo()}>INICIAR JOGO</button>
                    </div>
                    : ''
            }
        </section>
    )
}
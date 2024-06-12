import React, { useEffect } from 'react';
import ampulheta from '../../assets/img/ampulheta.gif';
import espada from '../../assets/img/espadas.gif';
import styles from './Waiting.module.sass';
import io from 'socket.io-client';

const socket = io('https://portohoot-backend.onrender.com'); // URL do seu servidor WebSocket
// const socket = io('http://localhost:5000'); // URL do seu servidor WebSocket

export default function Waiting() {
    useEffect(() => {
        socket.on('release', () => {
            window.location.href = '/quest';
        });

        return () => {
            socket.off('release');
        };
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.container__header}>
                {localStorage.getItem('icone') ? (
                    <div className={styles.container__header_div}>
                        <img
                            src={`data:image/gif;base64,${localStorage.getItem('icone')}`}
                            alt="Gif"
                            className={styles.container__header_div_img}
                        />
                    </div>
                ) : (
                    <div className={styles.container__header_div}>
                        <img
                            src={espada}
                            alt="Gif"
                            className={styles.container__header_div_img}
                        />
                    </div>
                )}
                <div className={styles.container__header_title}>
                    <h1 className={styles.container__header_title_one}>Bem vindo</h1>
                    <h1 className={styles.container__header_title_two}>
                        equipe <span className={styles.container__header_title_span}>{localStorage.getItem('nome') || 'JUBILEU'}</span>
                    </h1>
                </div>
                <span className={styles.container__header_waiting}>A partida começara em breve...</span>
            </div>
            <div className={styles.container__footer}>
                <img src={ampulheta} alt='ampulheta' className={styles.container__footer_img} />
            </div>
        </section>
    );
}

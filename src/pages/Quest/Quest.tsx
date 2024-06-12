import {useCallback, useEffect, useState} from "react";
import io from "socket.io-client";
import styles from "./Quest.module.sass";
import espada from "../../assets/img/espadas.gif";
import http from "../../environment/environment";

export default function Quest(){
    const [remainingTime, setRemainingTime] = useState(0);
    const [atual, setAtual] = useState<any>(null);
    const [pontos, setPontos] = useState(0)
    const socket = io('https://portohoot-backend.onrender.com'); // Certifique-se de usar a URL correta do seu servidor
    // const socket = io('http://localhost:5000'); // URL do seu servidor WebSocket
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);

    const handleRespostaClick = (value: any) => {
        setRespostaSelecionada(value);
    };

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

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
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

    async function getAtual(){
        await http.get('pergunta/atual').then((res) => {
            setAtual(res.data)
        })
    }

    useEffect(() => {
        if (remainingTime != null && remainingTime >= 0 && atual == null) {
            getAtual()
            console.log('chamou')
        }
    }, [remainingTime]);


    async function enviarResposta() {
        let respondidas = localStorage.getItem('respondidas');
        respondidas = respondidas ? JSON.parse(respondidas) : [];
        // @ts-ignore
        respondidas.push(atual?._id);
        localStorage.setItem('respondidas', JSON.stringify(respondidas));

        await http.put(`pergunta/responder/${atual?._id}`, {
            timer: remainingTime,
            equipe: localStorage.getItem('_id'),
            resposta: respostaSelecionada,
        }).then((res) => {
            setPontos(res.data['pontuacao']);
        }).catch((error) => {
            console.error("Erro ao enviar resposta:", error);
        });

        setAtual(null);
    }


    return(
        <section className={styles.container}>
            <div className={styles.container__timer}>
                <div className={styles.container__timer_div}>
                    <span className={styles.container__timer_div_span}>
                        {remainingTime != null && remainingTime > 0 ? formatTime(remainingTime) : '00:00'}
                    </span>
                </div>
            </div>
            <div className={styles.container__title}>
                <h1 className={styles.container__title_one}>Porto</h1>
                <h1 className={styles.container__title_two}>Hoot</h1>
            </div>
            <div className={styles.container__quest}>
                {
                    // @ts-ignore
                    remainingTime != null && remainingTime > 0 && atual != null && (localStorage.getItem('respondidas') === null || !localStorage.getItem('respondidas').includes(atual._id)) ?
                        <>
                            <h2 className={styles.container__quest_title}>{atual?.pergunta}</h2>
                            <div className={styles.container__quest_answer}>
                                {atual?.respostas.map((element: any, index: number) => (
                                    <div key={index} className={styles.container__quest_answer_div}>
                                        <input
                                            type='radio'
                                            className={styles.container__quest_answer_div_input}
                                            name="resposta"
                                            value={element}
                                            checked={element === respostaSelecionada}
                                            onChange={() => handleRespostaClick(element)}
                                        />
                                        <span className={styles.container__quest_answer_div_span}>{element}</span>
                                    </div>
                                ))}
                            </div>
                            <button className={styles.container__quest_button} onClick={() => enviarResposta()}>ENVIAR</button>
                        </>
                        :
                        <>
                            <h2 className={styles.container__quest_title}>Aguarde a pergunta ser liberada</h2>
                            <h2 className={styles.container__quest_title}>Pontos da equipe: {pontos}</h2>
                        </>
                }

            </div>
            <div className={styles.container__footer}>
                {
                    localStorage.getItem('icone') ?
                        <div className={styles.container__footer_div}>
                            <img
                                src={`data:image/gif;base64,${localStorage.getItem('icone')}`}
                                alt="Gif"
                                className={styles.container__footer_div_img}
                            />
                        </div>
                        :
                        <div className={styles.container__footer_div}>
                            <img
                                src={espada}
                                alt="Gif"
                                className={styles.container__footer_div_img}
                            />
                        </div>
                }
                <span className={styles.container__footer_name}>{localStorage.getItem('nome') || 'JUBILEU'}</span>
            </div>
            <div className={styles.container__developer}>
                <span className={styles.container__developer_one}>DESENVOLVEDORA:</span>
                <span> Julia Barbosa de Freitas</span>
            </div>
        </section>
    );
}

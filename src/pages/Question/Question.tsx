import styles from './Question.module.sass'
import http from "../../environment/environment";
import io from "socket.io-client";
import {useState} from "react";

export default function Question(){
    const socket = io('https://portohoot-backend.onrender.com');
    // const socket = io('http://localhost:5000');
    const [atual, setAtual] = useState<any>()
    const [status, setStatus] = useState<any>(0)

    async function liberarPergunta() {
        setStatus(0);

        await http.put('pergunta/liberar');
        await http.get('pergunta/atual').then((res) => {
            setAtual(res.data);
        });

        const timerData = {
            event: 'start-timer',
            data: {
                duration: 45,
            },
        };
        socket.emit('start-timer', timerData);

        let countdown = 45;
        const countdownInterval = setInterval(async () => {
            countdown--;
            if (countdown === 0) {
                clearInterval(countdownInterval);
                setStatus(1);
                if (atual && atual._id) { // Verifica se atual._id está definido
                    await http.put(`pergunta/pergunta/alterar/${atual._id}`, {
                        status: 2
                    })
                } else {
                    console.error("O ID da pergunta atual não está definido.");
                }
            }
        }, 1000);
    }
    console.log(atual?.respostas)
    return(
        <section className={styles.container}>
            <div className={styles.container__title}>
                <h1 className={styles.container__title_one}>Porto</h1>
                <h1 className={styles.container__title_two}>Hoot</h1>
            </div>
            <div className={styles.container__question}>
                <span>{atual?.pergunta}</span>
            </div>
            <div className={styles.container__answer}>
                {
                    atual?.respostas.map((element: any) => (
                        <div className={styles.container__answer_div} style={status === 1 && element == atual.correta ? {backgroundColor: "green"} : {}}>
                            <span className={styles.container__answer_div_span}>{element}</span>
                        </div>
                    ))
                }
            </div>
            <div className={styles.container__button}>
                <button onClick={() => liberarPergunta()}>LIBERAR PERGUNTA</button>
            </div>
        </section>
    )
}
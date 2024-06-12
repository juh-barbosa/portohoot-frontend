import styles from "./Podium.module.sass";
import sword from "../../assets/img/s.gif";
import http from "../../environment/environment";
import {useEffect, useState} from "react";

export default function Podium(){
    const [podium, setPodium] = useState<any>('')

    async function getPodium(){
        await http.get('equipe/podium').then((res) => {
            setPodium(res.data);
        })
    }

    useEffect(() => {
        getPodium();

        const interval = setInterval(() => {
            getPodium();
        }, 25000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.container}>
            <div className={styles.container__title}>
                <h1>PortoHoot</h1>
            </div>
            <div className={styles.container__podium}>
                <div className={styles.container__podium_div}>
                    <span className={styles.container__podium_div_position}>4°</span>
                    <div className={styles.container__podium_div_desc} style={{height: '15rem'}}>
                        <img src={`data:image/gif;base64,${podium[3]?.icone}`}
                             alt=''/>
                        <span>{podium[3]?.pontuacao}</span>
                    </div>
                    <span className={styles.container__podium_div_name}>{podium[3]?.nome}</span>
                </div>
                <div className={styles.container__podium_div}>
                    <span className={styles.container__podium_div_position}>2°</span>
                    <div className={styles.container__podium_div_desc} style={{height: '21rem'}}>
                        <img src={`data:image/gif;base64,${podium[1]?.icone}`} alt=''/>
                        <span>{podium[1]?.pontuacao}</span>
                    </div>
                    <span className={styles.container__podium_div_name}>{podium[1]?.nome}</span>
                </div>
                <div className={styles.container__podium_div}>
                    <span className={styles.container__podium_div_position}>1°</span>
                    <div className={styles.container__podium_div_desc} style={{height: '30rem'}}>
                        <img src={`data:image/gif;base64,${podium[0]?.icone}`} alt=''/>
                        <span>{podium[0]?.pontuacao}</span>
                    </div>
                    <span className={styles.container__podium_div_name}>{podium[0]?.nome}</span>
                </div>
                <div className={styles.container__podium_div}>
                    <span className={styles.container__podium_div_position}>3°</span>
                    <div className={styles.container__podium_div_desc} style={{height: '19rem'}}>
                        <img src={`data:image/gif;base64,${podium[2]?.icone}`} alt=''/>
                        <span>{podium[2]?.pontuacao}</span>
                    </div>
                    <span className={styles.container__podium_div_name}>{podium[2]?.nome}</span>
                </div>
                <div className={styles.container__podium_div}>
                    <span className={styles.container__podium_div_position}>5°</span>
                    <div className={styles.container__podium_div_desc} style={{height: '10rem'}}>
                        <img src={`data:image/gif;base64,${podium[4]?.icone}`} alt=''/>
                        <span>{podium[4]?.pontuacao}</span>
                    </div>
                    <span className={styles.container__podium_div_name}>{podium[4]?.nome}</span>
                </div>
            </div>
            <div className={styles.container__developer}>
                <span className={styles.container__developer_one}>DESENVOLVEDORA:</span>
                <span className={styles.container__developer_two}>Julia Barbosa de Freitas</span>
            </div>
        </section>
    )
}
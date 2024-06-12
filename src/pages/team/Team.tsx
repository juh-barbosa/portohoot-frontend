import sword from '../../assets/img/espadas.gif';
import styles from './Team.module.sass';
import remove from '../../assets/img/excluir (1) 1.svg';
import { useState } from 'react';
import http from "../../environment/environment";
import {useNavigate} from "react-router-dom";
import './loading.css'

export default function Team() {
    const [name, setName] = useState('');
    const [members, setMembers] = useState([{ name: '' }]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleMemberChange = (index: any, event: any) => {
        const newMembers = [...members];
        newMembers[index].name = event.target.value;
        setMembers(newMembers);
    };

    const handleAddMember = () => {
        setMembers([...members, { name: '' }]);
    };

    const handleRemoveMember = (index: any) => {
        const newMembers = [...members];
        newMembers.splice(index, 1);
        setMembers(newMembers);
    };

    async function cadastrarTime() {
        setIsLoading(true);

        await http.post('equipe', {
            nome: name,
            participantes: members,
            pontuacao: 0
        }).then((res) => {
            localStorage.setItem('participantes', JSON.stringify(members));
            localStorage.setItem('nome', name);
            localStorage.setItem('icone', res.data['icone']);
            localStorage.setItem('_id', res.data._id);
            localStorage.setItem('respondidas', JSON.stringify([]))
            navigate('/waiting');
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <section className={styles.container}>
            {isLoading && (
                <div className='container__loading'>
                    <div className='loader'>
                    </div>
                </div>

            )}
            <div className={styles.container__title}>
                <h1 className={styles.container__title_one}>Porto</h1>
                <h1 className={styles.container__title_two}>Hoot</h1>
            </div>
            <div className={styles.container__img}>
                <img src={sword} alt="Sword" className={styles.container__img_sword} />
            </div>
            <div className={styles.container__team}>
                <h2 className={styles.container__team_title}>DADOS DA EQUIPE</h2>
                <input
                    placeholder="Nome da equipe"
                    className={styles.container__team_input}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className={styles.container__team_members}>
                    <span className={styles.container__team_members_span}>Integrantes:</span>
                    {members.map((member, index) => (
                        <div key={index} className={styles.container__team_members_div}>
                            <input
                                placeholder="Nome"
                                value={member.name}
                                onChange={(e) => handleMemberChange(index, e)}
                            />
                            <img
                                src={remove}
                                alt="Remover"
                                onClick={() => handleRemoveMember(index)}
                            />
                        </div>
                    ))}
                    <button
                        className={styles.container__team_members_add}
                        onClick={handleAddMember}
                    >
                        + ADICIONAR MAIS
                    </button>
                </div>
                <button className={styles.container__team_register} onClick={() => cadastrarTime()}>
                    CADASTRAR MEU TIME
                </button>
            </div>
        </section>
    );
}

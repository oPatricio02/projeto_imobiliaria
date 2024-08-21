import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './observador.css';

const Observadores = () => {
    const [emailP, setEmail] = useState('');
    const [tiposelect, setTipo] = useState('');
    const tipos = ['Apartamento', 'Casa', 'Comercial', 'Kitnet', 'Terreno'];
    const navigate = useNavigate()


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleTipoChange = (event) => {
        setTipo(event.target.value);
    }

    const handleSubmit = () => {
        axios.post(`http://localhost:8000/observadores`,{
            email : emailP,
            tipo : tiposelect
        })
        .then(() =>{
            
            alert("Notificaremos sobre novidades!");
            navigate('/');
        })
        .catch((error)=>{
            alert(error);
        })
    };

    return (
        <div className='telaInt'>
            <Header />
            <div className='backForm'>
                <h4>Notificaremos quando houver novidades!</h4>
                <form className='formularioInt' onSubmit={handleSubmit}>
                    <label className='obrigatorio'>( * ) obrigatório</label>
                    <input required type='email' placeholder='Email *' value={emailP} name="Email" onChange={handleEmailChange} />
                    <div className='opcoes'>
                        <label>Tipo: </label>
                        <select value={tiposelect} onChange={handleTipoChange} required>
                            <option value="">Todos</option>
                            {tipos.map((tipo, index) => (
                                <option key={index} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Observadores;

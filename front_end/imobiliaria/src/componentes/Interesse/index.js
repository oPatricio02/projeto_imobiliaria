import Footer from '../Footer';
import HeaderIni from '../inicial/headerIni';
import { useParams } from 'react-router-dom';
import{useNavigate} from "react-router-dom";
import { useState } from 'react';
import api from '../../services/api';
import InputMask from 'react-input-mask';
import Header from '../Header';
import './interesse.css';

const Interesse = (props) =>{
    const { id } = useParams();
    const [Nome,setNome] = useState('');
    const [Email,setEmail] = useState('');
    const [Celular,setCelular] = useState('');
    const [Mensagem,setMensagem] = useState('');

    const navigate = useNavigate();

    const handleNomeChange=(event)=>{
        setNome(event.target.value)
    }

    const handleEmailChange=(event)=>{
        setEmail(event.target.value)
    }

    const handleCelularChange=(event)=>{
        setCelular(event.target.value)
        console.log(event.target.value)
    }

    const handleMensagemChange=(event)=>{
        setMensagem(event.target.value)
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        
        
        api.post('/interesses',{
            imovel_id: id,
            nome: Nome,
            email: Email,
            celular: Celular,
            mensagem: Mensagem
        })
        .then((response)=>{
            setNome('')
            setCelular('')
            setEmail('')
            setMensagem('')
            alert("Em breve entraremos em contato!");
           navigate('/');
        })
        .catch((erro)=>{
            alert(erro)
        })
        
    }

    return(
        <div className='telaInt'>
            <Header/>
            <div className='backForm'>
                <h4>Preencha nosso formulário que entraremos em contato com você!</h4>
                <form className='formularioInt' onSubmit={handleSubmit}>
                    <label className='obrigatorio'>( * ) obrigatório</label>
                    <input required type='text' placeholder='Nome *' value={Nome} name="Nome" onChange={value => handleNomeChange(value)}/>
                        
                    <input required type='email' placeholder='Email *' value={Email} name="Email" onChange={value => handleEmailChange(value)}/>
                        
                    <InputMask mask="(99) 99999-9999" required  placeholder='Celular *' value={Celular} name="Celular" onChange={value => handleCelularChange(value)}/>
                       
                    <textarea placeholder='Digite aqui a sua mensagem' value={Mensagem} name="Mensagem" onChange={value => handleMensagemChange(value)}/>
                    
                    <button type="submit">Enviar</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
}

export default Interesse;


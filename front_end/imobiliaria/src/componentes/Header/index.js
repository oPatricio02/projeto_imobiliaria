import './header.css';
import{useNavigate} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import api from "../../services/api";

const Header = () =>
{
    
    const navigate = useNavigate();
    const [Nivel_Acesso, setNivel_Acesso] = useState('');
    const [dadosLogin, setdadosLogin] = useState(false);
    useEffect(() => {
        dadosToken();
    }, [!dadosLogin]);

    async function dadosToken(){
        var JWTToken = await localStorage.getItem("Token")
        console.log(JWTToken);
        const config = {
            headers: { Authorization: `Bearer ${JWTToken}` }
        };

        await api.get("/pessoa/token", config)
        .then((response) => {
            setNivel_Acesso(response.data.nivel_acesso);
            console.log(Nivel_Acesso)
            setdadosLogin(true);
        })
        .catch((err) => {
            console.log(err)
        });
       
    }

    const handleParametrizacao = (event) =>{

        event.preventDefault();
        let quantidade;
        api.get("/parametrizacao/count",{

        }).then((response) =>{
            quantidade = response.data.quantidade
            if(quantidade === 0){
                navigate('/parametrizacaocriar')
            }else {
                navigate('/parametrizacaoalterar')
            }

            console.log(quantidade);
        });





    }
    const handleAgendamentos = (event) =>{
        event.preventDefault();
        navigate('/agendamento');
    }

    const handleHome = (event) =>{
        event.preventDefault();
        navigate('/');
    }

    const handlePerfil = (event) =>{
        event.preventDefault();
        navigate('/home');
    }

    const handleImovel = (event) =>{
        event.preventDefault();
        navigate('/imovel');
    }

    const handleLogin = (event)=>{
        event.preventDefault();
        localStorage.setItem("Token", "");
        navigate('/login');
    }

    return(
        <header className='header'>
            <section className='logo'>
                <img onClick={handleHome} src='https://cdn.discordapp.com/attachments/1111706210043969586/1114258991770517605/image.png' alt="LogoEmpresa"></img>
            </section>
            <section>
                <ul>{ Nivel_Acesso === '3' ?
                    <li>
                        <button onClick={handleParametrizacao} className='botao'>PARAMETRIZAÇÃO</button>
                    </li> : <></>}
                    { Nivel_Acesso === '3' ?
                    <li>
                        <p>|</p>
                    </li> : <></>}
                    { Nivel_Acesso === '3' || Nivel_Acesso === '2' ?
                    <li>
                        <button onClick={handleAgendamentos} className='botao'>AGENDAMENTOS</button>    
                    </li> : <></>}
                    { Nivel_Acesso === '3' || Nivel_Acesso === '2' ?
                    <li>
                        <p>|</p>
                    </li> : <></>}
                    <li>
                        <button onClick={handleHome} className='botao'>HOME</button>                        
                    </li>
                    <li>
                        <p>|</p>
                    </li>
                    <li>
                        <button onClick={handleImovel} className='botao'>IMÓVEIS</button>                        
                    </li>
                    <li>
                        <p>|</p>
                    </li>
                    { Nivel_Acesso != '' ?
                        <li> 
                            <button onClick={handlePerfil} className='botao'>PERFIL</button>                  
                        </li>
                    : <></>}
                    {   Nivel_Acesso != '' ?
                        <li>
                            <p>|</p>
                        </li>
                        : <></>
                    }
                    { Nivel_Acesso != '' ?
                        <li>
                            <button onClick={handleLogin} className='botao'>SAIR</button>   
                        </li>
                        : 
                        <li>
                            <button onClick={handleLogin} className='botao'>LOGIN</button>   
                        </li>
                    } 
                        
                    
                    
                    
                </ul>
            </section>
        </header>
    );
}

export default Header;
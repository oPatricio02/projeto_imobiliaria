import './login.css';
import api from '../../services/api';
import Header from '../Header';
import Footer from '../Footer';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Login = () =>{

    const navigate = useNavigate()

    const [Usuario, setUsuario] = useState('');
    const [Senha, setSenha] = useState('');
    const [errorLogin, seterrorLogin] = useState(false);

    const handleUsuarioChange = (event) => {
        setUsuario(event.target.value);
    };
    
    const handleSenhaChange = (event) => {
        setSenha(event.target.value);
    };
    
    const handleCadastro = (event) =>{
        navigate("/cadastro")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        seterrorLogin(false)
    
        console.log(Usuario)
        console.log(Senha);

        api.post("/login", {
            usuario: Usuario,
            hash: Senha
            
        })
        .then((response) => {
            console.log(response.data)
            localStorage.setItem("Token", response.data.token);
            navigate("/home")
        })
        .catch((err) => {
            console.log("Passou aqui")
            seterrorLogin(true)
            console.error(err);
        });
    
        // Resetar os campos de email e senha
        setUsuario('');
        setSenha('');
    };

    return(
        <div className='backgroundlogin'>
            <Header/>
            <div className='containerlogin'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Usuário:
                        <input required type="text" value={Usuario} name="Usuário" onChange={value => handleUsuarioChange(value)}/>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Senha:
                        <input required type="password" value={Senha} name="Senha" onChange={value => handleSenhaChange(value)}/>
                        { errorLogin ? <div className='errorLogin'>Usuario ou Senha inválidos</div>: <></>}
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit">Entrar</button>
                </div>
                <div className='divcadastro' onClick={handleCadastro} >Não possuí cadastro?</div>
                </form>
            </div>
            <Footer/>
        </div>
    );
}
export default Login;
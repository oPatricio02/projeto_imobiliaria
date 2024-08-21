import './cadastro.css';
import api from '../../services/api';
import Header from '../Header';
import React, { useState } from 'react';
import { mask } from "../../services/masks.js"
import {useNavigate} from 'react-router-dom'
import Footer from '../Footer';

const Cadastro = () => {

    const navigate = useNavigate()

    const [Nome, setNome] = useState('');
    const [CPF, setCPF] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [Email, setEmail] = useState('');
    const [RG, setRG] = useState('');
    const [Sexo, setSexo] = useState('');
    const [Celular, setCelular] = useState('');
    const [Logradouro, setLogradouro] = useState('');
    const [Bairro, setBairro] = useState('');
    const [CEP, setCEP] = useState('');
    const [Numero, setNumero] = useState('');  
    const [Complemento, setComplemento] = useState('');
    const [Cidade, setCidade] = useState('');
    const [UF, setUF] = useState('');
    const [Usuario, setUsuario] = useState('');
    const [Senha, setSenha] = useState('');
    const [errorLogin, seterrorLogin] = useState(false);
    const [errorCEP, seterrorCEP] = useState(false);
    const [errorEndereco, seterrorEndereco] = useState(false);
    const [errorPessoa, seterrorPessoa] = useState(false);
    const [editUF,seteditUF] = useState(false);
    const [editEndereco,seteditEndereco] = useState(false);
    const [editBairro, seteditBairro] = useState(false);
    const [editCidade,seteditCidade] = useState(false);

    const handleUsuarioChange = (event) => {
        setUsuario(event.target.value);
    };

    const handleSenhaChange = (event) =>{
        setSenha(event.target.value);
    };

    const handleNomeChange = (event) =>{
        setNome(event.target.value);
    };

    const handleCPFChange = (event) =>{
        seterrorLogin(false);
        setCPF(mask(event.target.value));
    };

    const handleTelefoneChange = (event) =>{
        setTelefone(event.target.value);
    };

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    };

    const handleRGChange = (event) =>{
        setRG(event.target.value);
    };

    const handleSexoChange = (event) =>{
        setSexo(event.target.value);
    };

    const handleCelularChange = (event) =>{
        setCelular(event.target.value);
    };

    const handleLogradouroChange = (event) =>{
        setLogradouro(event.target.value);
    };

    const handleBairroChange = (event) =>{
        setBairro(event.target.value);
    };

    const handleCEPChange = (event) =>{
        setCEP(event.target.value);
    };

    const handleNumeroChange = (event) =>{
        setNumero(event.target.value);
    };

    const handleComplementoChange = (event) =>{
        setComplemento(event.target.value);
    };
    const handleCidadeChange = (event) =>{
        setCidade(event.target.value);
    };
    const handleUFChange = (event) =>{
        setUF(event.target.value);
    };

    const preenchecep = (event) =>{
        event.preventDefault();
        setBairro('');
        setLogradouro('');
        setCidade('');
        setUF('');
        setComplemento('');
        setNumero('');
        seteditBairro(false)
        seteditCidade(false)
        seteditEndereco(false)
        seteditUF(false)
        

        seterrorCEP(false);

            fetch('https://viacep.com.br/ws/'+CEP+'/json/', {
                method: 'GET',
                header: {
                'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                var auxEndereco, auxBairro, auxCidade, auxUF;
                auxEndereco = json.logradouro;
                
                auxCidade = json.localidade;
                
                auxUF = json.uf;
                
                auxBairro =json.bairro;
               
                if(auxEndereco){
                    setLogradouro(json.logradouro);
                    seteditEndereco(true);
                }
                if(auxCidade){
                    setCidade(json.localidade);
                    seteditCidade(true);
                }
                if(auxUF){
                    setUF(json.uf);
                    seteditUF(true);
                }
                if(auxBairro){
                    setBairro(json.bairro);
                    seteditBairro(true);
                }
            })
            .catch((response) => {
                console.log(response)
                seterrorCEP(true);
            });
        
        
    }

    function validaCpfCnpj(val) {
        if (val.length == 14) {
            var cpf = val.trim();
         
            cpf = cpf.replace(/\./g, '');
            cpf = cpf.replace('-', '');
            cpf = cpf.split('');
            
            var v1 = 0;
            var v2 = 0;
            var aux = false;
            
            for (var i = 1; cpf.length > i; i++) {
                if (cpf[i - 1] != cpf[i]) {
                    aux = true;   
                }
            } 
            
            if (aux == false) {
                return false; 
            } 
            
            for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
                v1 += cpf[i] * p; 
            } 
            
            v1 = ((v1 * 10) % 11);
            
            if (v1 == 10) {
                v1 = 0; 
            }
            
            if (v1 != cpf[9]) {
                return false; 
            } 
            
            for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
                v2 += cpf[i] * p; 
            } 
            
            v2 = ((v2 * 10) % 11);
            
            if (v2 == 10) {
                v2 = 0; 
            }
            
            if (v2 != cpf[10]) {
                return false; 
            } else {   
                return true; 
            }
        } else if (val.length == 18) {
            var cnpj = val.trim();
            
            cnpj = cnpj.replace(/\./g, '');
            cnpj = cnpj.replace('-', '');
            cnpj = cnpj.replace('/', ''); 
            cnpj = cnpj.split(''); 
            
            var v1 = 0;
            var v2 = 0;
            var aux = false;
            
            for (var i = 1; cnpj.length > i; i++) { 
                if (cnpj[i - 1] != cnpj[i]) {  
                    aux = true;   
                } 
            } 
            
            if (aux == false) {  
                return false; 
            }
            
            for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
                if (p1 >= 2) {  
                    v1 += cnpj[i] * p1;  
                } else {  
                    v1 += cnpj[i] * p2;  
                } 
            } 
            
            v1 = (v1 % 11);
            
            if (v1 < 2) { 
                v1 = 0; 
            } else { 
                v1 = (11 - v1); 
            } 
            
            if (v1 !== cnpj[12]) {  
                return false; 
            } 
            
            for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) { 
                if (p1 >= 2) {  
                    v2 += cnpj[i] * p1;  
                } else {   
                    v2 += cnpj[i] * p2; 
                } 
            }
            
            v2 = (v2 % 11); 
            
            if (v2 < 2) {  
                v2 = 0;
            } else { 
                v2 = (11 - v2); 
            } 
            
            if (v2 != cnpj[13]) {   
                return false; 
            } else {  
                return true; 
            }
        } else {
            return false;
        }
     }

    const handleSubmit = (event) => {
        event.preventDefault();
        seterrorLogin(false)
        seterrorEndereco(false)
        seterrorPessoa(false)
        if(validaCpfCnpj(CPF)){
            api.post("/enderecos", {
                logradouro: Logradouro,
                bairro: Bairro,
                cep: CEP,
                numero: Numero,
                complemento: Complemento,
                cidade: Cidade,
                uf: UF,
                ativo: true            
            })
            .then((response) => {
                console.log(response.data)
        
                console.log(response.data.id)
                api.post("/pessoa", {
                    endereco_id: response.data.id,
                    nome: Nome,
                    cnpj_cpf: CPF,
                    telefone: Telefone,
                    email: Email,
                    rg_ie: RG,
                    sexo: Sexo,
                    celular: Celular,
                    usuario: Usuario,
                    hash: Senha,
                    dta_encerramento: null,
                    nivel_acesso: "1"
                })
                .then((response) => {
                    console.log(response.data)
                    navigate("/");
                })
                .catch((err) => {
                    console.log("Erro Create Pessoa")
                    seterrorPessoa(true)
                    console.error(err);
                });
            })
            .catch((err) => {
                console.log("Erro Create Endereço")
                seterrorEndereco(true)
                console.error(err);
            });
        }
        else{
            seterrorLogin(true)
        }
        
        setCPF('');

        {/*setUsuario('');
        setSenha('');
        setNome('');
        setTelefone('');
        setCelular('');
        setEmail('');
        setSexo('');
        setCEP('')
        setBairro('');
        setLogradouro('');
        setCidade('');
        setUF('');
        setComplemento('');
        setNumero('')*/}
        
    };

    return(
        <div className='backgroundcadastro'>
            <Header/>
            <div className='containercadastro'>
                
                <h2>Cadastro</h2>
                <form onSubmit={handleSubmit}>
                <div className='formflex'>
                    <div className='formwidthcadastro'>
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
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Email:
                                <input required type="email" value={Email} name="Email" onChange={value => handleEmailChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Telefone fixo:
                                <input type="text" value={Telefone} name="Telefone" onChange={value => handleTelefoneChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Celular:
                                <input type="text" value={Celular} name="Celular" onChange={value => handleCelularChange(value)}/>
                            </label>
                        </div>
                    </div>
                    <div className='formwidthcadastro'>
                        <div className="form-group">
                            <label>
                                Nome:
                                <input required type="text" value={Nome} name="Nome" onChange={value => handleNomeChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                CPF/CPNJ:
                                <input required type="text" value={CPF} name="CPF" onChange={value => handleCPFChange(value)}/>
                                { errorLogin ? <div className='errorLogin'>CPF ou CNPJ inválidos</div>: <></>}
                            </label>
                        </div>
                        <div className="form-group">
                                <label>
                                    <div className='formradio'  onChange={value => handleSexoChange(value)}>
                                        Sexo:
                                        <input required type="radio" value={'M'} name="radio"/> Masculino
                                        <input required type="radio" value={'F'} name="radio"/> Feminino
                                        <input required type="radio" value={'Outro'} name="radio"/> Outro
                                    </div>
                                </label>
                        </div>
                        <div className="form-group">
                            <label>
                                RG/Inscrição Estadual:
                                <input required type="text" value={RG} name="RG" onChange={value => handleRGChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                CEP:
                                <input required type="text" value={CEP} name="CEP" onChange={value => handleCEPChange(value)} onBlur={preenchecep}/>
                                {errorCEP ? <div className='errorform'>Insira um CEP válido</div> : <></>}
                            </label>
                        </div>
                    </div>
                    <div className='formwidthcadastro'>
                        
                        <div className="form-group">
                            <label>
                                Logradouro:
                                <input readOnly={editEndereco} required type="text" value={Logradouro} name="Logradouro" onChange={value => handleLogradouroChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Bairro:
                                <input readOnly={editBairro} required type="text" value={Bairro} name="Bairro" onChange={value => handleBairroChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Numero:
                                <input required type="text" value={Numero} name="Numero" onChange={value => handleNumeroChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Complemento:
                                <input type="text" value={Complemento} name="Complemento" onChange={value => handleComplementoChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Cidade:
                                <input readOnly={editCidade} required type="text" value={Cidade} name="Cidade" onChange={value => handleCidadeChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                UF:
                                <input readonly={editUF} required type="text" value={UF} name="UF" onChange={value => handleUFChange(value)}/>
                            </label>
                        </div>
                    </div>
                </div> 
                
                
                <div className="form-group">
                    <button type="submit">Cadastrar</button>
                </div>
                </form>
                {errorPessoa ? <div className='errorform'>Houve um erro ao cadastrar, Tente novamente mais tarde</div> : <></>}
                {errorEndereco ? <div className='errorform'>Houve um erro ao cadastrar, Tente novamente mais tarde</div> : <></>}
            </div>
            <Footer/>
        </div>
    );
}

export default Cadastro;
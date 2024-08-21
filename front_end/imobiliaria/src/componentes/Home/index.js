import api from '../../services/api';
import Header from '../Header';
import './home.css';
import Pen from './imgs/edit-pen-icon.svg'
import {useNavigate} from 'react-router-dom'
import Trash from './imgs/trash-can-svgrepo-com.svg'
import React, { useState, useEffect } from 'react';
import Footer from '../Footer';

const Home = () =>
{
    const navigate = useNavigate();

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
    const [ID, setID] = useState('');
    const [EndrecoId, setEnderecoId] = useState('');
    const [JWTToken, setJWTToken] = useState('');
    const [errorCEP, seterrorCEP] = useState(false);
    const [errorLogin, seterrorLogin] = useState(false);
    const [Editar, setEditar] = useState(false);
    const [Excluir, setExcluir] = useState(true);

    const [editUF,seteditUF] = useState('');
    const [editEndereco,seteditEndereco] = useState('');
    const [editBairro, seteditBairro] = useState('');
    const [editCidade,seteditCidade] = useState('');

    const [dadosCarregados, setDadosCarregados] = useState(false);

    const handleNomeChange = (event) =>{
        setNome(event.target.value);
    };

    const handleTelefoneChange = (event) =>{
        setTelefone(event.target.value);
    };

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
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
    
    
    useEffect(() => {
        setJWTToken(localStorage.getItem("Token"));
        console.log(JWTToken);
        const config = {
            headers: { Authorization: `Bearer ${JWTToken}` }
        };
    
        api.get("/pessoa/token", config)
        .then((response) => {
            console.log(response.data)
            
            if(!Editar){
                setID(response.data.id)
                setEnderecoId(response.data.endereco_id);
                setNome(response.data.nome);
                setCPF(response.data.cnpj_cpf);
                setTelefone(response.data.telefone);
                setEmail(response.data.email);
                setRG(response.data.rg_ie);
                setSexo(response.data.sexo);
                setCelular(response.data.celular);
            }
            
    
            api.get("/enderecos/"+EndrecoId, {
            
            
            })
            .then((response) => {
                console.log(response.data)
                if(!Editar)
                {
                    setLogradouro(response.data.logradouro);
                    setBairro(response.data.bairro);
                    setCEP(response.data.cep);
                    setNumero(response.data.numero);
                    setComplemento(response.data.complemento);
                    setCidade(response.data.cidade);
                    setUF(response.data.uf);
                    setDadosCarregados(true);
                }
                
        
            })
            .catch((err) => {
                console.error(err);
            });
            
        })
        .catch((err) => {
            console.error(err);
        });
    });

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

    const handleSubmit = (event) => {
        event.preventDefault();
        seterrorLogin(false)
        
        api.put("/enderecos/token", {
            logradouro: Logradouro,
            bairro: Bairro,
            cep: CEP,
            numero: Numero,
            complemento: Complemento,
            cidade: Cidade,
            uf: UF,
            ativo: true            
        },{
            headers: { Authorization: `Bearer ${JWTToken}` }
        }
        )
        .then((response) => {
            console.log(response.data)
            console.log(response.data.id)
            api.put("/pessoa/token", {
                nome: Nome,
                cnpj_cpf: CPF,
                telefone: Telefone,
                email: Email,
                rg_ie: RG,
                sexo: Sexo,
                celular: Celular,
                updatedAt: new Date(),
                dta_encerramento: null,
            },
            {
                headers: { Authorization: `Bearer ${JWTToken}` }
            })
            .then((response) => {
                console.log(response.data)
                setEditar(false);
            })
            .catch((err) => {
                console.log("Erro Create Pessoa")
                console.error(err);
            });
        })
        .catch((err) => {
            console.log("Erro Create Endereço")
            console.error(err);
        });
        
    };

    const handleExcluir = (event) => {

        api.delete("/pessoa/"+ID)
        .then((response) => {
            console.log(response.data)
            api.delete("/enderecos/"+EndrecoId)
            .then((response) => {
                console.log(response.data)
                localStorage.setItem("Token", "");
                navigate("/")
            })
            .catch((err) => {
                console.log("Erro Delete Endereco")
                console.error(err);
            });
        })
        .catch((err) => {
            console.log("Erro Delete Pessoa")
            console.error(err);
        });
    }

    if(!dadosCarregados) {
        return(
            <div>
                <Header/>
                <p className='carregando'>Carregando...</p>
            </div>
            
        ) 
      }
    else{
        return(
            <div className='backgroundhome'>
                <Header/>
                <div className='containerhome'>
                    <div className='flexheader'>
                        {Excluir ?
                        <img className='editpen' onClick={() => {setExcluir(false)}} src={Trash} alt='editpen'></img>   
                            : <div className='excluirhome'>
                                <h2 onClick={handleExcluir} className='iconexcluir'>✔</h2>
                                <h2 onClick={() => {setExcluir(true)}} className='iconexcluir'>✘</h2> 
                            </div> }
                        <h1>Perfil</h1>
                        <img className='editpen' onClick={() => {setEditar(true)}} src={Pen} alt='editpen'></img>
                    </div>
                    
                    {Editar ? 
                    <form onSubmit={handleSubmit}>
                    <div className='formflex'>
                        <div className='formwidthhome'>
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
                            <div className="form-group">
                                <label>
                                    Nome:
                                    <input required type="text" value={Nome} name="Nome" onChange={value => handleNomeChange(value)}/>
                                </label>
                            </div>
                            <div className="form-group">
                                    <label>
                                        <div className='formradio'  onChange={value => handleSexoChange(value)}>
                                            Sexo:
                                            <input checked={Sexo==='M'} required type="radio" value={'M'} name="radio"/> Masculino
                                            <input checked={Sexo==='F'} required type="radio" value={'F'} name="radio"/> Feminino
                                            <input checked={Sexo==='Outro'} required type="radio" value={'Outro'} name="radio"/> Outro
                                        </div>
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
                        <div className='formwidthhome'>
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
                        <button type="submit">Alterar</button>
                    </div>
                    </form>
                    
                    : <div className='formflex'>
                        <div className='formwidthhome'>
                            <div className="form-group">
                                <label>
                                    Email:
                                    <div>{Email}</div>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Telefone fixo:
                                    <div>{Telefone}</div>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Celular:
                                    <div>{Celular}</div>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Nome:
                                    <div>{Nome}</div>
                                </label>
                            </div>
                            <div className="form-group">
                                    <label>
                                        Sexo: 
                                        <div>{Sexo}</div>
                                    </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    CEP:
                                    <div>{CEP}</div>
                                </label>
                            </div>
                            
                        </div>
                        <div className='formwidthhome'>
                            <div className="form-group">
                                <label>
                                    Logradouro:
                                    <div>{Logradouro}</div>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Bairro:
                                    <div>{Bairro}</div>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Numero:
                                    <div>{Numero}</div>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Complemento:
                                    <div>{Complemento}</div>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Cidade:
                                    <div>{Cidade}</div>
                                 </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    UF:
                                    <div>{UF}</div>
                                </label>
                            </div>
                        </div>
                </div>}
                </div>
                <Footer/>
            </div>
            
        );
    }
    


}

export default Home;
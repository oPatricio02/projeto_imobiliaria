import './novo.css';
import api from '../../services/api';
import axios from 'axios';
import Header from '../Header';
import React, { useState, useEffect } from 'react';
import IntlCurrencyInput from "react-intl-currency-input"
import {useNavigate} from 'react-router-dom'
import Footer from '../Footer';

const Novo = () =>{

    const navigate = useNavigate();
    const [proprietarios,setProprietarios] = useState([]);
    const [Proprietario,setProprietario] = useState('');
    const [Url,setUrl] = useState('');
    const [Descricao,setDescricao] = useState('');
    const [Valor,setValor] = useState('');
    const [ValorM,setValorM] = useState('');
    const [Logradouro, setLogradouro] = useState('');
    const [Bairro, setBairro] = useState('');
    const [CEP, setCEP] = useState('');
    const [Numero, setNumero] = useState('');  
    const [Complemento, setComplemento] = useState('');
    const [Cidade, setCidade] = useState('');
    const [UF, setUF] = useState('');
    const [errorCEP, seterrorCEP] = useState(false);
    const [errorEndereco, seterrorEndereco] = useState(false);
    const [errorImovel, seterrorImovel] = useState(false);
    const [editUF,seteditUF] = useState('');
    const [editEndereco,seteditEndereco] = useState('');
    const [editBairro, seteditBairro] = useState('');
    const [editCidade,seteditCidade] = useState('');
    const tipos =['Apartamento','Casa','Comercial','Kitnet','Terreno'];
    const [selectedTipo, setSelectedTipo] = useState('');
    const [dadosCarregados, setDadosCarregados] = useState(false);

    const currencyConfig = {
        locale: "pt-BR",
        formats: {
          number: {
            BRL: {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            },
          },
        },
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const responseP = await axios.get('http://localhost:8000/proprietarios');
            const proprietariosData = responseP.data;
            setProprietarios(proprietariosData);
            setDadosCarregados(true);
          }
          catch(error){
             alert("Erro interno");
            console.log(error);
        }
                
        };
          fetchData();
      }, []);

      ////////Handles
      const handleProprietarioChange = (event)=>{
        setProprietario(event.target.value);
      }

    const handleDescricaoChange = (event) =>{
        setDescricao(event.target.value);
    };
    const handleUrlChange = (event) =>{
        setUrl(event.target.value);
    };
    const handleTipoChange = (event) =>{
        setSelectedTipo(event.target.value);
    };
    const handleValorChange = (event,value) => {
        const valor = value;
        setValor(valor);
    };
    const handleValorMChange = (event,value) => {
        const valorMin = value;
        setValorM(valorMin);
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
                    seteditEndereco(auxEndereco);
                }
                if(auxCidade){
                    setCidade(json.localidade);
                    seteditCidade(auxCidade);
                }
                if(auxUF){
                    setUF(json.uf);
                    seteditUF(auxUF);
                }
                if(auxBairro){
                    setBairro(json.bairro);
                    seteditBairro(auxBairro);
                }
            })
            .catch((response) => {
                console.log(response)
                seterrorCEP(true);
            });
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        seterrorEndereco(false);
        seterrorImovel(false);
        
        
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
        .then((responseEnd) => {
            console.log(responseEnd.data)
            console.log(responseEnd.data.id)

            api.post("/fotos",{
                url: Url
            })
            .then((responseFoto)=>{
                console.log(responseFoto.data)

                api.post("/imoveis", {
                proprietario_id: Proprietario,
                endereco_id: responseEnd.data.id,
                fotos_id: responseFoto.data.id,
                descricao: Descricao,
                ativo: true,
                tipo: selectedTipo,
                valor: Valor,
                valor_minimo: ValorM
                 })
                .then((response)=>{
                    alert("Imovel cadastrado com sucesso");
                    navigate("/imovel");
                 })
                 .catch((erro)=>{
                    alert(erro);
                 })
                
            })
            .catch((error)=>{
                alert(error);
            })
        })
        .catch((err) => {
            alert(err)
        });
        
        setUrl('')
        setDescricao('');
        setSelectedTipo('');
        setValor('');
        setValorM('');
        setCEP('');
        setBairro('');
        setLogradouro('');
        setCidade('');
        setUF('');
        setComplemento('');
        setNumero('')
        setProprietario('')
        
        
    };
    
    
    if(!dadosCarregados) {
        return(
            <div>
                <Header/>
                <p className='carregando'>Carregando...</p>
            </div>
            
        ) 
      }

    
    return (
        <div className='backgroundcadastro'>
            <Header/>
            <div className='containercadastro'>
                
                <h2>Cadastro de Imóvel</h2>
                <form onSubmit={handleSubmit}>
                <div className='formflex'>
                    <div className='formwidth'>
                        <div className="form-group">
                            <label>
                                Url da imagem:
                                <input required type="url" value={Url} name="Url" onChange={value => handleUrlChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Descrição:
                                <input required type="text" value={Descricao} name="Descricao" onChange={value => handleDescricaoChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Tipo:
                                <br></br>
                                <select value={selectedTipo} onChange={handleTipoChange} required={true}>
                                <option value="" >Selecione</option>
                                {
                                    tipos.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                </option>
                                ))}
                            </select>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Valor:
                                <IntlCurrencyInput currency="BRL" config={currencyConfig} name="valor" value={Valor} onChange={handleValorChange} defaultValue={Valor} requerid={true}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Valor minimo:
                                <IntlCurrencyInput currency="BRL" config={currencyConfig} name="valor_minimo" value={ValorM} onChange={handleValorMChange} defaultValue={ValorM} requerid={true}/>
                            </label>
                        </div>
                    </div>
                    <div className='formwidth'>
                        
                        {/*Parte de endereço*/}
                        <div className="form-group">
                            <label>
                                CEP:
                                <input required type="text" value={CEP} name="CEP" onChange={value => handleCEPChange(value)} onBlur={preenchecep}/>
                                {errorCEP ? <div className='errorform'>Insira um CEP válido</div> : <></>}
                            </label>
                            <label>
                                Proprietário:
                                <select value={Proprietario} onChange={handleProprietarioChange} required={true}>
                                <option value="" >Selecione Id</option>
                                {proprietarios.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.id}
                                </option>
                                ))}
                            </select>
                            <a href='/cadastro'>Proprietario não cadastrado?</a>
                            </label>
                        </div>
                    </div>
                    <div className='formwidth'>
                        
                        <div className="form-group">
                            <label>
                                Logradouro:
                                <input readOnly={editEndereco ? true: false} required type="text" value={Logradouro} name="Logradouro" onChange={value => handleLogradouroChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Bairro:
                                <input readOnly={editBairro ? true: false} required type="text" value={Bairro} name="Bairro" onChange={value => handleBairroChange(value)}/>
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
                                <input readOnly={editCidade ? true: false} required type="text" value={Cidade} name="Cidade" onChange={value => handleCidadeChange(value)}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                UF:
                                <input readonly={editUF ? true: false} required type="text" value={UF} name="UF" onChange={value => handleUFChange(value)}/>
                            </label>
                        </div>
                    </div>
                </div> 
                
                
                <div className="form-group">
                    <button type="submit">Entrar</button>
                </div>
                </form>
                {errorImovel ? <div className='errorform'>Houve um erro ao cadastrar, Tente novamente mais tarde</div> : <></>}
                {errorEndereco ? <div className='errorform'>Houve um erro ao cadastrar, Tente novamente mais tarde</div> : <></>}
            </div>
            <Footer/>
        </div>
    );
}

export default Novo
import './parametrizacao.css';
import api from '../../services/api';
import Header from '../Header';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Footer from '../Footer';
import axios from "axios";
let IEP;
let IP;
const Parametrizacao = () => {

    const navigate = useNavigate()



    //Dados Empresa
    const [NomeEmpresa, setNomeEmpresa] = useState();
    const [RazaoSocial, setRazaoSocial] = useState('');
    const [NomeFantasia, setNomeFantasia] = useState('');
    const [CNPJ, setCNPJ] = useState('');
    const [IE , setIE] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [IdEnderecoP, setIdEnderecoP] = useState('');

    //Outros Dados
    const [LogoGrande, setLogoGrande] = useState('');
    const [LogoPequeno, setLogoPequeno] = useState('');
    const [Site, setSite] = useState('');

    //Dados Endereço
    const [Logradouro, setLogradouro] = useState('');
    const [Bairro, setBairro] = useState('');
    const [CEP, setCEP] = useState('');
    const [Numero, setNumero] = useState('');
    const [Complemento, setComplemento] = useState('');
    const [Cidade, setCidade] = useState('');
    const [UF, setUF] = useState('');

    const [dadosCarregados, setDadosCarregados] = useState(false);

    const [errorCEP, seterrorCEP] = useState(false);
    const [errorEndereco, seterrorEndereco] = useState(false);
    const [errorPessoa, seterrorPessoa] = useState(false);
    const [editUF,seteditUF] = useState(false);
    const [editEndereco,seteditEndereco] = useState(false);
    const [editBairro, seteditBairro] = useState(false);
    const [editCidade,seteditCidade] = useState(false);

    useEffect(()=>{
        api.get("/parametrizacao", {


        })
            .then((response) => {

                const dd = response.data[0];


                setNomeEmpresa(dd.nome);
                setRazaoSocial(dd.razao_social);
                setNomeFantasia(dd.nome_fantasia);
                setCNPJ(dd.cnpj);
                setIE(dd.is);
                setTelefone(dd.telefone);
                IEP = dd.endereco_id;
                IP = dd.id;
                setLogoGrande(dd.logo_grande);
                setLogoPequeno(dd.logo_pequeno);
                setSite(dd.site);

                console.log(IEP);

                api.get("/enderecos/"+IEP, {

                })
                    .then((response) =>{
                        setLogradouro(response.data.logradouro);
                        setBairro(response.data.bairro);
                        setCEP(response.data.cep);
                        setNumero(response.data.numero);
                        setComplemento(response.data.complemento);
                        setCidade(response.data.cidade);
                        setUF(response.data.uf);



                    })
                setDadosCarregados(true);

            })
            .catch((err) => {
                console.log("Passou aqui")

                console.error(err);
            });

    },[])



    //Empresa
    const handleNomeEmpresaChange = (event) =>{
        setNomeEmpresa(event.target.value);
    }
    const handleRazaoSocialChange = (event) =>{
        setRazaoSocial(event.target.value);
    }
    const handleNomeFantasiaChange = (event) =>{
        setNomeFantasia(event.target.value);
    }
    const handleCNPJChange = (event) =>{
        setCNPJ(event.target.value);
    }
    const handleIEChange = (event) =>{
        setIE(event.target.value);
    }
    const handleTelefoneChange = (event) =>{
        setTelefone(event.target.value);
    };

    //Outros
    const handleLogoGrandeChange = (event) =>{
        setLogoGrande(event.target.value);
    }
    const handleLogoPequenoChange = (event) =>{
        setLogoPequeno(event.target.value);
    }
    const handleSiteChange = (event) =>{
        setSite(event.target.value);
    }

    //Endereço
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

    const handleSubmit = (event) => {
        event.preventDefault();


        console.log(IEP);

        api.put("/enderecos/"+IEP, {
            logradouro: Logradouro,
            bairro: Bairro,
            cep: CEP,
            numero: Numero,
            complemento: Complemento,
            cidade: Cidade,
            uf: UF,

        })
            .then((response) => {

                api.put("/parametrizacao/"+IP, {
                    nome: NomeEmpresa,
                    cnpj: CNPJ,
                    razao_social: RazaoSocial,
                    nome_fantasia: NomeFantasia,
                    is: IE,
                    site: Site,
                    logo_grande: LogoGrande,
                    logo_pequeno: LogoPequeno,
                    telefone: Telefone,



                })
                    .then((response) => {
                        console.log(response.data)
                        alert("Alteração realizada");
                        navigate("/");
                    })
                    .catch((err) => {
                        console.log("Erro Alter Parametrização")
                        seterrorPessoa(true)
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.log("Erro Ater Endereço")
                seterrorEndereco(true)
                console.error(err);
            });


    };

    if(!dadosCarregados) {
        return(
            <div>
                <Header/>
                <p className='carregando'>Carregando...</p>
            </div>

        )
    }

    return(
        <div className='backgroundcadastro'>
            <Header/>
            <div className='containercadastro'>

                <h2>{NomeEmpresa}</h2>
                <form onSubmit={handleSubmit}>
                    <div className='formflex'>
                        <div className='formwidth'>
                            <div className="form-group">
                                <label>
                                    Nome Empresa:
                                    <input required type="text" value={NomeEmpresa} name="Nome Empresa" onChange={value => handleNomeEmpresaChange(value)}/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Razão Social:
                                    <input required type="text" value={RazaoSocial} name="Razão Social" onChange={value => handleRazaoSocialChange(value)}/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Nome Fantasia:
                                    <input required type="text" value={NomeFantasia} name="Nome Fantasia" onChange={value => handleNomeFantasiaChange(value)}/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    CNPJ:
                                    <input required type="text" value={CNPJ} name="CNPJ" onChange={value => handleCNPJChange(value)}/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    IE:
                                    <input required type="text" value={IE} name="CNPJ" onChange={value => handleIEChange(value)}/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Telefone fixo:
                                    <input type="text" value={Telefone} name="Telefone" onChange={value => handleTelefoneChange(value)}/>
                                </label>
                            </div>

                        </div>

                        <div className='formwidth'>
                            <div className="form-group">
                                <label>
                                    Logo Grande:
                                    <section className='logo-grande'>
                                        <img src={LogoGrande}/>
                                    </section>

                                    <input type="text" value={LogoGrande} name="Logo Grande" onChange={value => handleLogoGrandeChange(value)}/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Logo Pequeno:
                                    <section className='logo-pequeno'>
                                        <img src={LogoPequeno}/>
                                    </section>
                                    <input type="text" value={LogoPequeno} name="Logo Pequeno" onChange={value => handleLogoPequenoChange(value)}/>
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Site:
                                    <input type="text" value={Site} name="Site" onChange={value => handleSiteChange(value)}/>
                                </label>
                            </div>
                        </div>

                        <div className='formwidth'>
                            <div className="form-group">
                                <label>
                                    CEP:
                                    <input required type="text" value={CEP} name="CEP" onChange={value => handleCEPChange(value)} onBlur={preenchecep}/>
                                    {errorCEP ? <div className='errorform'>Insira um CEP válido</div> : <></>}
                                </label>
                            </div>
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

            </div>
            <Footer/>
        </div>
    );
}

export default Parametrizacao;
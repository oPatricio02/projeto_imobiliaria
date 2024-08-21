import './financiamento.css';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import IntlCurrencyInput from "react-intl-currency-input"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Financiamento = (props) => {
  const { id } = useParams();
  const [imovel, setImovel] = useState();
  const [endereco, setEndereco] = useState();
  const [imagem, setImagem] = useState();
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [valorEntrada, setValorEntrada] = useState();
  const [parcelas, setParcelas] = useState();
  const [taxas, setTaxas] = useState();
  const [texto, setTexto] = useState();
  const [tipoFinanciamento, setTipoFinanciamento] = useState();


  const navigate = useNavigate()


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
    const percentageConfig = {
        locale: "pt-BR",
        formats: {
            number: {
                percentage: {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                },
            },
        },
    };

    function calcFinanciamento() {
        axios.get('http://168.138.158.168/price-simulate-simple?total_amount=5000&installments=4&interest_rate=2')
            .then((responseFin) => {
                setTexto(responseFin.data)
            })
            .catch(() => {
                alert('Erro Interno');
            })
        console.log(texto)
    }



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/imoveis/${id}`);
        const imovelData = response.data;

        const responseEndereco = await axios.get(`http://localhost:8000/enderecos/${imovelData.endereco_id}`);
        const enderecoData = responseEndereco.data;

        const responseImagem = await axios.get(`http://localhost:8000/fotos/${imovelData.fotos_id}`);
        const imagemData = responseImagem.data;

        setImovel(imovelData);
        setEndereco(enderecoData);
        setImagem(imagemData);
        setDadosCarregados(true);
        console.log(imovelData.descricao);
      } catch (error) {
        console.error(error);
        alert('Erro Interno');
      }
    };

    fetchData();
  }, []);

  const handleChange = (event,value) => {
    setImovel({
      ...imovel,
      [event.target.name]: value,
    });
  };

  const handleEntradaChange = (event) => {
      setValorEntrada(event.target.value);
  }

  const handleParcelasChange = (event) => {
      setParcelas(event.target.value);
  }
  const handleTaxasChange = (event) => {
      setTaxas(event.target.value)
  }
  const handleTipoFinanciamentoChange = (event) => {
      setTipoFinanciamento(event.target.value)
  }


  const handleSubmit = (event) => {
    console.log(imovel.descricao);
    event.preventDefault();
    console.log(imovel.descricao)
    axios.put(`http://localhost:8000/imoveis/${id}`, imovel)
    .then(()=>{
        navigate('/imovel');
    })
    .catch((error)=>{
        alert(error);
    })
    
    
  };

  if (!dadosCarregados) {
    return (
      <div>
        <Header />
        <p className='carregando'>Carregando...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className='tela'>
    <div className='formulario'>
            <img src={imagem.url} alt='imovel'></img>
            <div className='endereco'>
            <h4>{endereco.logradouro}</h4>
            <p>{endereco.bairro}, {endereco.cidade}</p>
            </div>
        <form onSubmit={calcFinanciamento}>
            <br/>

            <label>
                Valor
                <IntlCurrencyInput currency="BRL" config={currencyConfig} className='inputs' name="valor"
                                   value={imovel.valor} onChange={handleChange} defaultValue={imovel.valor}/>
            </label>
            <br/> <br/>
            <label>
                Entrada
                <IntlCurrencyInput currency="BRL" config={currencyConfig} className='inputs' name="entrada"
                                   value={valorEntrada} onChange={handleEntradaChange} defaultValue={0.00}/>
            </label>
            <br/> <br/>
            <label>
                Parcelas
                <input className='inputs' name="parcelas"
                       value={parcelas} onChange={handleParcelasChange} defaultValue={0}/>
            </label>
            <br/> <br/>
            <label>
                Tipo de Financiamento
                <select value={tipoFinanciamento} onChange={handleTipoFinanciamentoChange} required={true} placeholder={"Selecione Financiamento"}
                        className={"selecionador"}>

                    <option value="1">SAC</option>
                    <option value="2">PRICE</option>
                </select>

            </label>
            <br/> <br/>
            <label>
                Taxa
                <input config={percentageConfig} className='inputs' name="entrada"
                       value={taxas} onChange={handleTaxasChange} defaultValue={0}/>
            </label>
            <br/> <br/>
            <button type='submit' className='botaoA'>Calcular</button>
        </form>
    </div>
      </div>

        <Footer/>
    </div>
  );
}

export default Financiamento;

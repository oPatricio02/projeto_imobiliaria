import './adquirir.css';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import IntlCurrencyInput from "react-intl-currency-input"
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker,{registerLocale } from "react-datepicker";
import api from '../../services/api';
import ptBR from 'date-fns/locale/pt-BR';

registerLocale('pt-br',ptBR)

const Adquirir = () =>{
    const { id } = useParams();
  const [imovel, setImovel] = useState();
  const [endereco, setEndereco] = useState();
  const [imagem, setImagem] = useState();
  const [Data, setData] = useState("");
  const [PessoaId, setPessoaId] = useState("");
  const [dadosCarregados, setDadosCarregados] = useState(false);
  const [dadosLogin, setdadosLogin] = useState(false);
  const navigate = useNavigate()

  const handleDataChange = (event) => {
    setData(event.target.value);
};

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
    dadosToken()
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
  }, [!dadosLogin]);

  async function dadosToken(){
    var JWTToken = await localStorage.getItem("Token")
    console.log(JWTToken);
    const config = {
        headers: { Authorization: `Bearer ${JWTToken}` }
    };

    await api.get("/pessoa/token", config)
    .then((response) => {
      console.log(response.data)
      console.log(response.data.id)
        setPessoaId(response.data.id);
        setdadosLogin(true);
    })
    .catch((err) => {
        console.log(err)
    });
   
}

  const handleSubmit = (event) => {
    
    event.preventDefault();
    console.log(id)
    console.log(PessoaId)
    console.log(Data)
    axios.post(`http://localhost:8000/agendamento`, {
      imoveis_id: id,
      pessoa_id: PessoaId,
      data: Data,
      status: "Em Andamento"
    }
    )
    .then(()=>{
        alert("Agendamento Feito com Sucesso!");
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
        <form onSubmit={handleSubmit}>
        <br />
        <label>Descrição</label>
        <div className='textoadquirir' name='descricao'>{imovel.descricao}</div>
        <label>
            Valor
            <div currency="BRL" config={currencyConfig} className='textoadquirir' name="valor">{(imovel.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
            </label>
        <label>
        <label>
            Data de agendamento
            <br></br>
            <input
            type="date"
            locale="pt-br" 
            dateFormat="dd/MM/yyyy" 
            onChange={handleDataChange}
            min={new Date().toISOString().substring(0,10)}
            value={Data}
            />{}
        </label>

        </label>        
        <br /> <br />
        <button type='submit' className='botaoA'>Confirmar</button>
        </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Adquirir;
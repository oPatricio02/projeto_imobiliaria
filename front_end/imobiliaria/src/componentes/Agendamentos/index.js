import { useState,useEffect } from 'react';
import './agendamento.css'
import axios from 'axios';
import Box from './box';
import Footer from '../Footer';
import Header from '../Header';

const Agendamento = () =>{

    const [agendamentos,setAgendamentos] = useState([]);
    const [dadosCarregados,setDadosCarregados] = useState(false);
    const [imoveis,setImoveis] = useState([]);
    const [pessoa,setPessoa] = useState([]);
    const [enderecos,setEnderecos] = useState([]);
    const [fotos,setFotos] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/agendamento');
            const agendamentosData = response.data;
      
            const imovelPromises = agendamentosData.map((agendamento) => {
              return axios.get(`http://localhost:8000/imoveis/${agendamento.imoveis_id}`);
            });
            
            const imovelResponses = await Promise.all(imovelPromises);
            const imoveisData = imovelResponses.map((response) => response.data);
      
            const pessoaPromises = agendamentosData.map((agendamento) => {
              return axios.get(`http://localhost:8000/pessoa/${agendamento.pessoa_id}`);
            });
      
            const pessoaResponses = await Promise.all(pessoaPromises);
            const pessoaData = pessoaResponses.map((response) => response.data);
      
            const enderecoPromises = imoveisData.map((imovel) => {
                return axios.get(`http://localhost:8000/enderecos/${imovel.endereco_id}`);
              });
        
              const enderecoResponses = await Promise.all(enderecoPromises);
              const enderecosData = enderecoResponses.map((response) => response.data);
        
              const imagensPromises = imoveisData.map((imovel) => {
                return axios.get(`http://localhost:8000/fotos/${imovel.fotos_id}`);
              });
        
              const imagensResponses = await Promise.all(imagensPromises);
              const imagensData = imagensResponses.map((response) => response.data);
   
            setEnderecos(enderecosData);
            setFotos(imagensData);
            setAgendamentos(agendamentosData);
            setImoveis(imoveisData);
            setPessoa(pessoaData);
            setDadosCarregados(true);
          } catch (error) {
            console.error(error);
            alert('Erro Interno');
          }
        };
      
        fetchData();
      }, [!dadosCarregados]);



      if(!dadosCarregados) {
        return(
            <div>
                <p className='carregando'>Carregando...</p>
            </div>
            
        ) 
      }

    return (
        <div className='conteinerAgendamento'>
            <Header/>
            <div>
              <ul className='listaAgenda'>
                {
                  agendamentos.map((agendamento,index) =>(
                    <li key={index}>
                        <Box id={agendamento.id} data={agendamentos[index].data} imageSrc={fotos[index].url} endereco={enderecos[index]} pessoa={pessoa[index]} imovel={imoveis[index]} status={agendamento.status}/>
                      </li>
                  ))
                }
              </ul>
            </div>
            <Footer/>
        </div>
    );
}

export default Agendamento;
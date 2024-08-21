import './imovel.css';
import Header from '../Header';
import axios from 'axios'
import React,{useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from '../Footer';
import api from '../../services/api';
const Imovel = () =>
{
    const navigate = useNavigate()
    const [enderecos,setEnderecos] = useState([]);
    const tipos =['Apartamento','Casa','Comercial','Kitnet','Terreno'];
    const [ imoveis, setImoveis] = useState([]);
    const [imovel,setImovel] = useState();
    const [imagem,setImagem] = useState();
    const [dadosCarregados, setDadosCarregados] = useState(false);
    const [filter1,setFilter1] = useState('');
    const [Nivel_Acesso, setNivel_Acesso] = useState('1');
    const [dadosLogin, setdadosLogin] = useState(false);

    useEffect(() => {
        loginToken()
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/imoveis');
            const imoveisData = response.data;
      
            const enderecoPromises = imoveisData.map((imovel) => {
              return axios.get(`http://localhost:8000/enderecos/${imovel.endereco_id}`);
            });
      
            const enderecoResponses = await Promise.all(enderecoPromises);
            const enderecosData = enderecoResponses.map((response) => response.data);
      
            const imovelPromises = imoveisData.map((imovel) => {
              return axios.get(`http://localhost:8000/fotos/${imovel.fotos_id}`);
            });
      
            const imovelResponses = await Promise.all(imovelPromises);
            const imagensData = imovelResponses.map((response) => response.data);
            
            

            setImoveis(imoveisData);
            setEnderecos(enderecosData);
            setImagem(imagensData[0]); // Defina a imagem a ser exibida, usando a primeira imagem da lista
            setImovel(imoveisData[0]); // Defina o imóvel a ser exibido, usando o primeiro imóvel da lista
            setDadosCarregados(true);
          } catch (error) {
            console.error(error);
            alert('Erro Interno');
          }
        };
      
        fetchData();
      }, [!dadosLogin]);

      async function loginToken(){
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
        setdadosLogin(true);
      }

      function selecionado(id){
        axios.get(`http://localhost:8000/imoveis/${id}`)
        .then((response)=>{
            setImovel(response.data);
            axios.get(`http://localhost:8000/fotos/${response.data.fotos_id}`)
            .then((imagemResponse)=>{
                setImagem(imagemResponse.data);
            })
            .catch(()=>{
                alert('Erro Interno');
            })
        })
        .catch(()=>{
            alert('Erro Interno');
        })
        
      }

      function deletar(){
        axios.delete(`http://localhost:8000/imoveis/${imovel.id}`)
        .then((response)=>{
            alert('Imovel Deletado');
        })
        .catch(()=>{
            alert('Erro Interno');
        })
        window.location.reload();
      }

      function adquirir(){
        navigate(`/adquirirIm/${imovel.id}`)
      }

      function editar(){
        navigate(`/edicaoIm/${imovel.id}`);
      }

      function novo(){
        navigate('/novo');
      }

      const handleFilterTipo = (event) =>{
        setFilter1(event.target.value);
        if(event.target.value === ''){
            const fetchData = async () => {
                try {
                  const response = await axios.get('http://localhost:8000/imoveis');
                  const imoveisData = response.data;
            
                  const enderecoPromises = imoveisData.map((imovel) => {
                    return axios.get(`http://localhost:8000/enderecos/${imovel.endereco_id}`);
                  });
            
                  const enderecoResponses = await Promise.all(enderecoPromises);
                  const enderecosData = enderecoResponses.map((response) => response.data);
            
                  const imovelPromises = imoveisData.map((imovel) => {
                    return axios.get(`http://localhost:8000/fotos/${imovel.fotos_id}`);
                  });
            
                  const imovelResponses = await Promise.all(imovelPromises);
                  const imagensData = imovelResponses.map((response) => response.data);
            
                  setImoveis(imoveisData);
                  setEnderecos(enderecosData);
                  setImagem(imagensData[0]); // Defina a imagem a ser exibida, usando a primeira imagem da lista
                  setImovel(imoveisData[0]); // Defina o imóvel a ser exibido, usando o primeiro imóvel da lista
                  setDadosCarregados(true);
                } catch (error) {
                  console.error(error);
                  alert('Erro Interno');
                }
              };
            
              fetchData();
        }
        else{
            const fetchData = async () => {
            try {
              const response = await axios.get(`http://localhost:8000/imoveis/filter/${event.target.value}`);
              const imoveisData = response.data;
        
              const enderecoPromises = imoveisData.map((imovel) => {
                return axios.get(`http://localhost:8000/enderecos/${imovel.endereco_id}`);
              });
        
              const enderecoResponses = await Promise.all(enderecoPromises);
              const enderecosData = enderecoResponses.map((response) => response.data);
        
              const imovelPromises = imoveisData.map((imovel) => {
                return axios.get(`http://localhost:8000/fotos/${imovel.fotos_id}`);
              });
        
              const imovelResponses = await Promise.all(imovelPromises);
              const imagensData = imovelResponses.map((response) => response.data);
        
              setImoveis(imoveisData);
              setEnderecos(enderecosData);
              setImagem(imagensData[0]); // Defina a imagem a ser exibida, usando a primeira imagem da lista
              setImovel(imoveisData[0]); // Defina o imóvel a ser exibido, usando o primeiro imóvel da lista
              setDadosCarregados(true);
            } catch (error) {
              console.error(error);
              alert('Erro Interno');
            }
          };
          fetchData();
        }
       
        
          
      }
      if(!dadosCarregados) {
        return(
            <div>
                <Header/>
                <p className='carregando'>Carregando...</p>
            </div>
            
        ) 
      }
      
        return(
        <div> 

            <Header/>
            <div className='principal'>
                <div> 
                    <div>
                      <div className='opcoes'>
                          <label>Tipo: </label>
                          <select value={filter1} onChange={handleFilterTipo} required={true}>
                          <option value="" >Todos</option>
                          {
                              tipos.map((tipo,index) =>(
                              <option key={index} value={tipo}>
                                  {tipo}
                          </option>))
                          }

                          </select>
                      </div>
                      
                  </div>
                    
          
                    <table className='tabela'>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Endereco</th>
                            </tr>
                        </thead>
                        <tbody>
                            {imoveis.map((imovel,index) => (
                            <tr key={imovel.id} onClick={() => selecionado(imovel.id)}>
                                <td>{imovel.tipo}</td>
                                <td>{enderecos[index].logradouro} - {enderecos[index].bairro}, {enderecos[index].cidade} </td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                                
                </div>
                
                <div className='direito'>
                    { Nivel_Acesso === "1"?<></> :
                    <div className='btnNovo'>
                        <button className='novo' onClick={novo}>Novo</button>
                    </div>}
                    <img src={imagem && imagem.url} alt='Imagem'></img>
                    <div className='infos'>
                        <p className='descricao'>{imovel && imovel.descricao}</p>
                        { Nivel_Acesso === "1"?
                          <div className='valores'>
                            <p>Valor: {imovel && (imovel.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                          </div>
                          :
                          <div className='valores'>
                            <p>Valor Minimo: {imovel && (imovel.valor_minimo).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                            <p>Valor: {imovel && (imovel.valor).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                          </div>
                        }
                        
                    </div>
                    { Nivel_Acesso === "1"?
                      <div className='botoes'>
                        <button className='adquirir' onClick={adquirir} >Adquirir</button>
                        
                      </div>
                      :
                      <div className='botoes'>
                      <button className='editar' onClick={editar}>Editar</button>
                      <button className='excluir' onClick={deletar}>Excluir</button>
                      </div>
                    }
                    

                </div>
    
            </div>
            <Footer/>
        </div>
        
    );
    
    
}
export default Imovel;
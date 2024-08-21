import './box.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Box = ({ id, imageSrc, endereco, valor, descricao, tipo }) => {
  const navigate = useNavigate();
  
  

  function interesse(id) {
    navigate(`/regInteresse/${id}`);
  }
  function finaciamento(){
      navigate(`/finaciamento/${id}`);
  }


  return (
    <div className='boxPrincipal'>
      <div>
        <img src={imageSrc} alt='imovel' />
      </div>
      <div className='conteudos'>
        <h4>{tipo}</h4>
        <p>{endereco.logradouro} - {endereco.bairro}, {endereco.cidade}</p>
        <br></br>
        <p>{descricao}</p>
        <br></br>
        <h4>R$ {valor}</h4>
      </div>
      <br></br>
      <div className='opcaoBox'>
        <a href onClick={() => finaciamento(id)}>Simular finaciamento </a>
        <a href onClick={() => interesse(id)}>Tem interesse?</a>
      </div>
    </div>
  );
}

export default Box;
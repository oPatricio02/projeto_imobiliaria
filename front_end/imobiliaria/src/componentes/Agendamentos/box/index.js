import './boxagendamento.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Box = ({ id, data, imageSrc, endereco, pessoa, imovel, status }) => {
  const navigate = useNavigate();

  function Concluir(id){
    axios.put("http://localhost:8000/agendamento/"+id, {
        status: "Concluído"
    }
    )
    .then(()=>{
        alert("Negociação Concluída")
        navigate("/agendamento")
    })
    .catch((error)=>{
        alert(error);
    })
  }

  function Cancelar(id){
    axios.put("http://localhost:8000/agendamento/"+id, {
        status: "Cancelado"
    }
    )
    .then(()=>{
        alert("Negociação Cancelada")
        navigate("/agendamento")
    })
    .catch((error)=>{
        alert(error);
    })
  }

  function Excluir(id) {
    axios.delete("http://localhost:8000/agendamento/"+id, {
    }
    )
    .then(()=>{
        alert("Agendamento Deletado!");
        navigate("/agendamento")
    })
    .catch((error)=>{
        alert(error);
    })
  }

  return (
    <div className='boxPrincipalagendamento'> 
        <div>
        <img src={imageSrc} alt='imovel' />
      </div>
      <div className='conteudos'>
        <p><b>Endereço:</b></p>
        <p>{endereco.logradouro} - {endereco.bairro}, {endereco.cidade}</p>
        <br></br>
        <h4>Código do agendamento: {id}</h4>
        <p><b>Data:</b> {data.split('-').reverse().join('/')}</p>
        <p><b>Nome:</b> {pessoa.nome}</p>
        <p><b>CPF/CNPJ:</b> {pessoa.cnpj_cpf}</p>
        <p><b>Email:</b> {pessoa.email}</p>
        <p><b>Telefone:</b> {pessoa.celular}</p>
        <br></br>
        <p><b>Status:</b> {status}</p>
      </div>
      <br></br>
      <div className='opcaoBox'>
        <a className='excluirbox' href onClick={() => Excluir(id)}>Excluir</a>
        <a className='concluirbox' href onClick={() => Concluir(id)}>Concluir</a>
        <a className='cancelarbox' href onClick={() => Cancelar(id)}>Cancelar</a>
      </div>
    </div>
  );
}

export default Box;
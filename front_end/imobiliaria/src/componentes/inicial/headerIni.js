import React from 'react';
import './headerIni.css';
import { MdAccountCircle } from "react-icons/md";

function HeaderIni() {
  return (
    <header className='conteinerBox'>
      <div>
        <img src="caminho-para-o-seu-logotipo" alt="Logotipo" />
      </div>
      <div>
        <ul>
            <li>
                <a className='botaoI' type='submit' href="/login"><MdAccountCircle /></a>
            </li>
        </ul>
      </div>
    </header>
  );
}

export default HeaderIni;
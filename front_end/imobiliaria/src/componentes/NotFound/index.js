import './notfound.css';
import Header from '../Header';
import React from 'react';

const NotFound = () =>{

    return(
        <div>
            <Header/>
            <p className='naoencontrada'>Página não encontrada</p>
        </div>
    );
}
export default NotFound;
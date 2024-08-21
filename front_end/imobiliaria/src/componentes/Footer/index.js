import './footer.css'

import linkedin from './imgs/logolinkedin.svg'
import instagram from './imgs/logoinstagram.svg'

function Footer (){

    return(
        <footer className='footerr'>
            <div className='dfooter'>
                <p>Produto elaborado e desenvolvido por: AJ2L</p>
                {/*<img src={logo} alt='Logo'></img>*/}
            </div>
            <div className='redesfooter'>
                <p>Siga-Nos!</p>
                <div className='iconsfooter'>
                    <a href='' target="_blank" rel="noreferrer"><img src={linkedin} alt='logolinkedin'></img></a>
                    <a href='' target="_blank" rel="noreferrer"><img src={instagram} alt='logoinsta'></img></a>
                </div>
            </div>
            
        </footer>
    )
}

export default Footer
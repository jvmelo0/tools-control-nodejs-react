import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faList, faScrewdriverWrench, faUpDown, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

function Main() {
    const navigate = useNavigate()
    return (
        <div className='container'>
            <h1>Controle de Ferramentas <FontAwesomeIcon icon={faScrewdriverWrench} /></h1>
            <h2>Bem Vindo!</h2>
            <div className='main'>
                <div>
                    <h2><FontAwesomeIcon icon={faUpDown} /> Movimentos</h2>
                    <h4><span onClick={() => navigate('/movimentos/listar')}>Listar</span></h4>   
                    <h4><span onClick={() => navigate('/movimentos/emprestar')}>Emprestar <FontAwesomeIcon icon={faArrowUp} /></span></h4> 
                    <h4><span onClick={() => navigate('/movimentos/devolver')}>Devolver <FontAwesomeIcon icon={faArrowDown} /></span></h4> 
                </div>
                <div>
                    <h2><FontAwesomeIcon icon={faScrewdriverWrench} /> Ferramentas</h2>
                    <h4><span onClick={() => navigate('/ferramentas/listar')}>Listar</span></h4>   
                    <h4><span onClick={() => navigate('/ferramentas/cadastrar')}>Cadastrar</span></h4> 
                </div>
                <div>
                    <h2><FontAwesomeIcon icon={faList} /> Categoria</h2>
                    <h4><span onClick={() => navigate('/categorias/listar')}>Listar</span></h4>   
                    <h4><span onClick={() => navigate('/categorias/cadastrar')}>Cadastrar</span></h4> 
                </div>
                <div>
                    <h2><FontAwesomeIcon icon={faUser} /> Usuários</h2>
                    <h4><span onClick={() => navigate('/usuarios/listar')}>Listar</span></h4>                      
                </div>
            </div>
        </div>
    )
}

export default Main

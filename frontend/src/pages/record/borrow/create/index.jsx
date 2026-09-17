import api from '../../../../services/api'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faScrewdriverWrench, faUpDown, faUser, faHome } from '@fortawesome/free-solid-svg-icons'

function Borrow() {
    const navigate = useNavigate()

    const inputToolId = useRef()
    const inputUserId = useRef()

    async function  postBorrow(e) {
        e.preventDefault()
        try {
            await api.post('/record', {
                toolId: Number(inputToolId.current.value),
                userId: Number(inputUserId.current.value)
            })
            alert("Ferramenta emprestada com sucesso!")
        } catch (error) {
            console.log(error.response?.data)
            if (error.response?.status === 400) {
                alert("Ferramenta indisponível")
            } else {
                alert("Erro ao emprestar a ferramenta")
            }
        }
    }

    return (
        <div className='container'>
            <form onSubmit={postBorrow}>
                <h1>Empréstimo Ferramenta <FontAwesomeIcon icon={faArrowUp} /></h1>
                <input placeholder="Código Ferramenta" name="ToolId" type='text' ref={inputToolId}/>
                <input placeholder="Código Usuário" name="UserId" type='text' ref={inputUserId}/>
                <button type='submit'>Cadastrar</button>
                <h4><span onClick={() => navigate('/movimentos/devolver')}><FontAwesomeIcon icon={faArrowDown} /> Nova Devolução</span></h4>
                <h4><span onClick={() => navigate('/movimentos/listar')}><FontAwesomeIcon icon={faUpDown} /> Listar Movimentos</span></h4>
                <h4><span onClick={() => navigate('/ferramentas/listar')}><FontAwesomeIcon icon={faScrewdriverWrench} /> Listar Ferramentas</span></h4>
                <h4><span onClick={() => navigate('/usuarios/listar')}><FontAwesomeIcon icon={faUser} /> Listar Usuários</span></h4>
                <h4><span onClick={() => navigate('/main')}><FontAwesomeIcon icon={faHome} /> Menu Principal</span></h4>
            </form>
        </div>
    )
}

export default Borrow
import api from '../../../../services/api'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faScrewdriverWrench, faUpDown, faUser, faHome } from '@fortawesome/free-solid-svg-icons'

function Giveback() {
    const navigate = useNavigate()

    const inputToolId = useRef()
    const inputUserId = useRef()

    async function  postGiveback(e) {
        e.preventDefault()
        try {
            await api.post('/record/return', {
                toolId: Number(inputToolId.current.value),
                userId: Number(inputUserId.current.value)
            })
            alert("Ferramenta devolvida com sucesso!")
        } catch (error) {
            console.log(error.response?.data)
            if (error.response?.status === 400) {
                alert("Ferramenta está disponível")
            } else {
                alert("Erro ao devolver a ferramenta")
            }
        }
    }

    return (
        <div className='container'>
            <form onSubmit={postGiveback}>
                <h1>Devolução Ferramenta <FontAwesomeIcon icon={faArrowDown} /></h1>
                <input placeholder="Código Ferramenta" name="ToolId" type='text' ref={inputToolId}/>
                <input placeholder="Código Usuário" name="UserId" type='text' ref={inputUserId}/>
                <button type='submit'>Cadastrar</button>
                <h4><span onClick={() => navigate('/movimentos/emprestar')}><FontAwesomeIcon icon={faArrowUp} /> Novo Empréstimo</span></h4>
                <h4><span onClick={() => navigate('/movimentos/listar')}><FontAwesomeIcon icon={faUpDown} /> Listar Movimentos</span></h4>
                <h4><span onClick={() => navigate('/ferramentas/listar')}><FontAwesomeIcon icon={faScrewdriverWrench} /> Listar Ferramentas</span></h4>
                <h4><span onClick={() => navigate('/usuarios/listar')}><FontAwesomeIcon icon={faUser} /> Listar Usuários</span></h4>
                <h4><span onClick={() => navigate('/main')}><FontAwesomeIcon icon={faHome} /> Menu Principal</span></h4>
            </form>
        </div>
    )
}

export default Giveback
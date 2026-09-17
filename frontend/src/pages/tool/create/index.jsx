import api from '../../../services/api'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench, faList, faHome } from '@fortawesome/free-solid-svg-icons'

function ToolCreate() {
    const navigate = useNavigate()

    const inputDescription = useRef()
    const inputCategoryId = useRef()

    async function postTool(e) {
        e.preventDefault()
        try {
            await api.post('/tool', {
                description: inputDescription.current.value,
                categoryId: Number(inputCategoryId.current.value)
            })
            alert("Ferramenta cadastrada com sucesso!")
        } catch (error) {
            console.log(error.response?.data)
            if (error.response?.status === 400) {
                alert(`Erro de validação: ${error.response.data.message}`)
            } else {
                alert("Erro ao cadastrar a ferramenta.")
            }
        }
    }

    return (
        <div className='container'>
            <form onSubmit={postTool}>
                <h1>Cadastro Ferramenta <FontAwesomeIcon icon={faScrewdriverWrench} /></h1>
                <input placeholder="Descrição" name="Description" type='text' ref={inputDescription}/>
                <input placeholder="Código Categoria" name="CategoryId" type='text' ref={inputCategoryId}/>
                <button type='submit'>Cadastrar</button>
                <h4><span onClick={() => navigate('/ferramentas/listar')}><FontAwesomeIcon icon={faScrewdriverWrench} /> Listar Ferramentas</span></h4>
                <h4><span onClick={() => navigate('/categorias/listar')}><FontAwesomeIcon icon={faList} /> Listar Categorias</span></h4>
                <h4><span onClick={() => navigate('/main')}><FontAwesomeIcon icon={faHome} /> Menu Principal</span></h4>
            </form>
        </div>
    )
}

export default ToolCreate
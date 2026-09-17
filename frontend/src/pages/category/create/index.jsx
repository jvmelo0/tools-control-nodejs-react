import api from '../../../services/api'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList } from '@fortawesome/free-solid-svg-icons'

function CategoryCreate() {
    const navigate = useNavigate()

    const inputName = useRef()

    async function postCategory(e) {
        e.preventDefault()
        try {
            await api.post('/category', {
                name: inputName.current.value,
            })
            alert("Categoria cadastrada com sucesso!")
        } catch (error) {
            console.log(error.response?.data)
            if (error.response?.status === 409) {
                alert("Categoria já existe")
            } else {
                alert("Erro ao cadastrar a categoria.")
            }
        }
    }

    return (
        <div className='container'>
            <form onSubmit={postCategory}>
                <h1>Cadastro Categoria <FontAwesomeIcon icon={faList} /></h1>
                <input placeholder="Nome" name="Name" type='text' ref={inputName}/>
                <button type='submit'>Cadastrar</button>
                <h4><span onClick={() => navigate('/categorias/listar')}><FontAwesomeIcon icon={faList} /> Listar Categorias</span></h4>
                <h4><span onClick={() => navigate('/main')}><FontAwesomeIcon icon={faHome} /> Menu Principal</span></h4>
            </form>
        </div>
    )
}

export default CategoryCreate
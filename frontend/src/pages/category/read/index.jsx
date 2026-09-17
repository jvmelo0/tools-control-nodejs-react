import api from '../../../services/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTrashCan, faPenToSquare, faScrewdriverWrench, faHome } from '@fortawesome/free-solid-svg-icons'

function CategoryRead() {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    async function deleteCategory(id, name) {
        const confirm = window.confirm(`A Categoria "${name}" será excluída. Desaja continuar? `)
        if(!confirm) return

        try {
            await api.delete(`/category/${id}`)
            setCategories(prevCategory => prevCategory.filter(category => category.id !== id))
        } catch(error) {
            console.error(error)
            if(error.response?.status === 409 || error.response?.status === 500) {
                alert("Não foi possível excluir a categoria.")
            } else {
                alert("Erro ao tentar excluir a categoria.")
            }
        }
        
    }

    useEffect(() => {
        async function getCategories() {
            const categoriesApi = await api.get('/category')
            setCategories(categoriesApi.data)
        }
        getCategories()
    }, [])

    return (
        <div className="container">
            <div className='tela'>
                <h1>Consulta Categorias <FontAwesomeIcon icon={faList} /></h1>
                <div className='atalho'>
                    <h4><span onClick={() => navigate('/categorias/cadastrar')}><FontAwesomeIcon icon={faList}/> Cadastrar Nova Categoria</span></h4>      
                    <h4><span onClick={() => navigate('/ferramentas/cadastrar')}><FontAwesomeIcon icon={faScrewdriverWrench}/> Cadastrar Nova Ferramenta</span></h4>  
                    <h4><span onClick={() => navigate('/main')}><FontAwesomeIcon icon={faHome}/> Menu Principal</span></h4>
                </div>
                
                { categories.map( category => (
                    <div key={category.id} className="lista">
                        <div>
                            <p><FontAwesomeIcon icon={faList} /> Nome: <span>{category.name}</span> <span>({category.id})</span></p>
                        </div>
                        <div className='icone'>
                            <p onClick={() => navigate(`/categorias/editar/${category.id}`)}><FontAwesomeIcon icon={faPenToSquare} size="xl" /></p>
                            <p type="button" onClick={() => deleteCategory(category.id, category.name)}><FontAwesomeIcon icon={faTrashCan} size="xl" /></p>
                        </div>
                    </div>
                ))}  
            </div>
        </div>
    )
}

export default CategoryRead
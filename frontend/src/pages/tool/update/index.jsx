import api from '../../../services/api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench, faCheck, faList } from '@fortawesome/free-solid-svg-icons'

function ToolUpdate() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [description, setDescription] = useState('')
    const [available, setAvailable] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function getToolById() {
            try {
                const response = await api.get(`/tool/${id}`)
                const tool = response.data

                setDescription(tool.description || '')
                setAvailable(tool.available ? '1' : '0')
                setCategoryId(tool.categoryId)
            } catch(error) {
                console.error("Erro ao encontrar a ferramenta", error)
                alert("Erro ao encontrar a ferramenta")
            }
        }
        getToolById()
    }, [id])

    useEffect(() => {
        async function loadCategory() {
            try {
                const response = await api.get('/category')
                setCategories(response.data)
            } catch(error) {
                console.error("Erro ao carregar categorias", error)
            }
        }
        loadCategory()
    }, [])

    async function updateTool(e) {
        e.preventDefault()

        const cleanedDescription = description.trim()
        if (!cleanedDescription) {
            alert("O campo Descrição não pode estar vazio.")
            return
        }

        const payload = {
            description: description,
            available: available === '1',
            categoryId: Number(categoryId)
        }

        try {
            await api.put(`/tool/${id}`, payload)
            alert("Ferramenta atualizada com sucesso!")
            navigate('/ferramentas/listar')
        } catch(error) {
            console.error("Erro ao atualizar a ferramenta", error)
            if (error.response?.data?.errors) {
                console.log("Erros do Validator:", error.response.data.errors)
                alert(`Erro de validação: ${error.response.data.errors[0]?.message || 'Dados inválidos'}`)
            } else if (error.response?.data?.message) {
                alert(error.response.data.message)
            } else {
                alert("Erro ao atualizar a ferramenta.")
            }
        }
        
    }

    return (
        <div className='container'>
            <h1>Editar Ferramenta #{id} <FontAwesomeIcon icon={faScrewdriverWrench} /></h1>
            <h4><span onClick={() => navigate('/ferramentas/listar')}>Listar Ferramenta</span></h4>    
            <form onSubmit={updateTool}>
                <div className='editar'>
                    <label><FontAwesomeIcon icon={faScrewdriverWrench} /> Descrição: </label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className='editar'>
                    <label><FontAwesomeIcon icon={faCheck} /> Status: </label>
                    <select value={available} onChange={(e) => setAvailable(e.target.value)}>
                        <option value="1">Disponível</option>
                        <option value="0">Indisponível</option>
                    </select>
                </div>
                <div className='editar'>
                    <label><FontAwesomeIcon icon={faList} /> Categoria: </label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                        <option value="">Selecione</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    )

}

export default ToolUpdate
import api from '../../../services/api'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

function CategoryUpdate() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [name, setCategory] = useState('')

    useEffect(() => {
        async function  getCategoryById() {
            try {
                const response = await api.get(`/category/${id}`)
                const category = response.data

                setCategory(category.name || '')
            } catch(error) {
                console.error("Erro ao encontrar a categoria", error)
                alert("Erro ao encontrar a categoria")
            }
        }
        getCategoryById()
    }, [id])

    async function updateCategory(e) {
        e.preventDefault()

        const cleanedName = name.trim()
        if (!cleanedName) {
            alert("O campo nome não pode estar vazio.")
            return
        }

        try {
            await api.put(`/category/${id}`, {name: cleanedName})
            alert("Categoria atualizada com sucesso!")
            navigate('/categorias/listar')
        } catch (error) {
            console.error("Erro ao atualizar a categoria", error)
            if (error.response?.data?.errors) {
                console.log("Erros do Validator:", error.response.data.errors)
                alert(`Erro de validação: ${error.response.data.errors[0]?.message || 'Dados inválidos'}`)
            } else if (error.response?.data?.message) {
                alert(error.response.data.message)
            } else {
                alert("Erro ao atualizar a categoria.")
            }
        }
    }

    return (
        <div className='container'>
            <h1>Editar Categoria #{id} <FontAwesomeIcon icon={faList} /></h1>
            <h4><span onClick={() => navigate('/categorias/listar')}>Listar Categorias</span></h4>
            <form onSubmit={updateCategory}>
                <div className='editar'>
                    <label><FontAwesomeIcon icon={faList} /> Categoria: </label>
                    <input type="text" value={name} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <button type="submit">Salvar Alterações</button>
            </form>

        </div>
    )
}

export default CategoryUpdate

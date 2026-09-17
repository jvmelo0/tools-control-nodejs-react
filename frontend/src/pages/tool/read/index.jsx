import api from '../../../services/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench, faCheck, faList, faTrashCan, faPenToSquare, faMagnifyingGlass, faHome } from '@fortawesome/free-solid-svg-icons'

function ToolRead() {
    const navigate = useNavigate()
    const [tools, setTools] = useState([])
    const [categories, setCategories] = useState([])

    const [filterType, setFilterType] = useState('all')
    const [filterValue, setFilterValue] = useState('')

    async function deleteTool(id, description) {
        const confirm = window.confirm(`A Ferramenta "${description}" será excluída. Desaja continuar? `)
        if(!confirm) return

        try {
            await api.delete(`/tool/${id}`)
            setTools(prevTool => prevTool.filter(tool => tool.id !== id))
        } catch(error) {
            console.error(error)
            if(error.response?.status === 409 || error.response?.status === 500) {
                alert("Não foi possível excluir a ferramenta.")
            } else {
                alert("Erro ao tentar excluir a ferramenta.")
            }
        }
        
    }

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

    async function getTools() {
        try {
            let endpoint = '/tool'

            if(filterValue !== '' && filterType !== 'all') {
                switch(filterType) {
                    case 'id':
                        endpoint = `/tool/${filterValue}`
                        break
                    case 'name':
                        endpoint = `/tool/nome/${filterValue}`
                        break
                    case 'category':
                        endpoint = `/tool/categoria/${filterValue}`
                        break
                    case 'available':
                        endpoint = `/tool/disponibilidade/${filterValue}`
                        break
                    default:
                        endpoint = '/tool'
                }
            }

            const response = await api.get(endpoint)

            if(Array.isArray(response.data)) {
                setTools(response.data)
            } else if (response.data) {
                setTools([response.data])
            } else {
                setTools([])
            }

        } catch(error) {
            console.error("Erro ao buscar", error);
            setTools([])
        }
    }

    useEffect(() => {
        async function getInitialTools() {
            try {
            const response = await api.get('/tool')
            setTools(Array.isArray(response.data) ? response.data : [response.data])
            } catch (error) {
            console.error("Erro na busca inicial:", error)
            }
        }
        getInitialTools()
    }, [])

    return (
        <div className="container">
            <div className="tela">
                <h1>Consulta Ferramentas <FontAwesomeIcon icon={faScrewdriverWrench} /></h1>
                <div className='atalho'>
                    <h4><span onClick={() => navigate('/ferramentas/cadastrar')}><FontAwesomeIcon icon={faScrewdriverWrench} /> Cadastrar Nova Ferramenta</span></h4>    
                    <h4><span onClick={() => navigate('/main')}><FontAwesomeIcon icon={faHome} /> Menu Principal</span></h4>  
                </div>
                <div className='filtros'>
                    <select onChange={(e) => {
                        setFilterType(e.target.value)
                        setFilterValue('')
                    }}>
                        <option value="all">Todas as Ferramentas</option>
                        <option value="id">Buscar por Código (ID)</option>
                        <option value="name">Buscar por Descrição/Nome</option>
                        <option value="category">Buscar por Categoria</option>
                        <option value="available">Buscar por Disponibilidade</option>
                    </select>
                    {filterType === 'id' && (
                        <input type="text" placeholder="Digite o ID" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
                    )}
                    {filterType === 'name' && (
                        <input type="text" placeholder="Digite a descrição/nome" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
                    )}
                    {filterType === 'category' && (
                        <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    )}
                    {filterType === 'available' && (
                        <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                            <option value="1">Disponível</option>
                            <option value="0">Indisponível</option>
                        </select>
                    )}
                    <button type="button" onClick={getTools}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Filtrar
                    </button>
                </div>
                {tools.length === 0 ? (
                    <p>Nenhuma ferramenta encontrada.</p>
                ) : (
                    tools.map( tool => (
                    <div key={tool.id} className="lista">
                        <div>
                            <p><FontAwesomeIcon icon={faScrewdriverWrench} /> Descrição: <span>{tool.description}</span> <span>({tool.id})</span> </p>
                            <p><FontAwesomeIcon icon={faCheck} /> Status: <span>{tool.available}</span> </p>
                            <p><FontAwesomeIcon icon={faList} /> Categoria: <span>{tool.Category?.name}</span> <span>({tool.categoryId})</span></p>
                        </div>
                        <div className='icone'>
                            <p onClick={() => navigate(`/ferramentas/editar/${tool.id}`)}><FontAwesomeIcon icon={faPenToSquare} size="xl" /></p>
                            <p type="button" onClick={() => deleteTool(tool.id, tool.description)}><FontAwesomeIcon icon={faTrashCan} size="xl" /></p>
                        </div>
                    </div>
                )))} 
            </div>    
        </div>
    )
}

export default ToolRead
import api from '../../../services/api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faScrewdriverWrench, faUser, faUpDown, faMagnifyingGlass, faHome, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

function RecordRead() {
    const navigate = useNavigate()
    const [records, setRecord] = useState([])

    const [filterType, setFilterType] = useState('all')
    const [filterValue, setFilterValue] = useState('0')

    useEffect(() => {
        async function getInitialRecord() {
            try {
                const response = await api.get('/record')
                setRecord(Array.isArray(response.data) ? response.data : [response.data])
            } catch (error) {
                console.error("Erro na busca inicial:", error)
            }
        }
        getInitialRecord()
    }, [])

    async function getRecords() {
        try {
            let endpoint = '/record'

            if (filterType === 'type') {
                endpoint = `/record/movimento/${filterValue}`
            }
            console.log("Chamando endpoint:", endpoint)
            const response = await api.get(endpoint)

            if(Array.isArray(response.data)) {
                setRecord(response.data)
            } else if (response.data) {
                setRecord([response.data])
            } else {
                setRecord([])
            }
        } catch(error) {
            console.error("Erro ao buscar", error);
            setRecord([])
        }
    }

    function filterTypeChange(e) {
        const type = e.target.value
        setFilterType(type)
        setFilterValue(type === 'type' ? '0' : '')
    }

    return (
        <div className='container'>
            <div className='tela'>
                <h1>Consulta Movimentos <FontAwesomeIcon icon={faUpDown} /></h1>
                <div className='atalho'>
                    <h4><span onClick={() => navigate('/movimentos/emprestar')}><FontAwesomeIcon icon={faArrowUp} />Novo Emprestimo</span></h4> 
                    <h4><span onClick={() => navigate('/movimentos/devolver')}><FontAwesomeIcon icon={faArrowDown} />Nova Devolução</span></h4> 
                    <h4><span onClick={() => navigate('/main')}><FontAwesomeIcon icon={faHome} /> Menu Principal</span></h4>
                </div>
                <div className='filtros'>
                    <select onChange={filterTypeChange}>
                        <option value="all">Todas os Registros</option>
                        <option value="type">Buscar por Tipo</option>
                    </select>
                    {filterType === 'type' && (
                        <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
                            <option value="1">Saída / Empréstimo</option>
                            <option value="0">Entrada / Devolução</option>
                        </select>
                    )}
                    <button type="button" onClick={getRecords}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /> Filtrar
                    </button>
                </div>
                {records.length === 0 ? (
                    <p>Nenhum registro encontrado.</p>
                ) : (
                    records.map( record => (
                        <div key={record.id} className='lista'>
                            <div>
                                <p><FontAwesomeIcon icon={faUpDown} /> Tipo: <span>{record.movementType}</span> <span>({record.id})</span> </p>
                                <p><FontAwesomeIcon icon={faCalendar} /> Data: <span>{record.createdAt}</span> </p>
                                <p><FontAwesomeIcon icon={faScrewdriverWrench} /> Ferramenta: <span>{record.Tool?.description}</span> <span>({record.toolId})</span></p>
                                <p><FontAwesomeIcon icon={faUser} /> Usuário: <span>{record.User?.name}</span> <span>({record.userId})</span></p>
                            </div>
                        </div>
                )))}
            </div>
        </div>
    )
}

export default RecordRead
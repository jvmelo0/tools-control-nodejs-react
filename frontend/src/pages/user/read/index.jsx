import api from '../../../services/api'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons'

function UserRead() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function getUsers() {
            const usersApi = await api.get('/user')
            setUsers(usersApi.data)
        }
        getUsers()
    }, [])

    return (
        <div className="container">
            <div className='tela'>
                <h1>Consulta Usuários <FontAwesomeIcon icon={faUser} /></h1>
                <h4><span onClick={() => navigate('/main')}><FontAwesomeIcon icon={faHome}/> Menu Principal</span></h4>
                { users.map( user => (
                    <div key={user.id} className="lista">
                        <div>
                            <p><FontAwesomeIcon icon={faUser} /> Usuário: <span>{user.name}</span> <span>({user.id})</span> </p>
                            <p><FontAwesomeIcon icon={faEnvelope} /> E-mail: <span>{user.email}</span> </p>
                        </div>
                    </div>
                ))}     
            </div>   
        </div>
    )
}

export default UserRead
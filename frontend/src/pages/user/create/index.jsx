import api from '../../../services/api'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function UserCreate() {
    const navigate = useNavigate()

    const inputName = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()

    async function postUser(e) {
        e.preventDefault()
        try {
            await api.post('/user', {
                name: inputName.current.value,
                email: inputEmail.current.value,
                password: inputPassword.current.value
            })
            alert("Usuário cadastrado com sucesso!")
        } catch (error) {
            console.log(error.response?.data)
            if (error.response?.status === 409) {
                alert("E-mail já utilizado!")
            } else {
                alert("Erro ao cadastrar o usuário.")
            }
        }
        
    }

    return (
        <div className='container'>
            <form>
                <h1>Cadastro Usuário <FontAwesomeIcon icon={faUser} /></h1>
                <input placeholder="Nome" name="Name" type='text' ref={inputName}/>
                <input placeholder="E-mail" name="Email" type='text' ref={inputEmail}/>
                <input placeholder="Senha" name="Password" type='text' ref={inputPassword}/>
                <button type='button' onClick={postUser}>Cadastrar</button>
                <h4>Já possui login? <span onClick={() => navigate('/login')}>Logar</span></h4>
            </form>
        </div>
    )
}

export default UserCreate
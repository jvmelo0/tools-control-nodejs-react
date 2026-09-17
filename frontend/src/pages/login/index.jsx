import api from '../../services/api'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'

function Login() {
  const navigate = useNavigate()

  const inputEmail = useRef()
  const inputPassword = useRef()

  async function loginUser(e) {
    e.preventDefault()
    try {
      const response = await api.post('/user/login', {
        email: inputEmail.current.value,
        password: inputPassword.current.value
      })
      localStorage.setItem('token', response.data.token)
      navigate('/main')

    } catch(error) {
      if (error.response?.status === 401) {
        alert("Credenciais inválidas")
      } else {
        alert("Erro Interno")
      }
    
    } 
  }

  return (
    <div className='container'>
      <form onSubmit={loginUser}>
        <h1>Controle de Ferramentas<FontAwesomeIcon icon={faScrewdriverWrench} /> Login</h1>
        <input placeholder="E-mail" name="Email" type='text' ref={inputEmail}/>
        <input placeholder="Senha" name="Senha" type='text' ref={inputPassword}/>
        <button type='submit'>Logar</button>
        <h4>Não possui login? <span onClick={() => navigate('/usuarios/cadastrar')}>Cadastrar-se</span></h4>
      </form>
    </div>
  )
}

export default Login

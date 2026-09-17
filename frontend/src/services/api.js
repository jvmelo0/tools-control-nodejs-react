import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const isLoginRoute = error.config?.url?.includes('/login')

        if (error.response && error.response.status === 401 && !isLoginRoute) {
            alert("Sua sessão expirou. Por favor, faça login novamente.")

            localStorage.removeItem('token')
            localStorage.removeItem('userName')

            window.location.href = '/'
        }

        return Promise.reject(error)
    })

export default api
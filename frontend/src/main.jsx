import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './pages/login'
import Main from './pages/main'
import UserCreate from './pages/user/create'
import UserRead from './pages/user/read'
import CategoryCreate from './pages/category/create'
import CategoryRead from './pages/category/read'
import CategoryUpdate from './pages/category/update'
import ToolCreate from './pages/tool/create'
import ToolRead from './pages/tool/read'
import ToolUpdate from './pages/tool/update'
import Borrow from './pages/record/borrow/create'
import Giveback from './pages/record/giveback/create'
import RecordRead from './pages/record/read'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/main" element={<Main />}/>
        <Route path="/usuarios/cadastrar" element={<UserCreate />}/>
        <Route path="/usuarios/listar" element={<UserRead />}/>
        <Route path="/categorias/cadastrar" element={<CategoryCreate />}/>
        <Route path="/categorias/editar/:id" element={<CategoryUpdate />}/>
        <Route path="/categorias/listar" element={<CategoryRead />}/>
        <Route path="/ferramentas/cadastrar" element={<ToolCreate />}/>
        <Route path="/ferramentas/editar/:id" element={<ToolUpdate />}/>
        <Route path="/ferramentas/listar" element={<ToolRead />}/>
        <Route path="/movimentos/emprestar" element={<Borrow />}/>
        <Route path="/movimentos/devolver" element={<Giveback />}/>
        <Route path="/movimentos/listar" element={<RecordRead />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

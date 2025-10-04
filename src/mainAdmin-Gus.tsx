import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminHome from './pages/AdminHome.tsx'
import Search from './components/Admin/search.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminHome />
    <div className='flex justify-center mt-5 w-100%'>
      <Search />
    </div>

  </StrictMode>,
)
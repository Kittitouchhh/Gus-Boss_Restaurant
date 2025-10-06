import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminHome from './pages/AdminHome.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminHome />
    <div className='flex justify-center mt-5 w-100%'>
    </div>

  </StrictMode>,
)
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home'
import Teste from '../pages/Teste'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path='/teste' element={<Teste />} />
        {/* adicione suas páginas aqui */}
      </Route>
    </Routes>
  )
}

export default AppRoutes
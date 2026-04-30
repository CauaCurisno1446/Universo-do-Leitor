import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* adicione suas páginas aqui */}
      </Route>
    </Routes>
  )
}

export default AppRoutes
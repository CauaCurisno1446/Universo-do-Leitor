import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <div className="app">

      <Header />

      <main className="content">
        <Outlet /> {/* ← página atual renderiza aqui */}
      </main>

      <Footer />
      

    </div>
  )
}

export default MainLayout
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header>
      <span>Universo do Leitor</span>
      <nav>
        <NavLink to="/">Home</NavLink>
      </nav>
    </header>
  )
}

export default Header
import { NavLink } from 'react-router-dom'
import { Search, User, ShoppingBag } from 'lucide-react'
import Logo from "./Logo"

//Classes
const hoverItem = 'hover:bg-[#cfd3c2] w-10 h-10 flex justify-center items-center rounded-[10px] cursor-pointer duration-200 ease-in-out'
const navItem = 'text-bold hover:text-[#57342D] duration-200 ease-in-out'

function Header() { 
  return (
    <header className='grid grid-cols-3 w-full bg-[#F9FDEA] h-[80px] justify-center items-center'>
      <div className='flex justify-center items-center gap-10'>
        <div className={hoverItem}>
          <Search />
        </div>
        <nav className='flex justify-between gap-10'>
          <NavLink to="/" className={navItem}>Página inicial</NavLink>
          <NavLink to="/teste" className={navItem}>Produtos</NavLink>
        </nav>
      </div>

      <div className='flex justify-center'>
        <Logo />
      </div>

      <div className='flex justify-center gap-8'>
        <div className={hoverItem}>
          <ShoppingBag size={30}/>
        </div>
        <div className={hoverItem}>
          <User size={30}/>
        </div>
      </div>
    </header>
  )
}


export default Header
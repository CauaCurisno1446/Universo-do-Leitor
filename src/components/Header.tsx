import { NavLink } from 'react-router-dom'
import { Search, User, ShoppingBag } from 'lucide-react'
import Logo from "./Logo"
import { useState } from 'react'

//Classes
const hoverItem = 'hover:bg-[var(--bege)] w-10 h-10 flex justify-center items-center rounded-[10px] cursor-pointer duration-200 ease-in-out'
const navItem = 'text-bold hover:text-[var(--marrom)] duration-200 ease-in-out'

function Header() { 
  const [ sacola, setSacola] = useState(false);
  const [ usuario, setUsuario] = useState(false);

  const fecharTodos = () => {
        setSacola(false);
        setUsuario(false);
    };

  return (
    <header className='grid grid-cols-3 w-full bg-[var(--header)] h-[80px] justify-center items-center relative'>
      <div className='flex justify-center items-center gap-10'>
        <div className={hoverItem}>
          <Search />
        </div>
        <nav className='flex justify-between gap-10'>
          <NavLink to="/" className={navItem}>Página inicial</NavLink>
          <NavLink to="/produtos" className={navItem}>Produtos</NavLink>
        </nav>
      </div>

      <div className='flex justify-center'>
        <Logo />
      </div>

      <div className='flex justify-center gap-8'>
        <div className={hoverItem}  onClick={() => { fecharTodos(); setSacola(!sacola)}} >
          <ShoppingBag size={30}/>
        </div>
        <div className={hoverItem} onClick={() => { fecharTodos(); setUsuario(!usuario)}}>
          <User size={30}/>
        </div>
      </div>

      {sacola && (
        <div className="absolute top-full right-0 mt-2 w-[calc(100vw-24px)] sm:w-[400px] md:w-[500px] max-h-[70vh] overflow-y-auto bg-white shadow-xl rounded-2xl p-4 z-[9999]">
            <p className="font-bold mb-3 text-[var(--marrom)]">Visibilidade dos Gráficos</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              
            </div>
        </div>
      )}
    </header>
  )
}


export default Header
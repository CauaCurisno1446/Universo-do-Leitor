import { NavLink } from 'react-router-dom'
import { User, ShoppingBag } from 'lucide-react'
import Logo from "./Logo"
import { useState } from 'react'
import { useSacola } from './Item'

//Classes
const hoverItem = 'hover:bg-[var(--bege)] w-10 h-10 flex justify-center items-center rounded-[10px] cursor-pointer duration-200 ease-in-out'
const navItem = 'font-semibold hover:text-[var(--marrom)] duration-200 ease-in-out'

function Header() { 
  const [ sacola, setSacola] = useState(false);
  const [ usuario, setUsuario] = useState(false);
  const { itens, removerItem, alterarQuantidade, total } = useSacola()

  const fecharTodos = () => {
        setSacola(false);
        setUsuario(false);
    };

  return (
    <header className='grid grid-cols-3 w-full bg-[var(--header)] h-[80px] justify-center items-center relative'>
      <div className='flex justify-center items-center gap-10'>
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
          <div className="relative">
            <ShoppingBag size={30} />
            {itens.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--laranja)] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itens.length}
              </span>
            )}
          </div>
        </div>
        <div className={hoverItem} onClick={() => { fecharTodos(); setUsuario(!usuario)}}>
          <User size={30}/>
        </div>
      </div>

      {sacola && (
        <div className="absolute top-full right-[60px] mt-2 w-[320px] bg-white shadow-xl rounded-2xl overflow-hidden z-[9999]">

          <div className="bg-[var(--marrom)] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} color="white" />
              <p className="font-bold text-white tracking-wide">Minha Sacola</p>
            </div>
            <span className="bg-white text-[var(--marrom)] text-xs font-bold px-2 py-0.5 rounded-full">
              {itens.length} {itens.length === 1 ? "item" : "itens"}
            </span>
          </div>

          <div className="px-5 py-4 flex flex-col gap-3 max-h-[300px] overflow-y-auto">
            {itens.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">Sua sacola está vazia.</p>
            ) : (
              itens.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.imagemUrl}
                    alt={item.nome}
                    className="w-14 h-14 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--marrom)] leading-tight">{item.nome}</p>
                    <p className="text-sm font-bold text-black mt-0.5">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-bold flex items-center justify-center cursor-pointer"
                      >
                        −
                      </button>
                      <span className="text-sm">{item.quantidade}</span>
                      <button
                        onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                        className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-bold flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removerItem(item.id)}
                    className="text-gray-300 hover:text-red-400 duration-200 cursor-pointer text-lg"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-100 px-5 py-3">
            <div className="flex justify-between text-sm font-semibold mb-3">
              <span>Total</span>
              <span className="text-[var(--marrom)]">R$ {total.toFixed(2)}</span>
            </div>
            <NavLink
              to="/sacola"
              className="block text-center bg-[var(--laranja)] text-white text-sm font-semibold py-2 rounded-full hover:bg-[var(--marrom)] duration-200"
            >
              Ver sacola →
            </NavLink>
          </div>

        </div>
      )}

    </header>
  )
}


export default Header
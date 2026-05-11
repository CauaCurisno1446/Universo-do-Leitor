import { NavLink, useNavigate } from "react-router-dom";
import { User, ShoppingBag, X, Menu } from "lucide-react";
import Logo from "./Logo";
import { useState } from "react";
import { useSacola } from "./Item";

const navItem =
  "font-semibold hover:text-[var(--laranja)] duration-200 ease-in-out text-sm tracking-wide relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--laranja)] after:transition-all hover:after:w-full";

function Header() {
  const [sacola, setSacola] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const { itens, removerItem, alterarQuantidade, total } = useSacola();
  const navigate = useNavigate();

  return (
    <>
      <header className="w-full bg-[var(--header)] h-[70px] flex items-center justify-between px-6 md:px-10 relative z-50 shadow-sm">
        <nav className="hidden md:flex gap-8">
          <NavLink to="/" className={navItem}>
            Início
          </NavLink>
          <NavLink to="/produtos" className={navItem}>
            Produtos
          </NavLink>
        </nav>

        <button className="md:hidden text-[var(--marrom)]" onClick={() => setMenuAberto(!menuAberto)}>
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="absolute left-1/2 -translate-x-1/2">
          <Logo />
        </div>

        <div className="flex items-center gap-3 ml-auto md:ml-0">
          <button
            className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--bege)] transition-colors duration-200 cursor-pointer"
            onClick={() => setSacola(!sacola)}
            aria-label="Sacola">
            <ShoppingBag size={22} className="text-[var(--marrom)]" />
            {itens.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[var(--laranja)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itens.length}
              </span>
            )}
          </button>

          <button
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[var(--bege)] transition-colors duration-200 cursor-pointer"
            onClick={() => navigate("/login")}
            aria-label="Usuário">
            <User size={22} className="text-[var(--marrom)]" />
          </button>
        </div>
      </header>

      {menuAberto && (
        <div className="md:hidden bg-[var(--header)] border-t border-[var(--bege)] px-6 py-4 flex flex-col gap-4 z-40 shadow-md">
          <NavLink to="/" className={navItem} onClick={() => setMenuAberto(false)}>
            Início
          </NavLink>
          <NavLink to="/produtos" className={navItem} onClick={() => setMenuAberto(false)}>
            Produtos
          </NavLink>
        </div>
      )}

      {sacola && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setSacola(false)} />
          <div className="fixed top-[70px] right-4 md:right-8 w-[320px] bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-stone-100">
            <div className="bg-[var(--marrom)] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} color="white" />
                <p className="font-bold text-white text-sm tracking-wide" id="Texto">
                  Minha Sacola
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {itens.length} {itens.length === 1 ? "item" : "itens"}
                </span>
                <button onClick={() => setSacola(false)} className="text-white/70 hover:text-white">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="px-4 py-4 flex flex-col gap-3 max-h-[280px] overflow-y-auto">
              {itens.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Sua sacola está vazia.</p>
              ) : (
                itens.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center bg-[var(--cinza)] rounded-xl p-2">
                    <img src={item.imagemUrl} alt={item.nome} className="w-12 h-12 object-cover rounded-lg shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[var(--marrom)] leading-tight truncate">{item.nome}</p>
                      <p className="text-xs font-bold text-black mt-0.5">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                          className="w-5 h-5 rounded-full bg-white hover:bg-[var(--bege)] text-xs font-bold flex items-center justify-center cursor-pointer border border-stone-200">
                          −
                        </button>
                        <span className="text-xs">{item.quantidade}</span>
                        <button
                          onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                          className="w-5 h-5 rounded-full bg-white hover:bg-[var(--bege)] text-xs font-bold flex items-center justify-center cursor-pointer border border-stone-200">
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removerItem(item.id)}
                      className="text-stone-300 hover:text-red-400 duration-200 cursor-pointer shrink-0">
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-stone-100 px-4 py-3 bg-white">
              <div className="flex justify-between text-sm font-semibold mb-3">
                <span id="Texto" className="text-[var(--marrom)]">
                  Total
                </span>
                <span className="text-[var(--marrom)]">R$ {total.toFixed(2)}</span>
              </div>
              <NavLink
                to="/sacola"
                onClick={() => setSacola(false)}
                className="block text-center bg-[var(--laranja)] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[var(--marrom)] duration-200">
                Finalizar compra →
              </NavLink>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, Package, ShoppingCart, User, LogOut, Menu, X, ShieldCheck } from "lucide-react";

const navLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/produtos", label: "Produtos", icon: Package, end: false },
  { to: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart, end: false },
  { to: "/admin/perfil", label: "Perfil", icon: User, end: false },
];

function AdminLayout() {
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);
  const [admin, setAdmin] = useState<{ nome?: string; email?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    const dados = localStorage.getItem("adminUsuario");
    if (dados) setAdmin(JSON.parse(dados));
  }, [navigate]);

  function handleSair() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsuario");
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-[var(--cinza)]">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--marrom)] shrink-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[var(--laranja)] rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck size={18} color="white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight" id="Texto">
                Admin
              </p>
              <p className="text-white/50 text-xs truncate max-w-[120px]">{admin?.email ?? "—"}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-150 ${
                  isActive ? "bg-white/15 text-white" : "text-white/60 hover:text-white hover:bg-white/8"
                }`
              }>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Sair */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleSair}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/8 transition-colors duration-150 cursor-pointer">
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--marrom)] h-14 flex items-center justify-between px-4 shadow-lg">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} color="white" />
          <span className="text-white font-bold text-sm" id="Texto">
            Admin
          </span>
        </div>
        <button onClick={() => setMenuAberto(!menuAberto)} className="text-white">
          {menuAberto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuAberto && (
        <div className="md:hidden fixed inset-0 z-40 bg-[var(--marrom)] pt-14 px-4 flex flex-col">
          <nav className="flex flex-col gap-1 py-4 flex-1">
            {navLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMenuAberto(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
                  }`
                }>
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-white/10 py-4">
            <button
              onClick={handleSair}
              className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white text-sm font-semibold w-full">
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <main className="flex-1 md:overflow-auto pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

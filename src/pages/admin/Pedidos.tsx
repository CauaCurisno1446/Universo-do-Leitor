import { useEffect, useState } from "react";
import { Search, ChevronDown, ChevronUp, Package } from "lucide-react";

interface ItemPedido {
  id: number;
  quantidade: number;
  produto: {
    nome: string;
    imagemUrl: string;
    preco: number;
  };
}

interface Pedido {
  id: number;
  status: string;
  total: number;
  criadoEm: string;
  usuario: {
    nome: string;
    email: string;
  };
  itens: ItemPedido[];
}

const pedidosMock: Pedido[] = [
  {
    id: 1,
    status: "concluido",
    total: 7990,
    criadoEm: "2025-05-19T10:22:00",
    usuario: { nome: "Maria Silva", email: "maria@email.com" },
    itens: [{ id: 1, quantidade: 2, produto: { nome: "Dom Casmurro", imagemUrl: "", preco: 3990 } }],
  },
  {
    id: 2,
    status: "pendente",
    total: 4590,
    criadoEm: "2025-05-19T09:15:00",
    usuario: { nome: "João Souza", email: "joao@email.com" },
    itens: [{ id: 2, quantidade: 1, produto: { nome: "O Alquimista", imagemUrl: "", preco: 4590 } }],
  },
  {
    id: 3,
    status: "concluido",
    total: 12980,
    criadoEm: "2025-05-18T18:40:00",
    usuario: { nome: "Ana Costa", email: "ana@email.com" },
    itens: [
      { id: 3, quantidade: 1, produto: { nome: "1984", imagemUrl: "", preco: 5490 } },
      { id: 4, quantidade: 1, produto: { nome: "Cem Anos de Solidão", imagemUrl: "", preco: 7490 } },
    ],
  },
  {
    id: 4,
    status: "cancelado",
    total: 3490,
    criadoEm: "2025-05-18T14:05:00",
    usuario: { nome: "Carlos Lima", email: "carlos@email.com" },
    itens: [{ id: 5, quantidade: 1, produto: { nome: "A Metamorfose", imagemUrl: "", preco: 3490 } }],
  },
  {
    id: 5,
    status: "pendente",
    total: 8970,
    criadoEm: "2025-05-18T11:30:00",
    usuario: { nome: "Fernanda Rocha", email: "fernanda@email.com" },
    itens: [{ id: 6, quantidade: 3, produto: { nome: "Harry Potter", imagemUrl: "", preco: 2990 } }],
  },
];

const statusConfig: Record<string, { label: string; cor: string; corBg: string }> = {
  pendente: { label: "Pendente", cor: "text-amber-700", corBg: "bg-amber-100" },
  concluido: { label: "Concluído", cor: "text-green-700", corBg: "bg-green-100" },
  cancelado: { label: "Cancelado", cor: "text-red-600", corBg: "bg-red-100" },
  enviado: { label: "Enviado", cor: "text-blue-700", corBg: "bg-blue-100" },
};

function formatarMoeda(centavos: number) {
  return (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosMock);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [expandido, setExpandido] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    setLoading(true);
    fetch("http://localhost:3000/admin/pedidos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPedidos(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function atualizarStatus(id: number, novoStatus: string) {
    const token = localStorage.getItem("adminToken");
    try {
      await fetch(`http://localhost:3000/admin/pedidos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: novoStatus }),
      });
      setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, status: novoStatus } : p)));
    } catch {
      // silencioso
    }
  }

  const pedidosFiltrados = pedidos.filter((p) => {
    const matchBusca =
      p.usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.usuario.email.toLowerCase().includes(busca.toLowerCase()) ||
      String(p.id).includes(busca);
    const matchStatus = filtroStatus === "todos" || p.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--marrom)]" id="Texto">
          Pedidos
        </h1>
        <p className="text-stone-400 text-sm mt-1">{pedidos.length} pedido(s) registrado(s)</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar por cliente, e-mail ou nº do pedido..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[var(--marrom)] bg-white"
          />
        </div>
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="px-4 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[var(--marrom)] bg-white text-stone-600 cursor-pointer">
          <option value="todos">Todos os status</option>
          <option value="pendente">Pendente</option>
          <option value="concluido">Concluído</option>
          <option value="enviado">Enviado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <br />

      {/* Lista */}
      <div className="flex flex-col gap-3">
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center text-stone-400 text-sm">Carregando pedidos...</div>
        ) : pedidosFiltrados.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-stone-400 text-sm">Nenhum pedido encontrado.</div>
        ) : (
          pedidosFiltrados.map((pedido) => {
            const st = statusConfig[pedido.status] ?? {
              label: pedido.status,
              cor: "text-stone-500",
              corBg: "bg-stone-100",
            };
            const aberto = expandido === pedido.id;

            return (
              <div key={pedido.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                {/* Linha principal */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-stone-50/50 transition-colors"
                  onClick={() => setExpandido(aberto ? null : pedido.id)}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-[var(--marrom)] text-sm">#{pedido.id}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${st.corBg} ${st.cor}`}>
                        {st.label}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 font-medium truncate">{pedido.usuario.nome}</p>
                    <p className="text-xs text-stone-400 truncate">{pedido.usuario.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-[var(--marrom)] text-sm">{formatarMoeda(pedido.total)}</p>
                    <p className="text-xs text-stone-400">{formatarData(pedido.criadoEm)}</p>
                  </div>
                  <div className="text-stone-400 shrink-0">
                    {aberto ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Detalhes expandidos */}
                {aberto && (
                  <div className="border-t border-stone-100 px-5 py-4 bg-stone-50/40">
                    {/* Itens */}
                    <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Package size={12} /> Itens do pedido
                    </p>
                    <div className="flex flex-col gap-2 mb-4">
                      {pedido.itens.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-stone-100">
                          {item.produto.imagemUrl ? (
                            <img
                              src={item.produto.imagemUrl}
                              alt={item.produto.nome}
                              className="w-9 h-9 object-cover rounded-lg shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 bg-[var(--bege)]/60 rounded-lg shrink-0 flex items-center justify-center">
                              <Package size={14} className="text-[var(--marrom)]" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[var(--marrom)] truncate">{item.produto.nome}</p>
                            <p className="text-xs text-stone-400">
                              {item.quantidade}x — {formatarMoeda(item.produto.preco)}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-[var(--marrom)] shrink-0">
                            {formatarMoeda(item.produto.preco * item.quantidade)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Alterar status */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-xs font-semibold text-stone-500">Alterar status:</p>
                      {["pendente", "enviado", "concluido", "cancelado"].map((s) => (
                        <button
                          key={s}
                          onClick={() => atualizarStatus(pedido.id, s)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer border ${
                            pedido.status === s
                              ? `${statusConfig[s].corBg} ${statusConfig[s].cor} border-transparent`
                              : "bg-white border-stone-200 text-stone-500 hover:border-[var(--marrom)]"
                          }`}>
                          {statusConfig[s]?.label ?? s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Pedidos;

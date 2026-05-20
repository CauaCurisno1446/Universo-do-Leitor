import React, { useEffect, useState } from "react";
import { Package, ShoppingCart, Users, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

interface Estatisticas {
  totalProdutos: number;
  totalPedidos: number;
  totalUsuarios: number;
  receitaTotal: number;
  pedidosPendentes: number;
  pedidosConcluidos: number;
  produtoMaisVendido: string;
  crescimentoReceita: number; // percentual
}

interface PedidoRecente {
  id: number;
  usuario: { nome: string; email: string } | string;
  total: number;
  status: string;
  criadoEm: string;
}

// Dados mock para quando a API não responde
const estatisticasMock: Estatisticas = {
  totalProdutos: 48,
  totalPedidos: 312,
  totalUsuarios: 1024,
  receitaTotal: 4875600,
  pedidosPendentes: 14,
  pedidosConcluidos: 289,
  produtoMaisVendido: "Dom Casmurro",
  crescimentoReceita: 12.4,
};

const pedidosMock: PedidoRecente[] = [
  {
    id: 1,
    usuario: { nome: "Maria Silva", email: "" },
    total: 7990,
    status: "concluido",
    criadoEm: "2025-05-19T10:22:00",
  },
  {
    id: 2,
    usuario: { nome: "João Souza", email: "" },
    total: 4590,
    status: "pendente",
    criadoEm: "2025-05-19T09:15:00",
  },
  {
    id: 3,
    usuario: { nome: "Ana Costa", email: "" },
    total: 12980,
    status: "concluido",
    criadoEm: "2025-05-18T18:40:00",
  },
  {
    id: 4,
    usuario: { nome: "Carlos Lima", email: "" },
    total: 3490,
    status: "cancelado",
    criadoEm: "2025-05-18T14:05:00",
  },
  {
    id: 5,
    usuario: { nome: "Fernanda Rocha", email: "" },
    total: 8970,
    status: "pendente",
    criadoEm: "2025-05-18T11:30:00",
  },
];

const statusConfig: Record<string, { label: string; cor: string }> = {
  pendente: { label: "Pendente", cor: "bg-amber-100 text-amber-700" },
  concluido: { label: "Concluído", cor: "bg-green-100 text-green-700" },
  cancelado: { label: "Cancelado", cor: "bg-red-100 text-red-600" },
};

function formatarMoeda(centavos: number) {
  return (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarData(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Dashboard() {
  const [stats, setStats] = useState<Estatisticas>(estatisticasMock);
  const [pedidos, setPedidos] = useState<PedidoRecente[]>(pedidosMock);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    fetch("http://localhost:3000/admin/estatisticas", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(() => {});

    fetch("http://localhost:3000/admin/pedidos?limite=5", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setPedidos(data);
      })
      .catch(() => {});
  }, []);

  const cards: {
    label: string;
    valor: string | number;
    icon: React.ElementType;
    cor: string;
    detalhe: React.ReactNode;
  }[] = [
    {
      label: "Produtos",
      valor: stats.totalProdutos,
      icon: Package,
      cor: "bg-[var(--marrom)]",
      detalhe: `${stats.totalProdutos} cadastrados`,
    },
    {
      label: "Pedidos",
      valor: stats.totalPedidos,
      icon: ShoppingCart,
      cor: "bg-[var(--laranja)]",
      detalhe: `${stats.pedidosPendentes} pendentes`,
    },
    {
      label: "Usuários",
      valor: stats.totalUsuarios,
      icon: Users,
      cor: "bg-stone-600",
      detalhe: "cadastrados",
    },
    {
      label: "Receita total",
      valor: formatarMoeda(stats.receitaTotal),
      icon: TrendingUp,
      cor: "bg-emerald-600",
      detalhe: (
        <span
          className={`flex items-center gap-1 text-xs ${stats.crescimentoReceita >= 0 ? "text-emerald-600" : "text-red-500"}`}>
          {stats.crescimentoReceita >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(stats.crescimentoReceita)}% este mês
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Título */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--marrom)]" id="Texto">
          Dashboard
        </h1>
        <p className="text-stone-400 text-sm mt-1">Visão geral da loja</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, valor, icon: Icon, cor, detalhe }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-stone-100">
            <div className={`w-10 h-10 ${cor} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} color="white" />
            </div>
            <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-1">{label}</p>
            <p className="text-xl font-bold text-[var(--marrom)]">{valor}</p>
            <div className="text-xs text-stone-400 mt-1">{detalhe}</div>
          </div>
        ))}
      </div>

      {/* Resumo + Pedidos recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pedidos por status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h2 className="font-bold text-sm text-[var(--marrom)] mb-4" id="Texto">
            Status dos pedidos
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone-500">Concluídos</span>
              <span className="font-bold text-green-600">{stats.pedidosConcluidos}</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(stats.pedidosConcluidos / stats.totalPedidos) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-stone-500">Pendentes</span>
              <span className="font-bold text-amber-600">{stats.pedidosPendentes}</span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2">
              <div
                className="bg-amber-400 h-2 rounded-full"
                style={{ width: `${(stats.pedidosPendentes / stats.totalPedidos) * 100}%` }}
              />
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100">
            <p className="text-xs text-stone-400">Mais vendido</p>
            <p className="text-sm font-semibold text-[var(--marrom)] mt-1">{stats.produtoMaisVendido}</p>
          </div>
        </div>

        {/* Pedidos recentes */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h2 className="font-bold text-sm text-[var(--marrom)] mb-4" id="Texto">
            Pedidos recentes
          </h2>
          <div className="flex flex-col gap-2">
            {pedidos.map((pedido) => {
              const st = statusConfig[pedido.status] ?? { label: pedido.status, cor: "bg-stone-100 text-stone-500" };
              return (
                <div
                  key={pedido.id}
                  className="flex items-center justify-between py-2.5 border-b border-stone-50 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--marrom)] truncate">
                      {typeof pedido.usuario === "string" ? pedido.usuario : pedido.usuario.nome}
                    </p>
                    <p className="text-xs text-stone-400">{formatarData(pedido.criadoEm)}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${st.cor}`}>{st.label}</span>
                    <span className="text-sm font-bold text-[var(--marrom)]">{formatarMoeda(pedido.total)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

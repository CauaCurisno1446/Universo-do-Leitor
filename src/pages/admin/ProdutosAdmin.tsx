import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Search, Check } from "lucide-react";
import { InputTexto } from "../../components/InputTexto";

interface Produto {
  id: number;
  nome: string;
  autor: string;
  preco: number;
  estoque: number;
  imagemUrl: string;
  descricao: string;
  categoria: string;
}

const produtoVazio: Omit<Produto, "id"> = {
  nome: "",
  autor: "",
  preco: 0,
  estoque: 0,
  imagemUrl: "",
  descricao: "",
  categoria: "",
};

function formatarMoeda(centavos: number) {
  return (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ProdutosAdmin() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState<Omit<Produto, "id"> & { id?: number }>(produtoVazio);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Confirmação de exclusão
  const [confirmarExcluir, setConfirmarExcluir] = useState<number | null>(null);

  const token = localStorage.getItem("adminToken");

  async function buscarProdutos() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/produtos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setProdutos(data);
    } catch {
      // silencioso
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, []);

  function abrirCriar() {
    setProdutoAtual(produtoVazio);
    setModoEditar(false);
    setModalAberto(true);
    setSucesso(false);
  }

  function abrirEditar(produto: Produto) {
    setProdutoAtual({ ...produto });
    setModoEditar(true);
    setModalAberto(true);
    setSucesso(false);
  }

  function fecharModal() {
    setModalAberto(false);
    setSucesso(false);
  }

  async function salvarProduto(e: React.FormEvent) {
    e.preventDefault();
    setSalvando(true);
    try {
      const url = modoEditar
        ? `http://localhost:3000/admin/produtos/${produtoAtual.id}`
        : "http://localhost:3000/admin/produtos";
      const method = modoEditar ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produtoAtual),
      });
      const data = await res.json();
      if (!data.error) {
        setSucesso(true);
        buscarProdutos();
        setTimeout(fecharModal, 1000);
      }
    } catch {
      // silencioso
    } finally {
      setSalvando(false);
    }
  }

  async function excluirProduto(id: number) {
    try {
      await fetch(`http://localhost:3000/admin/produtos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      // silencioso
    } finally {
      setConfirmarExcluir(null);
    }
  }

  const produtosFiltrados = produtos.filter(
    (p) => p.nome.toLowerCase().includes(busca.toLowerCase()) || p.autor?.toLowerCase().includes(busca.toLowerCase()),
  );

  function handleCampo(campo: keyof typeof produtoAtual, valor: string | number) {
    setProdutoAtual((prev) => ({ ...prev, [campo]: valor }));
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--marrom)]" id="Texto">
            Produtos
          </h1>
          <p className="text-stone-400 text-sm mt-1">{produtos.length} produto(s) cadastrado(s)</p>
        </div>
        <button
          onClick={abrirCriar}
          className="flex items-center gap-2 bg-[var(--marrom)] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[var(--laranja)] transition-colors cursor-pointer">
          <Plus size={16} />
          Novo produto
        </button>
      </div>

      {/* Busca */}
      <div className="relative mb-5">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          placeholder="Buscar por nome ou autor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-[var(--marrom)] bg-white"
        />
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-stone-400 text-sm">Carregando produtos...</div>
        ) : produtosFiltrados.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-stone-400 text-sm">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-stone-400 uppercase tracking-wider hidden md:table-cell">
                    Categoria
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-stone-400 uppercase tracking-wider hidden sm:table-cell">
                    Estoque
                  </th>
                  <th className="px-4 py-3.5" />
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((produto) => (
                  <tr key={produto.id} className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {produto.imagemUrl && (
                          <img
                            src={produto.imagemUrl}
                            alt={produto.nome}
                            className="w-10 h-10 object-cover rounded-lg shrink-0 border border-stone-100"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold text-[var(--marrom)] truncate max-w-[180px]">{produto.nome}</p>
                          {produto.autor && (
                            <p className="text-xs text-stone-400 truncate max-w-[160px]">{produto.autor}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-xs bg-[var(--bege)]/60 text-[var(--marrom)] px-2.5 py-1 rounded-full font-medium">
                        {produto.categoria || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-[var(--marrom)]">{formatarMoeda(produto.preco)}</td>
                    <td className="px-4 py-3.5 hidden sm:table-cell">
                      <span
                        className={`text-xs font-semibold ${
                          produto.estoque === 0
                            ? "text-red-500"
                            : produto.estoque < 5
                              ? "text-amber-600"
                              : "text-green-600"
                        }`}>
                        {produto.estoque} un.
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => abrirEditar(produto)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-400 hover:text-[var(--marrom)] transition-colors cursor-pointer"
                          title="Editar">
                          <Pencil size={14} />
                        </button>

                        {confirmarExcluir === produto.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => excluirProduto(produto.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors cursor-pointer"
                              title="Confirmar exclusão">
                              <Check size={14} />
                            </button>
                            <button
                              onClick={() => setConfirmarExcluir(null)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-stone-100 text-stone-400 transition-colors cursor-pointer">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmarExcluir(produto.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Excluir">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal criar/editar */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={fecharModal} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
              <h2 className="font-bold text-[var(--marrom)]" id="Texto">
                {modoEditar ? "Editar produto" : "Novo produto"}
              </h2>
              <button onClick={fecharModal} className="text-stone-400 hover:text-[var(--marrom)] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={salvarProduto} className="px-6 py-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Nome</label>
                <InputTexto
                  value={produtoAtual.nome}
                  onCriar={(e) => handleCampo("nome", e.target.value)}
                  placeholder="Nome do produto"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Autor</label>
                <InputTexto
                  value={produtoAtual.autor}
                  onCriar={(e) => handleCampo("autor", e.target.value)}
                  placeholder="Autor"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Preço (em centavos)
                  </label>
                  <InputTexto
                    type="number"
                    value={String(produtoAtual.preco)}
                    onCriar={(e) => handleCampo("preco", Number(e.target.value))}
                    placeholder="ex: 3990"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Estoque</label>
                  <InputTexto
                    type="number"
                    value={String(produtoAtual.estoque)}
                    onCriar={(e) => handleCampo("estoque", Number(e.target.value))}
                    placeholder="ex: 10"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Categoria</label>
                <InputTexto
                  value={produtoAtual.categoria}
                  onCriar={(e) => handleCampo("categoria", e.target.value)}
                  placeholder="ex: Romance, Ficção..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">URL da imagem</label>
                <InputTexto
                  value={produtoAtual.imagemUrl}
                  onCriar={(e) => handleCampo("imagemUrl", e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Descrição</label>
                <textarea
                  value={produtoAtual.descricao}
                  onChange={(e) => handleCampo("descricao", e.target.value)}
                  placeholder="Descrição do produto..."
                  rows={3}
                  className="border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--marrom)] transition-colors placeholder:text-stone-300 bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={salvando || sucesso}
                className={`w-full font-semibold py-3.5 rounded-xl transition-colors duration-200 text-sm mt-1 cursor-pointer ${
                  sucesso ? "bg-green-500 text-white" : "bg-[var(--marrom)] text-white hover:bg-[var(--laranja)]"
                } disabled:opacity-70`}>
                {sucesso ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} /> Salvo com sucesso!
                  </span>
                ) : salvando ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Salvando...
                  </span>
                ) : modoEditar ? (
                  "Salvar alterações"
                ) : (
                  "Cadastrar produto"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProdutosAdmin;

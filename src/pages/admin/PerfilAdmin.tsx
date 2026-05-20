import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ShieldCheck, SquarePen, Mail, Calendar, RectangleEllipsis, Lock } from "lucide-react";
import { InputTexto } from "../../components/InputTexto";
import { InputSenha } from "../../components/InputSenha";
import Modal from "../../components/Modal";
import { useModal } from "../../hooks/useModal";
import { useToast } from "../../hooks/useToast";
import Toast from "../../components/Toast";

interface AdminInfo {
  id: number;
  nome: string;
  email: string;
  createdAt?: string;
}

function formatarData(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function PerfilAdmin() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [admin, setAdmin] = useState<AdminInfo | null>(null);

  // Campos do modal editar
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // Campos do modal senha
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const senhasNaoBatem = confirmarSenha && novaSenha !== confirmarSenha;

  const modalEditar = useModal();
  const modalSenha = useModal();
  const modalSair = useModal();

  const { toast, mostrar } = useToast();

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch("http://localhost:3000/admin/perfil", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) return;
        setAdmin(data);
        setNome(data.nome);
        setEmail(data.email);
      })
      .catch(() => {
        // fallback para dados do localStorage
        const local = JSON.parse(localStorage.getItem("adminUsuario") || "{}");
        if (local.nome) {
          setAdmin(local);
          setNome(local.nome);
          setEmail(local.email);
        }
      });
  }, []);

  function abrirModalEditar() {
    setNome(admin?.nome ?? "");
    setEmail(admin?.email ?? "");
    modalEditar.abrir();
  }

  async function salvarPerfil() {
    try {
      const res = await fetch("http://localhost:3000/admin/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, email }),
      });
      const data = await res.json();
      if (data.error) {
        mostrar(data.error, "erro");
        return;
      }
      setAdmin((prev) => (prev ? { ...prev, nome, email } : prev));
      localStorage.setItem("adminUsuario", JSON.stringify({ ...admin, nome, email }));
      mostrar("Perfil atualizado com sucesso!", "sucesso");
      modalEditar.fechar();
    } catch {
      mostrar("Erro ao conectar com o servidor.", "erro");
    }
  }

  async function salvarSenha() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      mostrar("Preencha todos os campos", "erro");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      mostrar("As senhas não coincidem", "erro");
      return;
    }
    if (novaSenha.length < 6) {
      mostrar("A nova senha deve ter pelo menos 6 caracteres", "erro");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/admin/perfil/senha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ senhaAtual, novaSenha }),
      });
      const data = await res.json();
      if (data.error) {
        mostrar(data.error, "erro");
        return;
      }
      mostrar("Senha alterada com sucesso!", "sucesso");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      modalSenha.fechar();
    } catch {
      mostrar("Erro ao conectar com o servidor.", "erro");
    }
  }

  function handleSair() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsuario");
    navigate("/admin/login");
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-stone-400 animate-pulse">Carregando...</div>
    );
  }

  const iniciais = admin.nome
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* MODAL EDITAR */}
      {modalEditar.aberto && (
        <Modal titulo="Editar Perfil" onClose={modalEditar.fechar}>
          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Nome</label>
              <InputTexto value={nome} onCriar={(e) => setNome(e.target.value)} placeholder="Seu nome" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">E-mail</label>
              <InputTexto
                type="email"
                value={email}
                onCriar={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-8 mt-6 border-t border-stone-100">
            <button
              onClick={modalEditar.fechar}
              className="px-5 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={salvarPerfil}
              className="px-6 py-2.5 text-sm font-medium bg-[var(--marrom)] hover:bg-[var(--laranja)] text-white rounded-xl transition-all active:scale-95 cursor-pointer">
              Salvar Alterações
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL SENHA */}
      {modalSenha.aberto && (
        <Modal titulo="Alterar Senha" onClose={modalSenha.fechar}>
          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Senha atual</label>
              <InputSenha
                value={senhaAtual}
                placeholder="••••••••"
                onCriar={(e) => setSenhaAtual(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Nova senha</label>
              <InputSenha
                value={novaSenha}
                placeholder="••••••••"
                onCriar={(e) => setNovaSenha(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Confirmar nova senha</label>
              <InputSenha
                value={confirmarSenha}
                placeholder="••••••••"
                onCriar={(e) => setConfirmarSenha(e.target.value)}
                required
              />
            </div>
            {senhasNaoBatem && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                As senhas não coincidem.
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-8 mt-6 border-t border-stone-100">
            <button
              onClick={modalSenha.fechar}
              className="px-5 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={salvarSenha}
              className="px-6 py-2.5 text-sm font-medium bg-[var(--marrom)] hover:bg-[var(--laranja)] text-white rounded-xl transition-all active:scale-95 cursor-pointer">
              Atualizar Senha
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL SAIR */}
      {modalSair.aberto && (
        <Modal titulo="Sair do painel" onClose={modalSair.fechar}>
          <p className="text-stone-500 mb-6 mt-2">Tem certeza de que deseja encerrar sua sessão de administrador?</p>
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={modalSair.fechar}
              className="px-5 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer order-2 sm:order-1">
              Cancelar
            </button>
            <button
              onClick={handleSair}
              className="px-6 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all active:scale-95 cursor-pointer order-1 sm:order-2 flex items-center justify-center gap-2">
              <LogOut size={18} />
              Sim, quero sair
            </button>
          </div>
        </Modal>
      )}

      <main className="w-full mx-auto">
        {/* Card de identidade */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_2px_20px_rgb(0,0,0,0.04)] mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--laranja)] to-transparent opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          {/* Avatar */}
          <div className="relative group shrink-0 mt-2">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[var(--marrom)] to-[var(--laranja)] flex items-center justify-center rounded-full shadow-xl shadow-orange-900/10 transition-transform duration-500 group-hover:scale-105">
              <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter select-none">
                {iniciais}
              </span>
            </div>
            {/* Badge admin */}
            <div className="absolute -bottom-1 -right-1 bg-[var(--marrom)] rounded-full p-1.5 border-2 border-white shadow">
              <ShieldCheck size={14} color="white" />
            </div>
          </div>

          {/* Info */}
          <div className="w-full text-center md:text-left flex flex-col items-center md:items-start flex-1 pt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight mb-2" id="Texto">
              {admin.nome}
            </h1>
            <div className="flex items-center gap-2 text-stone-500 font-medium mb-8 bg-stone-50 px-3 py-1 rounded-md">
              <span className="text-sm tracking-widest uppercase">Administrador</span>
            </div>

            <button
              onClick={abrirModalEditar}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[var(--marrom)] text-white hover:bg-[var(--laranja)] hover:shadow-lg hover:shadow-orange-900/20 active:scale-95 transition-all duration-200 cursor-pointer group">
              <SquarePen size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Editar Informações
            </button>
          </div>

          {/* Sair */}
          <div className="flex items-end self-stretch">
            <button
              onClick={modalSair.abrir}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-stone-500 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer">
              <LogOut size={18} />
              Desconectar
            </button>
          </div>
        </section>

        <br />

        {/* Informações + Segurança */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Informações de contato */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-10 shadow-[0_2px_20px_rgb(0,0,0,0.04)] flex flex-col">
            <div className="flex items-center gap-3 border-b border-stone-100 pb-6 mb-8">
              <div className="p-2 bg-stone-50 rounded-lg text-stone-400">
                <RectangleEllipsis size={24} />
              </div>
              <h2 className="text-xl font-bold text-stone-800">Informações da conta</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 flex-1 p-5">
              <div className="flex gap-4 items-start group">
                <div className="p-2.5 text-white rounded-xl bg-[var(--marrom)]">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-1">E-mail</p>
                  <p className="text-base text-stone-800 font-medium break-all">{admin.email}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="p-2.5 text-white rounded-xl bg-[var(--marrom)]">
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-1">Admin desde</p>
                  <p className="text-base text-stone-800 font-medium">{formatarData(admin.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-stone-100 flex justify-start">
              <button
                onClick={modalSenha.abrir}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-stone-600 bg-stone-50 hover:bg-stone-100 active:scale-95 transition-all cursor-pointer">
                <Lock size={16} />
                Alterar Senha de Acesso
              </button>
            </div>
          </div>

          {/* Badge de segurança */}
          <aside className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-44 h-44 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex justify-center items-center mb-6 shadow-inner border border-orange-200/50">
                <ShieldCheck className="text-[var(--marrom)]" size={72} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-extrabold text-stone-800 mb-2">Acesso Restrito</h3>
              <p className="text-sm text-stone-500 mb-8 leading-relaxed">
                Você tem acesso total ao painel de administração da loja.
              </p>

              <div className="px-6 py-3 rounded-full bg-orange-100 text-[var(--marrom)] text-sm font-bold tracking-wide uppercase w-full flex justify-center items-center gap-2">
                <ShieldCheck size={15} />
                Nível: Admin
              </div>
            </div>
          </aside>
        </section>
      </main>

      {toast && <Toast mensagem={toast.mensagem} tipo={toast.tipo} />}
    </div>
  );
}

export default PerfilAdmin;

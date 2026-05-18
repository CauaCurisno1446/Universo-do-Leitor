import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import { LogOut, RectangleEllipsis, Shield, SquarePen, Phone, Mail, Calendar, MapPin, Package } from "lucide-react";
import { InputTexto } from "../components/InputTexto";
import { useFormEditar } from "../hooks/useFormEditar";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";
import { InputSenha } from "../components/InputSenha";
import { formatarCPF, formatarData, formatarTelefone } from "../utils/formatadores";

function Perfil() {
  const [usuario, setUsuario] = useState<any>(null);
  const navigate = useNavigate();

  const { form, inicializar, handleChange } = useFormEditar(usuario);

  const modalEditar = useModal();
  const modalSenha = useModal();
  const modalSair = useModal();

  const { toast, mostrar } = useToast();

  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const senhasNaoBatem = confirmar && senha !== confirmar;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/perfil", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUsuario(data);
      });
  }, []);

  if (!usuario)
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 animate-pulse">Carregando...</div>
    );

  const iniciais = usuario.nome
    .split(" ")
    .slice(0, 2)
    .map((p: string) => p[0].toUpperCase())
    .join("");

  function handleSair() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }

  function abrirModalEditar() {
    inicializar(usuario);
    modalEditar.abrir();
  }

  function handleEditar() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/perfil/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((data) => {
          setUsuario(data);
          modalEditar.fechar();
        });
      mostrar("Perfil atualizado com sucesso!", "sucesso");
    } else {
      console.log("Usuário não autenticado");
    }
  }

  function handleAlterarSenha() {
    if (!senha || !confirmar) {
      mostrar("Preencha todos os campos", "erro");
      return;
    }

    if (senha !== confirmar) {
      mostrar("As senhas não coincidem", "erro");
      return;
    }

    const token = localStorage.getItem("token");

    if (token) {
      fetch(`http://localhost:3000/perfil/senha/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senha,
        }),
      });

      mostrar("Senha alterada com sucesso!", "sucesso");
      setSenha("");
      setConfirmar("");

      modalSenha.fechar();
    } else {
      mostrar("Erro ao alterar senha", "erro");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans w-full py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      {/* MODAL EDITAR */}
      {modalEditar.aberto && (
        <Modal titulo="Editar Perfil" onClose={modalEditar.fechar}>
          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</label>
              <InputTexto
                type="text"
                value={form.nome}
                onCriar={(e) => handleChange("nome", e.target.value)}
                placeholder="Insira seu nome"
                id="editarNome"
                name="editarNome"
                required={false}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">E-mail</label>
              <InputTexto
                type="text"
                value={form.email}
                onCriar={(e) => handleChange("email", e.target.value)}
                placeholder="Insira seu e-mail"
                id="editarEmail"
                name="editarEmail"
                required={false}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telefone</label>
                <InputTexto
                  type="text"
                  value={form.telefones}
                  onCriar={(e) => handleChange("telefones", e.target.value)}
                  placeholder="(00) 00000-0000"
                  id="editarTelefones"
                  name="editarTelefones"
                  required={false}
                  maxLength={11}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">CPF</label>
                <InputTexto
                  type="text"
                  value={form.cpf}
                  onCriar={(e) => handleChange("cpf", e.target.value)}
                  placeholder="000.000.000-00"
                  id="editarCpf"
                  name="editarCpf"
                  required={false}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-8 mt-6 border-t border-slate-100">
            <button
              onClick={modalEditar.fechar}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={handleEditar}
              className="px-6 py-2.5 text-sm font-medium bg-[var(--marrom)] hover:bg-[var(--laranja)] hover:shadow-lg hover:shadow-orange-900/20 text-white rounded-xl transition-all active:scale-95 cursor-pointer">
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
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nova Senha</label>
              <InputSenha
                type="password"
                placeholder="Insira a nova senha"
                id="editarSenha"
                name="editarSenha"
                onCriar={(e) => setSenha(e.target.value)}
                required={false}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Confirmar Senha</label>
              <InputSenha
                type="password"
                placeholder="Repita a nova senha"
                required={true}
                onCriar={(e) => setConfirmar(e.target.value)}
              />
            </div>
            {senhasNaoBatem && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                As senhas não coincidem.
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-8 mt-6 border-t border-slate-100">
            <button
              onClick={modalSenha.fechar}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              className="px-6 py-2.5 text-sm font-medium bg-[var(--marrom)] hover:bg-[var(--laranja)] hover:shadow-lg hover:shadow-orange-900/20 text-white rounded-xl transition-all active:scale-95 cursor-pointer"
              onClick={handleAlterarSenha}>
              Atualizar Senha
            </button>
          </div>
        </Modal>
      )}

      {/* MODAL SAIR */}
      {modalSair.aberto && (
        <Modal titulo="Sair da conta" onClose={modalSair.fechar}>
          <p className="text-slate-500 mb-6 mt-2">Tem certeza de que deseja encerrar sua sessão atual?</p>
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={modalSair.fechar}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer order-2 sm:order-1">
              Cancelar
            </button>
            <button
              onClick={handleSair}
              className="px-6 py-2.5 text-sm font-medium bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 text-white rounded-xl transition-all active:scale-95 cursor-pointer order-1 sm:order-2 flex items-center justify-center gap-2">
              <LogOut size={18} />
              Sim, quero sair
            </button>
          </div>
        </Modal>
      )}

      <main className="w-full max-w-7xl mx-auto p-10">
        <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_2px_20px_rgb(0,0,0,0.04)] mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[var(--laranja)] to-transparent opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="relative group shrink-0 mt-2">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[var(--marrom)] to-[var(--laranja)] flex items-center justify-center rounded-full shadow-xl shadow-orange-900/10 transition-transform duration-500 group-hover:scale-105">
              <span className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter select-none">
                {iniciais}
              </span>
            </div>
            <div
              className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"
              title="Online"></div>
          </div>

          <div className="w-full text-center md:text-left flex flex-col items-center md:items-start flex-1 pt-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">{usuario.nome}</h1>
            <div className="flex items-center gap-2 text-slate-500 font-medium mb-8 bg-slate-50 px-3 py-1 rounded-md">
              <span className="text-sm tracking-widest uppercase">
                {formatarCPF(usuario.cpf) || "CPF não cadastrado"}
              </span>
            </div>

            <button
              onClick={abrirModalEditar}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[var(--marrom)] text-white hover:bg-[var(--laranja)] hover:shadow-lg hover:shadow-orange-900/20 active:scale-95 transition-all duration-200 cursor-pointer group">
              <SquarePen size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Editar Informações
            </button>
          </div>

          <div className="flex items-end self-stretch">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
              onClick={modalSair.abrir}>
              <LogOut size={18} />
              Desconectar da conta
            </button>
          </div>
        </section>

        <br />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-10 shadow-[0_2px_20px_rgb(0,0,0,0.04)] flex flex-col">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-6 mb-8">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                <RectangleEllipsis size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Informações de Contato</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 flex-1 p-5">
              <div className="flex gap-4 items-start group">
                <div className="p-2.5 text-white rounded-xl bg-[var(--marrom)] group-hover:text-white transition-colors duration-300">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">E-mail</p>
                  <p className="text-base text-slate-800 font-medium break-all">{usuario.email}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="p-2.5 text-white rounded-xl bg-[var(--marrom)] group-hover:text-white transition-colors duration-300">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Telefone</p>
                  <p className="text-base text-slate-800 font-medium">
                    {formatarTelefone(usuario.telefones) || "Não informado"}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="p-2.5 text-white rounded-xl bg-[var(--marrom)] group-hover:text-white transition-colors duration-300">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Endereço</p>
                  <p className="text-base text-slate-500 font-medium italic">
                    Não informado
                    <button
                      onClick={() => alert("botao de editar endereco")}
                      className="cursor-pointer text-slate-500 pl-3">
                      <SquarePen size={15} />
                    </button>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start group">
                <div className="p-2.5 text-white rounded-xl bg-[var(--marrom)] group-hover:text-white transition-colors duration-300">
                  <Calendar size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">Membro desde</p>
                  <p className="text-base text-slate-800 font-medium">{formatarData(usuario.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-start">
              <button
                onClick={modalSenha.abrir}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer">
                Alterar Senha de Acesso
              </button>
            </div>
          </div>

          <aside className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-[0_2px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-48 h-48 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex justify-center items-center mb-6 mx-auto shadow-inner border border-orange-200/50">
                <Shield className="text-[var(--marrom)]" size={80} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-extrabold text-slate-800 mb-2">Conta Verificada</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                Sua identidade foi confirmada e sua conta está totalmente protegida.
              </p>

              <div className="px-6 py-3 rounded-[80px] bg-orange-100 text-[var(--marrom)] shadow-[0_2px_20px_rgb(0,0,0,0.04)] text-sm font-bold tracking-wide uppercase w-full flex justify-center items-center gap-2">
                Nível: Cliente
              </div>
            </div>
          </aside>
        </section>

        <br />

        <section className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_2px_20px_rgb(0,0,0,0.04)] mb-8 flex flex-col md:flex-row items-center md:items-start gap-8 relative overflow-hidden">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6 mb-8">
            <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
              <Package size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Pedidos</h2>
          </div>
        </section>

        {toast && <Toast mensagem={toast.mensagem} tipo={toast.tipo} />}
      </main>
    </div>
  );
}

export default Perfil;

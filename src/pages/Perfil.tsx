import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import Modal from "../components/Modal";
import { LogOut, RectangleEllipsis, Shield, SquarePen, Phone, Mail, Calendar, MapPin } from "lucide-react";
import { InputTexto } from "../components/InputTexto";
import { useFormEditar } from "../hooks/useFormEditar";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

function Perfil() {
  const [usuario, setUsuario] = useState<any>(null);
  const navigate = useNavigate();

  const { form, inicializar, handleChange } = useFormEditar(usuario);

  const modalEditar = useModal();
  const modalSenha = useModal();
  const modalSair = useModal();

  const { toast, mostrar } = useToast();

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

  if (!usuario) return <p>Carregando...</p>;

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

  return (
    <div className="min-h-screen bg-[var(--fundo)] text-slate-800 font-sans w-full flex justify-center items-center">
      {modalEditar.aberto && (
        <Modal titulo="Editar Perfil" onClose={modalEditar.fechar}>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Nome</label>
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
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">E-mail</label>
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
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Telefone</label>
            <InputTexto
              type="text"
              value={form.telefones}
              onCriar={(e) => handleChange("telefones", e.target.value)}
              placeholder="Insira seu telefone"
              id="editarTelefones"
              name="editarTelefones"
              required={false}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">CPF</label>
            <InputTexto
              type="text"
              value={form.cpf}
              onCriar={(e) => handleChange("cpf", e.target.value)}
              placeholder="Insira seu CPF"
              id="editarCpf"
              name="editarCpf"
              required={false}
            />
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <button
              onClick={modalEditar.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={handleEditar}
              className="px-5 py-2 text-sm bg-[var(--marrom)] hover:bg-[var(--laranja)] text-white rounded-lg transition-colors cursor-pointer">
              Salvar
            </button>
          </div>
        </Modal>
      )}

      {modalSenha.aberto && (
        <Modal titulo="Alterar Senha" onClose={modalSenha.fechar}>
          <div className="flex flex-col gap-4">{/* inputs de senha aqui */}</div>
          <div className="flex justify-end gap-3 pt-6">
            <button
              onClick={modalSenha.fechar}
              className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button className="px-5 py-2 text-sm bg-[var(--marrom)] hover:bg-[var(--laranja)] text-white rounded-lg transition-colors cursor-pointer">
              Salvar
            </button>
          </div>
        </Modal>
      )}

      {modalSair.aberto && (
        <Modal titulo="Deseja sair?" onClose={modalSair.fechar}>
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={modalSair.fechar}
              className="px-4 py-2 w-full text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              Cancelar
            </button>
            <button
              onClick={handleSair}
              className="px-5 py-2 text-sm bg-[var(--marrom)] w-full hover:bg-[var(--laranja)] text-white rounded-lg transition-colors cursor-pointer">
              Sair
            </button>
          </div>
        </Modal>
      )}

      <main className="w-full mx-auto p-6">
        <section className="flex flex-col md:flex-row items-center gap-8 mb-12 mt-4">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-[var(--marrom)] flex items-center justify-center rounded-2xl shadow-md shrink-0">
            <span className="text-5xl md:text-6xl font-bold text-white select-none">{iniciais}</span>
          </div>
          <div className="w-full text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">{usuario.nome}</h1>
            <p className="text-lg text-slate-500 mb-6">{usuario.cpf || "cpf"}</p>

            <br />

            <button
              onClick={abrirModalEditar}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[var(--marrom)] text-white hover:bg-[var(--laranja)] active:scale-95 transition-all cursor-pointer">
              <SquarePen size={18} />
              Editar Informações
            </button>
          </div>
        </section>

        <br />
        <hr className="border-t-2 border-slate-200 mb-8" />
        <br />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-slate-300 rounded-xl p-8 bg-white flex flex-col gap-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">
              Informações de Contato e Gerais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-3 items-start">
                <Mail className="text-slate-400 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">E-mail</p>
                  <p className="text-base text-slate-700 font-medium mt-1">{usuario.email}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Phone className="text-slate-400 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Telefone</p>
                  <p className="text-base text-slate-700 font-medium mt-1">{usuario.telefones || "Não informado"}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <MapPin className="text-slate-400 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Endereço</p>
                  <p className="text-base text-slate-400 font-medium mt-1">Não informado</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <Calendar className="text-slate-400 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Membro desde</p>
                  <p className="text-base text-slate-700 font-medium mt-1">{usuario.createdAt}</p>
                </div>
              </div>
            </div>
            <button
              onClick={modalSenha.abrir}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-white text-[var(--marrom)] hover:bg-[var(--marrom)] hover:text-white border border-[var(--marrom)] active:scale-95 transition-all cursor-pointer w-fit">
              <RectangleEllipsis size={18} />
              Alterar Senha
            </button>
          </div>

          <aside className="lg:col-span-1 border border-slate-300 rounded-xl p-8 bg-white flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex justify-center items-center mb-6">
              <Shield className="text-[var(--marrom)]" size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Conta Verificada</h3>
            <p className="text-sm text-slate-500 mb-6">Sua conta está ativa e protegida.</p>
            <div className="px-4 py-2 rounded-full bg-orange-50 text-[var(--laranja)] text-sm font-semibold border border-orange-100 w-full">
              Cliente
            </div>
          </aside>
        </section>

        <br />

        <button
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-[var(--marrom)] text-white hover:bg-[var(--laranja)] active:scale-95 transition-all cursor-pointer"
          onClick={modalSair.abrir}>
          <LogOut size={18} />
          Sair
        </button>
        {toast && <Toast mensagem={toast.mensagem} tipo={toast.tipo} />}
      </main>
    </div>
  );
}

export default Perfil;

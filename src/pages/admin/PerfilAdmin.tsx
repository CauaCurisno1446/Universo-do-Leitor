import { useState } from "react";
import { User, Lock, Check } from "lucide-react";
import { InputTexto } from "../../components/InputTexto";
import { InputSenha } from "../../components/InputSenha";

function PerfilAdmin() {
  const adminSalvo = JSON.parse(localStorage.getItem("adminUsuario") || "{}");

  const [nome, setNome] = useState(adminSalvo.nome ?? "");
  const [email, setEmail] = useState(adminSalvo.email ?? "");
  const [salvandoPerfil, setSalvandoPerfil] = useState(false);
  const [sucessoPerfil, setSucessoPerfil] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [salvandoSenha, setSalvandoSenha] = useState(false);
  const [sucessoSenha, setSucessoSenha] = useState(false);
  const [erroSenha, setErroSenha] = useState("");

  const token = localStorage.getItem("adminToken");

  async function salvarPerfil(e: React.FormEvent) {
    e.preventDefault();
    setSalvandoPerfil(true);
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
      if (!data.error) {
        localStorage.setItem("adminUsuario", JSON.stringify({ ...adminSalvo, nome, email }));
        setSucessoPerfil(true);
        setTimeout(() => setSucessoPerfil(false), 2500);
      }
    } catch {
      // silencioso
    } finally {
      setSalvandoPerfil(false);
    }
  }

  async function salvarSenha(e: React.FormEvent) {
    e.preventDefault();
    setErroSenha("");
    if (novaSenha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem.");
      return;
    }
    if (novaSenha.length < 6) {
      setErroSenha("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setSalvandoSenha(true);
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
        setErroSenha(data.error);
      } else {
        setSucessoSenha(true);
        setSenhaAtual("");
        setNovaSenha("");
        setConfirmarSenha("");
        setTimeout(() => setSucessoSenha(false), 2500);
      }
    } catch {
      setErroSenha("Erro ao conectar com o servidor.");
    } finally {
      setSalvandoSenha(false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--marrom)]" id="Texto">
          Perfil
        </h1>
        <p className="text-stone-400 text-sm mt-1">Gerencie suas informações de administrador</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8 bg-white rounded-2xl px-6 py-5 shadow-sm border border-stone-100">
        <div className="w-14 h-14 bg-[var(--marrom)] rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-white text-xl font-bold" id="Texto">
            {nome ? nome[0].toUpperCase() : "A"}
          </span>
        </div>
        <div>
          <p className="font-bold text-[var(--marrom)]">{nome || "Admin"}</p>
          <p className="text-sm text-stone-400">{email}</p>
          <span className="text-xs bg-[var(--bege)]/60 text-[var(--marrom)] font-semibold px-2.5 py-0.5 rounded-full mt-1 inline-block">
            Administrador
          </span>
        </div>
      </div>

      {/* Dados pessoais */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 mb-4 overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-stone-100">
          <User size={16} className="text-[var(--marrom)]" />
          <h2 className="font-bold text-sm text-[var(--marrom)]" id="Texto">
            Dados pessoais
          </h2>
        </div>
        <form onSubmit={salvarPerfil} className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Nome</label>
            <InputTexto value={nome} onCriar={(e) => setNome(e.target.value)} placeholder="Seu nome" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">E-mail</label>
            <InputTexto
              type="email"
              value={email}
              onCriar={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>
          <button
            type="submit"
            disabled={salvandoPerfil || sucessoPerfil}
            className={`w-full font-semibold py-3 rounded-xl transition-colors duration-200 text-sm cursor-pointer ${
              sucessoPerfil ? "bg-green-500 text-white" : "bg-[var(--marrom)] text-white hover:bg-[var(--laranja)]"
            } disabled:opacity-70`}>
            {sucessoPerfil ? (
              <span className="flex items-center justify-center gap-2">
                <Check size={16} /> Salvo!
              </span>
            ) : salvandoPerfil ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </span>
            ) : (
              "Salvar alterações"
            )}
          </button>
        </form>
      </div>

      {/* Alterar senha */}
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-stone-100">
          <Lock size={16} className="text-[var(--marrom)]" />
          <h2 className="font-bold text-sm text-[var(--marrom)]" id="Texto">
            Alterar senha
          </h2>
        </div>
        <form onSubmit={salvarSenha} className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Senha atual</label>
            <InputSenha
              value={senhaAtual}
              onCriar={(e) => setSenhaAtual(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Nova senha</label>
            <InputSenha
              value={novaSenha}
              onCriar={(e) => setNovaSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Confirmar nova senha
            </label>
            <InputSenha
              value={confirmarSenha}
              onCriar={(e) => setConfirmarSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {erroSenha && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{erroSenha}</div>
          )}

          <button
            type="submit"
            disabled={salvandoSenha || sucessoSenha}
            className={`w-full font-semibold py-3 rounded-xl transition-colors duration-200 text-sm cursor-pointer ${
              sucessoSenha ? "bg-green-500 text-white" : "bg-[var(--marrom)] text-white hover:bg-[var(--laranja)]"
            } disabled:opacity-70`}>
            {sucessoSenha ? (
              <span className="flex items-center justify-center gap-2">
                <Check size={16} /> Senha alterada!
              </span>
            ) : salvandoSenha ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Salvando...
              </span>
            ) : (
              "Alterar senha"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PerfilAdmin;

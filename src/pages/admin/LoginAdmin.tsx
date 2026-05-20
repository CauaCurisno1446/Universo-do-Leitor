import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputTexto } from "../../components/InputTexto";
import { InputSenha } from "../../components/InputSenha";
import ClickSpark from "../../components/ClickSpark";
import { ShieldCheck } from "lucide-react";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  function handleEntrar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErro(data.error);
          return;
        }
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUsuario", JSON.stringify(data.usuario));
        navigate("/admin");
      })
      .catch(() => setErro("Erro ao conectar com o servidor."))
      .finally(() => setLoading(false));
  }

  return (
    <div className="min-h-screen bg-[var(--marrom)] flex items-center justify-center px-4">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[var(--laranja)]/10" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white/5" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-[var(--branco)] rounded-3xl shadow-2xl px-10 py-12">
          {/* Ícone + título */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 bg-[var(--marrom)] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <ShieldCheck size={26} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--marrom)]" id="Texto">
              Painel Admin
            </h1>
            <p className="text-stone-400 text-sm mt-1">Acesso restrito a administradores</p>
          </div>

          <form onSubmit={handleEntrar} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">E-mail</label>
              <InputTexto
                type="email"
                value={email}
                onCriar={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                id="email"
                name="email"
                required={true}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Senha</label>
              <InputSenha
                value={senha}
                placeholder="••••••••"
                onCriar={(e) => setSenha(e.target.value)}
                id="senha"
                name="senha"
                required={true}
              />
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">{erro}</div>
            )}

            <ClickSpark>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--marrom)] text-white font-semibold py-3.5 rounded-xl hover:bg-[var(--laranja)] transition-colors duration-200 cursor-pointer text-sm disabled:opacity-70 mt-1">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Entrando...
                  </span>
                ) : (
                  "Acessar painel"
                )}
              </button>
            </ClickSpark>
          </form>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">Universo do Leitor © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}

export default LoginAdmin;

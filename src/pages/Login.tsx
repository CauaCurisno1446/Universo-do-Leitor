"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputTexto } from "../components/InputTexto";
import { InputSenha } from "../components/InputSenha";
import ClickSpark from "../components/ClickSpark";
import Fundo from "../assets/img/login.png";
import BtnVoltar from "../components/BtnVoltar";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleEntrar(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        navigate("/perfil");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="min-h-screen w-full flex">
      <div className="w-full md:w-[480px] lg:w-[520px] flex flex-col justify-center px-8 md:px-14 py-12 bg-[var(--branco)] shrink-0">
        <BtnVoltar label="Voltar" />
        <br />
        <h1 className="text-3xl font-bold text-[var(--marrom)] mb-1" id="Texto">
          Login
        </h1>
        <p className="text-stone-400 text-sm mb-8">Entre para acessar sua conta.</p>

        <form onSubmit={handleEntrar} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">E-mail</label>
            <InputTexto
              type="email"
              value={email}
              onCriar={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className=""
              id="email"
              name="email"
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
            />
          </div>

          <ClickSpark>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--laranja)] text-white font-semibold py-3.5 rounded-xl hover:bg-[var(--marrom)] transition-colors duration-200 cursor-pointer text-sm disabled:opacity-70 mt-1">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </ClickSpark>
        </form>

        <p className="text-center text-sm text-stone-400 mt-8">
          Não tem conta?{" "}
          <Link to="/cadastro" className="text-[var(--laranja)] font-semibold hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>

      <div
        className="hidden md:block flex-1 bg-cover bg-center bg-no-repeat relative bg-[var(--marrom)]"
        style={{ backgroundImage: `url(${Fundo})` }}>
        <div className="absolute inset-0 bg-[var(--marrom)]/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="text-white text-xl font-light leading-relaxed italic" id="Texto">
            "Uma maneira mais envolvente de descobrir novas histórias."
          </blockquote>
          <p className="text-white/60 text-sm mt-3">— Universo do Leitor</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

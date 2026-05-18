"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputTexto } from "../components/InputTexto";
import { InputSenha } from "../components/InputSenha";
import ClickSpark from "../components/ClickSpark";
import Fundo from "../assets/img/login.png";
import BtnVoltar from "../components/BtnVoltar";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefones, setTelefones] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function formatarCpf(val: string) {
    return val
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);
  }

  function handleCadastrar(e: React.FormEvent) {
    e.preventDefault();
    if (senha !== confirmar) return;
    setLoading(true);

    fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, cpf, telefones }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        navigate("/login"); // cadastrou, manda pro login
      })
      .finally(() => setLoading(false));
  }

  const senhasNaoBatem = confirmar && senha !== confirmar;

  return (
    <div className="min-h-screen w-full flex">
      <div className="w-full md:w-[480px] lg:w-[520px] flex flex-col justify-center px-8 md:px-14 py-12 bg-[var(--branco)] shrink-0 overflow-y-auto">
        <BtnVoltar label="Voltar" />
        <br />

        <h1 className="text-3xl font-bold text-[var(--marrom)] mb-1" id="Texto">
          Cadastro
        </h1>

        <p className="text-stone-400 text-sm mb-8">Crie sua conta e comece a explorar.</p>

        <form onSubmit={handleCadastrar} className="flex flex-col gap-4">
          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Nome</label>
            <InputTexto
              type="text"
              value={nome}
              onCriar={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              id="nome"
              name="nome"
            />
          </div>

          {/* CPF */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">CPF</label>
            <InputTexto
              type="text"
              value={cpf}
              onCriar={(e) => setCpf(formatarCpf(e.target.value))}
              placeholder="000.000.000-00"
              id="cpf"
              name="cpf"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">E-mail</label>
            <InputTexto
              type="email"
              value={email}
              onCriar={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              id="email"
              name="email"
            />
          </div>

          {/* Telefone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Telefone</label>
            <InputTexto
              type="text"
              value={telefones}
              onCriar={(e) => setTelefones(e.target.value)}
              placeholder="Digite apenas números (11 dígitos)"
              id="telefones"
              name="telefones"
              maxLength={11}
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Senha</label>
            <InputSenha
              value={senha}
              onCriar={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              id="senha"
              name="senha"
            />
          </div>

          {/* Confirmar senha */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Confirmar senha</label>
            <InputSenha
              value={confirmar}
              onCriar={(e) => setConfirmar(e.target.value)}
              placeholder="Confirme sua senha"
            />
          </div>

          {/* Erro */}
          {senhasNaoBatem && <p className="text-red-500 text-sm">As senhas não coincidem.</p>}

          {/* Botão */}
          <ClickSpark>
            <button
              type="submit"
              disabled={loading || !!senhasNaoBatem}
              className="w-full bg-[var(--laranja)] text-white font-semibold py-3.5 rounded-xl hover:bg-[var(--marrom)] transition-colors duration-200 cursor-pointer text-sm disabled:opacity-70 mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Criando conta...
                </span>
              ) : (
                "Cadastrar"
              )}
            </button>
          </ClickSpark>
        </form>

        <p className="text-center text-sm text-stone-400 mt-8">
          Já tem conta?{" "}
          <Link to="/login" className="text-[var(--laranja)] font-semibold hover:underline">
            Entrar
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

export default Cadastro;

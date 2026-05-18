import { useState, useEffect } from "react";

export function useFormEditar(usuarioInicial: any) {
  const [form, setForm] = useState({
    nome: usuarioInicial?.nome ?? "",
    email: usuarioInicial?.email ?? "",
    cpf: usuarioInicial?.cpf ?? "",
    telefones: usuarioInicial?.telefones ?? "",
  });

  useEffect(() => {
    if (usuarioInicial) {
      setForm({
        nome: usuarioInicial.nome,
        email: usuarioInicial.email,
        cpf: usuarioInicial.cpf,
        telefones: usuarioInicial.telefones,
      });
    }
  }, [usuarioInicial]);

  function inicializar(usuario: any) {
    setForm({ nome: usuario.nome, email: usuario.email, cpf: usuario.cpf, telefones: usuario.telefones });
  }

  function handleChange(campo: string, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  return { form, inicializar, handleChange };
}

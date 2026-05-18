import { useState } from "react";

// T é um "Generic" do TypeScript para que o hook funcione com qualquer tipo de objeto
export function useRascunho<T>(dadosIniciais: T, aoSalvar: (dados: T) => Promise<void>) {
  const [rascunho, setRascunho] = useState<T>(dadosIniciais);
  const [estaSalvando, setEstaSalvando] = useState(false);

  // Prepara o rascunho com os dados atuais quando o modal for abrir
  const iniciarEdicao = (dadosAtualizados: T) => {
    setRascunho(dadosAtualizados);
  };

  // Atualiza um campo específico dentro do objeto de rascunho
  const alterarCampo = (campo: keyof T, valor: any) => {
    setRascunho((prev) => ({ ...prev, [campo]: valor }));
  };

  // Orquestra a chamada de salvamento
  const salvar = async () => {
    setEstaSalvando(true);
    try {
      await aoSalvar(rascunho);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      // Aqui você poderia integrar um toast de erro
    } finally {
      setEstaSalvando(false);
    }
  };

  return {
    rascunho,
    estaSalvando,
    iniciarEdicao,
    alterarCampo,
    salvar,
  };
}

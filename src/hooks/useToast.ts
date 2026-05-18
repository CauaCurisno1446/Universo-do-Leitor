import { useState } from "react";

type ToastTipo = "sucesso" | "erro" | "aviso";

interface Toast {
  mensagem: string;
  tipo: ToastTipo;
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  function mostrar(mensagem: string, tipo: ToastTipo = "sucesso") {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast(null), 3000);
  }

  return { toast, mostrar };
}

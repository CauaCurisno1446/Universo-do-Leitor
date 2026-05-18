import { CircleCheck, CircleX, AlertTriangle } from "lucide-react";

type ToastTipo = "sucesso" | "erro" | "aviso";

const config = {
  sucesso: { icone: CircleCheck, cor: "border-green-500 text-green-600" },
  erro: { icone: CircleX, cor: "border-red-500 text-red-600" },
  aviso: { icone: AlertTriangle, cor: "border-amber-500 text-amber-600" },
};

interface ToastProps {
  mensagem: string;
  tipo: ToastTipo;
}

function Toast({ mensagem, tipo }: ToastProps) {
  const { icone: Icone, cor } = config[tipo];

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 bg-white border-l-4 ${cor} rounded-lg px-4 py-3 shadow-md animate-slide-in`}>
      <Icone size={18} />
      <p className="text-sm font-medium text-slate-800">{mensagem}</p>
    </div>
  );
}

export default Toast;

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  value: string;
  type?: string;
  placeholder: string;
  className?: string;
  onCriar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
};

function InputSenha({ value, placeholder, className, onCriar, id, name }: InputProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <div className="relative">
      <input
        type={mostrarSenha ? "text" : "password"}
        value={value}
        onChange={onCriar}
        placeholder={placeholder}
        id={id}
        name={name}
        required
        className={`w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--marrom)] transition-colors placeholder:text-stone-300 bg-white pr-11 ${className}`}
      />

      <button
        type="button"
        onClick={() => setMostrarSenha(!mostrarSenha)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[var(--marrom)] transition-colors">
        {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

export { InputSenha };

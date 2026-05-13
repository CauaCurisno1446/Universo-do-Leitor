import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type BtnProps = {
  label?: string;
};

function BtnVoltar({ label }: BtnProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="group flex items-center gap-3 text-stone-400 hover:text-black transition-all cursor-pointer">
      <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />

      <span className="text-sm font-semibold tracking-tight">{label}</span>
    </button>
  );
}

export default BtnVoltar;

import { Link } from "react-router-dom";
import ClickSpark from "./ClickSpark";

type ProdutosProps = {
  id: number;
  imagem?: string;
  nome: string;
  preco: number;
  descricao?: string;
  onCriar: () => void;
};

function Produto({ id, imagem, nome, preco, descricao, onCriar }: ProdutosProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-3 hover:scale-105 transition cursor-pointer">
      <Link to={`/produtos/${id}`}>
        <img src={imagem} alt={nome} className="w-full h-80 object-cover rounded-md" />

        <h2 className="text-lg font-semibold mt-2 text-[var(--marrom)]" id="Texto">
          {nome}
        </h2>

        <p className="text-md font-bold text-black mt-1">R$ {preco.toFixed(2)}</p>

        <p className="text-md text-black mt-1">{descricao}</p>
      </Link>

      <br />
      <ClickSpark>
        <button
          onClick={onCriar}
          className="bg-[var(--laranja)] text-[var(--branco)] py-2 px-4 rounded-[40px] hover:bg-[var(--marrom)] duration-200 w-full cursor-pointer">
          Adicionar ao Carrinho
        </button>
      </ClickSpark>
    </div>
  );
}

export default Produto;

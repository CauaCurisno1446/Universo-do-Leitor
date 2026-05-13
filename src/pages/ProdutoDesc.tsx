"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingBag, Star, Truck, Heart, Share2, ShieldCheck } from "lucide-react";
import { useSacola } from "../components/Item";
import ClickSpark from "../components/ClickSpark";
import BtnVoltar from "../components/BtnVoltar";

const Skeleton = () => (
  <div className="min-h-screen bg-white animate-pulse flex items-center justify-center">
    <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 p-10">
      <div className="bg-stone-100 aspect-square rounded-[3rem]" />
      <div className="space-y-8 py-10">
        <div className="space-y-4">
          <div className="h-4 bg-stone-100 w-24 rounded" />
          <div className="h-12 bg-stone-100 w-full rounded" />
          <div className="h-24 bg-stone-100 w-full rounded" />
        </div>
        <div className="h-32 bg-stone-100 w-full rounded-[2rem]" />
      </div>
    </div>
  </div>
);

function ProdutoDesc() {
  const { id } = useParams();
  const [produto, setProduto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);
  const { adicionarItem } = useSacola();

  useEffect(() => {
    fetch(`http://localhost:3000/produtos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduto(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  function handleAdicionar() {
    if (!produto) return;
    for (let i = 0; i < quantidade; i++) adicionarItem(produto);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  }

  if (loading) return <Skeleton />;

  return (
    <section className="min-h-screen bg-[#FDFDFD] flex items-center py-12 md:py-20">
      <div className=" mx-auto px-6 md:px-12 w-full">
        <div className="flex justify-between items-center mb-12">
          <BtnVoltar label="Voltar à galeria" />
          <div className="flex gap-3">
            <button className="p-3 rounded-full border border-stone-100 bg-white shadow-sm hover:text-red-500 transition-all">
              <Heart size={20} />
            </button>
            <button className="p-3 rounded-full border border-stone-100 bg-white shadow-sm hover:text-blue-500 transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <br />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-[var(--laranja)]/5 blur-3xl rounded-[4rem] -z-10" />
            <div className="relative overflow-hidden rounded-[3rem] bg-white shadow-2xl shadow-stone-200">
              <img
                src={produto.imagemUrl}
                alt={produto.nome}
                className="w-full aspect-square object-cover transform hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <header className="mb-8">
              {produto.categoria && (
                <span className="inline-block px-3 py-1 rounded-full bg-stone-100 text-[10px] font-bold tracking-[0.15em] text-stone-500 uppercase mb-4">
                  {produto.categoria}
                </span>
              )}
              <h1 className="text-5xl xl:text-6xl font-serif text-stone-900 leading-[1.1] mb-6">{produto.nome}</h1>
              <div className="flex items-center gap-4">
                <p className="text-4xl font-light text-stone-900 leading-none">R$ {produto.preco?.toFixed(2)}</p>
                <div className="h-8 w-px bg-stone-200" />
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-stone-800">4.9</span>
                  <span className="text-xs text-stone-400 font-medium">(120 reviews)</span>
                </div>
              </div>
            </header>

            <br />

            <div className="space-y-8">
              <p className="text-lg text-stone-500 font-light leading-relaxed">
                {produto.descricao ||
                  "Uma peça exclusiva selecionada para transformar seu ambiente com elegância e sofisticação atemporal."}
              </p>

              <div className="bg-stone-50/50 border border-stone-100 p-2 rounded-[2.5rem]">
                <div className="bg-white p-6 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex items-center border border-stone-100 rounded-2xl p-1 bg-stone-50">
                    <button
                      onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all font-bold">
                      −
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantidade}</span>
                    <button
                      onClick={() => setQuantidade(quantidade + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all font-bold">
                      +
                    </button>
                  </div>

                  <br />

                  <div className="flex-1 w-full">
                    <ClickSpark>
                      <button
                        onClick={handleAdicionar}
                        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-3 shadow-xl ${
                          adicionado
                            ? "bg-green-600 text-white shadow-green-100"
                            : "bg-[var(--marrom)] cursor-pointer text-white hover:bg-stone-800 shadow-stone-200"
                        }`}>
                        <ShoppingBag size={20} />
                        {adicionado ? "Adicionado com sucesso!" : "Comprar Agora"}
                      </button>
                    </ClickSpark>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl border border-stone-100 bg-white flex flex-col gap-3">
                  <Truck size={22} className="text-[var(--laranja)]" />
                  <div>
                    <p className="text-xs font-bold text-stone-900">Frete Premium</p>
                    <p className="text-[10px] text-stone-400">Entrega garantida em 3-5 dias</p>
                  </div>
                </div>
                <div className="p-5 rounded-3xl border border-stone-100 bg-white flex flex-col gap-3">
                  <ShieldCheck size={22} className="text-[var(--laranja)]" />
                  <div>
                    <p className="text-xs font-bold text-stone-900">Garantia Vitalícia</p>
                    <p className="text-[10px] text-stone-400">Certificado de autenticidade inclusivo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProdutoDesc;

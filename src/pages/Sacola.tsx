"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, X, CreditCard, Truck, CheckCircle } from "lucide-react";
import { useSacola } from "../components/Item";
import ClickSpark from "../components/ClickSpark";
import BtnVoltar from "../components/BtnVoltar";

type MetodoPagamento = "pix" | "credito" | "boleto";

function Sacola() {
  const { itens, removerItem, alterarQuantidade, total } = useSacola();
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento>("pix");
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [finalizado, setFinalizado] = useState(false);
  const navigate = useNavigate();

  const frete = total >= 100 ? 0 : 12.9;
  const totalFinal = total + frete;

  function handleFinalizar() {
    if (enderecos.length === 0 || itens.length === 0) return;
    setFinalizado(true);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("http://localhost:3000/enderecos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEnderecos(data);
      });
  }, []);

  if (finalizado) {
    return (
      <section className="min-h-screen bg-[var(--branco)] flex items-center justify-center px-6">
        <div className="text-center flex flex-col items-center gap-5 max-w-sm">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--marrom)]" id="Texto">
            Pedido confirmado!
          </h1>
          <p className="text-stone-500 text-sm leading-relaxed">
            Seu pedido foi realizado com sucesso. Você receberá uma confirmação em breve.
          </p>
          <button
            onClick={() => navigate("/produtos")}
            className="bg-[var(--laranja)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[var(--marrom)] transition-colors duration-200 cursor-pointer">
            Continuar comprando
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[var(--branco)]">
      <div className=" mx-auto px-4 md:px-10 py-8 md:py-14">
        <BtnVoltar label="Continuar comprando" />

        <br />

        <h1 className="text-2xl md:text-3xl font-bold text-[var(--marrom)] mb-8" id="Texto">
          Minha Sacola
        </h1>

        {itens.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-24">
            <ShoppingBag size={48} className="text-stone-200" />
            <p className="text-stone-400 text-sm">Sua sacola está vazia.</p>
            <button
              onClick={() => navigate("/produtos")}
              className="bg-[var(--laranja)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[var(--marrom)] transition-colors cursor-pointer text-sm">
              Ver produtos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            <div className="flex flex-col gap-4">
              {itens.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-100 p-4 flex gap-4 items-center shadow-sm">
                  <img
                    src={item.imagemUrl}
                    alt={item.nome}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[var(--marrom)] text-sm md:text-base truncate" id="Texto">
                      {item.nome}
                    </p>
                    <p className="text-base font-bold text-[var(--marrom)] mt-1">
                      R$ {((item.preco / 100) * item.quantidade).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                        className="w-7 h-7 rounded-lg bg-[var(--cinza)] hover:bg-[var(--bege)] text-sm font-bold flex items-center justify-center cursor-pointer transition-colors">
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantidade}</span>
                      <button
                        onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                        className="w-7 h-7 rounded-lg bg-[var(--cinza)] hover:bg-[var(--bege)] text-sm font-bold flex items-center justify-center cursor-pointer transition-colors">
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removerItem(item.id)}
                    className="text-stone-300 hover:text-red-400 transition-colors cursor-pointer shrink-0">
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              {/* Método de pagamento */}
              <div className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm">
                <h2 className="font-bold text-[var(--marrom)] text-sm mb-4" id="Texto">
                  Método de pagamento
                </h2>

                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all mb-2 ${
                    metodoPagamento === "pix"
                      ? "border-[var(--marrom)] bg-[var(--cinza)]"
                      : "border-stone-100 hover:border-stone-200"
                  }`}>
                  <input
                    type="radio"
                    name="pagamento"
                    value="pix"
                    checked={metodoPagamento === "pix"}
                    onChange={() => setMetodoPagamento("pix")}
                    className="accent-[var(--marrom)]"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#32bcad] flex items-center justify-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                        <path d="M16 3L28 10V22L16 29L4 22V10L16 3Z" fill="white" fillOpacity="0.3" />
                        <path
                          d="M10.5 16L13.5 13L16 15.5L18.5 13L21.5 16L18.5 19L16 16.5L13.5 19L10.5 16Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--marrom)]">PIX</p>
                      <p className="text-xs text-stone-400">Aprovação imediata</p>
                    </div>
                  </div>
                  {metodoPagamento === "pix" && (
                    <span className="ml-auto text-xs text-green-600 font-semibold">5% OFF</span>
                  )}
                </label>

                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all mb-2 ${
                    metodoPagamento === "credito"
                      ? "border-[var(--marrom)] bg-[var(--cinza)]"
                      : "border-stone-100 hover:border-stone-200"
                  }`}>
                  <input
                    type="radio"
                    name="pagamento"
                    value="credito"
                    checked={metodoPagamento === "credito"}
                    onChange={() => setMetodoPagamento("credito")}
                    className="accent-[var(--marrom)]"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--marrom)] flex items-center justify-center shrink-0">
                      <CreditCard size={16} color="white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--marrom)]">Cartão de crédito</p>
                      <p className="text-xs text-stone-400">Até 6x sem juros</p>
                    </div>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    metodoPagamento === "boleto"
                      ? "border-[var(--marrom)] bg-[var(--cinza)]"
                      : "border-stone-100 hover:border-stone-200"
                  }`}>
                  <input
                    type="radio"
                    name="pagamento"
                    value="boleto"
                    checked={metodoPagamento === "boleto"}
                    onChange={() => setMetodoPagamento("boleto")}
                    className="accent-[var(--marrom)]"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-stone-400 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M6 8v8M10 8v8M14 8v8M18 8v8" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--marrom)]">Boleto bancário</p>
                      <p className="text-xs text-stone-400">Vence em 3 dias úteis</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm">
                <h2 className="font-bold text-[var(--marrom)] text-sm mb-3 flex items-center gap-2" id="Texto">
                  <Truck size={15} />
                  Endereço de entrega
                </h2>

                <p className="text-base text-slate-500 font-medium italic">
                  {enderecos.length > 0 ? (
                    <div>
                      <p className="text-base text-slate-800 font-medium">
                        {enderecos[0].rua}, {enderecos[0].numero}
                      </p>

                      <p className="text-sm text-slate-500">
                        {enderecos[0].bairro} - {enderecos[0].cidade}/{enderecos[0].estado}
                      </p>

                      <p className="text-sm text-slate-500">CEP: {enderecos[0].cep}</p>

                      <p className="text-sm text-slate-500">
                        N°: {enderecos[0].numero}, {enderecos[0].complemento}
                      </p>
                    </div>
                  ) : (
                    <p className="text-base text-slate-500 font-medium italic">Não informado</p>
                  )}
                </p>

                {total >= 100 ? (
                  <p className="text-xs text-green-600 font-semibold mt-1.5 flex items-center gap-1">
                    <CheckCircle size={12} /> Frete grátis para você!
                  </p>
                ) : (
                  <p className="text-xs text-stone-400 mt-1.5">Frete R$ 12,90 · Grátis acima de R$ 100</p>
                )}
              </div>

              <div className="bg-[var(--marrom)] rounded-2xl p-5 text-white">
                <h2 className="font-bold text-sm mb-4" id="Texto">
                  Resumo do pedido
                </h2>
                <div className="flex flex-col gap-2 text-sm text-white/80">
                  <div className="flex justify-between">
                    <span>
                      Subtotal ({itens.length} {itens.length === 1 ? "item" : "itens"})
                    </span>
                    <span>R$ {(total / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>{frete === 0 ? "Grátis" : `R$ ${frete.toFixed(2)}`}</span>
                  </div>
                  {metodoPagamento === "pix" && (
                    <div className="flex justify-between text-green-300">
                      <span>Desconto PIX (5%)</span>
                      <span>− R$ {((total * 0.05) / 100).toFixed(2)}</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-white/20 my-3" />
                <div className="flex justify-between font-bold text-base">
                  <span id="Texto">Total</span>
                  <span>R$ {((metodoPagamento === "pix" ? totalFinal * 0.95 : totalFinal) / 100).toFixed(2)}</span>
                </div>

                <ClickSpark>
                  <button
                    onClick={handleFinalizar}
                    disabled={enderecos.length === 0}
                    className="mt-4 w-full bg-[var(--laranja)] text-white font-semibold py-3 rounded-xl hover:bg-white hover:text-[var(--marrom)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                    Finalizar pedido →
                  </button>
                </ClickSpark>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Sacola;

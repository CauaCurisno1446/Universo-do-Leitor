"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, X, CreditCard, Truck, CheckCircle, FileText } from "lucide-react";
import ClickSpark from "../components/ClickSpark";
import BtnVoltar from "../components/BtnVoltar";
import Pix from "../assets/img/pix.png";

type MetodoPagamento = "pix" | "credito" | "boleto";

function Sacola() {
  const [itens, setItens] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [metodoPagamento, setMetodoPagamento] = useState<MetodoPagamento>("pix");
  const [enderecos, setEnderecos] = useState<any[]>([]);
  const [finalizado, setFinalizado] = useState(false);

  const navigate = useNavigate();

  const frete = total >= 10000 ? 0 : 1290;
  const totalFinal = total + frete;

  async function buscarSacola() {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await fetch("http://localhost:3000/sacola", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const itensFormatados =
        data?.itens?.map((item: any) => ({
          sacolaItemId: item.id,
          quantidade: item.quantidade,
          ...item.produto,
        })) || [];

      setItens(itensFormatados);

      const totalCalculado = itensFormatados.reduce((acc: number, item: any) => acc + item.preco * item.quantidade, 0);

      setTotal(totalCalculado);
    } catch (error) {
      console.error(error);
    }
  }

  async function removerItem(itemId: number) {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      await fetch(`http://localhost:3000/sacola/item/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      buscarSacola();

      window.dispatchEvent(new Event("sacolaAtualizada"));
    } catch (error) {
      console.error(error);
    }
  }

  async function alterarQuantidade(itemId: number, quantidade: number) {
    const token = localStorage.getItem("token");

    if (!token) return;

    if (quantidade < 1) {
      removerItem(itemId);
      return;
    }

    try {
      await fetch(`http://localhost:3000/sacola/item/${itemId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          quantidade,
        }),
      });

      buscarSacola();

      window.dispatchEvent(new Event("sacolaAtualizada"));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFinalizar() {
    const token = localStorage.getItem("token");

    if (!token) return;

    if (enderecos.length === 0 || itens.length === 0) return;

    try {
      const response = await fetch("http://localhost:3000/pedido/finalizar", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          metodoPagamento,
          enderecoId: enderecos[0].id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setItens([]);
      setTotal(0);

      window.dispatchEvent(new Event("sacolaAtualizada"));

      setFinalizado(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    buscarSacola();

    const atualizarSacola = () => {
      buscarSacola();
    };

    window.addEventListener("sacolaAtualizada", atualizarSacola);

    return () => {
      window.removeEventListener("sacolaAtualizada", atualizarSacola);
    };
  }, []);

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
      <div className="mx-auto px-4 md:px-10 py-8 md:py-14">
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
                      {((item.preco * item.quantidade) / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => alterarQuantidade(item.sacolaItemId, item.quantidade - 1)}
                        className="w-7 h-7 rounded-lg bg-[var(--cinza)] hover:bg-[var(--bege)] text-sm font-bold flex items-center justify-center cursor-pointer transition-colors">
                        −
                      </button>

                      <span className="w-6 text-center text-sm font-semibold">{item.quantidade}</span>

                      <button
                        onClick={() => alterarQuantidade(item.sacolaItemId, item.quantidade + 1)}
                        className="w-7 h-7 rounded-lg bg-[var(--cinza)] hover:bg-[var(--bege)] text-sm font-bold flex items-center justify-center cursor-pointer transition-colors">
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removerItem(item.sacolaItemId)}
                    className="text-stone-300 hover:text-red-400 transition-colors cursor-pointer shrink-0">
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5">
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
                    checked={metodoPagamento === "pix"}
                    onChange={() => setMetodoPagamento("pix")}
                    className="accent-[var(--marrom)]"
                  />

                  <div className="flex items-center gap-2">
                    <div className="bg-[#53b8af] w-[40px] h-[40px] flex justify-center items-center rounded-[10px]">
                      <img src={Pix} alt="PIX" className="w-6 h-6" />
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
                    checked={metodoPagamento === "credito"}
                    onChange={() => setMetodoPagamento("credito")}
                    className="accent-[var(--marrom)]"
                  />

                  <div className="flex items-center gap-2">
                    <div className="bg-[var(--marrom)] w-[40px] h-[40px] flex justify-center items-center rounded-[10px]">
                      <CreditCard size={20} color="white" />
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
                    checked={metodoPagamento === "boleto"}
                    onChange={() => setMetodoPagamento("boleto")}
                    className="accent-[var(--marrom)]"
                  />

                  <div className="flex items-center gap-2">
                    <div className="bg-blue-300 w-[40px] h-[40px] flex justify-center items-center rounded-[10px]">
                      <FileText size={20} color="white" />
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

                {enderecos.length > 0 ? (
                  <div>
                    <p className="text-base text-slate-800 font-medium">
                      {enderecos[0].rua}, {enderecos[0].numero}
                    </p>

                    <p className="text-sm text-slate-500">
                      {enderecos[0].bairro} - {enderecos[0].cidade}/{enderecos[0].estado}
                    </p>

                    <p className="text-sm text-slate-500">CEP: {enderecos[0].cep}</p>
                  </div>
                ) : (
                  <p className="text-base text-slate-500 font-medium italic">Não informado</p>
                )}

                {total >= 10000 ? (
                  <p className="text-xs text-green-600 font-semibold mt-1.5 flex items-center gap-1">
                    <CheckCircle size={12} />
                    Frete grátis para você!
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

                    <span>
                      {(total / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Frete</span>

                    <span>
                      {frete === 0
                        ? "Grátis"
                        : (frete / 100).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                    </span>
                  </div>

                  {metodoPagamento === "pix" && (
                    <div className="flex justify-between text-green-300">
                      <span>Desconto PIX (5%)</span>

                      <span>
                        −{" "}
                        {((total * 0.05) / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t border-white/20 my-3" />

                <div className="flex justify-between font-bold text-base">
                  <span id="Texto">Total</span>

                  <span>
                    {((metodoPagamento === "pix" ? totalFinal * 0.95 : totalFinal) / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>

                <ClickSpark>
                  <button
                    onClick={handleFinalizar}
                    disabled={enderecos.length === 0 || itens.length === 0}
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

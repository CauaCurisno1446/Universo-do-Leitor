"use client"

import Fundo from '../assets/img/background_2.png'
import FilterBar from '../components/Filters'
import { useEffect, useState } from "react"
import { Search } from 'lucide-react'
import { useSacola } from '../components/Item'
import ClickSpark from '../components/ClickSpark'

interface Filters {
  emEstoque: boolean
  foraDEstoque: boolean
  precoMin: number
  precoMax: number
  categorias: string[]
}

function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [pesquisa, setPesquisa] = useState("")
  const [filtros, setFiltros] = useState<Filters>({
    emEstoque: true,
    foraDEstoque: true,
    precoMin: 0,
    precoMax: 1000,
    categorias: ['Livros', 'Acessórios', 'Luminárias'],
  })
  const { adicionarItem } = useSacola()

  useEffect(() => {
    const params = new URLSearchParams()

    if (filtros.emEstoque && !filtros.foraDEstoque) params.set("emEstoque", "true")
    if (!filtros.emEstoque && filtros.foraDEstoque) params.set("emEstoque", "false")

    params.set("precoMin", String(filtros.precoMin))
    params.set("precoMax", String(filtros.precoMax))

    filtros.categorias.forEach((cat: string) => params.append("categoria", cat))

    fetch(`http://localhost:3000/produtos?${params.toString()}`)
      .then(res => res.json())
      .then(data => setProdutos(data))
  }, [filtros])

  const produtosFiltrados = produtos.filter((produto: any) =>
    produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
  )

  return (
    <section className="w-full h-auto bg-white">

      <div className="w-full h-[300px] grid grid-cols-2">
        <div className="w-full h-full bg-[var(--marrom)] flex items-center px-12">
          <h1
            id="Texto"
            className="text-[var(--branco)] text-5xl font-bold leading-tight tracking-wider uppercase"
          >
            ENCONTRE O PRODUTO IDEAL PARA VOCÊ.
          </h1>
        </div>
        <div
          style={{ backgroundImage: `url(${Fundo})` }}
          className="bg-no-repeat bg-center bg-cover"
        />
      </div>

      <div className="w-full mx-auto px-6 py-10 flex gap-8 items-start">

        <FilterBar onFilterChange={setFiltros} />

        <div className="flex-1">
          <div className="grid grid-cols-2">
            <p className="text-sm text-[var(--marrom)] underline mb-6 font-medium">
              {produtosFiltrados.length} Produtos encontrados
            </p>

            <div className='flex items-center justify-end gap-2'>
              <Search size={20} color={"var(--marrom)"} />
              <input
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                type="text"
                placeholder="Pesquisar produtos..."
                className="border-b border-b-[var(--marrom)] focus:outline-none focus:ring-0 w-1/3"
              />
            </div>
          </div>

          <br />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {produtosFiltrados.map((produto: any) => (
              <div
                key={produto.id}
                className="bg-white rounded-xl shadow-md p-3 hover:scale-105 transition cursor-pointer"
              >
                <img
                  src={produto.imagemUrl}
                  alt={produto.nome}
                  className="w-full h-80 object-cover rounded-md"
                />

                <h2 className="text-lg font-semibold mt-2 text-[var(--marrom)]" id='Texto'>
                  {produto.nome}
                </h2>

                <p className="text-md font-bold text-black mt-1">
                  R$ {produto.preco.toFixed(2)}
                </p>

                <p className="text-md text-black mt-1">
                  {produto.descricao}
                </p>

                <br />
                <ClickSpark>
                  <button onClick={() => adicionarItem(produto)} className="bg-[var(--laranja)] text-[var(--branco)] py-2 px-4 rounded-[40px] hover:bg-[var(--marrom)] duration-200 w-full cursor-pointer">
                    Adicionar ao Carrinho
                  </button>
                </ClickSpark>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Produtos
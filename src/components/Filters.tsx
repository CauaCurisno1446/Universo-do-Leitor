"use client"

import { useState } from 'react'

interface FilterBarProps {
  onFilterChange?: (filters: Filters) => void
}

interface Filters {
  emEstoque: boolean
  foraDEstoque: boolean
  precoMin: number
  precoMax: number
  categorias: string[]
}

const CATEGORIAS = ['Livros', 'Acessórios', 'Luminárias']
const PRECO_MIN = 0
const PRECO_MAX = 1000

function FilterBar({ onFilterChange }: FilterBarProps) {
  const [emEstoque, setEmEstoque] = useState(true)
  const [foraDEstoque, setForaDEstoque] = useState(true)
  const [precoMin, setPrecoMin] = useState(PRECO_MIN)
  const [precoMax, setPrecoMax] = useState(PRECO_MAX)
  const [categorias, setCategorias] = useState<string[]>(CATEGORIAS)

  function notificar(novoEstado: Partial<Filters>) {
    if (onFilterChange) {
      onFilterChange({
        emEstoque,
        foraDEstoque,
        precoMin,
        precoMax,
        categorias,
        ...novoEstado,
      })
    }
  }

  function limparEstoque() {
    setEmEstoque(true)
    setForaDEstoque(true)
    notificar({ emEstoque: true, foraDEstoque: true })
  }

  function limparPreco() {
    setPrecoMin(PRECO_MIN)
    setPrecoMax(PRECO_MAX)
    notificar({ precoMin: PRECO_MIN, precoMax: PRECO_MAX })
  }

  function limparCategorias() {
    setCategorias(CATEGORIAS)
    notificar({ categorias: CATEGORIAS })
  }

  function toggleCategoria(cat: string) {
    const novas = categorias.includes(cat)
      ? categorias.filter((c) => c !== cat)
      : [...categorias, cat]
    setCategorias(novas)
    notificar({ categorias: novas })
  }

  function handlePrecoMin(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.min(Number(e.target.value), precoMax - 50)
    setPrecoMin(val)
    notificar({ precoMin: val })
  }

  function handlePrecoMax(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.max(Number(e.target.value), precoMin + 50)
    setPrecoMax(val)
    notificar({ precoMax: val })
  }

  const minPercent = ((precoMin - PRECO_MIN) / (PRECO_MAX - PRECO_MIN)) * 100
  const maxPercent = ((precoMax - PRECO_MIN) / (PRECO_MAX - PRECO_MIN)) * 100

  return (
    <div className="w-[200px] bg-[var(--cinza)] rounded-[20px] p-5 flex flex-col gap-6 shrink-0">

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-[var(--marrom)]">Filtros</h2>
          <button
            onClick={limparEstoque}
            className="text-xs text-gray-400 hover:text-[var(--marrom)] underline cursor-pointer duration-150"
          >
            limpar
          </button>
        </div>

        <label className="flex items-center gap-2 text-sm cursor-pointer select-none mb-1">
          <input
            type="checkbox"
            checked={emEstoque}
            onChange={(e) => {
              setEmEstoque(e.target.checked)
              notificar({ emEstoque: e.target.checked })
            }}
            className="accent-[var(--marrom)] w-4 h-4 cursor-pointer"
          />
          Produtos em estoque
        </label>

        <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            checked={foraDEstoque}
            onChange={(e) => {
              setForaDEstoque(e.target.checked)
              notificar({ foraDEstoque: e.target.checked })
            }}
            className="accent-[var(--marrom)] w-4 h-4 cursor-pointer"
          />
          Produtos fora de estoque
        </label>
      </div>

      <hr className="border-gray-200" />

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-[var(--marrom)]">Preço</h2>
          <button
            onClick={limparPreco}
            className="text-xs text-gray-400 hover:text-[var(--marrom)] underline cursor-pointer duration-150"
          >
            limpar
          </button>
        </div>

        <div className="relative h-5 mb-2">
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 rounded bg-gray-300" />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-1 rounded bg-[var(--marrom)]"
            style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
          />
          <input
            type="range"
            min={PRECO_MIN}
            max={PRECO_MAX}
            step={10}
            value={precoMin}
            onChange={handlePrecoMin}
            className="absolute w-full top-0 h-full opacity-0 cursor-pointer"
            style={{ zIndex: precoMin > PRECO_MAX - 100 ? 5 : 3 }}
          />
          <input
            type="range"
            min={PRECO_MIN}
            max={PRECO_MAX}
            step={10}
            value={precoMax}
            onChange={handlePrecoMax}
            className="absolute w-full top-0 h-full opacity-0 cursor-pointer"
            style={{ zIndex: 4 }}
          />
          {/* Visual thumbs */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--marrom)] pointer-events-none shadow"
            style={{ left: `${minPercent}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--marrom)] pointer-events-none shadow"
            style={{ left: `${maxPercent}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Preço: R${precoMin} – R${precoMax}
        </p>
      </div>

      <hr className="border-gray-200" />

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-[var(--marrom)]">Categorias</h2>
          <button
            onClick={limparCategorias}
            className="text-xs text-gray-400 hover:text-[var(--marrom)] underline cursor-pointer duration-150"
          >
            limpar
          </button>
        </div>

        {CATEGORIAS.map((cat) => (
          <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer select-none mb-1">
            <input
              type="checkbox"
              checked={categorias.includes(cat)}
              onChange={() => toggleCategoria(cat)}
              className="accent-[var(--marrom)] w-4 h-4 cursor-pointer"
            />
            {cat}
          </label>
        ))}
      </div>
    </div>
  )
}

export default FilterBar
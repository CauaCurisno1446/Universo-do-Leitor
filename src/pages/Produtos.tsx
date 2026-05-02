"use client"

import Fundo from '../assets/img/background_2.png'
import FilterBar from '../components/Filters'

function Produtos() {
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

      <div className="w-full max-w-[1200px] mx-auto px-6 py-10 flex gap-8 items-start">

        <FilterBar />

        <div className="flex-1">
          <p className="text-sm text-[var(--marrom)] underline mb-6 font-medium">
            0 Produtos encontrados
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {/* {produtos.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))} */}
          </div>
        </div>

      </div>

    </section>
  )
}

export default Produtos
"use client"

import Fundo from '../assets/img/background_2.png';
import FilterBar from '../components/Filters';

function Produtos(){
    return(
        <section className="w-full h-auto grid grid-rows-2 bg-blue-500">
            <div className="w-full h-[500px] bg-[var(--marrom)] mb-4 grid grid-cols-2">
                <div className="w-full h-full mr-4 flex items-center justify-center">
                    <h1 className="text-[var(--branco)] text-6xl font-bold">ENCONTRE O PRODUTO IDEAL PARA VOCÊ!</h1>
                </div>
                <div style={{ backgroundImage: `url(${Fundo})` }} className="bg-no-repeat bg-center bg-cover flex items-end justify-end">
                </div>
            </div>

            <div className='w-full flex justify-center items-center'>
                <FilterBar />
            </div>
        </section>
    )
}

export default Produtos
import Fundo from '../assets/img/background.png';

function Home() {
  return (
    <section className='bg-[var(--marrom)]'>
      <div style={{ backgroundImage: `url(${Fundo})` }} className="bg-no-repeat bg-center bg-cover min-h-screen flex items-end justify-end">
        <div className="p-25 max-w-xl text-right">
          <h1 className='text-[var(--branco)] text-4xl font-bold leading-tight' id="Texto">
            Uma maneira <br />
            mais envolvente <br />
            de descobrir <br />
            novas histórias.
          </h1>

          <span className='block text-[var(--branco)]/80 text-base mt-3 leading-snug'>
            Descubra produtos, adicione ao carrinho e finalize
            sua compra com segurança.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Home;
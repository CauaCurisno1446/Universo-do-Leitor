import Fundo from '../assets/img/background.png';

function Home() {
  return (
    <section className='bg-[#57342D]'>
        <div style={{ backgroundImage: `url(${Fundo})` }} className="bg-no-repeat bg-center bg-cover min-h-screen flex items-end justify-end">
            <h1 className='text-[#F9FDEA] text-center p-10' id="Texto">
                Uma maneira <br /> mais envolvente <br /> de descobrir <br /> novas histórias. <br />
                <span className='justify-left'>
                    Descubra produtos, adicione ao carrinho e finalize <br /> sua compra com segurança.
                </span>
            </h1>
        </div>
    </section>
  );
}

export default Home;
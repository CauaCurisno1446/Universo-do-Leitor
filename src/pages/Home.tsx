import Fundo from "../assets/img/background.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="bg-[var(--marrom)]">
      <div
        style={{ backgroundImage: `url(${Fundo})` }}
        className="bg-no-repeat bg-center bg-cover min-h-[calc(100vh-70px)] flex items-end justify-end">
        <div className="p-8 md:p-20 max-w-xl text-right">
          <h1 className="text-[var(--branco)] text-3xl md:text-4xl font-bold leading-tight" id="Texto">
            Uma maneira <br />
            mais envolvente <br />
            de descobrir <br />
            novas histórias.
          </h1>
          <span className="block text-[var(--branco)]/80 text-sm md:text-base mt-3 leading-relaxed">
            Descubra produtos, adicione ao carrinho e finalize sua compra com segurança.
          </span>
          <Link
            to="/produtos"
            className="inline-block mt-6 bg-[var(--laranja)] text-white font-semibold px-6 py-3 rounded-xl hover:bg-white hover:text-[var(--marrom)] transition-all duration-200 text-sm">
            Explorar produtos →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;

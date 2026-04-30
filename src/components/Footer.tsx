"use client"

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#57342D] text-[#F5F5F5] pt-16 pb-8 px-6 flex">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-serif italic tracking-tighter">Universo do Leitor</h2>
            <p className="text-stone-300 max-w-sm leading-relaxed text-lg">
              Curadoria de histórias e análises profundas para quem vê o mundo através das páginas.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Explorar</span>
            <nav className="flex flex-col space-y-2 text-sm font-medium">
              <a href="#" className="hover:line-through transition-all decoration-1">Lançamentos</a>
              <a href="#" className="hover:line-through transition-all decoration-1">Clássicos</a>
              <a href="#" className="hover:line-through transition-all decoration-1">Entrevistas</a>
              <a href="#" className="hover:line-through transition-all decoration-1">Sobre o Projeto</a>
            </nav>
          </div>

          <div className="flex flex-col space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">Conectar</span>
            <nav className="flex flex-col space-y-2 text-sm font-medium">
              <a href="#" className="hover:italic transition-all">Instagram</a>
              <a href="#" className="hover:italic transition-all">Newsletter</a>
              <a href="#" className="hover:italic transition-all">E-mail</a>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-stone-400 tracking-wider uppercase">
          <p>© {currentYear} — Todos os direitos reservados</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
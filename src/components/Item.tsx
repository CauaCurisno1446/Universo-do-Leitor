import { createContext, useContext, useState } from "react"

interface ItemSacola {
  id: number
  nome: string
  preco: number
  imagemUrl: string
  quantidade: number
}

interface SacolaContextType {
  itens: ItemSacola[]
  adicionarItem: (produto: any) => void
  removerItem: (id: number) => void
  alterarQuantidade: (id: number, quantidade: number) => void
  total: number
}

const SacolaContext = createContext<SacolaContextType | null>(null)

export function SacolaProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = useState<ItemSacola[]>([])

  function adicionarItem(produto: any) {
    setItens(prev => {
      const existe = prev.find(i => i.id === produto.id)
      if (existe) {
        return prev.map(i =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }
      return [...prev, { ...produto, quantidade: 1 }]
    })
  }

  function removerItem(id: number) {
    setItens(prev => prev.filter(i => i.id !== id))
  }

  function alterarQuantidade(id: number, quantidade: number) {
    if (quantidade <= 0) {
      removerItem(id)
      return
    }
    setItens(prev =>
      prev.map(i => i.id === id ? { ...i, quantidade } : i)
    )
  }

  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0)

  return (
    <SacolaContext.Provider value={{ itens, adicionarItem, removerItem, alterarQuantidade, total }}>
      {children}
    </SacolaContext.Provider>
  )
}

export function useSacola() {
  const context = useContext(SacolaContext)
  if (!context) throw new Error("useSacola deve ser usado dentro de SacolaProvider")
  return context
}
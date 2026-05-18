export const formatarCPF = (cpf: string | null | undefined): string => {
  if (!cpf) return "CPF não informado";
  const num = cpf.replace(/\D/g, "");
  if (num.length !== 11) return cpf;
  return num.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatarTelefone = (telefones: any): string => {
  if (!telefones) return "Não informado";
  let numCru = Array.isArray(telefones) ? telefones[0] : telefones;
  let num = String(numCru).replace(/\D/g, "");

  if (num.startsWith("55") && (num.length === 12 || num.length === 13)) {
    num = num.slice(2);
  }

  if (num.length === 11) {
    return num.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (num.length === 10) {
    return num.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  return numCru;
};

export const formatarData = (dataIso: string | null | undefined): string => {
  if (!dataIso) return "Data não disponível";

  try {
    const data = new Date(dataIso);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(data);
  } catch (error) {
    return dataIso;
  }
};

interface MinhasIndicacao {
  id: string;
  indicadoNome: string | null;
  descricao: string;
  data: Date;
  status: "PENDENTE" | "ACEITA" | "RECUSADA";
  valor: number;
}

interface IndicacaoRecebida {
  id: string;
  indicadorNome: string | null;
  descricao: string;
  data: Date;
  status: "PENDENTE" | "ACEITA" | "RECUSADA";
}

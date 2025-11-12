"use server";

import { db } from "@/db";
import { indicacoesTable } from "@/db/schema";

export async function criarIndicacao(values: {
  descricao: string;
  indicadoId: string;
  indicadorId: string;
  valor: number;
}) {
  await db.insert(indicacoesTable).values({
    id: crypto.randomUUID(),
    descricao: values.descricao,
    data: new Date(),
    status: "PENDENTE",
    indicadorId: values.indicadorId,
    indicadoId: values.indicadoId,
    valor: values.valor,
    createdAt: new Date(),
  });
}

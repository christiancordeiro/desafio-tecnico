"use server";

import { db } from "@/db";
import { indicacoesTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function pegarIndicacoes(
  currentUserId: string,
): Promise<MinhasIndicacao[]> {
  const rows = await db
    .select({
      id: indicacoesTable.id,
      descricao: indicacoesTable.descricao,
      data: indicacoesTable.data,
      status: indicacoesTable.status,
      valor: indicacoesTable.valor,
      indicadoNome: userTable.name,
    })
    .from(indicacoesTable)
    .leftJoin(userTable, eq(indicacoesTable.indicadoId, userTable.id))
    .where(eq(indicacoesTable.indicadorId, currentUserId));

  return rows;
}

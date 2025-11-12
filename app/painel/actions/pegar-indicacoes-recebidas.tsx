"use server";

import { db } from "@/db";
import { indicacoesTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function pegarIndicacoesRecebidas(
  currentUserId: string,
): Promise<IndicacaoRecebida[]> {
  const rows = await db
    .select({
      id: indicacoesTable.id,
      descricao: indicacoesTable.descricao,
      data: indicacoesTable.data,
      status: indicacoesTable.status,
      indicadorNome: userTable.name,
    })
    .from(indicacoesTable)
    .leftJoin(userTable, eq(indicacoesTable.indicadorId, userTable.id))
    .where(eq(indicacoesTable.indicadoId, currentUserId));

  return rows;
}

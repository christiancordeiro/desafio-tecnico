import { NextResponse } from "next/server";
import { db } from "@/db";
import { contatoTable, verificationTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const contatoId = id;

  // Atualiza status
  await db
    .update(contatoTable)
    .set({ status: "APROVADO" })
    .where(eq(contatoTable.id, contatoId));

  // Gera token
  const token = nanoid();

  await db.insert(verificationTable).values({
    id: nanoid(),
    identifier: contatoId,
    value: token,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  // Simula envio de e-mail
  console.log(`Convite: http://localhost:3000/cadastro-completo/${token}`);

  return NextResponse.json({ success: true, token });
}

import { db } from "@/db";
import { contatoTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.insert(contatoTable).values({
      id: crypto.randomUUID(),
      email: body.email,
      nome: body.nome,
      empresa: body.empresa,
      mensagem: body.mensagem,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar contato:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno ao salvar contato" },
      { status: 500 },
    );
  }
}

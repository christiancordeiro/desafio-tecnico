import { db } from "@/db";
import { verificationTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import CadastroCompletoForm from "../components/cadastro-completo-form";

export default async function CadastroCompletoPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  console.log("Token recebido da URL:", token);

  const registro = await db
    .select()
    .from(verificationTable)
    .where(eq(verificationTable.value, token));

  console.log(
    "Tokens no banco:",
    registro.map((r) => r.value),
  );

  if (!registro.length) {
    return <div>Token inválido</div>;
  }

  if (registro[0].expiresAt < new Date()) {
    return <div>Token expirado</div>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="flex w-full max-w-md flex-col gap-6">
        <CadastroCompletoForm contatoId={registro[0].identifier} />
      </div>
    </main>
  );
}

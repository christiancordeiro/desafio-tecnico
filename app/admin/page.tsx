import { db } from "@/db";
import { contatoTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import TableComponent from "./components/table";

interface AdminPageProps {
  searchParams: {
    token?: string;
  };
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const token = params.token;
  const authorized = token === process.env.ADMIN_TOKEN;

  console.log("Token recebido:", process.env.ADMIN_TOKEN);

  if (!authorized) {
    return <div>Acesso negado. Token inválido.</div>;
  }

  const contatos = await db.query.contatoTable.findMany({
    orderBy: [desc(contatoTable.createdAt)],
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <TableComponent contatos={contatos} />
    </div>
  );
}

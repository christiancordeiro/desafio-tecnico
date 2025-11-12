import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pegarIndicacoesRecebidas } from "../actions/pegar-indicacoes-recebidas";

export default async function IndicacoesRecebidas({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const indicacoes = await pegarIndicacoesRecebidas(currentUserId);

  return (
    <Table>
      <TableCaption>Lista de indicações recebidas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Quem indicou</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {indicacoes.map((ind) => (
          <TableRow key={ind.id}>
            <TableCell className="font-medium">{ind.indicadorNome}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              {ind.descricao}
            </TableCell>
            <TableCell>
              {new Date(ind.data).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>
              <Badge className="px-3 py-1 text-sm">{ind.status}</Badge>
            </TableCell>
            <TableCell className="space-x-2 text-right">
              <Button size="sm" variant="default">
                Aceitar
              </Button>
              <Button size="sm" variant="outline">
                Recusar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

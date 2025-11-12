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
import { pegarIndicacoes } from "../actions/pegar-indicacoes";

export default async function MinhasIndicacoes({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const indicacoes = await pegarIndicacoes(currentUserId);

  return (
    <Table>
      <TableCaption>Lista de suas indicações.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Indicação</TableHead>
          <TableHead>Descricao</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {indicacoes.map((ind) => (
          <TableRow key={ind.id}>
            <TableCell className="font-medium">{ind.indicadoNome}</TableCell>
            <TableCell className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
              {ind.descricao}
            </TableCell>
            <TableCell>
              {new Date(ind.data).toLocaleDateString("pt-BR")}
            </TableCell>
            <TableCell>
              <Badge className="px-3 py-1 text-sm">{ind.status}</Badge>
            </TableCell>
            <TableCell>R$ {ind.valor}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

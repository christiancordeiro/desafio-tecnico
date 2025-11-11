"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Contato {
  id: string;
  email: string;
  nome: string;
  empresa: string;
  mensagem: string;
  status: "PENDENTE" | "APROVADO";
  createdAt: Date | null;
}

export default function TableComponent({ contatos }: { contatos: Contato[] }) {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Área do Administrador</CardTitle>
        <CardDescription>
          Aprove solicitações (intenções) de contato dos usuários.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Lista das suas recentes solicitações</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Mensagem</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contatos.map((contato) => (
              <TableRow key={contato.id}>
                <TableCell>{contato.empresa}</TableCell>
                <TableCell>{contato.nome}</TableCell>
                <TableCell
                  className="max-w-[50px] overflow-hidden text-ellipsis whitespace-nowrap"
                  title={contato.mensagem}
                >
                  {contato.mensagem}
                </TableCell>
                <TableCell>
                  {contato.status === "PENDENTE" ? (
                    <Badge variant="secondary" className="px-3 py-1 text-sm">
                      Pendente
                    </Badge>
                  ) : (
                    <Badge>Aprovado</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={async () => {
                      const res = await fetch(
                        `/api/contato/${contato.id}/approve`,
                        {
                          method: "POST",
                        },
                      );
                      const data = await res.json();
                      if (data.success) {
                        toast.success(`Contato aprovado! Token: ${data.token}`);
                      }
                    }}
                  >
                    Aprovar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

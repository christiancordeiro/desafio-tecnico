import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { avisosTable } from "@/db/schema";

export default async function Avisos() {
  const avisos = await db.select().from(avisosTable);

  if (!avisos || avisos.length === 0) {
    return <div>Nenhum aviso disponível no momento.</div>;
  }

  return (
    <div>
      <Card className="w-2xl">
        <CardHeader>
          <CardTitle>Area de avisos</CardTitle>
          <CardDescription>
            Espaço destinado à publicação de comunicados, lembretes e
            informações importantes para os usuários.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {avisos.map((aviso) => (
            <Item
              key={aviso.id}
              variant="outline"
              size="sm"
              className="max-w-lg"
            >
              <ItemContent>
                <ItemTitle>{aviso.titulo}</ItemTitle>
                <ItemDescription>{aviso.descricao}</ItemDescription>
              </ItemContent>
              <ItemActions className="text-xs text-neutral-400">
                {new Date(aviso.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </ItemActions>
            </Item>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

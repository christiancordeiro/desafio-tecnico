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
import { Button } from "@/components/ui/button";
import DashboardReunioes from "./dashboard-reunioes";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Reunioes() {
  const reunioes = [
    {
      id: 1,
      participantes: "Ana Costa x João Silva",
      tema: "Estratégias de marketing digital para novos clientes.",
      status: "Agendada",
      data: "14/11 - 10h",
    },
    {
      id: 2,
      participantes: "Carla Mendes x Rafael Souza",
      tema: "Avaliação de parceria em eventos corporativos.",
      status: "Concluída",
      data: "11/11 - 16h",
    },
    {
      id: 3,
      participantes: "Lucas Pereira x Fernanda Alves",
      tema: "Discussão sobre oportunidades de exportação.",
      status: "Cancelada",
      data: "09/11 - 09h",
    },
    {
      id: 4,
      participantes: "Bruno Martins x Juliana Rocha",
      tema: "Networking para geração de leads B2B.",
      status: "Concluída",
      data: "08/11 - 15h",
    },
  ];

  return (
    <div>
      <Card className="w-2xl">
        <CardHeader>
          <CardTitle>Desempenho de Reuniões</CardTitle>
          <CardDescription>
            Dashboards de desempenho individual e do grupo, com relatórios por
            período.
          </CardDescription>
        </CardHeader>
        <DashboardReunioes />
        <ScrollArea className="h-[13.7rem]">
          <CardContent className="flex flex-col gap-2">
            {reunioes.map((reuniao) => (
              <Item
                key={reuniao.id}
                variant="muted"
                size="sm"
                className="max-w-lg"
              >
                <ItemContent>
                  <ItemTitle>Reunião: {reuniao.participantes}</ItemTitle>
                  <ItemDescription>
                    Tema: {reuniao.tema}
                    <br />
                    Status: {reuniao.status}
                  </ItemDescription>
                </ItemContent>
                <ItemActions className="flex flex-col items-center text-xs text-neutral-400">
                  {reuniao.data}
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={reuniao.status !== "Agendada"}
                  >
                    Entrar
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}

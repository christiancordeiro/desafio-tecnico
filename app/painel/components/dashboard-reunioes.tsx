import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardReunioes() {
  const metrics = {
    semana: { realizadas: 5, agendadas: 2, canceladas: 1 },
    mes: { realizadas: 18, agendadas: 4, canceladas: 3 },
    acumulado: { realizadas: 120, agendadas: 10, canceladas: 15 },
    participacao: 87,
  };

  return (
    <>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm font-medium">Taxa de participação</p>
          <Progress value={metrics.participacao} className="w-1/2" />
          <span className="text-xs text-neutral-500">
            {metrics.participacao}% dos membros participaram
          </span>
        </div>

        <Separator className="my-4" />

        <Tabs defaultValue="semana" className="w-full">
          <TabsList>
            <TabsTrigger value="semana">Semanal</TabsTrigger>
            <TabsTrigger value="mes">Mensal</TabsTrigger>
            <TabsTrigger value="acumulado">Acumulado</TabsTrigger>
          </TabsList>

          <TabsContent value="semana">
            <p className="text-sm">
              Reuniões realizadas: {metrics.semana.realizadas}
            </p>
            <p className="text-sm">Agendadas: {metrics.semana.agendadas}</p>
            <p className="text-sm">Canceladas: {metrics.semana.canceladas}</p>
          </TabsContent>

          <TabsContent value="mes">
            <p className="text-sm">
              Reuniões realizadas: {metrics.mes.realizadas}
            </p>
            <p className="text-sm">Agendadas: {metrics.mes.agendadas}</p>
            <p className="text-sm">Canceladas: {metrics.mes.canceladas}</p>
          </TabsContent>

          <TabsContent value="acumulado">
            <p className="text-sm">
              Reuniões realizadas: {metrics.acumulado.realizadas}
            </p>
            <p className="text-sm">Agendadas: {metrics.acumulado.agendadas}</p>
            <p className="text-sm">
              Canceladas: {metrics.acumulado.canceladas}
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
}

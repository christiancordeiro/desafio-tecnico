import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { NovaIndicacao } from "./nova-indicacao";
import MinhasIndicacoes from "./minhas-indicacoes";
import IndicacoesRecebidas from "./indicacoes-recebidas";

export default function NetworkDashboard({
  currentUserId,
  currentUserName,
}: {
  currentUserId: string;
  currentUserName?: string;
}) {
  return (
    <Card className="w-2xl">
      <CardHeader>
        <CardTitle>Área de indicações</CardTitle>
        <CardDescription>
          Registre e acompanhe indicações de negócios entre membros, com status
          e agradecimentos
        </CardDescription>
        <CardAction>
          <NovaIndicacao
            currentUserId={currentUserId}
            currentUserName={currentUserName}
          />
        </CardAction>
      </CardHeader>
      <CardContent className="min-h-[413px]">
        <Tabs defaultValue="minhasIndicacoes">
          <TabsList>
            <TabsTrigger value="minhasIndicacoes">
              Minhas indicações
            </TabsTrigger>
            <TabsTrigger value="indicacoesRecebidas">
              Indicações recebidas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="minhasIndicacoes" className="w-full">
            <MinhasIndicacoes currentUserId={currentUserId} />
          </TabsContent>
          <TabsContent value="indicacoesRecebidas" className="w-full">
            <IndicacoesRecebidas currentUserId={currentUserId} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

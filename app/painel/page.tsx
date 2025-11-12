import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Reunioes from "./components/reunioes";
import Avisos from "./components/avisos";
import { MegaphoneIcon, Presentation } from "lucide-react";

export default async function Authentication() {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 p-5">
        <Tabs defaultValue="reuniao">
          <TabsList>
            <TabsTrigger value="reuniao">
              <Presentation />
              Reuniões
            </TabsTrigger>
            <TabsTrigger value="avisos">
              <MegaphoneIcon />
              Avisos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="reuniao" className="w-full">
            <Reunioes />
          </TabsContent>
          <TabsContent value="avisos" className="w-full">
            <Avisos />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Reunioes from "./components/reunioes";
import Avisos from "./components/avisos";
import { MegaphoneIcon, Network, Presentation } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { LogoutButton } from "@/components/commom/LogoutButton";
import NetworkDashboard from "./components/network";

export default async function Painel() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

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
            <TabsTrigger value="network">
              <Network />
              Network
            </TabsTrigger>
            <div className="flex w-full justify-center sm:justify-end">
              <LogoutButton />
            </div>
          </TabsList>

          <TabsContent value="reuniao" className="w-full">
            <Reunioes />
          </TabsContent>
          <TabsContent value="avisos" className="w-full">
            <Avisos />
          </TabsContent>
          <TabsContent value="network" className="w-full">
            <NetworkDashboard currentUserId={session.user.id} currentUserName={session.user.name} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./components/sign-in-form";

export default async function Authentication() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-5">
        <div className="flex w-full max-w-md flex-col gap-6">
          <Tabs defaultValue="sign-in">
            <TabsList>
              <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in" className="w-full">
              <SignInForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

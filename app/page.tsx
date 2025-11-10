import { Tabs, TabsContent } from "@/components/ui/tabs";
import ContactIntroForm from "./components/contact-intro-form";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Tabs defaultValue="contact-intro">
          <TabsContent value="contact-intro" className="w-full">
            <ContactIntroForm />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

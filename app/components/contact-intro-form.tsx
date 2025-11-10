"use client";

import { Button } from "@/components/ui/button";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email("Email inválido"),
  nome: z.string().min(3, "Nome inválido"),
  empresa: z.string().min(2, "Empresa inválida"),
  mensagem: z.string().min(8, "Mensagem inválida"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactIntroForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      nome: "",
      empresa: "",
      mensagem: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const response = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      toast.success("Enviado com sucesso", {
        description:
          "Sua solicitação já foi registrada. Aguarde o nosso contato.",
      });
      form.reset();
    } else {
      toast.error("Erro ao enviar mensagem.");
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Vamos nos conhecer melhor</CardTitle>
          <CardDescription>
            Estamos felizes por você estar aqui! Deixe suas informações e vamos
            conversar.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid w-full gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="empresa"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome da sua empresa"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mensagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Por que você quer participar?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Explique brevemente sua motivação"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Enviar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}

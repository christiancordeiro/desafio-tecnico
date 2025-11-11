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
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth.client";

const formSchema = z
  .object({
    nome: z.string("Nome é obrigatório").trim().min(1, "Nome é obrigatório"),
    email: z.email("Email inválido"),
    senha: z.string().min(8, "Senha inválida"),
    confirmacaoSenha: z.string().min(8, "Senha inválida"),
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    error: "As senhas não coincidem",
    path: ["confirmacaoSenha"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function CadastroCompletoForm({}: { contatoId: string }) {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmacaoSenha: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await authClient.signUp.email({
      name: values.nome,
      email: values.email,
      password: values.senha,
      fetchOptions: {
        onSuccess: () => {
          toast.success("Cadastro realizado com sucesso!", {
            description: "Agora você já está registrado no sistema.",
          });
          router.push("/authentication");
        },
        onError: (error) => {
          if (error.error.code === "USER_ALREADY_EXISTS") {
            toast.error("Email já cadastrado");
            return form.setError("email", {
              message: "Email já cadastrado",
            });
          }
          toast.error(error.error.message);
        },
      },
    });
  }

  // async function onSubmit(values: FormValues) {
  //   const response = await fetch("/api/cadastro-completo", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ ...values, contatoId }),
  //   });

  //   if (response.ok) {
  //     toast.success("Cadastro realizado com sucesso!", {
  //       description: "Agora você já está registrado no sistema.",
  //     });
  //     form.reset();
  //     router.push("/authentication");
  //   } else {
  //     toast.error("Erro ao completar cadastro.");
  //   }
  // }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cadastro Completo</CardTitle>
        <CardDescription>
          Preencha seus dados para finalizar sua inscrição.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid w-full gap-6">
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
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmacaoSenha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirme sua senha"
                      type="password"
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
              Finalizar Cadastro
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

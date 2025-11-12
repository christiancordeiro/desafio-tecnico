"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { criarIndicacao } from "../actions/criar-indicacao";
import { useEffect, useState } from "react";
import { pegarUsers } from "../actions/pegar-usuario";
import { toast } from "sonner";

const formSchema = z.object({
  indicado: z.string().min(3, "Nome inválido"),
  descricao: z.string().min(8, "Descrição inválida"),
  valor: z.coerce.number().min(1, "Valor inválido"),
});

type FormValues = z.infer<typeof formSchema>;

export function NovaIndicacao({
  currentUserId,
  currentUserName,
}: {
  currentUserId?: string;
  currentUserName?: string;
}) {
  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await pegarUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      indicado: "",
      descricao: "",
      valor: 0,
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      await criarIndicacao({
        descricao: values.descricao,
        indicadoId: values.indicado,
        indicadorId: currentUserId!,
        valor: values.valor,
      });
      toast.success("Indicação criada com sucesso!");
    } catch (error) {
      console.log("Não foi possível criar uma indicação: ", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Nova indicação</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Indicação</DialogTitle>
          <DialogDescription>
            Preencha os dados para indicar um membro.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="indicador"
              render={() => (
                <FormItem>
                  <FormLabel>Quem indica</FormLabel>
                  <span className="text-sm">{currentUserName}</span>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="indicado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do indicado</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um membro" />
                      </SelectTrigger>
                      <SelectContent>
                        {users
                          .filter((user) => user.id !== currentUserId) // 🔑 exclui o logado
                          .map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da oportunidade</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="Detalhe a indicação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="valor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="w-full rounded-md border px-3 py-2"
                      type="number"
                      placeholder="Detalhe a indicação"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 w-full">
              Enviar Indicação
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

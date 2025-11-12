import { db } from "./index";
import { avisosTable } from "./schema";

const avisos = [
  {
    titulo: "Reunião de Networking",
    descricao:
      "Lembrete: nossa próxima reunião será realizada na sexta-feira, às 19h. Confirme sua presença pelo sistema.",
    date: new Date("2025-10-12"),
  },
  {
    titulo: "Prazo de Projeto",
    descricao:
      "O prazo para entrega da primeira versão da arquitetura é de 3 a 5 dias. Não deixe para última hora!",
    date: new Date("2025-10-12"),
  },
  {
    titulo: "Mensalidades",
    descricao:
      "O módulo financeiro já está disponível. Verifique o status da sua mensalidade e mantenha-se em dia.",
    date: new Date("2025-10-12"),
  },
  {
    titulo: "Cadastro de Membros",
    descricao:
      "Os novos membros aprovados devem completar o cadastro até o dia 15/11 para garantir acesso às funcionalidades da plataforma.",
    date: new Date("2025-10-12"),
  },
];

async function main() {
  console.log("🌱 Iniciando o seeding de avisos...");

  try {
    console.log("🧹 Limpando avisos existentes...");
    await db.delete(avisosTable);
    console.log("✅ Avisos limpos com sucesso!");

    for (const aviso of avisos) {
      const avisoId = crypto.randomUUID();

      console.log(`📢 Criando aviso: ${aviso.titulo}`);

      await db.insert(avisosTable).values({
        id: avisoId,
        titulo: aviso.titulo,
        descricao: aviso.descricao,
        date: aviso.date,
      });
    }

    console.log("✅ Seeding de avisos concluído com sucesso!");
    console.log(`📊 Foram criados ${avisos.length} avisos.`);
  } catch (error) {
    console.error("❌ Erro durante o seeding:", error);
    throw error;
  }
}

main().catch((err) => {
  console.error("Erro ao rodar seed:", err);
  process.exit(1);
});

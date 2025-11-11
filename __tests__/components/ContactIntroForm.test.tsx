import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactIntroForm from "@/app/components/contact-intro-form";
import "@testing-library/jest-dom";
import { toast } from "sonner";

global.fetch = jest.fn();
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("ContactIntroForm", () => {
  const mockValidData = {
    email: "valid@email.com",
    nome: "Teste Contato",
    empresa: "Mock Inc",
    mensagem: "Mensagem de teste válida.",
  };

  // --- Caso 1: Validação de Erro ---
  test("deve exibir erros de validação Zod", async () => {
    render(<ContactIntroForm />);
    const user = userEvent.setup();

    // Submeter o formulário vazio
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    // Verificar as mensagens de erro (RTL: espera que o texto esteja no documento)
    await waitFor(() => {
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/nome inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/empresa inválida/i)).toBeInTheDocument();
      expect(screen.getByText(/mensagem inválida/i)).toBeInTheDocument();
    });
  });

  // --- Caso 2: Validação de Success :) ---
  test("deve chamar a API e mostrar sucesso ao submeter dados válidos", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<ContactIntroForm />);
    const user = userEvent.setup();

    // Preencher os campos
    await user.type(screen.getByLabelText(/email/i), mockValidData.email);
    await user.type(screen.getByLabelText(/nome/i), mockValidData.nome);
    await user.type(screen.getByLabelText(/empresa/i), mockValidData.empresa);
    await user.type(
      screen.getByLabelText(/por que você quer participar/i),
      mockValidData.mensagem,
    );

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      // Verifica se o fetch foi chamado corretamente
      expect(fetch).toHaveBeenCalledWith("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockValidData),
      });

      expect(toast.success).toHaveBeenCalledWith(
        "Enviado com sucesso",
        expect.anything(),
      );

      // Verifica se o formulário foi resetado (campo de nome fica vazio)
      expect(screen.getByLabelText(/nome/i)).toHaveValue("");
    });
  });
});

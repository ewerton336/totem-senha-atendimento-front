"use client";
import { Button, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import senhaApi from "@/services/api/senhas/senha-api";

export default function Senhas() {
  const mutation = useMutation({
    mutationFn: senhaApi.post,
    onSuccess: (data) => {
      notification.success({
        message: "Senha gerada com sucesso",
        description: `Senha: ${data.senha}`,
      });
    },
    onError: (error) => {
      console.error("Erro ao solicitar senha", error);
      notification.error({
        message: "Erro ao solicitar senha",
        description: error.message,
      });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <Button
        onClick={() => mutation.mutate({ prioritario: false })}
        loading={mutation.isPending}
        type="primary"
        size="large"
      >
        Senha Normal
      </Button>

      <Button
        onClick={() => mutation.mutate({ prioritario: true })}
        loading={mutation.isPending}
        type="primary"
        size="large"
        danger
      >
        Senha Preferencial
      </Button>
    </div>
  );
}

"use client";
import { Button, notification } from "antd";
import { useMutation } from "@tanstack/react-query";
import senhaApi from "@/services/api/senhas/senha-api";
import styles from "./senhas.module.css";

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
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Atendimento do Guichê</h1>

      <Button
        onClick={() => mutation.mutate({ prioritario: false })}
        loading={mutation.isPending}
        type="primary"
        size="large"
        className={styles.button}
      >
        Senha Normal
      </Button>

      <Button
        onClick={() => mutation.mutate({ prioritario: true })}
        loading={mutation.isPending}
        type="primary"
        size="large"
        className={`${styles.button} ${styles.preferencial}`} // Estilo extra para o botão vermelho
      >
        Senha Preferencial
      </Button>
    </div>
  );
}

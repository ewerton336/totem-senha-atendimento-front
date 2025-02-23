import { createGenericCrudAPI } from "../generic-crud-api";

export interface SenhaRequest {
  prioritario: boolean;
}

export interface SenhaResponse {
  id: number;
  senha: string;
  prioritario: boolean;
}

const senhaApi = createGenericCrudAPI<SenhaRequest, SenhaResponse>("senhas");

export default senhaApi;

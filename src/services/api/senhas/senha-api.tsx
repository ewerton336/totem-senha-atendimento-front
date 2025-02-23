import { createGenericCrudAPI } from "../generic-crud-api";

export interface SenhaRequest {
  prioritario: boolean;
}

export interface Senha {
  id: number;
  codigo: string;
  prioritario: boolean;
}

const senhaApi = createGenericCrudAPI<SenhaRequest, Senha>("senhas");

export default senhaApi;

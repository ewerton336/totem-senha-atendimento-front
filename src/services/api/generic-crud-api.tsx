export type CrudAPI<TRequest, TResponse> = {
  getAll: () => Promise<TResponse[]>;
  getById: (id: number) => Promise<TResponse>;
  post: (data: TRequest) => Promise<TResponse>;
  put: (id: number, data: TRequest) => Promise<TResponse>;
  delete: (id: number) => Promise<void>;
  getBySpecificField: (value: any) => Promise<TResponse>;
};

export const createGenericCrudAPI = <TRequest, TResponse>(
  url: string
): CrudAPI<TRequest, TResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const getAll = async (): Promise<TResponse[]> => {
    const response = await fetch(`${baseUrl + url}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  };

  const getById = async (id: number): Promise<TResponse> => {
    const response = await fetch(`${baseUrl + url}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  };

  const getBySpecificField = async (value: any): Promise<TResponse> => {
    const response = await fetch(`${baseUrl + url}/${value}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  };

  const post = async (data: TRequest): Promise<TResponse> => {
    const response = await fetch(`${baseUrl + url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to post data");
    return await response.json();
  };

  const put = async (id: number, data: TRequest): Promise<TResponse> => {
    const response = await fetch(`${baseUrl + url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update data");
    return await response.json();
  };

  const deleteItem = async (id: number): Promise<void> => {
    const response = await fetch(`${baseUrl + url}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete data");
  };

  return { getAll, getById, post, put, delete: deleteItem, getBySpecificField };
};

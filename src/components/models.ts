export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface FontesRenda {
  id: number;
  nome: string;
}

export interface Receita {
  id?: number;
  valor: number;
  data: string;
  origem: number;
  destino: number;
}

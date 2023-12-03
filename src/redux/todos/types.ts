// ----- TODO OPERATIONS ----- //

export type TTodoPayload = {
    id?: number;
    title: string;
    description: string;
    deadline: Date;
    completed: boolean;
    isPassed?: boolean
  };
  
export type TParametrsGetAll = {
    page: number;
    currentPage?: string;
  }
  
export interface ICreateTodoPayload {
    newTodo: TTodoPayload;
    current: string
  }
  
export interface IRemovePayload {
    id: number;
    current: string
  }
  
export interface IUpdatePayload {
    newTodo: TTodoPayload;
    current: string
  }

// ----- TODO SLICE ----- //

export type TTodo = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  passed: boolean;
  createdAt: string;
  updateAt: string;
};

export interface ITodosState {
  isLoading: boolean;
  data: {
    statusCode: number | null,
    message: string;
    data: {
      todos: TTodo[],
      countTodos: number;
      page: number,
    }
  };
  error: {
    statusCode: number | null;
    message: string;
  };
}

export interface IPayloadActionSuccess {
    statusCode: number,
    message: string;
    data: {
      todos: TTodo[],
      countTodos: number;
      page: number;
    }
}
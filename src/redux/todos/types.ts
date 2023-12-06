// ----- TODO OPERATIONS ----- //

export type TTodoPayload = {
  id?: number;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  isPassed?: boolean;
};

export type TParametrsGetAll = {
  offset: number;
  limit: number;
  page: number;
};

export interface ICreateTodoPayload {
  newTodo: TTodoPayload;
  offset: number;
  limit: number;
  page: number;
}

export interface IRemovePayload {
  id: number;
  offset: number;
  limit: number;
  page: number;
}

export interface IUpdatePayload {
  newTodo: TTodoPayload;
  offset: number;
  limit: number;
  page: number;
}

// ----- TODO SLICE ----- //

export type TTodo = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  createdAt: string;
  updateAt: string;
};

export interface ITodosState {
  isLoading: boolean;
  data: {
    statusCode: number | null;
    message: string;
    data: {
      todos: {
        all: TTodo[];
        completed: TTodo[];
        passed: TTodo[];
      };
      pagination: {
        page: number;
        maxPage: {
          all: number;
          completed: number;
          passed: number;
        };
      };
    };
  };
  error: {
    statusCode: number | null;
    message: string;
  };
}

export interface IPayloadActionSuccess {
  statusCode: number;
  message: string;
  data: {
    todos: {
      all: TTodo[];
      completed: TTodo[];
      passed: TTodo[];
    };
    pagination: {
      page: number;
      maxPage: {
        all: number;
        completed: number;
        passed: number;
      };
    };
  };
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllTodos, createTodo, removeTodo, updateTodo, getAllCompletedTodos, getAllPassededTodos } from './todosOperations';

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

interface ITodosState {
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
    status: number | null;
    message: string;
  };
}

interface IPayloadAction {
    statusCode: number,
    message: string;
    data: {
      todos: TTodo[],
      countTodos: number;
      page: number;
    }
}

export const initialState: ITodosState = {
  isLoading: false,
  data: {
    statusCode: null,
    message: "",
    data: {
      todos: [],
      countTodos: 0,
      page: 1,
    }
  },
  error: {
    status: null,
    message: '',
  },
};

const TodosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.status = null;
    });
    builder.addCase(
      getAllTodos.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadAction>) => {
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
        state.data.data.page = payload.data.page;
        state.data.data.countTodos = payload.data.countTodos;
      },
    );
    builder.addCase(
      getAllTodos.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.message;
        state.error.status = payload.status;
      },
    );

    builder.addCase(createTodo.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.status = null;
    });
    builder.addCase(
      createTodo.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadAction>) => {
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
      },
    );
    builder.addCase(
      createTodo.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.message;
        state.error.status = payload.status;
      },
    );

    builder.addCase(removeTodo.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.status = null;
    });
    builder.addCase(
      removeTodo.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadAction>) => {
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
      },
    );
    builder.addCase(
      removeTodo.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.message;
        state.error.status = payload.status;
      },
    );

    builder.addCase(updateTodo.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.status = null;
    });
    builder.addCase(
      updateTodo.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadAction>) => {
        console.log("builder: ", payload);
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
      },
    );
    builder.addCase(
      updateTodo.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.message;
        state.error.status = payload.status;
      },
    );

    builder.addCase(getAllCompletedTodos.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.status = null;
    });
    builder.addCase(
      getAllCompletedTodos.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadAction>) => {
        console.log("builder: ", payload);
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
        state.data.data.page = payload.data.page;
        state.data.data.countTodos = payload.data.countTodos;
      },
    );
    builder.addCase(
      getAllCompletedTodos.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.message;
        state.error.status = payload.status;
      },
    );

    builder.addCase(getAllPassededTodos.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.status = null;
    });
    builder.addCase(
      getAllPassededTodos.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadAction>) => {
        console.log("builder: ", payload);
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
        state.data.data.page = payload.data.page;
        state.data.data.countTodos = payload.data.countTodos;
      },
    );
    builder.addCase(
      getAllPassededTodos.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.message;
        state.error.status = payload.status;
      },
    );

    // builder.addCase(sortStudents.pending, (state: IStudentsState, _) => {
    //   state.isLoading = true;
    //   state.error.message = "";
    //   state.error.status = null;
    //  });
    // builder.addCase(sortStudents.fulfilled, (state, { payload }: PayloadAction<IPayloadAction>) => {
    //   state.isLoading = false;
    //   state.students = payload.data;
    //   state.pagination = payload.pagination
    // })
    // builder.addCase(sortStudents.rejected, (state, { payload }: any) => {
    //   state.isLoading = false;
    //   state.error.message = payload.message;
    //   state.error.status = payload.status;
    // })

    // builder.addCase(findStudentByFilterField.pending, (state: IStudentsState, _) => {
    //   state.isLoading = true;
    //   state.error.message = "";
    //   state.error.status = null;
    //  });
    // builder.addCase(findStudentByFilterField.fulfilled, (state, { payload }) => {
    //   state.isLoading = false;
    //   state.students = payload.data;
    //   state.pagination = payload.pagination
    // })
    // builder.addCase(findStudentByFilterField.rejected, (state, { payload }: any) => {
    //   state.isLoading = false;
    //   state.error.message = payload.message;
    //   state.error.status = payload.status;
    // })

    // builder.addCase(pagination.pending, (state: IStudentsState, _) => {
    //   state.isLoading = true;
    //   state.error.message = "";
    //   state.error.status = null;
    //  });
    // builder.addCase(pagination.fulfilled, (state, { payload }: PayloadAction<IPayloadAction>) => {
    //   state.isLoading = false;
    //   state.students = payload.data;
    //   state.pagination = payload.pagination
    // })
    // builder.addCase(pagination.rejected, (state, { payload }: any) => {
    //   state.isLoading = false;
    //   state.error.message = payload.message;
    //   state.error.status = payload.status;
    // })
  },
});

export default TodosSlice.reducer;

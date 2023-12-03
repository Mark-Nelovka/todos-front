import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllTodos, createTodo, removeTodo, updateTodo } from './todosOperations';
import { IPayloadActionSuccess, ITodosState } from './types';

export const initialState: ITodosState = {
  isLoading: true,
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
    statusCode: null,
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
      state.error.statusCode = null;
    });
    builder.addCase(
      getAllTodos.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadActionSuccess>) => {
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
        state.data.data.page = payload.data.page;
        state.data.data.countTodos = payload.data.countTodos;
      },
    );
    builder.addCase(
      getAllTodos.rejected,
      (state: ITodosState, { payload }: any) => {
        console.log(payload.response.data);
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      },
    );

    builder.addCase(createTodo.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.statusCode = null;
    });
    builder.addCase(
      createTodo.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadActionSuccess>) => {
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
      },
    );
    builder.addCase(
      createTodo.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      },
    );

    builder.addCase(removeTodo.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.statusCode = null;
    });
    builder.addCase(
      removeTodo.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadActionSuccess>) => {
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
      },
    );
    builder.addCase(
      removeTodo.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      },
    );

    builder.addCase(updateTodo.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.statusCode = null;
    });
    builder.addCase(
      updateTodo.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadActionSuccess>) => {
        console.log("builder: ", payload);
        state.isLoading = false;
        state.data.data.todos = payload.data.todos;
      },
    );
    builder.addCase(
      updateTodo.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      },
    );
  },
});

export default TodosSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllTodos,
  createTodo,
  removeTodo,
  updateTodo,
  getCompletedTodos,
  getPassedTodos,
  updatePage,
} from "./todosOperations";
import { IPayloadActionSuccess, ITodosState } from "./types";

export const initialState: ITodosState = {
  isLoading: true,
  data: {
    statusCode: null,
    message: "",
    data: {
      todos: {
        all: [],
        completed: [],
        passed: [],
      },
      pagination: {
        page: 1,
        maxPage: {
          all: 1,
          completed: 1,
          passed: 1,
        },
      },
    },
  },
  error: {
    statusCode: null,
    message: "",
  },
};

const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTodos.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = "";
      state.error.statusCode = null;
    });
    builder.addCase(
      getAllTodos.fulfilled,
      (
        state: ITodosState,
        { payload }: PayloadAction<IPayloadActionSuccess>
      ) => {
        state.isLoading = false;
        state.data.data.todos.all =
          state.data.data.todos.all.length > 0
            ? [...state.data.data.todos.all, ...payload.data.todos.all]
            : [...payload.data.todos.all];
        state.data.data.pagination.page = payload.data.pagination.page;
        state.data.data.pagination.maxPage.all =
          payload.data.pagination.maxPage.all;
      }
    );
    builder.addCase(
      getAllTodos.rejected,
      (state: ITodosState, { payload }: any) => {
        console.log(payload.response.data);
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      }
    );

    builder.addCase(getCompletedTodos.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = "";
      state.error.statusCode = null;
    });
    builder.addCase(
      getCompletedTodos.fulfilled,
      (
        state: ITodosState,
        { payload }: PayloadAction<IPayloadActionSuccess>
      ) => {
        console.log(payload);
        state.isLoading = false;
        state.data.data.todos.completed =
          state.data.data.todos.completed.length > 0
            ? [
                ...state.data.data.todos.completed,
                ...payload.data.todos.completed,
              ]
            : [...payload.data.todos.completed];
        state.data.data.pagination.page = payload.data.pagination.page;
        state.data.data.pagination.maxPage.completed =
          payload.data.pagination.maxPage.completed;
      }
    );
    builder.addCase(
      getCompletedTodos.rejected,
      (state: ITodosState, { payload }: any) => {
        console.log(payload.response.data);
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      }
    );

    builder.addCase(getPassedTodos.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = "";
      state.error.statusCode = null;
    });
    builder.addCase(
      getPassedTodos.fulfilled,
      (
        state: ITodosState,
        { payload }: PayloadAction<IPayloadActionSuccess>
      ) => {
        state.isLoading = false;
        state.data.data.todos.passed =
          state.data.data.todos.passed.length > 0
            ? [...state.data.data.todos.passed, ...payload.data.todos.passed]
            : [...payload.data.todos.passed];
        state.data.data.pagination.page = payload.data.pagination.page;
        state.data.data.pagination.maxPage.passed =
          payload.data.pagination.maxPage.passed;
      }
    );
    builder.addCase(
      getPassedTodos.rejected,
      (state: ITodosState, { payload }: any) => {
        console.log(payload.response.data);
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      }
    );

    builder.addCase(createTodo.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = "";
      state.error.statusCode = null;
    });
    builder.addCase(
      createTodo.fulfilled,
      (
        state: ITodosState,
        { payload }: PayloadAction<IPayloadActionSuccess>
      ) => {
        state.isLoading = false;
        state.data.data.todos.all = [...payload.data.todos.all];
        state.data.data.todos.completed = [...payload.data.todos.completed];
        state.data.data.todos.passed = [...payload.data.todos.passed];
        state.data.data.pagination.page = payload.data.pagination.page;
        state.data.data.pagination.maxPage.passed =
          payload.data.pagination.maxPage.passed;
        state.data.data.pagination.maxPage.completed =
          payload.data.pagination.maxPage.completed;
        state.data.data.pagination.maxPage.all =
          payload.data.pagination.maxPage.all;
      }
    );
    builder.addCase(
      createTodo.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      }
    );

    builder.addCase(removeTodo.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = "";
      state.error.statusCode = null;
    });
    builder.addCase(
      removeTodo.fulfilled,
      (
        state: ITodosState,
        { payload }: PayloadAction<IPayloadActionSuccess>
      ) => {
        state.isLoading = false;
        state.data.data.todos.all = payload.data.todos.all;
        state.data.data.todos.completed = payload.data.todos.completed;
        state.data.data.todos.passed = payload.data.todos.passed;
        state.data.data.pagination.page = payload.data.pagination.page;
        state.data.data.pagination.maxPage.passed =
          payload.data.pagination.maxPage.passed;
        state.data.data.pagination.maxPage.completed =
          payload.data.pagination.maxPage.completed;
        state.data.data.pagination.maxPage.all =
          payload.data.pagination.maxPage.all;
      }
    );
    builder.addCase(
      removeTodo.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      }
    );

    builder.addCase(updateTodo.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = "";
      state.error.statusCode = null;
    });
    builder.addCase(
      updateTodo.fulfilled,
      (
        state: ITodosState,
        { payload }: PayloadAction<IPayloadActionSuccess>
      ) => {
        state.isLoading = false;
        state.data.data.todos.all = payload.data.todos.all;
        state.data.data.todos.completed = payload.data.todos.completed;
        state.data.data.todos.passed = payload.data.todos.passed;
        state.data.data.pagination.page = payload.data.pagination.page;
        state.data.data.pagination.maxPage.passed =
          payload.data.pagination.maxPage.passed;
        state.data.data.pagination.maxPage.completed =
          payload.data.pagination.maxPage.completed;
        state.data.data.pagination.maxPage.all =
          payload.data.pagination.maxPage.all;
      }
    );
    builder.addCase(
      updateTodo.rejected,
      (state: ITodosState, { payload }: any) => {
        state.isLoading = false;
        state.error.message = payload.response.data.message;
        state.error.statusCode = payload.response.data.status;
      }
    );
    builder.addCase(updatePage, (state, { payload }: PayloadAction<number>) => {
      state.data.data.pagination.page = payload;
    });
  },
});

export default TodosSlice.reducer;

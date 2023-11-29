import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStudents } from './todosOperations';

type TTodo = {
  id: number;
  title: string;
  description: string;
  date: string;
  createdAt: string;
  updateAt: string;
};

interface ITodosState {
  isLoading: boolean;
  todos: TTodo[];
  error: {
    status: number | null;
    message: string;
  };
}

interface IPayloadAction {
  data: TTodo[];
  error: {
    status: null;
    message: '';
  };
}

export const initialState: ITodosState = {
  isLoading: false,
  todos: [],
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
    builder.addCase(getStudents.pending, (state: ITodosState, _) => {
      state.isLoading = true;
      state.error.message = '';
      state.error.status = null;
    });
    builder.addCase(
      getStudents.fulfilled,
      (state: ITodosState, { payload }: PayloadAction<IPayloadAction>) => {
        state.isLoading = false;
        state.todos = payload.data;
      },
    );
    builder.addCase(
      getStudents.rejected,
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

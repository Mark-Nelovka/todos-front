import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateTodoPayload, IRemovePayload, IUpdatePayload, TParametrsGetAll } from './types';

axios.defaults.baseURL = 'http://localhost:8080/api/todos/';

const getAllTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({page, currentPage}: TParametrsGetAll, thunkApi) => {
    try {
      const { data } = await axios.get(
        `${currentPage}?page=${page}`,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const createTodo = createAsyncThunk(
  'todos/createTodo',
  async ({
    newTodo,
    current,
  }: ICreateTodoPayload, thunkApi) => {
    try {
      const { data } = await axios.post(
        `${current}`,
        newTodo,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async ({
    id,
    current,
  }: IRemovePayload, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `${current}/${id}`,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({
    newTodo,
    current
  }: IUpdatePayload, thunkApi) => {
    try {
      const { data } = await axios.patch(
        `${current}/${newTodo.id}`,
        newTodo,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export { getAllTodos, createTodo, removeTodo, updateTodo };

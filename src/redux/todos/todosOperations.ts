import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateTodoPayload, IRemovePayload, IUpdatePayload, TParametrsGetAll } from './types';

// const { REACT_APP_URL_API } = process.env;

// axios.defaults.baseURL = `${REACT_APP_URL_API}`;

const getAllTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({page, currentPage}: TParametrsGetAll, thunkApi) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/todos/${currentPage}?page=${page}`,
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
        `http://localhost:8080/todos${current}`,
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
        `http://localhost:8080/todos${current}/${id}`,
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
        `http://localhost:8080/todos${current}/${newTodo.id}`,
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

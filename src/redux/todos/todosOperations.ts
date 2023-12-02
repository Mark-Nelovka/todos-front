import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// const { REACT_APP_URL_API } = process.env;

// axios.defaults.baseURL = `${REACT_APP_URL_API}`;

export type TTodoPayload = {
  id?: number;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  isPassed?: boolean
};

type TParametrs = {
  page: number;
}

const getAllTodos = createAsyncThunk(
  'todos/fetchTodos',
  async ({page}:TParametrs, thunkApi) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/todos?page=${page}`,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error);
    }
  },
);

const getAllCompletedTodos = createAsyncThunk(
  'todos/fetchCompletedTodos',
  async ({page}:TParametrs, thunkApi) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/todos/completed?page=${page}`,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      return data;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error);
    }
  },
);

const getAllPassededTodos = createAsyncThunk(
  'todos/fetchPassedTodos',
  async ({page}:TParametrs, thunkApi) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/todos/passed?page=${page}`,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      return data;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error);
    }
  },
);

const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (payload: TTodoPayload, thunkApi) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8080/todos`,
        payload,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      console.log(data)
      return data;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error);
    }
  },
);

const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async (payload: number, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/todos/${payload}`,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      console.log(data)
      return data;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error);
    }
  },
);

const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (payload: TTodoPayload, thunkApi) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:8080/todos/${payload.id}`,
        payload,
        {
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          },
        },
      );
      console.log(data)
      return data;
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error);
    }
  },
);

export { getAllTodos, createTodo, removeTodo, updateTodo, getAllCompletedTodos, getAllPassededTodos };

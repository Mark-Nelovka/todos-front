import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// const { REACT_APP_URL_API } = process.env;

// axios.defaults.baseURL = `${REACT_APP_URL_API}`;

type Payload = {
  order?: string;
  offset?: number;
  limit: number;
  field?: string;
  firstIndex?: number;
  lastIndex?: number;
};

const getStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/students?&limit=10`,
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

// const sortStudents = createAsyncThunk("students/sort", async ({order, offset, limit, field}: Payload, thunkApi) => {
//     try {
//         const { data } = await axios.get(`http://localhost:8080/students/sort?field=${field}&order=${order}&offset=${offset}&limit=${limit}`, {
//             headers: {
//                 "Access-Control-Allow-Origin": "http://localhost:8080",
//             }
//             });
//         return data;
//    } catch (error) {
//     return error;
//     //   thunkApi.rejectWithValue("Oooops, something is wrong");
//    }
// })

// const findStudentByFilterField = createAsyncThunk("students/findStudent", async (payload: string, thunkApi) => {
//     try {
//         const { data } = await axios.get(`http://localhost:8080/students/search/${payload}`,  {
//             headers: {
//                 "Access-Control-Allow-Origin": "http://localhost:8080",
//             },
//         });
//         if (data.status === 200 && data.data.length > 0) {
//             console.log(data);
//             return data;
//         } else {
//             throw data;
//         }
//     } catch (error) {
//         return thunkApi.rejectWithValue(error);
//    }
// })

// const pagination = createAsyncThunk("students/pagination", async ({limit, firstIndex, lastIndex, order}: Payload, thunkApi) => {
//     try {
//         const { data } = await axios.get(`http://localhost:8080/students/pagination?order=${order}&limit=${limit}&firstIndex=${firstIndex}&lastIndex=${lastIndex}`,  {
//             headers: {
//                 "Access-Control-Allow-Origin": "http://localhost:8080",
//             },
//         });
//         console.log(data)
//         if (data.status === 200 && data.data.length > 0) {
//             console.log(data);
//             return data;
//         } else {
//             throw data;
//         }
//     } catch (error) {
//         console.log("ERROR: ", error);
//         return thunkApi.rejectWithValue(error);
//    }
// })

export { getStudents };

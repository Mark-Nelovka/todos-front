import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import todosReducer from "./todos/todosSlice";

const TodosPersistConfig = {
  key: "todos",
  storage,
  blacklist: ["pending"],
};

const TodosPersistedReducer = persistReducer(TodosPersistConfig, todosReducer);

const rootReducer = combineReducers({
  todos: TodosPersistedReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (
    getDefaultMiddleware: (arg0: {
      serializableCheck: {
        ignoredActions: (
          | "persist/FLUSH"
          | "persist/REHYDRATE"
          | "persist/PAUSE"
          | "persist/PERSIST"
          | "persist/PURGE"
          | "persist/REGISTER"
        )[];
      };
    }) => any
  ) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

export default store;

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

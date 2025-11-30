import { configureStore } from "@reduxjs/toolkit";

import { ToDoReducer } from "./TODO/toDoSlice";
import filtersReducer from "./TODO/filtersSlice";

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

const todosPersistConfig = {
  key: "todos",
  storage,
  whitelist: ["items", "page", "limit"],
};

const filtersPersistConfig = {
  key: "filters",
  storage,
  whitelist: ["status"],
};

export const store = configureStore({
  reducer: {
    ToDo: persistReducer(todosPersistConfig, ToDoReducer),
    filters: persistReducer(filtersPersistConfig, filtersReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

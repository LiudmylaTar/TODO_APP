import { configureStore } from "@reduxjs/toolkit";

import { ToDoReducer } from "./TODO/toDoSlice";
import filtersReducer from "./TODO/filtersSlice";
import { authReducer } from "./auth/authSlice";

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

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const todosPersistConfig = {
  key: "todos",
  storage,
  whitelist: ["items", "page", "limit", "total", "totalPages"],
};

const filtersPersistConfig = {
  key: "filters",
  storage,
  whitelist: ["status", "search", "sortBy", "sortOrder"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
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

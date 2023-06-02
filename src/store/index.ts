import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// solution to "redux-persist failed to create sync storage. falling back to noop storage." log
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import thunk from "redux-thunk";

// begin createWebStorage solution
// createWebStorage solves the "redux-persist failed to create sync storage. falling back to noop storage." log
// not really an "error" but solution below reduces noise generated in console
const createNoopStorage = () => {
  return {
    getItem(_key: unknown) {
      return Promise.resolve(null);
    },
    setItem(_key: unknown, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem(_key: unknown) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
// end createWebStorage solution

// Import your slices
import themeReducer from "./features/themeSlice";
import userReducer from "./features/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

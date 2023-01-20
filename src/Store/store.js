import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../Services/TMDB";
import genreOrCategoryReducer from "../Features/currentGenreOrCategory";
import userReducer from "../Features/auth";
export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentgenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

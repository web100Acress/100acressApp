import { configureStore } from "@reduxjs/toolkit";
import trendingReducer from "../trending/trendingSlice";

 export const store = configureStore({
  reducer: {
    trending: trendingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

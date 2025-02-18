import { configureStore } from "@reduxjs/toolkit";

import { achievementsFiltersSlice, achievementsApi } from "./achievements";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const appStore = configureStore({
  reducer: {
    [achievementsApi.reducerPath]: achievementsApi.reducer,
    achievementsFilters: achievementsFiltersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(achievementsApi.middleware),
});

export type RootState = ReturnType<typeof appStore.getState>;

export type AppDispatch = typeof appStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

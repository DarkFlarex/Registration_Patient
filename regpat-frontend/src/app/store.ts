import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { doctorsTableReducer } from "../features/doctorTable/doctorTableSlice";

const rootReducer = combineReducers({
  doctorsTable: doctorsTableReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

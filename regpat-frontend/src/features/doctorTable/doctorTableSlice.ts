import type { Appointment, Doctor } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import { fetchAppointmentOneDate, fetchDoctors } from "./doctorTableThunks";

export interface DoctorsTableState {
  items: Doctor[];
  itemsFetching: boolean;
  appointments: Appointment[];
  oneAppointmentFetching: boolean;
}

const initialState: DoctorsTableState = {
  items: [],
  itemsFetching: false,
  appointments: [],
  oneAppointmentFetching: false,
};

export const doctorsTableSlice = createSlice({
  name: "doctorsTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.itemsFetching = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, { payload: doctors }) => {
        state.itemsFetching = false;
        state.items = doctors;
      })
      .addCase(fetchDoctors.rejected, (state) => {
        state.itemsFetching = false;
      });
    builder
      .addCase(fetchAppointmentOneDate.pending, (state) => {
        state.oneAppointmentFetching = true;
      })
      .addCase(
        fetchAppointmentOneDate.fulfilled,
        (state, { payload: appointments }) => {
          state.oneAppointmentFetching = false;
          state.appointments = appointments;
        },
      )
      .addCase(fetchAppointmentOneDate.rejected, (state) => {
        state.oneAppointmentFetching = false;
      });
  },
  selectors: {
    selectDoctorsTable: (state) => state.items,
    selectDoctorsTableFetching: (state) => state.itemsFetching,
    selectTableOneAppointment: (state) => state.appointments,
    selectTableOneAppointmentFetching: (state) => state.oneAppointmentFetching,
  },
});

export const doctorsTableReducer = doctorsTableSlice.reducer;

export const {
  selectDoctorsTable,
  selectDoctorsTableFetching,
  selectTableOneAppointment,
} = doctorsTableSlice.selectors;

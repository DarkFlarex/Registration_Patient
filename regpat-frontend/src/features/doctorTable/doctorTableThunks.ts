import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import type { Doctor } from "../../types";

export const fetchDoctors = createAsyncThunk("doctors/fetchAll", async () => {
  const { data: doctors } = await axiosApi.get<Doctor[]>("/doctors");
  return doctors;
});

export const fetchAppointmentOneDate = createAsyncThunk(
  "appointments/fetch",
  async (date: string) => {
    const { data: appointments } = await axiosApi.get(
      `/appointments?date=${date}`,
    );
    console.log("Загружены записи на дату", date, appointments);
    return appointments;
  },
);

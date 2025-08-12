import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectDoctorsTable,
  selectDoctorsTableFetching,
  selectTableOneAppointment,
} from "./doctorTableSlice";
import { fetchAppointmentOneDate, fetchDoctors } from "./doctorTableThunks";
import DoctorTableItem from "./components/DoctorTableItem";
import { FaCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";

const DoctorTable = () => {
  const dispatch = useAppDispatch();
  const doctorsTable = useAppSelector(selectDoctorsTable);
  const isFetching = useAppSelector(selectDoctorsTableFetching);
  const appointments = useAppSelector(selectTableOneAppointment);

  const [selectedDate, setSelectedDate] = useState(dayjs());
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    dispatch(fetchAppointmentOneDate(formattedDate));
  }, [dispatch, selectedDate]);

  const handlePrevDay = () => {
    setSelectedDate((prev) => prev.subtract(1, "day"));
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => prev.add(1, "day"));
  };
  const doctorsWithAppointments = doctorsTable.map((doc) => ({
    ...doc,
    appointments: appointments.filter(
      (appt) =>
        appt.doctor &&
        typeof appt.doctor === "object" &&
        appt.doctor._id.toString() === doc._id.toString(),
    ),
  }));
  return (
    <>
      <div className="flex items-center gap-2">
        <HiOutlineBars3BottomRight className="text-blue-500 text-2xl" />
        <div className="relative w-110 max-[570px]:w-auto">
          <input
            type="text"
            placeholder="Поиск пациента..."
            className="w-full pl-5 pr-8 py-2 rounded-lg border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <FaTimes className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
        </div>
      </div>

      <div className="p-6 bg-white ">
        <div className="flex max-[650px]:flex-col max-[500px]:items-start items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevDay}
              className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded hover:bg-blue-600 text-white max-[750px]:hidden"
            >
              <FaChevronLeft />
            </button>
            <button className="flex max-[650px]:mb-3 items-center justify-center gap-2 text-lg font-semibold bg-blue-500 text-white w-50 h-10 rounded">
              Доктора
            </button>
            <button
              onClick={handleNextDay}
              className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded hover:bg-blue-600 text-white max-[750px]:hidden"
            >
              <FaChevronRight />
            </button>
          </div>

          <div>
            <button className="flex cursor-pointer items-center hover gap-2 text-lg font-semibold bg-blue-500 text-white p-1 rounded">
              <FaCalendarAlt className="text-white-500" />
              {selectedDate.format("dd, D MMMM YYYY")}
            </button>
          </div>
        </div>
        <div className="max-w-[calc(100vw-200px)] overflow-x-auto">
          {isFetching && <p className="text-gray-500">Загрузка...</p>}
          {!isFetching && doctorsTable.length === 0 && (
            <p className="text-gray-500">Докторов пока нет</p>
          )}
          {!isFetching && doctorsTable.length > 0 && (
            <DoctorTableItem doctors={doctorsWithAppointments} />
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorTable;

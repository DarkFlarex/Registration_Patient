import { useState } from "react";
import DoctorTable from "../features/doctorTable/DoctorTable";
import SidebarItem from "../features/sidebar/components/SidebarItem";
import dayjs from "dayjs";
import "dayjs/locale/ru";

dayjs.locale("ru");

const MainPage = () => {
  const [active, setActive] = useState<
    "dashboard" | "calendar" | "profile" | "folder" | "telegram" | "exclamation"
  >("calendar");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarItem active={active} setActive={setActive} />

      <main className="flex-1 m-6 ">
        {active === "calendar" && <DoctorTable />}
        {active !== "calendar" && (
          <div className="flex items-center justify-center h-full text-gray-500 text-xl font-semibold">
            Здесь пусто
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;

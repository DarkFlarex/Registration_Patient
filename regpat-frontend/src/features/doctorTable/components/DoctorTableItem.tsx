import type { Doctor } from "../../../types";
import doctorAvatar from "/src/assets/images/doctorAvatar.avif";

interface Props {
  doctors: Doctor[];
}

const generateTimeSlots = (
  startHour: number,
  endHour: number,
  stepMinutes: number,
) => {
  const slots: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      const hh = h.toString().padStart(2, "0");
      const mm = m.toString().padStart(2, "0");
      slots.push(`${hh}:${mm}`);
    }
  }
  slots.push(`${endHour.toString().padStart(2, "0")}:00`);
  return slots;
};

const timeSlots = generateTimeSlots(9, 19, 30);

const DoctorTableItem: React.FC<Props> = ({ doctors }) => {
  const toMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const formatTimeCell = (time: string) => {
    const [hourStr, minStr] = time.split(":");
    const isHalfHour = minStr === "30";

    return (
      <div
        className={`w-full ${
          isHalfHour
            ? "text-right pr-2 text-sm font-bold"
            : "text-left pl-2 text-lg font-bold"
        }`}
      >
        {isHalfHour ? minStr : hourStr}
      </div>
    );
  };

  const getStatusClasses = (status: string) => {
    const normalized = status.trim().toLowerCase();

    if (normalized === "отменено") {
      return "bg-orange-400";
    }
    if (normalized === "запланировано") {
      return "bg-blue-100";
    }
    if (normalized === "пришел") {
      return "bg-green-100";
    }
    return "text-gray-700 bg-gray-100";
  };

  return (
    <table className="w-full  border border-gray-300 table-fixed text-center">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2 sticky left-0 bg-white z-20 w-10"></th>
          {doctors.map((doc) => (
            <th key={doc._id} className="border border-gray-300 p-2 w-44">
              <div className="flex items-center justify-around text-center">
                <img
                  src={doctorAvatar}
                  alt={`${doc.doctor} avatar`}
                  className="w-12 h-12 rounded-full object-cover mb-1"
                />
                <div className="flex flex-col items-start">
                  <p className="font-semibold text-gray-900 text-sm">
                    {doc.doctor}
                  </p>
                  <p className="text-blue-600 text-xs">{doc.specialty}</p>
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((slot) => (
          <tr key={slot} className="hover:bg-gray-50">
            <td className="border border-gray-300 sticky left-0 bg-white z-10">
              {formatTimeCell(slot)}
            </td>
            {doctors.map((doc) => {
              const startingAppt = doc.appointments?.find(
                (a) => a.timeStart === slot,
              );

              if (startingAppt) {
                const statusClass = getStatusClasses(startingAppt.status);
                return (
                  <td
                    key={doc._id + slot}
                    className="relative border border-gray-300 text-base text-left"
                  >
                    <div className="flex flex-col ml-2">
                      <div>
                        Время: {startingAppt.timeStart} - {startingAppt.timeEnd}
                      </div>
                      <div>Пациент: {startingAppt.patient}</div>
                    </div>
                    <div
                      className={`${statusClass} absolute top-0 left-0 h-full w-2 `}
                      title={startingAppt.status}
                    />
                  </td>
                );
              }

              const isInsideAppointment = doc.appointments?.some((a) => {
                const startMin = toMinutes(a.timeStart);
                const endMin = toMinutes(a.timeEnd);
                const currentMin = toMinutes(slot);
                return currentMin > startMin && currentMin < endMin;
              });

              if (isInsideAppointment) {
                return (
                  <td
                    key={doc._id + slot}
                    className="border border-gray-300 p-2"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                          -40deg,
                          #ffffff 0px,
                          #ffffff 15px,
                          #3b82f6 15px,
                          #3b82f6 19px
                        )`,
                    }}
                  />
                );
              }

              return (
                <td
                  key={doc._id + slot}
                  className="border border-gray-300 p-2 bg-white"
                />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DoctorTableItem;

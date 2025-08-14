export interface Appointment {
  _id: string;
  doctor: {
    _id: string;
  };
  patient: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  phone: string;
  status: string;
  type: string;
  comment: string;
}

export interface Doctor {
  _id: string;
  doctor: string;
  specialty: string;
  appointments: Appointment[];
}

export const doctorsMock: Doctor[] = [
  {
    _id: "1",
    doctor: "Ринат Тупсунов",
    specialty: "Стомотолог Имплантолог",
    appointments: [
      {
        _id: "a1",
        doctor: { _id: "1" },
        patient: "Азим Максуров",
        date: "2025-08-10",
        timeStart: "11:30",
        timeEnd: "12:30",
        phone: "996550002322",
        status: "Отменено",
        type: "Лечение",
        comment: "просто комментарий",
      },
    ],
  },
  {
    _id: "2",
    doctor: "Рустам Торогелдие",
    specialty: "Терапевт Имплантолог",
    appointments: [
      {
        _id: "a2",
        doctor: { _id: "2" },
        patient: "Ринат Иманкулов",
        date: "2025-08-10",
        timeStart: "15:00",
        timeEnd: "16:30",
        phone: "996550002342",
        status: "Запланировано",
        type: "Лечение",
        comment: "просто комментарий",
      },
    ],
  },
  {
    _id: "3",
    doctor: "Эмир Асанов",
    specialty: "Терапевт Имплантолог Ортопед",
    appointments: [
      {
        _id: "a3",
        doctor: { _id: "3" },
        patient: "Айзада Азаматова",
        date: "2025-08-10",
        timeStart: "11:30",
        timeEnd: "13:00",
        phone: "996550002442",
        status: "Пришел",
        type: "Лечение",
        comment: "просто комментарий",
      },
    ],
  },
  {
    _id: "4",
    doctor: "Эмир Асанов1",
    specialty: "Терапевт Имплантолог Ортопед",
    appointments: [
      {
        _id: "a4",
        doctor: { _id: "4" },
        patient: "Айзада Азаматова1",
        date: "2025-08-09",
        timeStart: "11:30",
        timeEnd: "13:00",
        phone: "996550002442",
        status: "Пришел",
        type: "Лечение",
        comment: "просто комментарий",
      },
    ],
  },
];
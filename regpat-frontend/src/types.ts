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
  comment: string;
}

export interface Doctor {
  _id: string;
  doctor: string;
  specialty: string;
  appointments: Appointment[];
}

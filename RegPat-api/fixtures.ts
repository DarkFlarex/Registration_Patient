import mongoose from "mongoose";
import config from "./config";
import Doctor from "./models/Doctor";
import Appointment from "./models/Appointment";

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection("doctors");
    await db.dropCollection("appointments");
  } catch (e) {
    console.log("Skipping drop...");
  }
  const doctor1 = new Doctor({
    doctor: "Ринат Тупсунов",
    specialty: "Стомотолог Имплантолог",
    appointments: [],
  });
  const doctor2 = new Doctor({
    doctor: "Рустам Торогелдие",
    specialty: "Терапевт Имплантолог",
    appointments: [],
  });
  const doctor3 = new Doctor({
    doctor: "Эмир Асанов",
    specialty: "Терапевт Имплантолог Ортопед",
    appointments: [],
  });
  const doctor4 = new Doctor({
    doctor: "Эмир Асанов1",
    specialty: "Терапевт Имплантолог Ортопед",
    appointments: [],
  });

  await doctor1.save();
  await doctor2.save();
  await doctor3.save();
  await doctor4.save();

  const appointment1 = new Appointment({
    doctor: doctor1._id,
    patient: "Азим Максуров",
    date: "2025-08-10",
    timeStart: "11:30",
    timeEnd: "12:30",
    phone: "996550002322",
    status: "Отменено",
    type: "Лечение",
    comment: "просто комментарий",
  });
  const appointment2 = new Appointment({
    doctor: doctor2._id,
    patient: "Ринат Иманкулов",
    date: "2025-08-10",
    timeStart: "15:00",
    timeEnd: "16:30",
    phone: "996550002342",
    status: "Запланировано",
    type: "Лечение",
    comment: "просто комментарий",
  });
  const appointment3 = new Appointment({
    doctor: doctor3._id,
    patient: "Айзада Азаматова",
    date: "2025-08-10",
    timeStart: "11:30",
    timeEnd: "13:00",
    phone: "996550002442",
    status: "Пришел",
    type: "Лечение",
    comment: "просто комментарий",
  });
  const appointment4 = new Appointment({
    doctor: doctor4._id,
    patient: "Айзада Азаматова1",
    date: "2025-08-09",
    timeStart: "11:30",
    timeEnd: "13:00",
    phone: "996550002442",
    status: "Пришел",
    type: "Лечение",
    comment: "просто комментарий",
  });

  await appointment1.save();
  await appointment2.save();
  await appointment3.save();
  await appointment4.save();

  doctor1.appointments.push(appointment1._id);
  doctor2.appointments.push(appointment2._id);
  doctor3.appointments.push(appointment3._id);
  doctor4.appointments.push(appointment4._id);

  await doctor1.save();
  await doctor2.save();
  await doctor3.save();
  await doctor4.save();
  await db.close();
};

run().catch(console.log);

import mongoose, { Types } from "mongoose";
import Doctor from "./Doctor";

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const doctor = await Doctor.findById(value);
        return Boolean(doctor);
      },
      message: "Doctor does not exist",
    },
  },
  patient: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeStart: {
    type: String,
    required: true,
  },
  timeEnd: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Запланировано", "Отменено", "Пришел"],
  },
  type: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: "",
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

export default Appointment;

import mongoose, { Types } from "mongoose";
import Appointment from "./Appointment";

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  doctor: {
    type: String,
    required: true,
    unique: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      validate: {
        validator: async (value: Types.ObjectId) => {
          const appointments = await Appointment.findById(value);
          return Boolean(appointments);
        },
        message: "appointments does not exist",
      },
    },
  ],
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

export default Doctor;

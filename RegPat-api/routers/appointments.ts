import { Router } from "express";
import Appointment from "../models/Appointment";

const appointmentsRouter = Router();

appointmentsRouter.get("/", async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};

    if (req.query.date) {
      filter.date = req.query.date;
    }

    const appointments = await Appointment.find(filter).populate("doctor");
    return res.send(appointments);
  } catch (error) {
    next(error);
  }
});

export default appointmentsRouter;

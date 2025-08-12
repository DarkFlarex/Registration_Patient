import express from "express";
import Doctor from "../models/Doctor";

const doctorsRouter = express.Router();

doctorsRouter.get("/", async (req, res, next) => {
  try {
    const filter: Record<string, unknown> = {};

    const doctors = await Doctor.find(filter).populate("appointments");
    return res.send(doctors);
  } catch (error) {
    next(error);
  }
});

export default doctorsRouter;

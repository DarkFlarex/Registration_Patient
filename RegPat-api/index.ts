import express from "express";
import cors from "cors";
import config from "./config";
import * as mongoose from "mongoose";
import doctorsRouter from "./routers/doctors";
import appointmentsRouter from "./routers/appointments";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use("/doctors", doctorsRouter);
app.use("/appointments", appointmentsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);

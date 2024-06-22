import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import cors from "cors";
import bookRoute from './routes/bookRoute.js';

const app = express();

app.use(express.json());

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to Book Store");
});

app.use("/book", bookRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connecoted to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

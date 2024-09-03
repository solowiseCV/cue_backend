import "express-async-errors";
import "dotenv/config";
import express, { Router, urlencoded } from "express";
import cors from "cors";
import baseRoutes from "./features/appRoute.js";
import env from "./configs/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import connectDB from "./configs/db.js";
import cookieParser from "cookie-parser";



const router = Router();
const rootRouter = baseRoutes(router);

const app = express();

app.use(
  cors(
      {
          origin:true,
          credentials:true,
          
      }
  )
);
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

const port = env.port; 

app.get("/", (req, res) => {
  res.send("Welcome to Cue Home route, Enjoy 🔥");
});

app.use("/api/v1", rootRouter);

app.use("*", (req, res) => {
  res
    .status(404)
    .send({ message: "Resource URL not found", success: false, data: null });
});

//Database connection function
connectDB();

//error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server dey up and running @ port ${port}`);
});

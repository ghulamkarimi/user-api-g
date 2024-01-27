import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import { errorHandler, notFound } from "./middleware/error/errorHandler.js";

dotenv.config();
 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Routes
app.use(userRouter);

//  Error handling
app.use(notFound);
app.use(errorHandler);

// Server start
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.error(`Error connecting to the database: ${error.message}`));

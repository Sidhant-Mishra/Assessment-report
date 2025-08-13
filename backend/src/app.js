import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN, 
}));
app.use(express.json());

app.use("/api", feedbackRoutes);

export default app

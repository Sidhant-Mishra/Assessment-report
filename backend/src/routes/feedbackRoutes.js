import express from "express";
import { processStudentData } from "../services/feedbackService.js";

const router = express.Router();

router.get("/data", async (req, res) => {
  const feedback = await processStudentData();
  res.json(feedback);
});

export default router;

import axios from "axios";
import { getSheetData } from "../config/googleSheet.js";
import dotenv from "dotenv";
import { getGeminiResponse } from "../config/GenAi.js";
import { processResponseData } from "../config/parseResponse.js";

dotenv.config();

const processStudentData = async () => {
  try {
    console.log(process.env.SPREADSHEET_ID);
    const spreadsheetId=process.env.SPREADSHEET_ID
    const data = await getSheetData(spreadsheetId);
    // console.log(data);
    if (!data || data.length < 2) return [];

    const headers = data[0];
    const feedbackList = [];

    for (let i = 1; i < data.length; i++) {
      const studentData = data[i];
      const studentName = studentData[0];
      const grade = studentData[1];
      const subject = studentData[2];
      const responses = studentData.slice(3);

      let prompt = `Student Name: ${studentName}\nGrade: ${grade}\nSubject: ${subject}\n`;

      responses.forEach((response, index) => {
        prompt += `${headers[3 + index]}: ${response}\n`;
      });

      prompt +=`Given a student's responses to an assessment, analyze their performance based on the following rubrics:
      Concept Awareness – Does the student understand the fundamental concepts behind each question?
      Application & Real-World Connection – Can the student apply these concepts to real-life scenarios?
      Clarity of Thought & Explanation – Is the student able to clearly explain or reason out their answers?
      Accuracy & Precision – How correctly and carefully has the student answered each question?
      Engagement & Curiosity – Does the student demonstrate interest, curiosity, and willingness to explore beyond the basics?
      Growth Mindset & Improvement Potential – How well does the student take feedback and work on improvements?
      Based on these rubrics, generate a structured JSON output with the following format:

      json
      Copy
      Edit
      {
      "id": "[Unique ID]",
      "studentName": "[Insert Student Name]",
      "grade": "[Insert Grade]",
      "overallScore": "[Percentage Score]",
      "keyStrengthsAndGrowthAreas": {
          "conceptAwareness": {
          "score": "[Score]%",
          "explanation": "[Explanation of understanding]"
          },
          "applicationAndRealWorldConnection": {
          "score": "[Score]%",
          "explanation": "[How well the student applies knowledge]"
          },
          "clarityofThoughtExpression": {
          "score": "[Score]%",
          "explanation": "[How structured and clear answers are]"
          },
          "accuracyPrecision": {
          "score": "[Score]%",
          "Explanation": "[Attention to detail and correctness]"
          },
          "curiosity & Engagement": {
          "score": "[Score]%",
          "explanation": "[Insight into enthusiasm for learning]"
          },
          "growthMindset": {
          "score": "[Score]%",
          "explanation": "[Openness to improvement]"
          }
      },
      "personalizedNarrative": "[Detailed learning journey story]",
      "teacherNote": "[Professional note on student performance]",
      "parentNote": "[Supportive message for parents]",
      "finalThought": "[Motivational closing statement]"
      }
      Ensure the JSON output is well-structured and follows proper JSON syntax, so it can be directly parsed and displayed in the frontend application.`;

      const aiResponse=await getGeminiResponse(prompt);
    //   console.log(aiResponse);
      const feedback = await processResponseData(aiResponse);
      feedbackList.push(feedback);
    }

    return feedbackList;
  } catch (error) {
    console.error("Error processing student data:", error);
    return [];
  }
};

export { processStudentData };

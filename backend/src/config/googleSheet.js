import { google } from "googleapis";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authenticateGoogle = async () => {
  // const serviceAccount = JSON.parse(await readFile(path.join(__dirname, "./science-7th-tv-3e1af4b9f71e.json"), "utf8"));
  const config = {
    type: process.env.TYPE,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    privateKeyId: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY, // Fix multiline key
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    clientId: process.env.GOOGLE_CLOUD_CLIENT_ID,
    authUri: process.env.GOOGLE_CLOUD_AUTH_URI,
    tokenUri: process.env.GOOGLE_CLOUD_TOKEN_URI,
    authProviderCertUrl: process.env.GOOGLE_CLOUD_AUTH_PROVIDER_X509_CERT_URL,
    clientCertUrl: process.env.GOOGLE_CLOUD_CLIENT_CERT_URL,
    universeDomain: process.env.UNIVERSE_DOMAIN,
  };
  
  
  const authClient = new google.auth.GoogleAuth({
    credentials: config,
    scopes: ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
  });

  return authClient.getClient();
};

const getSheetData = async (spreadsheetId, range) => {
  const authClient = await authenticateGoogle();
  const sheets = google.sheets({ version: "v4", auth: authClient });

  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: "Student Grades" });
  return response.data.values;
};

export { getSheetData };

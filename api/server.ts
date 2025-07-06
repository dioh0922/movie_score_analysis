require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { GoogleGenAI} from '@google/genai';
import { readData } from './sequelize';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

app.get('/api/analysis', async (_req, res) => {
  res.json({
    msg: "api", test: await askGemini(), data: await readData()});
});

async function askGemini(){
  const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents: "テスト"
  });
  return response.text;
}

app.listen(PORT, () => {
  console.log("start");
});
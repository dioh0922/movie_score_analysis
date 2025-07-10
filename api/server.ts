import path from 'path';
import dotenv from 'dotenv';
require('dotenv').config({
  path: path.resolve(__dirname, './.env')
});
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import { readData } from './sequelize';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

app.get('/api/analysis', async (_req, res) => {
  res.json({
    msg: await askGemini()
  });
});

async function askGemini(){
  const movielist = await readData();
  const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents: JSON.stringify(movielist) + "\n以上のjsonから傾向を分析してください。好みのカテゴリとそうでないカテゴリに注目して分析し、原因を考察してください。このとき、複数回記録されているものは一つとして分析してください。回答内容にタイトルを含めるのは一切禁止でマークダウン形式で出力してください。"
  });
  return response.text;
}

app.listen(PORT, () => {
  console.log("start");
});
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());


app.get('/api/analysis', (_req, res) => {
  res.json({msg: "api"});
});

app.listen(PORT, () => {
  console.log("start");
});
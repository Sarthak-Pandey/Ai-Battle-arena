import express from 'express';
import runGraph from './ai/graph.ai.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/use-graph',async (req,res)=>{
    const result = await runGraph("Write a poem about love");
    res.send(result);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


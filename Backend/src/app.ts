import express from 'express';
import cors from 'cors';
import runGraph from './ai/graph.ai.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/chat', async (req, res) => {
    try {
        const { problem } = req.body;
        if (!problem) {
            return res.status(400).json({ error: "Problem is required" });
        }
        const result = await runGraph(problem);
        res.json(result);
    } catch (error) {
        console.error("Error running graph:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


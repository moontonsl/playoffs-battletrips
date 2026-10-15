import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOPICS_FILE = path.join(__dirname, '../data/topics.json');
const ACCESS_CODE = '3054';

const app = express();
app.use(cors());
app.use(express.json());

function readTopics() {
  try {
    const raw = fs.readFileSync(TOPICS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeTopics(topics) {
  fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2), 'utf-8');
}

app.get('/api/topics', (_req, res) => {
  res.json(readTopics());
});

app.post('/api/topics', (req, res) => {
  const { code, topics } = req.body;

  if (code !== ACCESS_CODE) {
    return res.status(403).json({ errors: { code: 'Invalid access code.' } });
  }

  if (!Array.isArray(topics) || topics.length === 0) {
    return res.status(422).json({ errors: { topics: 'Topics are required.' } });
  }

  for (const topic of topics) {
    if (!topic.name || !topic.status) {
      return res.status(422).json({ errors: { topics: 'Each topic needs a name and status.' } });
    }
    if (!['OPEN', 'FULL', 'CLOSED'].includes(topic.status)) {
      return res.status(422).json({ errors: { topics: 'Invalid topic status.' } });
    }
  }

  writeTopics(topics);
  res.json({ message: 'Settings updated successfully!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Battle Trips API running on http://localhost:${PORT}`);
});

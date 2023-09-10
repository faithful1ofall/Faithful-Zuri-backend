const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./test.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://faithful-ads.firebaseio.com',
});

const app = express();
const db = admin.database();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Zuri Faithfuls First backend');
});

app.post('/api/persons', (req, res) => {
  const { name, age } = req.body;

  if (!name || typeof age !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const newPersonRef = db.ref('persons').push();
  newPersonRef.set({ name, age }, (error) => {
    if (error) {
      res.status(500).json({ error: 'Error adding person' });
    } else {
      res.status(201).json({ message: 'Person added successfully' });
    }
  });
});

app.get('/api1', (req, res) => {
  const slackName = req.query.slack_name;
  const track = req.query.track;
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const utcTime = currentDate.toISOString().slice(0, -5) + 'Z';

  const jsonResponse = {
    slack_name: slackName,
    current_day: currentDay,
    utc_time: utcTime,
    track: track,
    github_file_url: 'https://github.com/faithful1ofall/Faithful-Zuri-backend/blob/main/src/app.js',
    github_repo_url: 'https://github.com/faithful1ofall/Faithful-Zuri-backend',
    status_code: '200',
  };

  res.json(jsonResponse);
});

module.exports = app;

const express = require('express');
// const admin = require('firebase-admin');

/*const serviceAccount = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
  "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN,
};*/

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});*/

const app = express();
// const db = admin.database();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Zuri Faithfuls backend');
});

app.get('/api', (req, res) => {
  res.send('Welcome to the Zuri Faithfuls First backend the api starts here');
});

app.post('/api/persons', (req, res) => {
  const { name, age } = req.body;

  if (!name || typeof age !== 'number') {
    return res.status(400).json({ error: 'Invalid data' });
  }

 /* const newPersonRef = db.ref('persons').push();
  newPersonRef.set({ name, age }, (error) => {
    if (error) {
      res.status(500).json({ error: 'Error adding person' });
    } else {
      res.status(201).json({ message: 'Person added successfully' });
    }
  });*/
});

app.get('/api/task1', (req, res) => {
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

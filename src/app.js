const express = require('express');
// const admin = require('firebase-admin');

/* const serviceAccount = {
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
}; */

/* admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
}); */

const app = express();
// const db = admin.database();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Zuri Faithfuls backend');
});

app.get('/api', (req, res) => {
  res.send('Welcome to the Zuri Faithfuls First backend; the API starts here');
});

// Create a list to store persons (temporary in-memory storage)
const persons = [];

// POST - Create a new person
app.post('/api/persons', (req, res) => {
  const { name, value } = req.body;

  if (typeof name != 'string' || typeof value != 'string') {
    return res.status(400).json({ error: 'Invalid data' });
  }

  // Create a new person object and push it to the list
  const newPerson = { name, value };
  persons.push(newPerson);

  // For Firebase integration, replace the above code with database operations

  /* const newPersonRef = db.ref('persons').push();
  newPersonRef.set({ name, age }, (error) => {
    if (error) {
      res.status(500).json({ error: 'Error adding person' });
    } else {
      res.status(201).json({ message: 'Person added successfully' });
    }
  }); */
  res.status(201).json({ message: 'Person added successfully' });
});

// GET - Read all persons
app.get('/api/persons', (req, res) => {
  // For Firebase integration, replace the following code with database retrieval

  /* const personsRef = db.ref('persons');
  personsRef.once('value', (snapshot) => {
    const personsData = snapshot.val();
    const personsList = Object.keys(personsData).map((key) => personsData[key]);
    res.status(200).json(personsList);
  }); */

  res.status(200).json(persons);
});

// GET - Read a specific person by ID
app.get('/api/persons/:id', (req, res) => {
  const personId = req.params.id;

  // For Firebase integration, replace the following code with database retrieval by ID

  /* const personRef = db.ref(`persons/${personId}`);
  personRef.once('value', (snapshot) => {
    const personData = snapshot.val();
    if (personData) {
      res.status(200).json(personData);
    } else {
      res.status(404).json({ error: 'Person not found' });
    }
  }); */

  const foundPerson = persons.find((person) => person.id === personId);
  if (foundPerson) {
    res.status(200).json(foundPerson);
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});

// PUT - Update a person by ID
app.put('/api/persons/:id', (req, res) => {
  const personId = req.params.id;
  const { name, value } = req.body;

  // For Firebase integration, replace the following code with database update by ID

  /* const personRef = db.ref(`persons/${personId}`);
  personRef.update({ name, age }, (error) => {
    if (error) {
      res.status(500).json({ error: 'Error updating person' });
    } else {
      res.status(200).json({ message: 'Person updated successfully' });
    }
  }); */

  const foundIndex = persons.findIndex((person) => person.id === personId);
  if (foundIndex !== -1) {
    persons[foundIndex] = { ...persons[foundIndex], name, value };
    res.status(200).json({ message: 'Person updated successfully' });
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
});

// DELETE - Delete a person by ID
app.delete('/api/persons/:id', (req, res) => {
  const personId = req.params.id;

  // For Firebase integration, replace the following code with database deletion by ID

  /* const personRef = db.ref(`persons/${personId}`);
  personRef.remove((error) => {
    if (error) {
      res.status(500).json({ error: 'Error deleting person' });
    } else {
      res.status(200).json({ message: 'Person deleted successfully' });
    }
  }); */

  const foundIndex = persons.findIndex((person) => person.id === personId);
  if (foundIndex !== -1) {
    persons.splice(foundIndex, 1);
    res.status(200).json({ message: 'Person deleted successfully' });
  } else {
    res.status(404).json({ error: 'Person not found' });
  }
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

const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

 const serviceAccount = {
  "type": process.env.FIREBASE_TYPE,
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL,
  "universe_domain": process.env.FIREBASE_UNIVERSE_DOMAIN
}; 

 admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
}); 

const app = express();
const db = admin.database();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

app.get('/', (req, res) => {
  res.send('Welcome to the Zuri Faithfuls backend');
});

app.post('/api', (req, res) => {
  const { name } = req.body;
  const { value } = req.body;


  const personsRef = db.ref('persons');

  // Retrieve the last person's ID from the database
  personsRef
    .orderByChild('id')
    .limitToLast(1)
    .once('value', (snapshot) => {
      let lastId = 0;

      snapshot.forEach((childSnapshot) => {
        lastId = parseInt(childSnapshot.val().id);
      });

      // Generate a new ID by adding 1 to the last ID
      const id = lastId + 1;

      // Create a new person with the new ID
      const newPersonRef = personsRef.child(id);
      newPersonRef.set({ id, name, value }, (error) => {
    if (error) {
      console.error('Firebase Error:', error);
      return res.status(500).json({ error: 'Error adding person' });
    } else {
      // Return the correct ID variable
      return res.status(201).json({ message: 'Person added successfully', id });
    }
  });
    });
});

// GET - Read all persons
app.get('/api', (req, res) => {
  const personsRef = db.ref('persons');
  
  personsRef.once('value', (snapshot) => {
    const personsData = snapshot.val();
    const personsList = Object.keys(personsData).map((key) => ({ id: key, ...personsData[key] }));
    res.status(200).json(personsList);
  });
});

// GET - Read a specific person by Input
app.get('/api/:input', (req, res) => {
  const input = req.params.input;

  // For Firebase integration, replace the following code with appropriate database logic
  const personsRef = db.ref('persons');

  // Check if the provided input is a number (ID), a string (name), or a string (value)
  if (!isNaN(input)) {
    // If it's a number, treat it as an ID
    const personId = parseInt(input);
    const personRef = db.ref(`persons/${personId}`);
    personRef.once('value', (snapshot) => {
      const personData = snapshot.val();
      if (personData) {
        res.status(200).json({ id: personId, ...personData });
      } else {
        res.status(404).json({ error: 'Person not found based on ID' });
      }
    });
  } else {
    // If it's not a number, treat it as a name or value
    const nameQueryField = 'name';
    const valueQueryField = 'value';

    // Query the database to find all persons with the provided name or value
    personsRef.orderByChild(nameQueryField).equalTo(input).once('value', (snapshot) => {
      if (snapshot.exists()) {
        const matchingPersons = [];
        snapshot.forEach((childSnapshot) => {
          const personId = childSnapshot.key;
          const personData = childSnapshot.val();
          matchingPersons.push({ id: personId, ...personData });
        });
        res.status(200).json(matchingPersons);
      } else {
        // If no persons match the name, try searching based on value
        personsRef.orderByChild(valueQueryField).equalTo(input).once('value', (valueSnapshot) => {
          if (valueSnapshot.exists()) {
            const matchingPersons = [];
            valueSnapshot.forEach((childSnapshot) => {
              const personId = childSnapshot.key;
              const personData = childSnapshot.val();
              matchingPersons.push({ id: personId, ...personData });
            });
            res.status(200).json(matchingPersons);
          } else {
            res.status(404).json({ error: 'No persons found based on the provided name or value' });
          }
        });
      }
    });
  }
});

// PUT - Update a person by input
app.put('/api/:input', (req, res) => {
  const input = req.params.input;
  const { name, value } = req.body;

  // For Firebase integration, replace the following code with appropriate database logic
  const personsRef = db.ref('persons');

  // Check if the provided input is a number (ID), a string (name), or a string (value)
  if (!isNaN(input)) {
    // If it's a number, treat it as an ID
    const personId = parseInt(input);
    const personRef = db.ref(`persons/${personId}`);
    personRef.update({ name, value }, (error) => {
      if (error) {
        res.status(500).json({ error: 'Error updating person' });
      } else {
        res.status(200).json({ message: 'Person updated successfully based on ID' });
      }
    });
  } else {
    // If it's not a number, treat it as a name or value
    const nameQueryField = 'name';
    const valueQueryField = 'value';

    // Query the database to find all persons with the provided name or value and update them
    personsRef.orderByChild(nameQueryField).equalTo(input).once('value', (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const personIdToUpdate = childSnapshot.key;
          const personToUpdate = childSnapshot.val();
          const updatedPerson = { ...personToUpdate, name, value };
          
          const personRefToUpdate = db.ref(`persons/${personIdToUpdate}`);
          personRefToUpdate.update(updatedPerson);
        });

        res.status(200).json({ message: 'All matching persons updated successfully based on name' });
      } else {
        // If no persons match the name, try searching based on value
        personsRef.orderByChild(valueQueryField).equalTo(input).once('value', (valueSnapshot) => {
          if (valueSnapshot.exists()) {
            valueSnapshot.forEach((childSnapshot) => {
              const personIdToUpdate = childSnapshot.key;
              const personToUpdate = childSnapshot.val();
              const updatedPerson = { ...personToUpdate, name, value };
              
              const personRefToUpdate = db.ref(`persons/${personIdToUpdate}`);
              personRefToUpdate.update(updatedPerson);
            });

            res.status(200).json({ message: 'All matching persons updated successfully based on value' });
          } else {
            res.status(404).json({ error: 'No persons found based on the provided name or value' });
          }
        });
      }
    });
  }
});

// DELETE - Delete a person by Input
app.delete('/api/:input', (req, res) => {
  const input = req.params.input;

  // For Firebase integration, replace the following code with appropriate database logic
  const personsRef = db.ref('persons');

  // Check if the provided input is a number (ID), a string (name), or a string (value)
  if (!isNaN(input)) {
    // If it's a number, treat it as an ID
    const personId = parseInt(input);
    const personRef = db.ref(`persons/${personId}`);
    personRef.remove((error) => {
      if (error) {
        res.status(500).json({ error: 'Error deleting person based on ID' });
      } else {
        res.status(200).json({ message: 'Person deleted successfully based on ID' });
      }
    });
  } else {
    // If it's not a number, treat it as a name or value
    const nameQueryField = 'name';
    const valueQueryField = 'value';

    // Query the database to find all persons with the provided name or value and delete them
    personsRef.orderByChild(nameQueryField).equalTo(input).once('value', (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const personIdToDelete = childSnapshot.key;
          const personRefToDelete = db.ref(`persons/${personIdToDelete}`);
          personRefToDelete.remove();
        });

        res.status(200).json({ message: 'All matching persons deleted successfully based on name' });
      } else {
        // If no persons match the name, try searching based on value
        personsRef.orderByChild(valueQueryField).equalTo(input).once('value', (valueSnapshot) => {
          if (valueSnapshot.exists()) {
            valueSnapshot.forEach((childSnapshot) => {
              const personIdToDelete = childSnapshot.key;
              const personRefToDelete = db.ref(`persons/${personIdToDelete}`);
              personRefToDelete.remove();
            });

            res.status(200).json({ message: 'All matching persons deleted successfully based on value' });
          } else {
            res.status(404).json({ error: 'No persons found based on the provided name or value' });
          }
        });
      }
    });
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

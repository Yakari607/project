// backend/server.js
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
app.use(express.json());
app.use(cors());

// Exemple de route POST pour récupérer des emails Gmail
app.post('/api/gmailMessages', async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      return res.status(400).json({ error: 'Missing accessToken' });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: 'v1', auth });

    // Liste des messages
    const listRes = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5, // ou plus
    });

    const messages = listRes.data.messages || [];
    const emailData = [];

    for (let msg of messages) {
      const msgDetail = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
      });
      const headers = msgDetail.data.payload?.headers || [];
      const fromHeader = headers.find(h => h.name === 'From');
      const subjectHeader = headers.find(h => h.name === 'Subject');

      emailData.push({
        from: fromHeader?.value || '',
        subject: subjectHeader?.value || '',
        snippet: msgDetail.data.snippet || '',
      });
    }

    res.json(emailData);
  } catch (err) {
    console.error('Erreur API Gmail:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des emails Gmail' });
  }
});

// Lancement du serveur
app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});

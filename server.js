// backend/server.js
const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

// Configuration de base Express
const app = express();
app.use(express.json());
app.use(cors());

// Route POST pour récupérer les emails Gmail
app.post('/api/gmailMessages', async (req, res) => {
  const { accessToken } = req.body;
  if (!accessToken) {
    return res.status(400).json({ error: 'Missing accessToken' });
  }

  try {
    // Configure l'authentification Google avec le token
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    const gmail = google.gmail({ version: 'v1', auth });

    // Liste des messages
    const listRes = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5, // Par exemple, on limite à 5 messages
    });

    const messages = listRes.data.messages || [];
    const emailData = [];

    // Récupère les détails (from, subject, snippet) pour chaque message
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

    return res.json(emailData);

  } catch (error) {
    console.error('Erreur lors de la récupération des emails Gmail :', error);
    return res.status(500).json({ error: 'Erreur API Gmail' });
  }
});

// Lancement du serveur sur le port 5000
app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});

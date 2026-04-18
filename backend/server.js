require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'database.json');

const getDatabase = () => {
  if (!fs.existsSync(dbPath)) return [];
  try {
    const raw = fs.readFileSync(dbPath);
    return JSON.parse(raw);
  } catch (e) { return []; }
};

// Configuration automatique du transporteur SMTP (Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Vérifier que le transport SMTP est bien connecté au démarrage
transporter.verify((error, success) => {
    if (error) {
        console.log("Erreur Nodemailer:", error.message);
        console.log("=> Vérifiez que votre mot de passe d'application dans le fichier .env est correct !");
    } else {
        console.log("Nodemailer prêt à envoyer des emails.");
    }
});

// Route publique pour recevoir les contacts depuis React
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Veuillez remplir tous les champs." });
    }

    try {
        const mailOptions = {
            from: `"${name}" <${email}>`, // Nom de l'expéditeur qui s'affichera
            to: process.env.EMAIL_USER, // Vous envoyez le message à vous-même
            replyTo: email, // Permet de faire "Répondre" directement à l'adresse de l'utilisateur
            subject: `Contact Portfolio - Nouveau message de ${name}`,
            text: `Vous avez un nouveau contact !\n\nNom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>Nouveau compte-rendu depuis votre portfolio</h3>
                <ul>
                    <li><strong>Nom :</strong> ${name}</li>
                    <li><strong>Email :</strong> ${email}</li>
                </ul>
                <p><strong>Message :</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email envoyé." });
    } catch (error) {
        console.error("Erreur serveur d'envoi", error);
        res.status(500).json({ success: false, message: "Échec du serveur.", error: error.message });
    }
});

// Route GET Livre d'or
app.get('/api/guestbook', (req, res) => {
    res.json(getDatabase());
});

// Route POST Livre d'or
app.post('/api/guestbook', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) return res.status(400).json({ success: false, error: 'Champs manquants' });

    const db = getDatabase();
    // Limite à 50 messages stockés
    const newDb = [{ id: Date.now(), name, message, date: new Date().toISOString() }, ...db].slice(0, 50);
    fs.writeFileSync(dbPath, JSON.stringify(newDb, null, 2));

    res.json({ success: true, messages: newDb });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Backend server en écoute sur http://localhost:${PORT}`);
});

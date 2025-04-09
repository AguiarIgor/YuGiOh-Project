import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'DuelPage.html'));
});

// Servir o arquivo JSON em uma rota específica
app.get('/DeckFera' , (req, res) => {
    res.sendFile(path.join(__dirname, 'media', 'Decks', 'DeckFera', 'DeckFera.json'));
});
app.get('/DeckCyber' , (req, res) => {
    res.sendFile(path.join(__dirname, 'media', 'Decks', 'DeckCyber', 'DeckCyber.json'));
});
app.get('/DeckLink' , (req, res) => {
    res.sendFile(path.join(__dirname, 'media', 'Decks', 'DeckLink','DeckLink.json'));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
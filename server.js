const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/slike', (req, res) => {

    const folderPath = path.join(__dirname, 'public', 'images');
    const files = fs.readdirSync(folderPath);

    const images = files.map((file, index) => ({
        url: `/images/${file}`,
        full: `/images/${file}`,
        id: `img${index + 1}`,
        title: file
    }));

    res.render('slike', { images });
});

app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});
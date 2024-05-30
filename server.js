const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let books = [];
let currentId = 1;

app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Title, author, and year are required.' });
    }

    const newBook = { id: currentId++, title, author, year };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, year } = req.body;
    const bookIndex = books.findIndex(book => book.id === parseInt(id));

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    if (!title || !author || !year) {
        return res.status(400).json({ error: 'Title, author, and year are required.' });
    }

    books[bookIndex] = { id: parseInt(id), title, author, year };
    res.status(200).json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === parseInt(id));

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    books.splice(bookIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

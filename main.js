const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const bookController = require('./controllers/bookController');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/books'));
app.get('/books', bookController.getBooks);
app.get('/add-book', bookController.addBookForm);
app.post('/add-book', bookController.addBook);
app.post('/mark-read/:id', bookController.markAsRead);
app.post('/delete-book/:id', bookController.deleteBook);

app.get('/edit-book/:id', bookController.editBookForm);
app.post('/edit-book/:id', bookController.updateBook);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

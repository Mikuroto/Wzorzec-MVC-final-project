const Book = require('../models/bookModel');

exports.getBooks = (req, res) => {
    const { genre, author, status } = req.query;
    const books = Book.getAllBooks({ genre, author, status });
    const genres = Book.getUniqueGenres();
    const authors = Book.getUniqueAuthors();
    res.render('books', { 
        books,
        genres,
        authors,
        selectedGenre: genre,
        selectedAuthor: author,
        selectedStatus: status,
        pageTitle: 'Book List',
        path: '/books'
    });
};

exports.addBookForm = (req, res) => {
    res.render('add-book', {
        pageTitle: 'Add New Book',
        path: '/add-book',
        errorMessage: null,
        oldInput: {}
    });
};

exports.addBook = (req, res) => {
    const { title, author, genre } = req.body;
    try {
        Book.addBook({ title, author, genre });
        res.redirect('/books');
    } catch (error) {
        res.status(400).render('add-book', {
            pageTitle: 'Add New Book',
            path: '/add-book',
            errorMessage: error.message,
            oldInput: { title, author, genre }
        });
    }
};

exports.editBookForm = (req, res) => {
    const bookId = req.params.id;
    const book = Book.findBookById(bookId);
    if (book) {
        res.render('edit-book', {
            pageTitle: 'Edit Book',
            path: '/edit-book',
            errorMessage: null,
            book: book
        });
    } else {
        res.redirect('/books');
    }
};

exports.updateBook = (req, res) => {
    const bookId = req.params.id;
    const { title, author, genre } = req.body;
    try {
        const updatedBook = Book.updateBook(bookId, { title, author, genre });
        if (updatedBook) {
            res.redirect('/books');
        } else {
            res.status(404).send('Book not found for update'); 
        }
    } catch (error) {
        const book = Book.findBookById(bookId);
        res.status(400).render('edit-book', {
            pageTitle: 'Edit Book',
            path: '/edit-book',
            errorMessage: error.message,
            book: { ...book, ...req.body }
        });
    }
};

exports.markAsRead = (req, res) => {
    const bookId = req.params.id;
    const book = Book.findBookById(bookId);
    if (book) {
        Book.updateBookStatus(bookId, !book.readStatus);
    }
    res.redirect('/books');
};

exports.deleteBook = (req, res) => {
    const bookId = req.params.id;
    Book.deleteBook(bookId);
    res.redirect('/books');
};

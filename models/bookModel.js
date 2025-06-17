
// example values
let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', readStatus: false },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', readStatus: true },
    { id: 3, title: '1984', author: 'George Orwell', genre: 'Dystopian', readStatus: false }
];
let nextBookId = 4;

class Book {
    constructor(id, title, author, genre, readStatus = false) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.readStatus = readStatus;
    }

    static getAllBooks({ genre, author, status } = {}) {
        let filteredBooks = [...books];
        if (genre) {
            filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
        }
        if (author) {
            filteredBooks = filteredBooks.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
        }
        if (status !== undefined && status !== '') {
            const read = status === 'read';
            filteredBooks = filteredBooks.filter(book => book.readStatus === read);
        }
        return filteredBooks;
    }

    static addBook(bookData) {
        const { title, author, genre } = bookData;
        if (!title || !author || !genre) {
            throw new Error('Title, author, and genre are required.');
        }
        const newBook = new Book(nextBookId++, title, author, genre, false);
        books.push(newBook);
        return newBook;
    }

    static findBookById(id) {
        const bookId = parseInt(id, 10);
        return books.find(book => book.id === bookId);
    }

    static updateBook(id, bookData) {
        const bookId = parseInt(id, 10);
        const book = this.findBookById(bookId);
        if (book) {
            const { title, author, genre } = bookData;
            if (!title || !author || !genre) {
                throw new Error('Title, author, and genre are required.');
            }
            book.title = title;
            book.author = author;
            book.genre = genre;
            return book;
        }
        return null;
    }

    static updateBookStatus(id, readStatus) {
        const bookId = parseInt(id, 10);
        const book = this.findBookById(bookId);
        if (book) {
            book.readStatus = readStatus;
            return book;
        }
        return null;
    }

    static deleteBook(id) {
        const bookId = parseInt(id, 10);
        const bookIndex = books.findIndex(book => book.id === bookId);
        if (bookIndex > -1) {
            const deletedBook = books.splice(bookIndex, 1);
            return deletedBook[0];
        }
        return null;
    }

    static getUniqueGenres() {
        const genres = books.map(book => book.genre);
        return [...new Set(genres)];
    }

    static getUniqueAuthors() {
        const authors = books.map(book => book.author);
        return [...new Set(authors)];
    }
}

module.exports = Book;

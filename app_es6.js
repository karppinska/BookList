class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const 
            list = document.querySelector('#book-list'), 
            row = document.createElement('tr');

        row.innerHTML = `<td>${book.title}</td>` + `<td>${book.author}</td>` + `<td>${book.isbn}</td>` + 
                        `<td><a href="#" class="delete">X</a></td>`;

        list.appendChild(row);
    }

    clearForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    showNotification(message, cssClass) {
        const 
            alert = document.createElement('div'),
            container = document.querySelector('#container'),
            form = document.querySelector('#book-form');

        alert.className = `alert ${cssClass}`;
        alert.appendChild(document.createTextNode(message));

        container.insertBefore(alert, form);

        setTimeout(function() {
            container.removeChild(alert);
        }, 3000);
    }

    deleteBook({parentElement}) {
        parentElement.parentElement.remove();
        Store.removeBook(parentElement.previousElementSibling.textContent);
    }
}

class Store {
    static addBook(book) {
        const books = Store.getBooks();
        
        if (books) {
            books.push(book);
            localStorage.setItem('books', JSON.stringify(books));
        }
    }

    static getBooks() {
        return JSON.parse(localStorage.getItem('books'));
    }

    static displayBook() {
        const books = Store.getBooks();

        books && books.forEach(book => {
            const ui = new UI();
            ui.addBookToList(book);
        });
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books && books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

document.addEventListener('DOMContentLoaded', Store.displayBook);

document.querySelector('#book-form').addEventListener('submit', 
    function(e) {
        e.preventDefault();

        const 
            title = document.querySelector('#title').value,
            author = document.querySelector('#author').value,
            isbn = document.querySelector('#isbn').value,

            book = new Book(title, author, isbn),
            ui = new UI();

        if (title === '' || author === '' || isbn === '') {
            ui.showNotification('Please complete all fields', 'error');
        } else {
            Store.addBook(book);
            ui.addBookToList(book);
            ui.showNotification('Book successfully added!', 'success');
            ui.clearForm();
        }
    });

document.querySelector('#book-list').addEventListener('click', 
    function(e) {
        e.preventDefault();

        if (e.target.className === 'delete') {
            const ui = new UI();
            ui.deleteBook(e.target);
            ui.showNotification('Book has been removed', 'success');
        }
    });

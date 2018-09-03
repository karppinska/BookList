function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function(book) {
    const 
        list = document.getElementById('book-list'),
        row = document.createElement('tr');

    row.innerHTML = 
        '<td>' + book.title + '</td>' +
        '<td>' + book.author + '</td>' +
        '<td>' + book.isbn + '</td>' +
        '<td><a href="#" class="delete">X</a></td>';

    list.appendChild(row);
}

UI.prototype.clearForm = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showValidationAlert = function(message, cssClass) {
    const 
        alert = document.createElement('div'),
        container = document.getElementById('container'),
        form = document.getElementById('book-form');

    alert.className = 'alert ' + cssClass;
    alert.appendChild(document.createTextNode(message));

    container.insertBefore(alert, form);

    setTimeout(function() {
        container.removeChild(alert);
    }, 3000);
}

UI.prototype.deleteBook = function(target) {
    target.parentElement.parentElement.remove();
}

document.getElementById('book-form').addEventListener('submit', 
    function(e) {
        e.preventDefault();

        const 
            title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value,

            book = new Book(title, author, isbn),
            ui = new UI();

        if (title === '' || author === '' || isbn === '') {
            ui.showValidationAlert('Please fill in all fields', 'error');
        } else {
            ui.addBookToList(book);
            ui.showValidationAlert('Book added!', 'success');
            ui.clearForm();
        }
    });

document.getElementById('book-list').addEventListener('click', 
    function(e) {
        e.preventDefault();

        if (e.target.className === 'delete') {
            const ui = new UI();
            ui.deleteBook(e.target);
            ui.showValidationAlert('Book removed', 'success');
        }
    });
// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn,copies) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.copies= copies;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

   books.forEach((book) =>UI.addBookToList(book));
   //alert(books);
  }

  static addBookToList(book) {
    
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>${book.copies}</td>
      <td><a href="#"   class="btn btn-danger btn-sm delete">X</a></td>
      <td><input type="button" name="" value="allot" onclick="borrow()"></td>
      <td><input type="button" name="" value="receive" onclick="ret()"></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
    document.querySelector('#copies').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  const copies = document.querySelector('#copies').value;

  // Validate
  if(title === '' || author === '' || isbn === '' || copies==='') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, isbn, copies);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
 Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});
function borrow()
{
var table = document.getElementById("mytable"),rIndex;
      
      for(var i = 1; i < table.rows.length; i++)
      {
          table.rows[i].onclick = function()
          {
              rIndex = this.rowIndex;
              console.log(rIndex);
              document.getElementById("title").value = this.cells[0].innerHTML;
              document.getElementById("author").value = this.cells[1].innerHTML;
              document.getElementById("isbn").value = this.cells[2].innerHTML;
              document.getElementById("copies").value = (this.cells[3].innerHTML)-1;
              Store.removeBook(this.cells[2].innerHTML);
          }
      }
        
}

function ret()
{
var table = document.getElementById("mytable"),rIndex;
      
      for(var i = 1; i < table.rows.length; i++)
      {
          table.rows[i].onclick = function()
          {
              rIndex = this.rowIndex;
              console.log(rIndex);
              document.getElementById("title").value = this.cells[0].innerHTML;
              document.getElementById("author").value = this.cells[1].innerHTML;
              document.getElementById("isbn").value = this.cells[2].innerHTML;
              document.getElementById("copies").value = (this.cells[3].innerHTML)-(-1);
              Store.removeBook(this.cells[2].innerHTML);
          }
        }
        
}



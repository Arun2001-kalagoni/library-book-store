

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
    `;

    list.appendChild(row);
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

  
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  const a=(e.target.parentElement.previousElementSibling.textContent)-1;
  console.log(a);
  let tr=document.getElementsByTagName('tr');
  tr[3].innerHTML=a;
e.preventDefault();

 
  
});










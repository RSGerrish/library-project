let myLibrary = [];
let firstTime = false;
const addBtn = document.querySelector('#btn-add');
const addForm = document.querySelector('.add-book-form');
const btnOK = document.querySelector('#btn-ok');
const btnCancel = document.querySelector('#btn-cancel');

//Constructor
function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.index = myLibrary.length;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  const grid = document.querySelector('main');

  grid.innerHTML = "";

  for(i = 0; i < myLibrary.length; i++) {
    grid.innerHTML += 
    `<div class="book-card" index="${i}">
    <h2>${myLibrary[i].title}</h2>
    <h3>By ${myLibrary[i].author}</h3>
    <h3>${myLibrary[i].pages} pages</h3>
    <h3>${myLibrary[i].isRead}</h3>
    <div class="card-btn-container">
      <button class="card-btn btn-remove" id="btn-remove" index=${i}>Remove</button>
    </div>
  </div>`
  }

  const btnRemove = document.querySelectorAll('.btn-remove');

  for(i = 0; i < myLibrary.length; i++) {
    btnRemove[i].addEventListener("click", function() {
        
      for(j = 0; j < myLibrary.length; j++) {
        if(btnRemove[j].dataset.index === i) {
          myLibrary.splice(btnRemove[i].index, 1);
          displayLibrary();
        }
      }
    });
  }
}

addBtn.addEventListener("click", function() {
  addForm.style.visibility = "visible";
});

btnOK.addEventListener("click", function() {
  const newTitle = document.querySelector('#title').value;
  const newAuthor = document.querySelector('#author').value;
  const newPages = document.querySelector('#pages').value;
  const newIsRead = document.querySelector('#is-read').checked;

  if(!newTitle || !newAuthor || !newPages) {
    return;
  } else {
    const newBook = new Book(newTitle, newAuthor, newPages, newIsRead);

    addBookToLibrary(newBook);
    displayLibrary();

    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#is-read').checked = false;
    addForm.style.visibility = "hidden";
  }
});

btnCancel.addEventListener("click", function() {
  document.querySelector('#title').value = "";
  document.querySelector('#author').value = "";
  document.querySelector('#pages').value = "";
  document.querySelector('#is-read').checked = false;
  addForm.style.visibility = "hidden";
});

window.addEventListener('load',function() {
  //Populate library with 4 books...
  for(j = 0; j < 4; j++) {
    if(j === 0 ) {
      let newBook = new Book("In Search of Lost Time", "Marcel Proust", 357, false);
      addBookToLibrary(newBook);
    } else if(j === 1) {
      let newBook = new Book("Ulysses", "James Joyce", 214, false);
      addBookToLibrary(newBook);
    } else if(j === 2) {
      let newBook = new Book("Don Quixote", "Miquel de Cervantes", 22, true);
      addBookToLibrary(newBook);
    } else if(j === 3) {
      let newBook = new Book("One Hundred Years of Solitude", "Gabriel Garcia Marquez", 297, false);
      addBookToLibrary(newBook);
    }

    displayLibrary();
    console.log(myLibrary);
  }
});
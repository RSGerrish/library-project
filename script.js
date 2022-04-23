let firstTime = false;
let removed = false;
const addBtn = document.querySelector('#btn-add');
const addForm = document.querySelector('.add-book-form');
const btnOK = document.querySelector('#btn-ok');
const btnCancel = document.querySelector('#btn-cancel');  
const newTitle = document.querySelector('#title');
const newAuthor = document.querySelector('#author');
const newPages = document.querySelector('#pages');
const newIsRead = document.querySelector('#is-read');
const mainElement = document.querySelector('main');

if(typeof myLibrary === 'undefined') {
  var myLibrary = [];
}


//Constructor changed to class and added addBookToLibrary to class
class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  addBookToLibrary() {
    myLibrary.push(this);
  }
}

function initializeMyLibrary() {
  myLibrary = [];
}

//Old Constructor Below...

//function Book(title, author, pages, isRead) {
//  this.title = title;
//  this.author = author;
//  this.pages = pages;
//  this.isRead = isRead;
//  this.index = myLibrary.length;
//}

//function addBookToLibrary(book) {
//  myLibrary.push(book);
//}

function displayLibrary() {
  const grid = document.querySelector('main');
  let wasItRead = "Not read yet";

  grid.innerHTML = "";

  for(i = 0; i < myLibrary.length; i++) {
    if(myLibrary[i].isRead) {
      wasItRead = "Already read";
    } else {
      wasItRead = "Not read yet";
    }

    grid.innerHTML += 
    `<div class="book-card" index="${i}">
    <h2>${myLibrary[i].title}</h2>
    <h3>By ${myLibrary[i].author}</h3>
    <h3>${myLibrary[i].pages} pages</h3>
    <h3>${wasItRead}</h3>
    <div class="card-btn-container">
      <button class="card-btn btn-mark-read" id="btn-mark-read" data-index=${i}>Mark Read</button>
      <button class="card-btn btn-remove" id="btn-remove" data-index=${i}>Remove</button>
    </div>
  </div>`
  }

  const mainGrid = document.querySelector('main');

  mainGrid.addEventListener("click", function(e) {
    let target = e.target.id;
    let listIndex = e.target.dataset.index;

    if(target === 'btn-remove') {
      myLibrary.splice(listIndex, 1);
      displayLibrary();
      e.stopImmediatePropagation();

      return;
    } else if(target === 'btn-mark-read') {
      myLibrary[listIndex].isRead = true;
      displayLibrary();
      e.stopImmediatePropagation();

      return;
    }
  });

  return;
}

addBtn.addEventListener("click", function() {
  addForm.style.visibility = "visible";
  return;
});

newTitle.addEventListener("input", function() {
  if(newTitle.validity.valueMissing){
    newTitle.setCustomValidity("Please enter a book title");
    return;
  } else {
    newTitle.setCustomValidity("");
    return;
  }
});

newAuthor.addEventListener("input", function() {
  if(newAuthor.validity.valueMissing) {
    newAuthor.setCustomValidity("Please enter Author name");
    return;
  } else {
    newAuthor.setCustomValidity("");
    return;
  }
});

newPages.addEventListener("input", function() {
  if(newPages.validity.valueMissing) {
    newPages.setCustomValidity("Please enter number of pages");
    return;
  } else{
    newPages.setCustomValidity("");
    return;
  }
});

btnOK.addEventListener("click", function() {
  newTitle.setAttribute("required", "true");
  newAuthor.setAttribute("required", "true");
  newPages.setAttribute("required", "true");

  if(newTitle.validity.valueMissing) {
    newTitle.setCustomValidity("Please enter a book title");
    return;
  } else if(newAuthor.validity.valueMissing) {
    newAuthor.setCustomValidity("Please enter Author name");
    return;
  } else if(newPages.validity.valueMissing) {
    newPages.setCustomValidity("Please enter number of pages");
    return;
  }else {
    const newBook = new Book(newTitle.value, newAuthor.value, newPages.value, newIsRead.value);

    newBook.addBookToLibrary();
    displayLibrary();

    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#is-read').checked = false;

    newTitle.removeAttribute("required");
    newAuthor.removeAttribute("required");
    newPages.removeAttribute("required");

    addForm.style.visibility = "hidden";
  }

  return;
});

btnCancel.addEventListener("click", function() {
  newTitle.value = "";
  newAuthor.value = "";
  newPages.value = "";
  newIsRead.checked = false;

  newTitle.removeAttribute("required");
  newAuthor.removeAttribute("required");
  newPages.removeAttribute("required");

  addForm.style.visibility = "hidden";

  return;
});

console.log(mainElement);

window.addEventListener('load',function() {
  //Populate library with 4 books...
  if(!myLibrary.length) {
    for(j = 0; j < 4; j++) {
      if(j === 0 ) {
        let newBook = new Book("In Search of Lost Time", "Marcel Proust", 357, false);
        newBook.addBookToLibrary();
      } else if(j === 1) {
        let newBook = new Book("Ulysses", "James Joyce", 214, false);
        newBook.addBookToLibrary();
      } else if(j === 2) {
        let newBook = new Book("Don Quixote", "Miquel de Cervantes", 22, true);
        newBook.addBookToLibrary();
      } else if(j === 3) {
        let newBook = new Book("One Hundred Years of Solitude", "Gabriel Garcia Marquez", 297, false);
        newBook.addBookToLibrary();
      }
    }

    displayLibrary();
    return;
  }
});
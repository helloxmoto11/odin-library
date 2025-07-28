const library = [];
const libraryElement = document.querySelector('.library');
const newBookElement = document.getElementById("newBook");
const scrim = document.querySelector(".scrim");

// add form
const addFormContainer = document.getElementById("add-form-container");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readBookInput = document.getElementById("read");
const addBookButton = document.getElementById("btn-add-book");


newBookElement.addEventListener('click', () => {
    scrim.style.display = "block";
})

addFormContainer.addEventListener("click", (e) => {
    e.stopPropagation()
})

scrim.addEventListener('click', (e) => {
    scrim.style.display = "none";

})

addBookButton.addEventListener('click', (e) => {
    e.preventDefault()
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = Number(pagesInput.value);
    const read = readBookInput.checked;
    if (title && author && pages) {
        const newBook = addBook(title, author, pages, read);
        createBookElement(newBook);
        scrim.style.display = "none"
    }
})

function Book(title, author, numPages, read) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = crypto.randomUUID()
}

function addBook(title, author, numPages, read) {
    const newBook = new Book(title, author, numPages, read);
    library.push(newBook);
    return newBook;
}


function createBookElement(book) {
    console.log(book)
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-delete");
    deleteButton.addEventListener("click", (e) => {
        console.log("deleted " + book.title)
        const bookToDelete = library.find(bk => bk.id === book.id);
        const index = library.indexOf(bookToDelete);
        library.splice(index, 1);
        while (libraryElement.children.length > 1) {
            libraryElement.removeChild(libraryElement.children[0]);
        }
        refreshLibrary()
    })
    const icon = document.createElement("img");
    icon.src = "delete-icon.svg";
    icon.alt = "delete";
    deleteButton.appendChild(icon);

    const title = document.createElement("p");
    title.innerText = book.title;
    title.classList.add("title");

    const author = document.createElement("p");
    author.innerText = book.author;
    author.classList.add("author");

    const numPages = document.createElement("p");
    numPages.innerText = "Pages: " + book.numPages;
    numPages.classList.add("numPages");

    const readWrapper = document.createElement("div");
    readWrapper.classList.add("read");
    const readLabel = document.createElement("p")
    readLabel.innerText = "Read?"
    const read = document.createElement('input');
    read.type = "checkbox";
    read.checked = book.read;
    read.addEventListener("change", (e) => {
        const bk = library.find(b => b.id === book.id);
        bk.read = !bk.read;
        library.forEach((book) => {
            console.log(book);
        })
    });

    readWrapper.appendChild(readLabel)
    readWrapper.appendChild(read);
    bookElement.appendChild(deleteButton);
    bookElement.appendChild(title)
    bookElement.appendChild(author)
    bookElement.appendChild(numPages)
    bookElement.appendChild(readWrapper)

    libraryElement.insertBefore(bookElement, newBookElement);
}

addBook("Dune", "Frank Herbert", 604, false);
addBook("To Kill A Mockingbird", "Harper Lee", 324, false);
addBook("Harry Potter And the Sorcerers Stone", "J.K. Rowling", 309, true);


library.forEach(book => {
    console.log(book);
});

function refreshLibrary() {
    library.forEach((book) => {
        createBookElement(book)
    })
}

refreshLibrary();
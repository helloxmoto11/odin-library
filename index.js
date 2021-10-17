let library = []

function addBookToLibrary(book) {
    library.push(book);
}

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => {
        let read = this.isRead ? 'already read.' : 'not read yet.';
        return `${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
    }
}

const book = new Book('Harry Potter', 'J.K. Rowling', 343, false);
const book2 = new Book('The Hobbit', 'J.R. Tolkien', 121, true);

addBookToLibrary(book);
addBookToLibrary(book2)

addBookToLibrary(book)

addBookToLibrary(book2)

addBookToLibrary(book)
addBookToLibrary(book2)
addBookToLibrary(book)
addBookToLibrary(book2)

addBookToLibrary(book);

addBookToLibrary(book2);


addBookToLibrary(book)
addBookToLibrary(book2)
addBookToLibrary(book)
addBookToLibrary(book2)

addBookToLibrary(book)
addBookToLibrary(book2)

addBookToLibrary(book)
addBookToLibrary(book2)

const body = document.querySelector('.mainSection');


library.forEach(book => {
    body.appendChild(newCard(book))
})

function newCard(book) {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('p');
    title.innerText = book.title;
    title.className = 'title book'

    const author = document.createElement('p');
    author.innerText = book.author;
    author.className = 'author'

    const numPages = document.createElement('p');
    numPages.innerText = book.pages + ' pages.';

    const readBox = document.createElement('div');
    readBox.className = 'readBox';
    const isRead = document.createElement('p');
    isRead.innerText = 'Read'
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = book.isRead;

    const btnDelete = document.createElement('button');
    btnDelete.id = 'btnDelete';
    btnDelete.innerText = 'Remove Book?'
    btnDelete.addEventListener('click', deleteBook)

    readBox.append(isRead, checkBox)

    card.append(
        title,
        author,
        numPages,
        readBox,
        btnDelete
    )

    return card;
}

function deleteBook(e) {
    console.log(e.target);
    const card = e.target.parentNode;
    body.removeChild(card);
    //todo this removes book but need to also remove it from library back end.
}
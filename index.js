let library = [];
let bookCount = 0;

const body = document.querySelector('.mainSection');
body.appendChild(tempCard());

function addBookToLibrary() {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const isRead = document.getElementById('readCheckBox');

    if (title.value === ''
        || author.value === ''
        || pages.value === '') {
        return;
    }

    const book = new Book();
    book.title = title.value;
    book.author = author.value;
    book.pages = pages.value;
    book.isRead = isRead.checked;
    book.id = bookCount;


    library.push(book);
    bookCount++;

    title.innerText = '';
    author.innerText = '';
    pages.innerText = '';
    isRead.checked = false;
    hideForm();
    const placeHolder = document.querySelector('#placeHolder');
    const newBook = newCard(book);
    body.insertBefore(newBook, placeHolder);
}

function Book(title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
    this.info = () => {
        let read = this.isRead ? 'already read.' : 'not read yet.';
        return `book id: ${this.id}, ${this.title} by ${this.author}, ${this.pages} pages, ${read}`;
    }
}

function tempCard() {
    const card = document.createElement('div');
    card.className = 'card placeHolder';
    card.id = 'placeHolder';

    const xDiv = document.createElement('div');
    xDiv.id = 'xDiv';

    const yDiv = document.createElement('div');
    yDiv.id = 'yDiv';

    card.append(xDiv, yDiv);

    card.addEventListener('click', () => {
        console.log('you clicked a card.');
        document.querySelector('.form-container').style.display = 'block';
        document.querySelector('#addBookBtn').addEventListener('click', () => {
            addBookToLibrary()
        });
    })
    return card;
}

function newCard(book) {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = book.id;

    const cardHeaderDiv = document.createElement('div');
    cardHeaderDiv.className = 'cardHeader';

    const bookNum = document.createElement('p');
    const id = Number(card.id) + 1;
    bookNum.innerText = id + "";
    bookNum.className = 'bookNum';

    const readBox = document.createElement('div');
    readBox.className = 'readBox';
    const isRead = document.createElement('p');
    isRead.innerText = 'Read'
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = book.isRead;

    readBox.append(isRead, checkBox);
    cardHeaderDiv.append(bookNum, readBox);

    const title = document.createElement('p');
    title.innerText = book.title;
    title.className = 'title book'

    const author = document.createElement('p');
    author.innerText = book.author;
    author.className = 'author'

    const numPages = document.createElement('p');
    numPages.innerText = book.pages + ' pages.';

    const btnDelete = document.createElement('button');
    btnDelete.id = 'btnDelete';
    btnDelete.innerText = 'Remove Book?'
    btnDelete.addEventListener('click', deleteBook)

    card.append(
        cardHeaderDiv,
        title,
        author,
        numPages,
        btnDelete
    )

    return card;
}

function deleteBook(e) {
    const card = e.target.parentElement;
    console.log(card);
    let id = card.id;
    let book = library.findIndex(book => {
        return book.id === Number(id);
    });

    library.splice(book, 1);
    library.forEach(book => {
        console.log(book.info());
    });
    body.removeChild(card);
    //todo this removes book but need to also remove it from library back end.
}

function deleteAllBooks() {
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
}

function hideForm() {
    document.querySelector('.form-container').style.display = 'none';
}

